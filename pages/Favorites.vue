<script setup lang="ts">
import type { Drink } from '~/types/drink.type';
import type { TableRow } from '~/components/base/table/base-table.types';
import { useLayoutStore } from '@/store/layout.store'
import { getDrinkService } from '~/services/drinks/getDrink.service';
import { getFavoritesService } from '~/services/favorites/getFavorites.service';
import { removeFavoriteService } from '~/services/favorites/removeFavorite.service';

const modal = useModal()
const layoutStore = useLayoutStore()

const choosenDrink = ref<Drink>()

layoutStore.title = 'Favoritos'
layoutStore.backLink = '/'

const headers = [
  {
    title: 'Categoria',
    size: 20,
  },
  {
    title: 'Descrição',
  },
  {
    title: 'Ação',
    size: 20,
  },
]

const response = await getFavoritesService()

const favorites = computed(() => {
  const data: TableRow[] = response.data.value?.map(category => {
    return [
      {
        id: category.id,
        content: category.name,
        callback: async (id?: string) => {
          choosenDrink.value = (await getDrinkService(id ?? '')).data.value ?? undefined
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
  await removeFavoriteService(id)
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