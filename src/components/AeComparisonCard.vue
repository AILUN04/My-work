<template>
  <div class="ae-card" ref="cardEl">
    <div class="ae-video-wrap watermark" ref="videoWrap">
      <!-- 左边：特效合成 -->
      <video
        ref="afterVideoEl"
        :src="afterVideo"
        class="ae-video ae-video-after"
        :style="{ clipPath: `inset(0 ${100 - dividerPct}% 0 0)` }"
        muted
        loop
        playsinline
        preload="auto"
        @loadedmetadata="onMetaLoaded"
        @error="onMetaLoaded"
      ></video>
      <!-- 右边：原片 -->
      <video
        ref="beforeVideoEl"
        :src="beforeVideo"
        class="ae-video ae-video-before"
        :style="{ clipPath: `inset(0 0 0 ${dividerPct}%)` }"
        muted
        loop
        playsinline
        preload="auto"
        @loadedmetadata="onMetaLoaded"
        @error="onMetaLoaded"
      ></video>

      <!-- 占位遮罩（视频元数据未就绪时显示） -->
      <div v-if="!videosReady" class="ae-loading">
        <span class="ae-loading-dot"></span>
      </div>

      <!-- 可拖动竖向分割线 -->
      <div
        v-if="videosReady"
        class="ae-divider"
        :style="{ left: `${dividerPct}%` }"
        @mousedown.prevent="dragStart"
        @touchstart.prevent="dragStart"
      >
        <div class="ae-divider-handle">
          <svg width="10" height="24" viewBox="0 0 10 24" fill="none">
            <rect x="1" y="2" width="3" height="8" rx="1" fill="white" opacity="0.9" />
            <rect x="1" y="14" width="3" height="8" rx="1" fill="white" opacity="0.9" />
            <rect x="6" y="2" width="3" height="8" rx="1" fill="white" opacity="0.9" />
            <rect x="6" y="14" width="3" height="8" rx="1" fill="white" opacity="0.9" />
          </svg>
        </div>
      </div>

      <!-- 左右标签 -->
      <span v-if="videosReady" class="ae-label ae-label-after">{{ afterLabel }}</span>
      <span v-if="videosReady" class="ae-label ae-label-before">{{ beforeLabel }}</span>
    </div>

    <div v-if="!hideInfo" class="ae-info">
      <h3 class="ae-title">{{ title }}</h3>
      <p class="ae-tags">{{ tags.join(' / ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  afterVideo: { type: String, required: true },
  beforeVideo: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  afterLabel: { type: String, default: '特效合成' },
  beforeLabel: { type: String, default: '原片' },
  hideInfo: { type: Boolean, default: false },
})

defineEmits(['select'])

const cardEl = ref(null)
const videoWrap = ref(null)
const afterVideoEl = ref(null)
const beforeVideoEl = ref(null)

const dividerPct = ref(50)
const videosReady = ref(false)
const metaLoadedCount = ref(0)

function onMetaLoaded() {
  metaLoadedCount.value++
  if (metaLoadedCount.value >= 2) {
    videosReady.value = true
    nextTick(() => playBoth())
  }
}

// ============================
// 同步播放控制
// ============================
function playBoth() {
  const a = afterVideoEl.value
  const b = beforeVideoEl.value
  if (!a || !b) return
  a.play().catch(() => {})
  b.play().catch(() => {})
}

function pauseBoth() {
  const a = afterVideoEl.value
  const b = beforeVideoEl.value
  if (a) a.pause()
  if (b) b.pause()
}

// ============================
// IntersectionObserver 自动播放
// ============================
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (videosReady.value) playBoth()
      } else {
        pauseBoth()
      }
    })
  }, { threshold: 0.3 })

  if (cardEl.value) observer.observe(cardEl.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// ============================
// 鼠标 / 触屏拖动分割线
// ============================
let dragging = false

function dragStart(e) {
  dragging = true
  document.addEventListener('mousemove', dragMove)
  document.addEventListener('mouseup', dragEnd)
  document.addEventListener('touchmove', dragMove, { passive: false })
  document.addEventListener('touchend', dragEnd)
  e.preventDefault()
}

function dragMove(e) {
  if (!dragging || !videoWrap.value) return
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const rect = videoWrap.value.getBoundingClientRect()
  const pct = ((clientX - rect.left) / rect.width) * 100
  dividerPct.value = Math.max(5, Math.min(95, pct))
}

function dragEnd() {
  dragging = false
  document.removeEventListener('mousemove', dragMove)
  document.removeEventListener('mouseup', dragEnd)
  document.removeEventListener('touchmove', dragMove)
  document.removeEventListener('touchend', dragEnd)
}
</script>

<style scoped>
.ae-card {
  display: flex;
  flex-direction: column;
  cursor: default;
}

.ae-video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.ae-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* ============================
   加载占位
   ============================ */
.ae-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.ae-loading-dot {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ae-spin 0.8s linear infinite;
}

@keyframes ae-spin {
  to { transform: rotate(360deg); }
}

/* ============================
   分割线
   ============================ */
.ae-divider {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.ae-divider::before {
  content: '';
  position: absolute;
  top: 0;
  left: -1px;
  width: 2px;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.ae-divider-handle {
  position: absolute;
  top: 50%;
  left: -16px;
  transform: translateY(-50%);
  width: 32px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  cursor: col-resize;
  pointer-events: auto;
}

/* ============================
   左 / 右标签
   ============================ */
.ae-label {
  position: absolute;
  top: 10px;
  z-index: 2;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 3px 8px;
  border-radius: 3px;
  letter-spacing: 0.5px;
  pointer-events: none;
}

.ae-label-after {
  left: 10px;
}

.ae-label-before {
  right: 10px;
}

/* ============================
   底部信息
   ============================ */
.ae-info {
  padding: 14px 0 4px;
}

.ae-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}

.ae-tags {
  font-size: 12px;
  color: var(--color-muted);
  line-height: 1.4;
}
</style>
