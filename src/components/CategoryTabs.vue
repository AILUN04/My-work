<template>
  <div class="category-tabs">
    <button
      v-for="cat in categories"
      :key="cat"
      class="tab-btn"
      :class="{ active: modelValue === cat }"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.category-tabs {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 32px;
}

.tab-btn {
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-secondary);
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-speed) ease,
              border-color var(--transition-speed) ease;
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

@media (max-width: 768px) {
  .category-tabs {
    gap: 20px;
    overflow-x: auto;
  }

  .tab-btn {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
