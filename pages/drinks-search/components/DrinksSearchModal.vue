<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { getDrink } from '~/services/drinks.service';

const props = defineProps<{
  id?: string;
}>()

const emits = defineEmits(['close'])

const toast = useToast()

const drink = await getDrink(props.id ?? '')

if (drink.error.value?.statusCode === 500) {
  toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  emits('close')
}
</script>

<template>
  <BaseModal>
    <template #header>
      <BaseTitle>{{ drink.data.value?.name }}</BaseTitle>
    </template>

    <div class="modal__content">
      <img :src="drink.data.value?.img_url" class="drink__img" :alt="drink.data.value?.name"/>
      <div>{{ drink.data.value?.description }}</div>
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