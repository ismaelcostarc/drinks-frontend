<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { getDrinksByCategory } from '~/services/drinks.service';

const toast = useToast()

const store = useLayoutStore()
store.backLink = '/'
const route = useRoute()
store.title = 'Bebidas / ' + route.params.categoryId

const drinks = ref<TableRow[]>([])

const headers = [
  'Bebida',
  'Descrição',
]

const response = await getDrinksByCategory({
  categoryId: `${route.params.categoryId}`
})

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