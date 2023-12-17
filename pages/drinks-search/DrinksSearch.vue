<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { searchDrinks } from '~/services/drinks.service';
import DrinksSearchModal from './components/DrinksSearchModal.vue'

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

const drinks = computed(() => {
  const data: TableRow[] = response.data.value?.map(category => {
    return [
      {
        id: category.id,
        content: category.name,
        callback: (id?: string) => {
          choosenDrink.value = id ?? ''
          showModal()
        }
      },
      {
        content: category.description
      }
    ]
  }) ?? []

  return data
})

if (response.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

const choosenDrink = ref('')
const modalIsVisible = ref(false)

const closeModal = () => modalIsVisible.value = false
const showModal = () => modalIsVisible.value = true
</script>

<template>
  <NuxtLayout>
    <template v-if="drinks.length > 0">
      <BaseTable :headers="headers" :data="drinks" />

      <DrinksSearchModal :id="choosenDrink" @close="closeModal" v-if="modalIsVisible" />
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