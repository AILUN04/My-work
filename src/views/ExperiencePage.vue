<template>
  <div class="experience-page page-content">
    <div class="container">
      <CategoryTabs
        v-model="activeCategory"
        :categories="experienceCategories"
      />
      <div class="card-stage">
        <Transition name="crossfade" mode="out-in">
          <div class="exp-card" :key="activeExperience.id">
            <div class="card-image watermark" :style="imageStyle">
              <div v-if="!activeExperience.image" class="image-placeholder">
                <span>{{ activeExperience.software }}</span>
              </div>
            </div>
            <div class="card-body">
              <h2 class="card-title">{{ activeExperience.title }}</h2>
              <p class="card-desc">{{ activeExperience.description }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import { experiences, experienceCategories } from '@/data/experiences.js'

const activeCategory = ref(experienceCategories[0])

const activeExperience = computed(() => {
  return experiences.find(e => e.software === activeCategory.value) || experiences[0]
})

const imageStyle = computed(() => {
  const exp = activeExperience.value
  if (exp.image) {
    return { backgroundImage: `url(${exp.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return {}
})

</script>

<style scoped>
.experience-page {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* ============================
   卡片舞台 — 居中聚焦
   ============================ */
.card-stage {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.exp-card {
  width: 100%;
  max-width: 1152px;
  border-radius: var(--card-radius);
  background: var(--color-white);
  box-shadow: 0 2px 8px var(--color-shadow);
  overflow: hidden;
  transition: transform var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
}

.exp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-shadow-hover);
}

/* ============================
   图片区域 20:9（高度比 16:9 减少 20%）
   ============================ */
.card-image {
  aspect-ratio: 20 / 9;
  background-color: var(--color-border);
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E4E4E7 0%, #D4D4D8 100%);
}

.image-placeholder span {
  font-family: var(--font-heading);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  color: rgba(24, 24, 27, 0.12);
  letter-spacing: 0.04em;
}

/* ============================
   文字区域
   ============================ */
.card-body {
  padding: 28px clamp(24px, 3vw, 36px) 36px;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 700px;
}

/* ============================
   标签切换过渡
   ============================ */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 0.2s ease-out;
}

.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}

/* ============================
   响应式
   ============================ */
@media (max-width: 768px) {
  .card-body {
    padding: 20px 16px 24px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-desc {
    font-size: 13px;
  }

  .image-placeholder span {
    font-size: 28px;
  }
}
</style>
