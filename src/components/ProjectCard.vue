<template>
  <div class="project-card">
    <div class="card-thumbnail" :style="thumbnailStyle"></div>
    <div class="card-info">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-tags">{{ tags.join(' / ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  thumbnail: { type: String, default: null },
  index: { type: Number, default: 0 },
})

const placeholderColors = [
  '#E4E4E7', '#D4D4D8', '#CBD5E1', '#D1D5DB',
  '#C8C8CC', '#D9D9DD', '#CCCCD0', '#DBDBDF',
]

const thumbnailStyle = computed(() => {
  if (props.thumbnail) {
    return { backgroundImage: `url(${props.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  const color = placeholderColors[props.index % placeholderColors.length]
  return { backgroundColor: color }
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
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-shadow-hover);
}

.card-thumbnail {
  flex: 1;
  background-color: var(--color-border);
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
