<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { searchDrinks } from '~/services/drinks.service';

const drinks = ref<TableRow[]>([])

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()

store.title = 'Resultados para: ' + route.params.search

store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
]

const response = await searchDrinks(
  `${route.params.search}`
)

watch(() => response.data.value, value => {
  drinks.value = value?.map(category => {
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
})

if (response.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

</script>

<template>
  <NuxtLayout>
    <BaseTable :headers="headers" :data="drinks" v-if="drinks.length > 0" />
    <div v-else class="no-results">
      A pesquisa não apresentou resultados.
    </div>
  </NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-large);
  color: var(--color-dark-gray);
  min-height: 50vh;
}
</style>