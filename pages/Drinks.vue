<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { getCategory } from '~/services/categories.service';
import { getDrinksByCategory } from '~/services/drinks.service';

const drinks = ref<TableRow[]>([])

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()

const category = await getCategory(
  `${route.params.categoryId}`
)

if (category.error.value) {
  store.title = 'Bebidas'
} else {
  store.title = category.data.value?.name ?? 'Bebidas'
}
store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
]

const response = await getDrinksByCategory(
  `${route.params.categoryId}`
)

if (response.error.value) {
  if (response.error.value.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }
} else {
  drinks.value = response.data.value?.map(category => {
    return [
      {
        content: category.name,
        link: '/drinks/' + category.id
      },
      {
        content: category.description
      }
    ]
  }) ?? []
}
</script>

<template>
  <NuxtLayout>
    <BaseTable :headers="headers" :data="drinks" />
  </NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}
</style>