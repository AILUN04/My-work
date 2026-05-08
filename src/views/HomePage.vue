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
      </aside>

      <div class="hero-right">
        <div class="title-block">
          <h1 class="main-title">Welcome to Ding Rongxin's website</h1>
          <p class="subtitle">MENG MU is my online name</p>
        </div>

        <div class="preview-grid">
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

const featuredProjects = projects.slice(0, 8)
const heroOpacity = ref(1)

function handleScroll() {
  const scrollY = window.scrollY
  const maxScroll = window.innerHeight * 0.5
  heroOpacity.value = Math.max(0, 1 - scrollY / maxScroll)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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
  max-width: var(--max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + 40px) 2vw 0;
  display: flex;
  gap: clamp(20px, 3vw, 48px);
  align-items: flex-start;
}

/* Info card: responsive width + height */
.info-card {
  width: clamp(240px, 18%, 320px);
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 16px var(--color-shadow);
  padding: clamp(32px, 4%, 48px) clamp(20px, 2.5%, 32px) clamp(60px, 10vh, 100px);
  position: relative;
  min-height: clamp(400px, 55vh, 600px);
}

.avatar {
  width: clamp(60px, 8vw, 80px);
  height: clamp(60px, 8vw, 80px);
  position: absolute;
  top: clamp(20px, 3%, 24px);
  right: clamp(16px, 2.5%, 24px);
  border-radius: 0;
  border: 2px solid var(--color-border);
  background: var(--color-border);
}

.info-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
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

/* Right area: fills remaining space */
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

/* Preview grid: fluid auto-fill, cards adapt to space */
.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 14vw, 200px), 1fr));
  gap: clamp(10px, 1.5vw, 20px);
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    padding: calc(var(--nav-height) + 24px) 3vw 0;
  }

  .info-card {
    width: 100%;
    min-height: auto;
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .avatar {
    position: static;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
  }

  .info-list {
    flex: 1;
    min-width: 200px;
    margin-top: 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px 24px;
  }

  .info-item {
    flex: 1 1 120px;
  }

  .hero-right {
    width: 100%;
  }

  .title-block {
    padding-top: 24px;
  }
}
</style>
