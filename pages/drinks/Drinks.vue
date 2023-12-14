<script setup lang="ts">
import { useLayoutsDefaultStore } from '@/store/layouts/default.store'

const store = useLayoutsDefaultStore()

store.title = 'Categorias'
</script>

<template>
  <NuxtLayout>Categories</NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}
</style>