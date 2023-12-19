<script setup lang="ts">
import type { Drink } from '~/types/drink.type';
import type { TableRow } from '~/components/base/table/base-table.types';
import { useLayoutStore } from '@/store/layout.store'
import { getDrinkService } from '~/services/drinks/getDrink.service';
import { searchDrinksService } from '~/services/drinks/searchDrinks.service';
import { useAuthStore } from '~/store/auth.store';

const route = useRoute()
const store = useLayoutStore()
const modal = useModal()
const authStore = useAuthStore()

const choosenDrink = ref<Drink>()

store.title = 'Resultados para: ' + route.params.search
store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
]

if(authStore.isAuthenticated) {
  headers.push('Favorito')
}

const response = await searchDrinksService(
  `${route.params.search}`
)

const drinks = computed(() => {
  const data: TableRow[] = response.data.value?.map(category => {
    const row: TableRow = [
      {
        id: category.id,
        content: category.name,
        callback: async (id?: string) => {
          choosenDrink.value = (await getDrinkService(id ?? '')).data.value ?? undefined
          modal.showModal()
        },
        highlightTerm: route.params.search as string,
      },
      {
        content: category.description
      }
    ]

    if (authStore.isAuthenticated) {
      row.push(
        {
          payload: category.id,
          isAction: authStore.isAuthenticated,
        },
      )
    }

    return row
  }) ?? []

  return data
})
</script>

<template>
  <NuxtLayout>
    <template v-if="drinks.length > 0">
      <BaseTable :headers="headers" :data="drinks" />

      <DrinkModal :drink="choosenDrink" @close="modal.closeModal" v-if="modal.modalIsVisible.value" />
    </template>

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