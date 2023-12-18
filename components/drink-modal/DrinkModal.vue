<script setup lang="ts">
import { useToast } from 'vue-toastification';
import type { Drink } from '~/types/drink.types';

const props = defineProps<{
  drink?: Drink;
}>()

const emits = defineEmits(['close'])
</script>

<template>
  <BaseModal>
    <template #header>
      <BaseTitle>{{ props.drink?.name }}</BaseTitle>
    </template>

    <div class="modal__content">
      <img :src="props.drink?.img_url" class="drink__img" :alt="props.drink?.name"/>
      <div>{{ props.drink?.description }}</div>
    </div>
    <template #footer>

      <BaseButton @click="emits('close')" size="medium" full>Fechar</BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped>
.drink__img {
  max-width: 15em;
  max-height: 15em;
}

.modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
}

.modal__title {
  padding: var(--spacing-lg);
  text-align: center;
}
</style>