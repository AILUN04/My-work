<template>
  <div class="projects-page page-content">
    <div class="container">
      <CategoryTabs
        v-model="activeCategory"
        :categories="projectCategories"
      />

      <!-- 特效作品：纵向排列 + 对比卡片 + 右侧面板 -->
      <div v-if="activeCategory === '特效作品'" ref="verticalGrid" class="projects-vertical">
        <!-- 前4张卡片 -->
        <div
          v-for="(project, i) in filteredProjects.slice(0, 4)"
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
            :after-label="project.tags.includes('AI') ? 'AI调整' : '特效合成'"
            :before-label="project.tags.includes('AI') ? 'AE跟踪' : '原片'"
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
            <div class="process-card" @click="openProcessLightbox(project)">
              <video v-if="project.processVideo" :src="project.processVideo" class="process-img" autoplay loop muted playsinline preload="auto"></video>
              <img v-else-if="project.process" :src="project.process" :alt="project.title" class="process-img" />
              <span v-if="project.processVideo" class="process-label">原片</span>
            </div>
            <div class="card-side-text">
              <h3 class="card-side-title">{{ project.title }}</h3>
              <p class="card-side-desc">{{ project.tags.join(' / ') }}</p>
            </div>
          </div>
        </div>

        <!-- 第4张卡后：AI文字说明 + 001独立展示 -->
        <div ref="aiIntroEl" class="ai-intro-section">
          <p class="ai-intro-text">一个有意思的点是随着AI的发展，其图片和视频生成能力越来越强。</p>
          <p class="ai-intro-text">所以我试着将AI应用进特效合成领域，让我惊讶的是其效果出奇的好。</p>
          <p class="ai-intro-text">传统的特效制作要调整很多细致的方面好让特效更好更真实地融入显示场景，这个操作需要考虑很多方面如物理，光学，色彩...等等，这个操作可能一个镜头就要调整和渲染好几个小时，但AI只需要几分钟就能产出一个看似不错甚至近乎完美得画面</p>
        </div>
        <div class="card-wrapper-vfx card-wrapper-vfx--standalone">
          <div class="standalone-showcase watermark" @click="openStandaloneLightbox">
            <img :src="'zp/001.png'" alt="AI特效合成示例" class="standalone-img" />
          </div>
        </div>

        <!-- 后4张卡片 (index 4+) -->
        <div
          v-for="(project, i) in filteredProjects.slice(4)"
          :key="project.id"
          :ref="(el) => { if (el) cardRefs[i + 4] = el }"
          class="card-wrapper-vfx"
          :style="getCardStyle(i + 4)"
        >
          <AeComparisonCard
            v-if="project.comparison"
            :after-video="project.comparison.after"
            :before-video="project.comparison.before"
            :title="project.title"
            :tags="project.tags"
            :after-label="project.tags.includes('AI') ? 'AI调整' : '特效合成'"
            :before-label="project.tags.includes('AI') ? 'AE跟踪' : '原片'"
          />
          <ProjectCard
            v-else
            :title="project.title"
            :tags="project.tags"
            :thumbnail="project.thumbnail"
            :videoUrl="project.videoUrl"
            :index="i + 4"
            @select="openLightbox"
          />
          <div class="card-right-panel">
            <div class="process-card" @click="openProcessLightbox(project)">
              <video v-if="project.processVideo" :src="project.processVideo" class="process-img" autoplay loop muted playsinline preload="auto"></video>
              <img v-else-if="project.process" :src="project.process" :alt="project.title" class="process-img" />
              <span v-if="project.processVideo" class="process-label">原片</span>
            </div>
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

function openStandaloneLightbox() {
  lightboxItem.value = {
    thumbnail: 'zp/001.png',
    title: 'AI特效合成示例',
    tags: ['AI', '特效合成'],
  }
  lightboxVisible.value = true
}

function closeLightbox() {
  lightboxVisible.value = false
}

function openProcessLightbox(project) {
  lightboxItem.value = {
    videoUrl: project.processVideo || undefined,
    thumbnail: project.process,
    title: project.title + ' - 原片',
    tags: project.tags,
  }
  lightboxVisible.value = true
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
  const fadeZone = vh * 0.45

  const scrollY = window.scrollY
  const topRevealZone = vh * 0.3
  const topReveal = Math.max(0, 1 - scrollY / topRevealZone)

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

    const effectiveSv = i < 2 ? Math.max(sv, topReveal) : sv
    newVisibility[i] = effectiveSv + (1 - effectiveSv) * bottomProximity

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

let scrollTicking = false
function handleScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    updateCardVisibility()
    scrollTicking = false
  })
}

// ============================
// AI 文字说明渐显渐隐动画
// ============================
const aiIntroEl = ref(null)
let aiObserver = null

function setupAIIntroObserver() {
  if (!aiIntroEl.value) return
  if (aiObserver) aiObserver.disconnect()
  aiObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ai-intro-visible')
      } else {
        entry.target.classList.remove('ai-intro-visible')
      }
    })
  }, { threshold: 0.2 })
  aiObserver.observe(aiIntroEl.value)
}

watch(activeCategory, async () => {
  cardVisibility.value = []
  await nextTick()
  updateCardVisibility()
  if (activeCategory.value === '特效作品') {
    nextTick(() => setupAIIntroObserver())
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(() => {
    updateCardVisibility()
    setupAIIntroObserver()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (aiObserver) aiObserver.disconnect()
})
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
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

/* 独立展示卡：全宽展示001图片 */
.card-wrapper-vfx--standalone {
  flex-direction: column;
  transform: scale(0.7);
  transform-origin: top center;
  margin-bottom: calc(-30% * var(--card-height, 300px));
  cursor: pointer;
}

.standalone-showcase {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.standalone-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
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
  overflow: hidden;
  position: relative;
}

.process-label {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 11px;
  font-family: var(--font-heading);
  font-weight: 500;
  padding: 3px 10px;
  pointer-events: none;
}

.process-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px var(--color-shadow-hover);
  outline: 2px solid var(--color-white);
  outline-offset: 0;
}

.process-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
   AI 文字说明
   ============================ */
.ai-intro-section {
  max-width: 820px;
  padding: 48px 0 16px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
}

.ai-intro-section.ai-intro-visible {
  opacity: 1;
  transform: translateY(0);
}

.ai-intro-text {
  font-family: var(--font-heading);
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 2;
  color: var(--color-secondary);
  margin-bottom: 12px;
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

  .ai-intro-section {
    padding: 32px 0 8px;
  }
}
</style>
