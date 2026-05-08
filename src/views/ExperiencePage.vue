<template>
  <div class="experience-page page-content">
    <div class="container">
      <CategoryTabs
        v-model="activeCategory"
        :categories="experienceCategories"
      />
      <div class="experience-grid">
        <ProjectCard
          v-for="(exp, i) in filteredExperiences"
          :key="exp.id"
          :title="exp.title"
          :tags="exp.tags"
          :index="i"
        />
      </div>
      <p class="empty-msg" v-if="filteredExperiences.length === 0">
        暂无该分类的能力展示
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { experiences, experienceCategories } from '@/data/experiences.js'

const activeCategory = ref(experienceCategories[0])

const filteredExperiences = computed(() => {
  return experiences.filter(e => e.category === activeCategory.value)
})
</script>

<style scoped>
.experience-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding-bottom: 80px;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty-msg {
  text-align: center;
  color: var(--color-muted);
  padding: 80px 0;
  font-size: 16px;
}

@media (max-width: 1024px) {
  .experience-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .experience-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .experience-grid {
    grid-template-columns: 1fr;
  }
}
</style>
