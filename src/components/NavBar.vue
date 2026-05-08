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
  padding: 0 var(--content-padding);
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
