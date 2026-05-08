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
      </div>
    </div>

    <section class="preview-section container">
      <div class="preview-grid">
        <ProjectCard
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :title="project.title"
          :tags="project.tags"
          :index="i"
        />
      </div>
    </section>
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
  padding: calc(var(--nav-height) + 40px) 24px 0;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.info-card {
  width: 33.33%;
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 16px var(--color-shadow);
  padding: 32px;
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 0;
  border: 2px solid var(--color-border);
  background: var(--color-border);
}

.info-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 15px;
  color: var(--color-primary);
  font-weight: 500;
}

.hero-right {
  flex: 1;
  padding-top: 20px;
}

.title-block {
  margin-bottom: 40px;
}

.main-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-secondary);
  margin-top: 12px;
  font-weight: 400;
}

.preview-section {
  position: relative;
  z-index: 1;
  padding: 60px 24px 80px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .info-card {
    width: 100%;
  }

  .hero-right {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
