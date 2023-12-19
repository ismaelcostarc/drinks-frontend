<script setup lang="ts">
import type { TableRow } from '~/components/base/table/base-table.types';
import type { Drink } from '~/types/drink.type';
import { useLayoutStore } from '@/store/layout.store'
import { useAuthStore } from '~/store/auth.store';
import { getCategoryService } from '~/services/categories/getCategory.service';
import { getDrinksByCategoryService } from '~/services/drinks/getDrinksByCategory.service';
import { getDrinkService } from '~/services/drinks/getDrink.service';
import { getFavoritesService } from '~/services/favorites/getFavorites.service';
import { addFavoriteService } from '~/services/favorites/addFavorite.service';
import { removeFavoriteService } from '~/services/favorites/removeFavorite.service';

const route = useRoute()
const modal = useModal()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const choosenDrink = ref<Drink>()

const category = await getCategoryService(
  `${route.params.categoryId}`
)

watch(() => category.data.value, value => {
  layoutStore.title = value ? value.name : 'Bebidas'
}, {
  immediate: true
})

layoutStore.backLink = '/'

const headers = [
  {
    title: 'Categoria',
    size: 20,
  },
  {
    title: 'Descrição',
  }
]

if (authStore.isAuthenticated) {
  headers.push({
    title: 'Favorito',
    size: 10,
  })
}

const response = await getDrinksByCategoryService(
  `${route.params.categoryId}`
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
        }
      },
      {
        content: category.description
      },
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

const favorites = await getFavoritesService()

const isFavorite = (id: string) => {
  return !!favorites.data.value?.find(favorite => favorite.id === id)
}

const favoriteDrink = async (id: string) => {
  await addFavoriteService(id)
  await favorites.refresh()
}

const removeFavorite = async (id: string) => {
  await removeFavoriteService(id)
  await favorites.refresh()
}
</script>

<template>
  <NuxtLayout>
    <BaseTable :headers="headers" :data="drinks">
      <template #action="{ payload }">
        <div class="favorite-button__container">
          <span class="favorite-button">
            <font-awesome-icon :icon="['fas', 'star']" v-if="isFavorite(payload as string)"
              @click="removeFavorite(payload as string)" />
            <font-awesome-icon :icon="['far', 'star']" v-else @click="favoriteDrink(payload as string)" />
          </span>
        </div>
      </template>
    </BaseTable>

    <DrinkModal :drink="choosenDrink" @close="modal.closeModal" v-if="modal.modalIsVisible.value" />
  </NuxtLayout>
</template>

<style>
.favorite-button__container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-button {
  cursor: pointer;
  color: var(--color-warning);
}
</style>