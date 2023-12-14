<script setup lang="ts">
import { useLayoutsDefaultStore } from '@/store/layouts/default.store'

const store = useLayoutsDefaultStore()
</script>

<template>
  <div class="container">
    <BaseCard size="full">
      <div class="header">
        <BaseTitle>{{ store.title }}</BaseTitle>
        <BaseInputText placeholder="Pesquisar" v-model="store.search" />
      </div>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg);
}
</style>