import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsPage.vue') },
  { path: '/experience', name: 'experience', component: () => import('@/views/ExperiencePage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
]

const router = createRouter({
  history: createWebHistory('/My-work/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
