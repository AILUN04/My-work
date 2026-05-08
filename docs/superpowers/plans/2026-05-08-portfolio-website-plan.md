# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page personal portfolio SPA (Home, Projects, Experience, Contact) with Vue 3 + Vite + Vue Router + Pure CSS.

**Architecture:** Single-page app with fixed navbar, page transitions via Vue Router `<Transition>`, shared card components, category tab filtering. All styling uses CSS variables for consistency. Data is static JS arrays.

**Tech Stack:** Vue 3 (Composition API, `<script setup>`), Vite, Vue Router 4, Pure CSS (no UI framework)

---

### Task 1: Scaffold Vue 3 + Vite Project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "ding-rongxin-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>丁荣鑫 - 个人作品集</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create src/main.js**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles/variables.css'
import './assets/styles/global.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 5: Install dependencies**

Run: `cd "d:/vs code/work2" && npm install`

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.js
git commit -m "chore: scaffold Vue 3 + Vite project"
```

---

### Task 2: CSS Variables and Global Styles

**Files:**
- Create: `src/assets/styles/variables.css`
- Create: `src/assets/styles/global.css`

- [ ] **Step 1: Create src/assets/styles/variables.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --color-primary: #18181B;
  --color-secondary: #3F3F46;
  --color-accent: #2563EB;
  --color-bg: #FAFAFA;
  --color-text: #09090B;
  --color-border: #E4E4E7;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-shadow-hover: rgba(0, 0, 0, 0.15);
  --color-white: #FFFFFF;
  --color-muted: #71717A;

  --font-heading: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  --font-body: 'Archivo', 'Noto Sans SC', sans-serif;

  --nav-height: 64px;
  --card-radius: 0px;
  --transition-speed: 300ms;

  --max-width: 1200px;
}
```

- [ ] **Step 2: Create src/assets/styles/global.css**

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* Navbar offset for all pages */
.page-content {
  padding-top: var(--nav-height);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/
git commit -m "style: add CSS variables and global styles"
```

---

### Task 3: Vue Router with Page Transitions

**Files:**
- Create: `src/router/index.js`
- Create: `src/components/PageTransition.vue`
- Create: `src/views/HomePage.vue` (placeholder)
- Create: `src/views/ProjectsPage.vue` (placeholder)
- Create: `src/views/ExperiencePage.vue` (placeholder)
- Create: `src/views/ContactPage.vue` (placeholder)

- [ ] **Step 1: Create placeholder view files**

Create `src/views/HomePage.vue`:
```vue
<template>
  <div>Home</div>
</template>
```

Create `src/views/ProjectsPage.vue`:
```vue
<template>
  <div>Projects</div>
</template>
```

Create `src/views/ExperiencePage.vue`:
```vue
<template>
  <div>Experience</div>
</template>
```

Create `src/views/ContactPage.vue`:
```vue
<template>
  <div>Contact</div>
</template>
```

- [ ] **Step 2: Create src/router/index.js**

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsPage.vue') },
  { path: '/experience', name: 'experience', component: () => import('@/views/ExperiencePage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
```

- [ ] **Step 3: Create src/components/PageTransition.vue**

```vue
<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>
.page-enter-active {
  transition: opacity var(--transition-speed) ease-out,
              transform var(--transition-speed) ease-out;
}

.page-leave-active {
  transition: opacity var(--transition-speed) ease-in,
              transform var(--transition-speed) ease-in;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
```

- [ ] **Step 4: Verify dev server starts**

Run: `npm run dev`  
Expected: Vite dev server starts, navigate to http://localhost:5173 shows "Home"

- [ ] **Step 5: Commit**

```bash
git add src/router/ src/views/ src/components/PageTransition.vue
git commit -m "feat: set up Vue Router with page transitions"
```

---

### Task 4: Data Files (Placeholder Content)

**Files:**
- Create: `src/data/projects.js`
- Create: `src/data/experiences.js`

- [ ] **Step 1: Create src/data/projects.js**

```js
export const projectCategories = ['全部项目', '剪辑作品', '特效作品', '摄影作品', '其他']

export const projects = [
  { id: 1, title: '城市夜景剪辑', category: '剪辑作品', tags: ['PR剪辑', '4K', '原创'], thumbnail: null },
  { id: 2, title: '粒子特效展示', category: '特效作品', tags: ['AE', '粒子特效', '合成'], thumbnail: null },
  { id: 3, title: '街头摄影集', category: '摄影作品', tags: ['街拍', '人文', 'Canon'], thumbnail: null },
  { id: 4, title: '婚礼微电影', category: '剪辑作品', tags: ['达芬奇', '调色', '婚礼'], thumbnail: null },
  { id: 5, title: '绿幕合成案例', category: '特效作品', tags: ['AE', '绿幕', '合成'], thumbnail: null },
  { id: 6, title: '风光旅行片', category: '剪辑作品', tags: ['PR剪辑', '旅行', '原创'], thumbnail: null },
  { id: 7, title: '产品广告片', category: '其他', tags: ['商业', '广告', '拍摄'], thumbnail: null },
  { id: 8, title: '自然光摄影', category: '摄影作品', tags: ['自然光', '风光', 'Sony'], thumbnail: null },
  { id: 9, title: 'MV剪辑作品', category: '剪辑作品', tags: ['MV', 'PR剪辑', '节奏'], thumbnail: null },
  { id: 10, title: '三维合成展示', category: '特效作品', tags: ['C4D', '3D', '合成'], thumbnail: null },
  { id: 11, title: '人像写真集', category: '摄影作品', tags: ['人像', '写真', '后期'], thumbnail: null },
  { id: 12, title: '短视频包装', category: '其他', tags: ['包装', '字幕', '特效'], thumbnail: null },
]
```

- [ ] **Step 2: Create src/data/experiences.js**

```js
export const experienceCategories = ['图片·平面设计', '视频调色·剪辑', '特效合成']

export const experiences = [
  { id: 1, title: '海报设计', category: '图片·平面设计', tags: ['PS', '平面设计'], thumbnail: null },
  { id: 2, title: 'LOGO设计', category: '图片·平面设计', tags: ['AI', '品牌', 'LOGO'], thumbnail: null },
  { id: 3, title: 'UI界面设计', category: '图片·平面设计', tags: ['Figma', 'UI', '原型'], thumbnail: null },
  { id: 4, title: '视频调色案例', category: '视频调色·剪辑', tags: ['达芬奇', '调色'], thumbnail: null },
  { id: 5, title: '广告片剪辑', category: '视频调色·剪辑', tags: ['PR', '剪辑', '广告'], thumbnail: null },
  { id: 6, title: '宣传片制作', category: '视频调色·剪辑', tags: ['PR', '宣传片', '调色'], thumbnail: null },
  { id: 7, title: '粒子特效展示', category: '特效合成', tags: ['AE', '粒子特效', '合成'], thumbnail: null },
  { id: 8, title: '绿幕合成案例', category: '特效合成', tags: ['AE', '绿幕', '合成'], thumbnail: null },
  { id: 9, title: '三维合成作品', category: '特效合成', tags: ['C4D', '3D', '合成'], thumbnail: null },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/
git commit -m "feat: add placeholder project and experience data"
```

---

### Task 5: NavBar Component

**Files:**
- Create: `src/components/NavBar.vue`

- [ ] **Step 1: Create src/components/NavBar.vue**

```vue
<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-link"
        :class="{ active: currentPath === item.path }"
      >
        {{ item.label }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '主页' },
  { path: '/projects', label: '项目' },
  { path: '/experience', label: '经验能力' },
  { path: '/contact', label: '联系我' },
]

const currentPath = computed(() => route.path)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
  display: flex;
  align-items: center;
}

.navbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
}

.nav-link {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-secondary);
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-speed) ease,
              border-color var(--transition-speed) ease;
}

.nav-link:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.nav-link.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

@media (max-width: 768px) {
  .navbar-inner {
    gap: 20px;
    overflow-x: auto;
  }

  .nav-link {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat: create NavBar component"
```

---

### Task 6: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.vue`

- [ ] **Step 1: Create src/components/ProjectCard.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.vue
git commit -m "feat: create ProjectCard component"
```

---

### Task 7: CategoryTabs Component

**Files:**
- Create: `src/components/CategoryTabs.vue`

- [ ] **Step 1: Create src/components/CategoryTabs.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CategoryTabs.vue
git commit -m "feat: create CategoryTabs component"
```

---

### Task 8: HomePage View

**Files:**
- Create: `src/views/HomePage.vue` (overwrite placeholder)

- [ ] **Step 1: Create src/views/HomePage.vue**

```vue
<template>
  <div class="home-page">
    <!-- Background hero with gradient fade -->
    <div class="hero-bg" :style="{ opacity: heroOpacity }"></div>

    <!-- Main content area -->
    <div class="hero-content">
      <!-- Left: Personal info card -->
      <aside class="info-card">
        <img class="avatar" src="/images/avatar-placeholder.svg" alt="头像" />
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">QQ</span>
            <span class="info-value">1234567890</span>
          </div>
          <div class="info-item">
            <span class="info-label">电话</span>
            <span class="info-value">138-xxxx-xxxx</span>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <span class="info-value">dingrongxin@example.com</span>
          </div>
          <div class="info-item">
            <span class="info-label">城市</span>
            <span class="info-value">中国·XX</span>
          </div>
          <div class="info-item">
            <span class="info-label">院校</span>
            <span class="info-value">XX大学</span>
          </div>
        </div>
      </aside>

      <!-- Right: Title + previews -->
      <div class="hero-right">
        <div class="title-block">
          <h1 class="main-title">Welcome to Ding Rongxin's website</h1>
          <p class="subtitle">MENG MU is my online name</p>
        </div>
      </div>
    </div>

    <!-- Preview grid below fold -->
    <section class="preview-section container">
      <div class="preview-grid">
        <ProjectCard
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :title="project.title"
          :tags="project.tags"
          :index="i"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects.js'

const featuredProjects = projects.slice(0, 8)
const heroOpacity = ref(1)

function handleScroll() {
  const scrollY = window.scrollY
  const maxScroll = window.innerHeight * 0.5
  heroOpacity.value = Math.max(0, 1 - scrollY / maxScroll)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
}

/* Hero background: top 1/3 of viewport */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 33.33vh;
  min-height: 240px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  /* Mask: bottom fade to white */
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + 40px) 24px 0;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* Left info card */
.info-card {
  width: 33.33%;
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 16px var(--color-shadow);
  padding: 32px;
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 0;
  border: 2px solid var(--color-border);
  background: var(--color-border);
}

.info-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 15px;
  color: var(--color-primary);
  font-weight: 500;
}

/* Right area */
.hero-right {
  flex: 1;
  padding-top: 20px;
}

.title-block {
  margin-bottom: 40px;
}

.main-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-secondary);
  margin-top: 12px;
  font-weight: 400;
}

/* Preview section */
.preview-section {
  position: relative;
  z-index: 1;
  padding: 60px 24px 80px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .info-card {
    width: 100%;
  }

  .hero-right {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Create placeholder SVG avatar at public/images/avatar-placeholder.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#E4E4E7"/>
  <circle cx="100" cy="80" r="40" fill="#A1A1AA"/>
  <ellipse cx="100" cy="170" rx="60" ry="50" fill="#A1A1AA"/>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/HomePage.vue public/images/avatar-placeholder.svg
git commit -m "feat: implement HomePage with hero, info card, and preview grid"
```

---

### Task 9: ProjectsPage View

**Files:**
- Modify: `src/views/ProjectsPage.vue` (overwrite placeholder)

- [ ] **Step 1: Write src/views/ProjectsPage.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ProjectsPage.vue
git commit -m "feat: implement ProjectsPage with category filtering"
```

---

### Task 10: ExperiencePage View

**Files:**
- Modify: `src/views/ExperiencePage.vue` (overwrite placeholder)

- [ ] **Step 1: Write src/views/ExperiencePage.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ExperiencePage.vue
git commit -m "feat: implement ExperiencePage with category filtering"
```

---

### Task 11: ContactPage View

**Files:**
- Modify: `src/views/ContactPage.vue` (overwrite placeholder)

- [ ] **Step 1: Write src/views/ContactPage.vue**

```vue
<template>
  <div class="contact-page">
    <!-- Full-page background -->
    <div class="contact-bg" :style="bgStyle"></div>

    <!-- Content -->
    <div class="contact-content">
      <h1 class="name-title">丁荣鑫</h1>
      <div class="contact-info">
        <div class="contact-item">
          <span class="contact-label">QQ</span>
          <span class="contact-value">1234567890</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">电话</span>
          <span class="contact-value">138-xxxx-xxxx</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">邮箱</span>
          <span class="contact-value">dingrongxin@example.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">所在城市</span>
          <span class="contact-value">中国·XX</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">毕业院校</span>
          <span class="contact-value">XX大学</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollOffset = ref(0)

function handleScroll() {
  scrollOffset.value = window.scrollY * 0.4
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const bgStyle = {
  transform: `translateY(${scrollOffset.value}px)`,
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Fullscreen background */
.contact-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #334155 70%, #475569 100%);
  /* Bottom fade */
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  z-index: 0;
  will-change: transform;
}

/* Content overlay */
.contact-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: calc(var(--nav-height) + 60px) 24px 80px;
  max-width: 600px;
  width: 100%;
}

.name-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.08em;
  margin-bottom: 60px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contact-value {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@media (max-width: 768px) {
  .contact-content {
    padding: calc(var(--nav-height) + 40px) 24px 60px;
  }

  .contact-info {
    padding: 32px 24px;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ContactPage.vue
git commit -m "feat: implement ContactPage with parallax background"
```

---

### Task 12: Wire Up App.vue

**Files:**
- Create: `src/App.vue`

- [ ] **Step 1: Create src/App.vue**

```vue
<template>
  <NavBar />
  <PageTransition />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import PageTransition from '@/components/PageTransition.vue'
</script>
```

- [ ] **Step 2: Verify full build**

Run: `npm run build`  
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: wire up App.vue with NavBar and router"
```

---

### Task 13: Final Verification

- [ ] **Step 1: Start dev server and check all pages**

Run: `npm run dev`

Manual checks:
- Navigate to `/` — HomePage renders with hero bg, info card, title, 8 preview cards
- Navigate to `/projects` — ProjectsPage renders with category tabs, grid of project cards
- Click different category tabs — filtering works, card grid updates
- Navigate to `/experience` — ExperiencePage renders with tabs and cards
- Navigate to `/contact` — ContactPage renders with background, title "丁荣鑫", info list
- Page transitions — each navigation shows fade + slide animation
- NavBar — active state highlights correctly for each page
- Scroll on HomePage — hero background fades out
- Scroll on ContactPage — parallax effect on background
- Resize browser to mobile width — responsive layout, cards reflow
- Hover on cards — lift effect and shadow deepen

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: Clean build, no warnings.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: final verification complete"
```
