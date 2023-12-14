<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

</script>

<template>
  <div class="card" :class="size">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.card {
  border: var(--spacing-sm) var(--color-border) solid;
  border-radius: var(--spacing-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxl);
  background-color: var(--color-white)
}

.small {
  width: 15rem;
}

.medium {
  width: 20rem;
}

.large {
  width: 25rem;
}
</style>