<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})
</script>

<template>
  <div class="base-card" :class="size">
    <header class="full-width">
      <slot name="header"></slot>
    </header>
    <main class="full-width">
      <slot></slot>
    </main>
    <footer class="full-width">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.base-card {
  border-radius: var(--spacing-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxl);
  background-color: var(--color-white);
  -webkit-box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.25);
  box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.25);
}

.small {
  width: 15rem;
}

.medium {
  width: 20rem;
}

.large {
  width: 30rem;
}

.full { 
  max-width: 100%;
}

.full-width {
  width: 100%;
}
</style>