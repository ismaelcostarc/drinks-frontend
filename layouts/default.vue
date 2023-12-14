<script setup lang="ts">
import { useLayoutsDefaultStore } from '@/store/layouts/default.store'

const store = useLayoutsDefaultStore()
</script>

<template>
  <div class="container">
    <BaseCard size="full">
      <BaseTitle>{{ store.title }}</BaseTitle>
      <BaseSearch />
    </BaseCard>

    <BaseCard size="full">
      <slot />
    </BaseCard>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}
</style>