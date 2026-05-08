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
