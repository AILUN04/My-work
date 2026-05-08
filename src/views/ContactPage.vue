<template>
  <div class="contact-page">
    <div class="contact-bg" :style="bgStyle"></div>

    <div class="contact-content">
      <h1 class="name-title">丁荣鑫</h1>
      <div class="contact-info">
        <div class="contact-item">
          <span class="contact-label">QQ</span>
          <span class="contact-value">1234567890</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">电话</span>
          <span class="contact-value">138-xxxx-xxxx</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">邮箱</span>
          <span class="contact-value">dingrongxin@example.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">所在城市</span>
          <span class="contact-value">中国·XX</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">毕业院校</span>
          <span class="contact-value">XX大学</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollOffset = ref(0)

function handleScroll() {
  scrollOffset.value = window.scrollY * 0.4
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
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
}

.contact-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #334155 70%, #475569 100%);
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  z-index: 0;
  will-change: transform;
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
  background: rgba(255, 255, 255, 0.08);
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
