<template>
  <div class="home-page">
    <div class="hero-bg" :style="{ opacity: heroOpacity }"></div>

    <div class="hero-content">
      <aside class="info-card">
        <img class="avatar" src="/images/avatar-placeholder.svg" alt="头像" />
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">QQ</span>
            <span class="info-value">1234567890</span>
          </div>
          <div class="info-item">
            <span class="info-label">电话</span>
            <span class="info-value">138-xxxx-xxxx</span>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <span class="info-value">dingrongxin@example.com</span>
          </div>
          <div class="info-item">
            <span class="info-label">城市</span>
            <span class="info-value">中国·XX</span>
          </div>
          <div class="info-item">
            <span class="info-label">院校</span>
            <span class="info-value">XX大学</span>
          </div>
        </div>
        <router-link to="/contact" class="contact-btn">联系我</router-link>
      </aside>

      <div class="hero-right">
        <div class="title-block">
          <h1 class="main-title">Welcome to Ding Rongxin's website</h1>
          <p class="subtitle">MENG MU is my online name</p>
        </div>

        <!-- Glass text box -->
        <div ref="glassBox" class="glass-box" :class="{ visible: glassVisible }">
          <p class="glass-text">探索我的创作世界，每一帧都是用心之作</p>
        </div>

        <!-- Preview cards with scroll animation -->
        <div ref="previewGrid" class="preview-grid" :class="{ visible: cardsVisible }">
          <ProjectCard
            v-for="(project, i) in featuredProjects"
            :key="project.id"
            :title="project.title"
            :tags="project.tags"
            :index="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects.js'

const featuredProjects = projects.slice(0, 6)
const heroOpacity = ref(1)
const cardsVisible = ref(false)
const glassVisible = ref(false)
const previewGrid = ref(null)
const glassBox = ref(null)

function handleScroll() {
  const scrollY = window.scrollY
  const maxScroll = window.innerHeight * 0.5
  heroOpacity.value = Math.max(0, 1 - scrollY / maxScroll)
}

let observer = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // IntersectionObserver: glass box triggers early, cards trigger later
  const thresholdSteps = Array.from({ length: 21 }, (_, i) => i * 0.05)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio
      const target = entry.target

      if (target === glassBox.value) {
        glassVisible.value = ratio > 0.05
      }
      if (target === previewGrid.value) {
        // Cards only become visible when scrolled well into view (>= 20%)
        // and hide when near the top (< 15%)
        cardsVisible.value = ratio >= 0.2
      }
    })
  }, { threshold: thresholdSteps })

  if (glassBox.value) observer.observe(glassBox.value)
  if (previewGrid.value) observer.observe(previewGrid.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 33.33vh;
  min-height: 240px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: calc(var(--nav-height) + 40px) var(--content-padding) 0;
  display: flex;
  gap: clamp(20px, 3vw, 48px);
  align-items: flex-start;
}

/* Info card */
.info-card {
  width: clamp(240px, 18%, 320px);
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 16px var(--color-shadow);
  padding: clamp(28px, 3.5%, 44px) clamp(20px, 2.5%, 32px) clamp(24px, 3%, 36px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vh, 24px);
  min-height: clamp(440px, 60vh, 660px);
}

/* Avatar: left-aligned, in normal flow */
.avatar {
  width: clamp(60px, 8vw, 80px);
  height: clamp(60px, 8vw, 80px);
  border-radius: 0;
  border: 2px solid var(--color-border);
  background: var(--color-border);
  flex-shrink: 0;
  align-self: flex-start;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vh, 24px);
  flex: 1;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: clamp(11px, 1vw, 12px);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: clamp(13px, 1.2vw, 15px);
  color: var(--color-primary);
  font-weight: 500;
}

/* Contact button: muted, low saturation */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(219, 234, 254, 0.5);
  color: rgba(37, 99, 235, 0.65);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
  border: 1px solid rgba(191, 219, 254, 0.4);
  text-decoration: none;
  transition: background var(--transition-speed) ease,
              color var(--transition-speed) ease;
  letter-spacing: 0.06em;
  margin-top: auto;
}

.contact-btn:hover {
  background: rgba(37, 99, 235, 0.75);
  color: var(--color-white);
  text-decoration: none;
}

/* Right area */
.hero-right {
  flex: 1;
  min-width: 0;
}

/* Title */
.title-block {
  padding-top: clamp(3rem, 8vh, 8rem);
  margin-bottom: clamp(20px, 3vh, 40px);
}

.main-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--color-secondary);
  margin-top: 12px;
  font-weight: 400;
}

/* Glass box: fixed width ~4 card units, 3x height */
.glass-box {
  margin-top: clamp(40px, 8vh, 80px);
  margin-bottom: clamp(40px, 6vh, 64px);
  width: clamp(560px, 50vw, 720px);
  max-width: 100%;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(228, 228, 231, 0.6);
  border-radius: 0;
  padding: clamp(48px, 10vh, 96px) clamp(20px, 3vw, 40px);
  min-height: clamp(180px, 25vh, 320px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-box.visible {
  opacity: 1;
  transform: translateY(0);
}

.glass-text {
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 18px);
  color: var(--color-secondary);
  text-align: center;
  line-height: 1.8;
}

/* Preview grid: 1 column, large rectangular cards, scroll animation */
.preview-grid {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
  margin-top: clamp(48px, 8vh, 80px);
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Override ProjectCard to large rectangle: w=4 units, h=1.5 units → ratio 8:3 */
.preview-grid :deep(.project-card) {
  width: clamp(560px, 50vw, 720px);
  max-width: 100%;
  aspect-ratio: 8 / 3;
  flex-direction: row;
}

.preview-grid :deep(.card-thumbnail) {
  flex: 1;
}

.preview-grid :deep(.card-info) {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.preview-grid :deep(.card-title) {
  font-size: clamp(14px, 1.3vw, 18px);
}

.preview-grid :deep(.card-tags) {
  font-size: clamp(12px, 1vw, 14px);
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    padding: calc(var(--nav-height) + 24px) var(--content-padding) 0;
  }

  .info-card {
    width: 100%;
    min-height: auto;
    padding: 24px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .avatar {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    align-self: flex-start;
  }

  .info-list {
    flex: 1;
    min-width: 200px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px 24px;
  }

  .info-item {
    flex: 1 1 120px;
  }

  .contact-btn {
    width: 100%;
    margin-top: 0;
  }

  .hero-right {
    width: 100%;
  }

  .title-block {
    padding-top: 24px;
  }

  .preview-grid {
    transform: translateY(40px);
  }
}
</style>
