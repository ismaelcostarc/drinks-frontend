<script setup lang="ts">
import type { TableRow } from '~/components/base/table/base-table.types';
import { useLayoutStore } from '@/store/layout.store'
import { getCategoriesService } from '~/services/categories/getCategories.service';

const layoutStore = useLayoutStore()
layoutStore.title = 'Categorias'
layoutStore.backLink = ''

const headers = [
  {
    title: 'Categoria',
    size: 20,
  },
  {
    title: 'Descrição',
  }
]

const response = await getCategoriesService()

const categories = computed(() => {
  const data: TableRow[] = response.data.value?.data.map(category => {
    return [
      {
        content: category.name,
        link: `/category/${category.id}/drinks`
      },
      {
        content: category.description
      }
    ]
  }) ?? []

  return data
})
</script>

<template>
  <NuxtLayout>
    <BaseTable :headers="headers" :data="categories" />
  </NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}
</style>