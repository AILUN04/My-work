<template>
  <NavBar />
  <PageTransition />
  <CursorCrosshair v-if="!isMobile" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import PageTransition from '@/components/PageTransition.vue'
import CursorCrosshair from '@/components/CursorCrosshair.vue'

// 移动端不渲染光标拖尾（无鼠标，白白占用 GPU 合成层）
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
})
</script>
