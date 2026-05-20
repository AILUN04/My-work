<template>
  <div class="home-page">
    <div class="hero-bg" :style="{ opacity: heroOpacity }"></div>

    <div class="hero-content">
      <aside class="info-card" :style="infoCardStyle">
        <img class="avatar" src="/images/avatar-placeholder.jpg" alt="头像" />
        <p class="avatar-name">丁荣鑫</p>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">QQ</span>
            <span class="info-value">2130002774</span>
          </div>
          <div class="info-item">
            <span class="info-label">微信</span>
            <span class="info-value">drx2130002774</span>
          </div>
          <div class="info-item">
            <span class="info-label">电话</span>
            <span class="info-value">18487127867</span>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <span class="info-value">18288906524@163.com</span>
          </div>
          <div class="info-item">
            <span class="info-label">城市</span>
            <span class="info-value">中国·昆明</span>
          </div>
          <div class="info-item">
            <span class="info-label">院校</span>
            <span class="info-value">云南国土资源职业学院</span>
          </div>
        </div>
        <router-link to="/contact" class="contact-btn">联系我</router-link>
      </aside>

      <div class="hero-right">
        <div class="title-block">
          <h1 class="main-title">Welcome to Ding Rongxin's website</h1>
          <p class="subtitle">MENG MU is my online name</p>
          <p class="subtitle-trans">MENG MU 作为我的网名</p>
        </div>

        <!-- Glass text box -->
        <div ref="glassBox" class="glass-box" :class="{ visible: glassVisible }">
          <p class="glass-text">欢迎来到我的领域，希望您能从这里充分了解我。</p>
        </div>

        <!-- Preview cards: each card individually animated -->
        <div ref="previewGrid" class="preview-grid">
          <div
            v-for="(project, i) in featuredProjects"
            :key="project.id"
            :ref="(el) => { if (el) cardRefs[i] = el }"
            class="card-wrapper"
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import AeComparisonCard from '@/components/AeComparisonCard.vue'
import { projects } from '@/data/projects.js'

const featuredProjects = computed(() => [
  projects[0], // So What
  projects[2], // 凤龙山
  projects[5], // 特效合成展示 04（VFX 卡片放第3列）
  projects[1], // 昙华寺
  projects[3], // 骑行
  projects[4], // 100%做自己（末尾）
])
const heroOpacity = ref(1)
const cardBgAlpha = ref(1)

function lerpColor(hex1, hex2, t) {
  const r1 = parseInt(hex1.slice(1, 3), 16)
  const g1 = parseInt(hex1.slice(3, 5), 16)
  const b1 = parseInt(hex1.slice(5, 7), 16)
  const r2 = parseInt(hex2.slice(1, 3), 16)
  const g2 = parseInt(hex2.slice(3, 5), 16)
  const b2 = parseInt(hex2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

const infoCardStyle = computed(() => {
  const v = 255 * cardBgAlpha.value
  const r = Math.round(v)
  const t = Math.min(1, (1 - cardBgAlpha.value) / 0.2)
  return {
    background: `rgba(${r}, ${r}, ${r}, 0.7)`,
    '--card-text-color': lerpColor('#18181B', '#FFFFFF', t),
    '--card-muted-color': lerpColor('#71717A', '#CCCCCC', t),
    '--card-accent-color': lerpColor('#2563EB', '#93BBFD', t),
  }
})
const glassVisible = ref(false)
const previewGrid = ref(null)
const glassBox = ref(null)
const cardRefs = reactive([])

// Per-card visibility (0 = hidden, 1 = fully visible)
const cardVisibility = reactive(Array(6).fill(0))
// Per-card float offset: only for cards below center (向上浮)
const cardOffsets = reactive(Array(6).fill(0))

function getCardStyle(i) {
  const v = cardVisibility[i]
  const offset = cardOffsets[i] ?? 0
  return {
    opacity: 0.3 + v * 0.7,
    transform: offset > 0 ? `translateY(${offset}px)` : 'none',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  }
}

let scrollTicking = false
function handleScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    const scrollY = window.scrollY
    const maxScroll = window.innerHeight * 0.5
    heroOpacity.value = Math.max(0, 1 - scrollY / maxScroll)

    const docHeight = document.documentElement.scrollHeight
    const vh = window.innerHeight
    const maxPossibleScroll = Math.max(1, docHeight - vh)
    const progress = Math.min(1, scrollY / maxPossibleScroll)
    cardBgAlpha.value = 1 - progress * 0.7

    if (previewGrid.value) updateCardVisibility()
    scrollTicking = false
  })
}

function updateCardVisibility() {
  const vh = window.innerHeight
  const centerY = vh / 2
  // 从中央向上下各延伸 45% 视口高度为渐显区间
  const fadeZone = vh * 0.45

  // 页面接近底部时，渐隐自动消解
  const docHeight = document.documentElement.scrollHeight
  const scrollY = window.scrollY
  const maxScroll = Math.max(0, docHeight - vh)
  const bottomBuffer = vh * 0.3
  const bottomProximity = maxScroll > 0
    ? Math.max(0, Math.min(1, (scrollY - (maxScroll - bottomBuffer)) / bottomBuffer))
    : 1

  for (let i = 0; i < 6; i++) {
    const el = cardRefs[i]
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const cardCenter = rect.top + rect.height / 2
    const distFromCenter = Math.abs(cardCenter - centerY)
    const raw = 1 - Math.min(1, distFromCenter / fadeZone)
    const sv = Math.max(0, raw)
    cardVisibility[i] = sv + (1 - sv) * bottomProximity

    // 仅下方卡片有上浮位移，越过中央后位移归零
    if (cardCenter > centerY) {
      const distBelow = cardCenter - centerY
      cardOffsets[i] = Math.min(80, (distBelow / fadeZone) * 80)
    } else {
      cardOffsets[i] = 0
    }
  }
}

let observer = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial call
  handleScroll()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === glassBox.value) {
        glassVisible.value = entry.intersectionRatio > 0.05
      }
    })
  }, { threshold: [0, 0.1, 0.2] })

  if (glassBox.value) observer.observe(glassBox.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.home-page {
  min-height: 200vh;
  position: relative;
  background-color: #101d25;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 105vh;
  min-height: 650px;
  background: url('/images/hero-bg.jpg') center/cover no-repeat;
  mask-image: linear-gradient(to bottom, black 69%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 69%, transparent 100%);
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

/* Info card: sticky, doesn't scroll away */
.info-card {
  position: sticky;
  top: calc(var(--nav-height) + 24px);
  width: clamp(240px, 18%, 320px);
  flex-shrink: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 16px var(--color-shadow);
  padding: clamp(28px, 3.5%, 44px) clamp(20px, 2.5%, 32px) clamp(24px, 3%, 36px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vh, 24px);
  min-height: clamp(440px, 60vh, 660px);
  will-change: transform;
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

.avatar-name {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 600;
  color: var(--card-text-color, var(--color-primary));
  margin: 0;
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
  color: var(--card-muted-color, var(--color-muted));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: clamp(13px, 1.2vw, 15px);
  color: var(--card-text-color, var(--color-primary));
  font-weight: 500;
}

/* Contact button */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(219, 234, 254, 0.5);
  color: var(--card-accent-color, rgba(37, 99, 235, 0.65));
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
  padding-left: clamp(16px, 3vw, 48px);
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
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.subtitle {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.75);
  margin-top: 0;
  margin-bottom: 4px;
  font-weight: 400;
}

.subtitle-trans {
  font-size: clamp(0.7rem, 1.4vw, 0.98rem);
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  font-weight: 400;
}

/* Glass box */
.glass-box {
  margin-top: clamp(40px, 8vh, 80px);
  margin-bottom: clamp(40px, 6vh, 64px);
  width: clamp(840px, 75vw, 1080px);
  max-width: 100%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  padding: clamp(48px, 10vh, 96px) clamp(20px, 3vw, 40px);
  min-height: clamp(180px, 25vh, 320px);
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
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
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  line-height: 1.8;
}

/* Preview grid: 1 column, cards stagger-animated */
.preview-grid {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
  margin-top: clamp(48px, 8vh, 80px);
  padding-bottom: 40vh;
}

.card-wrapper {
  width: clamp(840px, 75vw, 1080px);
  max-width: 100%;
  contain: layout style paint;
}

/* Override ProjectCard: image fills card, text at bottom-left */
.card-wrapper :deep(.project-card) {
  width: 100%;
  aspect-ratio: 8 / 3;
  position: relative;
}

.card-wrapper :deep(.card-thumbnail) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-wrapper :deep(.card-info) {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 20px;
  color: var(--color-white);
  z-index: 1;
}

.card-wrapper :deep(.card-title) {
  font-size: clamp(14px, 1.3vw, 18px);
  color: #fff;
}

.card-wrapper :deep(.card-tags) {
  font-size: clamp(12px, 1vw, 14px);
  color: rgba(255,255,255,0.8);
}

/* 隐藏播放键 */
.card-wrapper :deep(.video-overlay) {
  display: none;
}

/* 主页预览网格中的对比卡片 */
.card-wrapper :deep(.ae-card) {
  width: 100%;
  aspect-ratio: 8 / 3;
  position: relative;
  overflow: hidden;
}

.card-wrapper :deep(.ae-video-wrap) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
}

.card-wrapper :deep(.ae-info) {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 20px;
  z-index: 2;
}

.card-wrapper :deep(.ae-title) {
  font-size: clamp(14px, 1.3vw, 18px);
  color: #fff;
}

.card-wrapper :deep(.ae-tags) {
  font-size: clamp(12px, 1vw, 14px);
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    padding: calc(var(--nav-height) + 24px) var(--content-padding) 0;
  }

  .info-card {
    position: static;
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
}
</style>
