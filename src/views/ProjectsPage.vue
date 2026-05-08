<template>
  <div class="projects-page page-content">
    <div class="container">
      <CategoryTabs
        v-model="activeCategory"
        :categories="projectCategories"
      />
      <div class="projects-grid">
        <ProjectCard
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :title="project.title"
          :tags="project.tags"
          :index="i"
        />
      </div>
      <p class="empty-msg" v-if="filteredProjects.length === 0">
        暂无该分类的项目
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects, projectCategories } from '@/data/projects.js'

const activeCategory = ref(projectCategories[0])

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部项目') return projects
  return projects.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding-bottom: 80px;
}

.projects-grid {
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
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
