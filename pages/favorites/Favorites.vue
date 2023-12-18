<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import FavoritesModal from './components/FavoritesModal.vue'
import { getFavorites } from '~/services/favorites.service';

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()

store.title = 'Favoritos'
store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
]

const response = await getFavorites()

const favorites = computed(() => {
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
    <template v-if="favorites.length > 0">
      <BaseTable :headers="headers" :data="favorites" />

      <FavoritesModal :id="choosenDrink" @close="closeModal" v-if="modalIsVisible" />
    </template>
    <div v-else class="no-results">
      Não existem favoritos
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