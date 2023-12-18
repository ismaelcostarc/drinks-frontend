<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { getCategory } from '~/services/categories.service';
import { getDrinksByCategory } from '~/services/drinks.service';
import DrinksModal from './components/DrinksModal.vue'
import { deleteFavorite, getFavorites, postFavorite } from '~/services/favorites.service';
import type { Drink } from '~/types/drink.types';
import { useAuthStore } from '~/store/auth.store';

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()
const authStore = useAuthStore()

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
        callback: (id?: string) => {
          choosenDrink.value = id ?? ''
          showModal()
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

if (response.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

const favoritesData = ref<Drink[] | null>(null)

const favorites = await getFavorites()

watch(() => favorites.status.value, () => {
  favoritesData.value = favorites.data.value
})

const isFavorite = (id: string) => {
  return !!favoritesData.value?.find(favorite => favorite.id === id)
}

if (favorites.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
}

const updateFavorites = async () => {
  const { data } = await getFavorites()
  favoritesData.value = data.value
}

const favoriteDrink = async (id: string) => {
  const responsePostFavorite = await postFavorite(id)

  if (responsePostFavorite.error.value?.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }

  await updateFavorites()
}

const removeFavorite = async (id: string) => {
  const responsePostFavorite = await deleteFavorite(id)

  if (responsePostFavorite.error.value?.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }

  await updateFavorites()
}

const choosenDrink = ref('')
const modalIsVisible = ref(false)
const closeModal = () => modalIsVisible.value = false
const showModal = () => modalIsVisible.value = true
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

    <DrinksModal :id="choosenDrink" @close="closeModal" v-if="modalIsVisible" />
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