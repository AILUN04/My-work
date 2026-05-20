<template>
  <div class="contact-page">
    <div class="contact-bg" :style="bgStyle"></div>

    <div class="contact-content">
      <h1 class="name-title">丁荣鑫</h1>
      <div class="contact-info">
        <div class="contact-item">
          <span class="contact-label">QQ</span>
          <span class="contact-value">2130002774</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">微信</span>
          <span class="contact-value">drx2130002774</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">电话</span>
          <span class="contact-value">18487127867</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">邮箱</span>
          <span class="contact-value">18288906524@163.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">所在城市</span>
          <span class="contact-value">中国·昆明</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">毕业院校</span>
          <span class="contact-value">云南国土资源职业学院</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrollOffset = ref(0)

const bgStyle = computed(() => ({
  transform: `translateY(${scrollOffset.value}px)`,
}))

let scrollTicking = false
function handleScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrollOffset.value = window.scrollY * 0.4
    scrollTicking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
}

.contact-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000 url('/images/1.jpg') center/cover no-repeat;
  z-index: 0;
  will-change: transform;
  transform: translateZ(0);
}

.contact-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: calc(var(--nav-height) + 60px) 24px 80px;
  max-width: 600px;
  width: 100%;
}

.name-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.08em;
  margin-bottom: 60px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contact-value {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@media (max-width: 768px) {
  .contact-content {
    padding: calc(var(--nav-height) + 40px) 24px 60px;
  }

  .contact-info {
    padding: 32px 24px;
  }
}
</style>
