<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { deleteFavorite, getFavorites } from '~/services/favorites.service';
import type { Drink } from '~/types/drink.types';
import { getDrink } from '~/services/drinks.service';

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()

const choosenDrink = ref<Drink>()

store.title = 'Favoritos'
store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
  'Ação',
]

const response = await getFavorites()

const favorites = computed(() => {
  const data: TableRow[] = response.data.value?.map(category => {
    return [
      {
        id: category.id,
        content: category.name,
        callback: async (id?: string) => {
          choosenDrink.value = (await getDrink(id ?? '')).data.value ?? undefined
          showModal()
        }
      },
      {
        content: category.description
      },
      {
        payload: category.id,
        isAction: true,
      },
    ]
  }) ?? []

  return data
})

if (response.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

const modalIsVisible = ref(false)

const closeModal = () => modalIsVisible.value = false
const showModal = () => modalIsVisible.value = true

const removeFavorite = async (id: string) => {
  const responsePostFavorite = await deleteFavorite(id)

  if (responsePostFavorite.error.value?.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }

  response.refresh()
}
</script>

<template>
  <NuxtLayout>
    <template v-if="favorites.length > 0">
      <BaseTable :headers="headers" :data="favorites">
        <template #action="{ payload }">
          <BaseButton type="outlined" @click="removeFavorite(payload as string)">Remover</BaseButton>
        </template>
      </BaseTable>

      <DrinkModal :drink="choosenDrink" @close="closeModal" v-if="modalIsVisible" />
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