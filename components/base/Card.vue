<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

</script>

<template>
  <div class="base-card" :class="size">
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
.base-card {
  border-radius: var(--spacing-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxl);
  background-color: var(--color-white);
  -webkit-box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.43);
  box-shadow: 6px 10px 69px -10px rgba(0, 0, 0, 0.43);
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