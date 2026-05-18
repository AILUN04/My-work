<template>
  <div class="project-card" @click="$emit('select', { title, tags, thumbnail, videoUrl })">
    <div class="card-thumbnail" :style="thumbnailStyle">
      <div v-if="videoUrl && !thumbnailDataUrl && !thumbnail" class="frame-loading">
        <span class="loading-dot"></span>
      </div>
      <div v-if="videoUrl" class="video-overlay">
        <span class="play-icon">&#9654;</span>
      </div>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-tags">{{ tags.join(' / ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  thumbnail: { type: String, default: null },
  videoUrl: { type: String, default: null },
  index: { type: Number, default: 0 },
})

defineEmits(['select'])

const placeholderColors = [
  '#E4E4E7', '#D4D4D8', '#CBD5E1', '#D1D5DB',
  '#C8C8CC', '#D9D9DD', '#CCCCD0', '#DBDBDF',
]

const thumbnailDataUrl = ref(null)

const thumbnailStyle = computed(() => {
  if (thumbnailDataUrl.value) {
    return { backgroundImage: `url(${thumbnailDataUrl.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  if (props.thumbnail) {
    return { backgroundImage: `url(${props.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  const color = placeholderColors[props.index % placeholderColors.length]
  return { backgroundColor: color }
})

onMounted(async () => {
  if (!props.videoUrl || props.thumbnail) return
  try {
    const video = document.createElement('video')
    video.src = props.videoUrl
    video.crossOrigin = 'anonymous'
    video.preload = 'metadata'
    video.muted = true

    await new Promise((resolve, reject) => {
      video.addEventListener('loadedmetadata', resolve, { once: true })
      video.addEventListener('error', reject, { once: true })
      setTimeout(() => reject(new Error('timeout')), 8000)
    })

    const randomTime = Math.random() * video.duration
    video.currentTime = randomTime

    await new Promise((resolve, reject) => {
      video.addEventListener('seeked', resolve, { once: true })
      video.addEventListener('error', reject, { once: true })
      setTimeout(() => reject(new Error('timeout')), 5000)
    })

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 360
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    thumbnailDataUrl.value = canvas.toDataURL('image/jpeg', 0.8)

    video.pause()
    video.remove()
  } catch {
    // 抽帧失败时保持占位色，不影响页面
  }
})
</script>

<style scoped>
.project-card {
  aspect-ratio: 1 / 1;
  border-radius: var(--card-radius);
  background: var(--color-white);
  box-shadow: 0 2px 8px var(--color-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
}

.project-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px var(--color-shadow-hover);
  outline: 2px solid var(--color-white);
  outline-offset: 0;
}

.card-thumbnail {
  flex: 1;
  background-color: var(--color-border);
  position: relative;
}

.frame-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
}

.loading-dot {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .video-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 36px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.card-info {
  padding: 16px;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}

.card-tags {
  font-size: 12px;
  color: var(--color-muted);
  line-height: 1.4;
}
</style>
