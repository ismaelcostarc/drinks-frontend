<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { useToast } from 'vue-toastification'
import type { TableRow } from '~/components/base/table/base-table.types';
import { getCategory } from '~/services/categories.service';
import { getDrinksByCategory } from '~/services/drinks.service';
import DrinksModal from './components/DrinksModal.vue'

const drinks = ref<TableRow[]>([])

const route = useRoute()
const toast = useToast()
const store = useLayoutStore()

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
]

const response = await getDrinksByCategory(
  `${route.params.categoryId}`
)

watch(() => response.data.value, value => {
  drinks.value = value?.map(category => {
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
    <BaseTable :headers="headers" :data="drinks" />

    <DrinksModal :id="choosenDrink" @close="closeModal" v-if="modalIsVisible"/>
  </NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}
</style>