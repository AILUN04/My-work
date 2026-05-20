<template>
  <Teleport to="body">
    <Transition name="lightbox" @after-leave="$emit('closed')">
      <div v-if="visible" class="lightbox-backdrop" @click.self="close" @keydown.esc="close">
        <button class="lightbox-close" @click="close" aria-label="关闭">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="lightbox-content">
          <div class="lightbox-media-wrap watermark">
            <video
              v-if="item.videoUrl"
              :src="item.videoUrl"
              class="lightbox-media"
              controls
              autoplay
              playsinline
            ></video>
            <img
              v-else
              :src="item.thumbnail"
              :alt="item.title"
              class="lightbox-media"
            />
          </div>
          <div class="lightbox-caption">
            <h3 class="lightbox-title">{{ item.title }}</h3>
            <p class="lightbox-tags">{{ (item.tags || []).join(' / ') }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  item: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['close', 'closed'])

function close() {
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

watch(() => props.visible, (v) => {
  if (v) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.lightbox-media-wrap {
  display: inline-block;
  line-height: 0;
}

.lightbox-media {
  max-width: 90vw;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}

video.lightbox-media {
  min-width: 320px;
  min-height: 240px;
  background: #000;
}

.lightbox-caption {
  text-align: center;
  color: #fff;
}

.lightbox-title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.lightbox-tags {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

/* ============================
   入场 / 出场动画
   ============================ */
.lightbox-enter-active {
  transition: opacity 0.35s ease;
}
.lightbox-enter-active .lightbox-content {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-leave-active .lightbox-content {
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.lightbox-enter-from {
  opacity: 0;
}
.lightbox-enter-from .lightbox-content {
  transform: scale(0.88);
  opacity: 0;
}

.lightbox-leave-to {
  opacity: 0;
}
.lightbox-leave-to .lightbox-content {
  transform: scale(0.92);
  opacity: 0;
}
</style>
