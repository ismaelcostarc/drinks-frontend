<script setup lang="ts">
import { useLayoutsDefaultStore } from '@/store/layouts/default.store'

const store = useLayoutsDefaultStore()

const route = useRoute()

store.title = 'Bebidas / ' + route.params.drink

const headers = [
  'Bebida',
  'Descrição',
]

const data = [
  [
    {
      content: 'Destilados',
      link: '/',
    },
    {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend at mi eu placerat. In ac velit vitae augue rutrum porta. Phasellus porta velit orci, iaculis ullamcorper nisl porta in.',
    }
  ],
  [
    {
      content: 'Vinhos',
      link: '/',
    },
    {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend at mi eu placerat. In ac velit vitae augue rutrum porta. Phasellus porta velit orci, iaculis ullamcorper nisl porta in.',
    }
  ],
]
</script>

<template>
  <NuxtLayout>
    <BaseTable :headers="headers" :data="data"/>
  </NuxtLayout>
</template>

<style>
.text {
  color: var(--color-primary);
}
</style>