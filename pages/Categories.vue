<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { getCategories } from '~/services/categories.service';
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';

const toast = useToast()

const store = useLayoutStore()
store.title = 'Categorias'
store.backLink = ''

const headers = [
  'Categoria',
  'Descrição',
]

const response = await getCategories()

if (response.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

const categories = computed(() => {
  const data: TableRow[] = response.data.value?.map(category => {
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