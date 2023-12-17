<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'

const store = useLayoutStore()

const search = (payload: string) => {
  console.log(payload)
}
</script>

<template>
  <div class="container">
    <BaseCard size="full">
      <div class="header">
        <div class="title">
          <NuxtLink v-if="store.backLink" :to="store.backLink">
            <BaseButton type="link">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </BaseButton>
          </NuxtLink>
          <BaseTitle>{{ store.title }}</BaseTitle>
        </div>

        <div class="buttons">
          <BaseInputSearch placeholder="Pesquisar" @search="search" />
          <NuxtLink to="/login">
            <BaseButton type="link">Sair</BaseButton>
          </NuxtLink>
        </div>
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

.buttons {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm)
}
</style>