<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import type { TableRow } from '~/components/base/table/base-table.types';
import { deleteFavorite, getFavorites } from '~/services/favorites.service';
import type { Drink } from '~/types/drink.type';
import { getDrink } from '~/services/drinks.service';

const store = useLayoutStore()
const modal = useModal()

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
          modal.showModal()
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

const removeFavorite = async (id: string) => {
  await deleteFavorite(id)
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

      <DrinkModal :drink="choosenDrink" @close="modal.closeModal" v-if="modal.modalIsVisible.value" />
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