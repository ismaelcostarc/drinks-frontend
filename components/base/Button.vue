<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'outlined' | 'warning' | 'success' | 'error' | 'link';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type: 'default',
})
</script>

<template>
  <button class="button" :class="[size, type]">
    <slot />
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  border-radius: var(--spacing-md);
}

.default { 
  background-color: var(--color-primary);
  color: var(--color-white);
}

.outlined { 
  background-color: var(--color-transparent);
  border: var(--spacing-xsm) var(--color-black) solid;
  color: var(--color-black);
}

.warning { 
  background-color: var(--color-warning);
  color: var(--color-white);
}

.success { 
  background-color: var(--color-success);
  color: var(--color-white);
}

.error { 
  background-color: var(--color-error);
  color: var(--color-white);
}

.link { 
  background-color: var(--color-transparent);
  color: var(--color-link);
}

.small {
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);
}

.medium {
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  padding-left: var(--spacing-xl);
  padding-right: var(--spacing-xl);
}

.large {
  padding: var(--spacing-lg);
  font-size: var(--font-size-lg);
  padding-left: var(--spacing-xxl);
  padding-right: var(--spacing-xxl);
}
</style>