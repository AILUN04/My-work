<template>
  <div class="projects-page page-content">
    <div class="container">
      <CategoryTabs
        v-model="activeCategory"
        :categories="projectCategories"
      />

      <!-- 特效作品：纵向排列 + 对比卡片 + 右侧面板 -->
      <div v-if="activeCategory === '特效作品'" ref="verticalGrid" class="projects-vertical">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :ref="(el) => { if (el) cardRefs[i] = el }"
          class="card-wrapper-vfx"
          :style="getCardStyle(i)"
        >
          <AeComparisonCard
            v-if="project.comparison"
            :after-video="project.comparison.after"
            :before-video="project.comparison.before"
            :title="project.title"
            :tags="project.tags"
          />
          <ProjectCard
            v-else
            :title="project.title"
            :tags="project.tags"
            :thumbnail="project.thumbnail"
            :videoUrl="project.videoUrl"
            :index="i"
            @select="openLightbox"
          />
          <div class="card-right-panel">
            <div class="process-card"></div>
            <div class="card-side-text">
              <h3 class="card-side-title">{{ project.title }}</h3>
              <p class="card-side-desc">{{ project.tags.join(' / ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 剪辑作品：宽卡片网格 + 滚动渐显动画 -->
      <div v-else-if="activeCategory === '剪辑作品'" class="projects-grid-wide">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :ref="(el) => { if (el) cardRefs[i] = el }"
          class="card-anim-wrapper"
          :style="getCardStyle(i)"
        >
          <ProjectCard
            :title="project.title"
            :tags="project.tags"
            :thumbnail="project.thumbnail"
            :videoUrl="project.videoUrl"
            :index="i"
            @select="openLightbox"
          />
        </div>
      </div>

      <!-- 默认网格（全部项目 / 摄影作品 / 其他）+ 滚动渐显动画 -->
      <div v-else class="projects-grid">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :ref="(el) => { if (el) cardRefs[i] = el }"
          class="card-anim-wrapper"
          :style="getCardStyle(i)"
        >
          <ProjectCard
            :title="project.title"
            :tags="project.tags"
            :thumbnail="project.thumbnail"
            :videoUrl="project.videoUrl"
            :index="i"
            @select="openLightbox"
          />
        </div>
      </div>

      <p class="empty-msg" v-if="filteredProjects.length === 0">
        暂无该分类的项目
      </p>
    </div>

    <Lightbox
      :visible="lightboxVisible"
      :item="lightboxItem"
      @close="closeLightbox"
      @closed="lightboxItem = {}"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import AeComparisonCard from '@/components/AeComparisonCard.vue'
import Lightbox from '@/components/Lightbox.vue'
import { projects, projectCategories } from '@/data/projects.js'

const activeCategory = ref(projectCategories[0])

// 灯箱状态
const lightboxVisible = ref(false)
const lightboxItem = ref({})

function openLightbox(item) {
  lightboxItem.value = item
  lightboxVisible.value = true
}

function closeLightbox() {
  lightboxVisible.value = false
}

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部项目') return projects
  return projects.filter(p => p.category === activeCategory.value)
})

// ============================
// 所有分类：滚动渐显动画
// ============================
const verticalGrid = ref(null)
const cardRefs = reactive([])
const cardVisibility = ref([])
const cardOffsets = ref([])

function getCardStyle(i) {
  const v = cardVisibility.value[i] ?? 0
  const offset = cardOffsets.value[i] ?? 0
  return {
    opacity: 0.3 + v * 0.7,
    transform: offset > 0 ? `translateY(${offset}px)` : 'none',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  }
}

function updateCardVisibility() {
  const vh = window.innerHeight
  const centerY = vh / 2
  // 从中央向上下各延伸 45% 视口高度为渐显区间
  const fadeZone = vh * 0.45

  // 页面接近顶部时前2排卡片完全显现
  const scrollY = window.scrollY
  const topRevealZone = vh * 0.3
  const topReveal = Math.max(0, 1 - scrollY / topRevealZone)

  // 页面接近底部时，渐隐自动消解
  const docHeight = document.documentElement.scrollHeight
  const maxScroll = Math.max(0, docHeight - vh)
  const bottomBuffer = vh * 0.3
  const bottomProximity = maxScroll > 0
    ? Math.max(0, Math.min(1, (scrollY - (maxScroll - bottomBuffer)) / bottomBuffer))
    : 1

  const newVisibility = []
  const newOffsets = []
  for (let i = 0; i < cardRefs.length; i++) {
    const el = cardRefs[i]
    if (!el) { newVisibility[i] = 0; newOffsets[i] = 0; continue }
    const rect = el.getBoundingClientRect()
    const cardCenter = rect.top + rect.height / 2
    const distFromCenter = Math.abs(cardCenter - centerY)
    const raw = 1 - Math.min(1, distFromCenter / fadeZone)
    const sv = Math.max(0, raw)

    // 前2排卡片在页面顶部时完全显现，滚动后渐变到中央聚焦效果
    const effectiveSv = i < 2 ? Math.max(sv, topReveal) : sv
    newVisibility[i] = effectiveSv + (1 - effectiveSv) * bottomProximity

    // 仅下方卡片有上浮位移，越过中央后位移归零
    // 前2排卡片在顶部时位移也归零
    if (i < 2 && topReveal > 0) {
      newOffsets[i] = 0
    } else if (cardCenter > centerY) {
      const distBelow = cardCenter - centerY
      newOffsets[i] = Math.min(80, (distBelow / fadeZone) * 80)
    } else {
      newOffsets[i] = 0
    }
  }
  cardVisibility.value = newVisibility
  cardOffsets.value = newOffsets
}

function handleScroll() {
  updateCardVisibility()
}

watch(activeCategory, async () => {
  cardVisibility.value = []
  await nextTick()
  updateCardVisibility()
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(() => updateCardVisibility())
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.projects-page {
  min-height: 111.1111vh;
  background-color: var(--color-bg);
  padding-bottom: 80px;
}

/* ============================
   默认网格（全部项目 / 摄影作品 / 其他）
   ============================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 14vw, 200px), 1fr));
  gap: clamp(10px, 1.5vw, 20px);
}

/* ============================
   剪辑作品：宽卡片网格 (aspect 2:1)
   ============================ */
.projects-grid-wide {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 30vw, 420px), 1fr));
  gap: clamp(16px, 2vw, 28px);
}

.projects-grid-wide :deep(.project-card) {
  aspect-ratio: 2 / 1;
}

/* ============================
   特效作品：纵向排列
   ============================ */
.projects-vertical {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
  padding-bottom: 40vh;
}

.card-wrapper-vfx {
  width: clamp(1065px, 96vw, 1370px);
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: clamp(16px, 2vw, 28px);
}

.card-wrapper-vfx :deep(.ae-card) {
  flex: 0 0 60%;
}

.card-right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(12px, 2vh, 20px);
}

.process-card {
  width: 75%;
  aspect-ratio: 3 / 2;
  background-color: var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 2px 8px var(--color-shadow);
  cursor: pointer;
  transition: transform var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
}

.process-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px var(--color-shadow-hover);
  outline: 2px solid var(--color-white);
  outline-offset: 0;
}

.card-side-text {
  padding-bottom: clamp(12px, 2vh, 24px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-side-title {
  font-family: var(--font-heading);
  font-size: clamp(14px, 1.3vw, 18px);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-side-desc {
  font-size: clamp(11px, 0.9vw, 13px);
  color: var(--color-muted);
  line-height: 1.6;
}

/* ============================
   通用
   ============================ */
.card-anim-wrapper {
  /* 透明容器，仅用于滚动动画追踪 */
}

.card-anim-wrapper :deep(.project-card) {
  width: 100%;
}

.empty-msg {
  text-align: center;
  color: var(--color-muted);
  padding: 80px 0;
  font-size: 16px;
}

@media (max-width: 768px) {
  .projects-grid-wide {
    grid-template-columns: 1fr;
  }

  .projects-grid-wide :deep(.project-card) {
    aspect-ratio: 3 / 2;
  }

  .card-wrapper-vfx {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    width: 100%;
  }

  .card-wrapper-vfx :deep(.ae-card) {
    flex: 0 0 auto;
    width: 100%;
  }

  .process-card {
    width: 50%;
    aspect-ratio: 16 / 10;
  }

  .card-side-text {
    padding-bottom: 0;
  }
}
</style>
