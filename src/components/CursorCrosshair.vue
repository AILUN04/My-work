<template>
  <canvas ref="canvas" class="trail-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const points = []
const MAX_POINTS = 11
const LIFESPAN = 300 // ms

let ctx = null
let rafId = null
let mouseX = -100
let mouseY = -100
let running = false

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  points.push({ x: mouseX, y: mouseY, born: performance.now() })
  if (points.length > MAX_POINTS) points.shift()
  if (!running) {
    running = true
    rafId = requestAnimationFrame(draw)
  }
}

function draw(now) {
  if (!ctx || !canvas.value) { running = false; return }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const alive = []
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    const age = now - p.born
    if (age > LIFESPAN) continue
    alive.push(p)

    const progress = age / LIFESPAN
    const alpha = 0.35 * (1 - progress)
    const radius = 3.5 * (1 - progress * 0.6)

    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(170, 170, 175, ${alpha})`
    ctx.fill()
  }

  if (alive.length > 1) {
    ctx.beginPath()
    ctx.moveTo(alive[0].x, alive[0].y)
    for (let i = 1; i < alive.length; i++) {
      ctx.lineTo(alive[i].x, alive[i].y)
    }
    ctx.strokeStyle = 'rgba(170, 170, 175, 0.1)'
    ctx.lineWidth = 1.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  if (alive.length > 0) {
    rafId = requestAnimationFrame(draw)
  } else {
    running = false
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
  running = false
})
</script>

<style scoped>
.trail-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>
