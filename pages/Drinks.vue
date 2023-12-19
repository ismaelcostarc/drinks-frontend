<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import type { TableRow } from '~/components/base/table/base-table.types';
import { getCategory } from '~/services/categories.service';
import { getDrink, getDrinksByCategory } from '~/services/drinks.service';
import { deleteFavorite, getFavorites, postFavorite } from '~/services/favorites.service';
import type { Drink } from '~/types/drink.type';
import { useAuthStore } from '~/store/auth.store';

const route = useRoute()
const store = useLayoutStore()
const authStore = useAuthStore()
const modal = useModal()

const choosenDrink = ref<Drink>()

const category = await getCategory(
  `${route.params.categoryId}`
)

watch(() => category.data.value, value => {
  store.title = value ? value.name : 'Bebidas'
}, {
  immediate: true
})

store.backLink = '/'

const headers = [
  'Bebida',
  'Descrição',
  'Favorito',
]

const response = await getDrinksByCategory(
  `${route.params.categoryId}`
)

const drinks = computed(() => {
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
        isAction: authStore.isAuthenticated,
      },
    ]
  }) ?? []

  return data
})

const favorites = await getFavorites()

const isFavorite = (id: string) => {
  return !!favorites.data.value?.find(favorite => favorite.id === id)
}

const favoriteDrink = async (id: string) => {
  postFavorite(id)
  favorites.refresh()
}

const removeFavorite = async (id: string) => {
  await deleteFavorite(id)
  favorites.refresh()
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
.text {
  color: var(--color-primary);
}

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