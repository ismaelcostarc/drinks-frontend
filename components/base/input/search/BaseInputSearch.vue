<script setup lang="ts">
interface Props {
  placeholder?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['search'])

const input = ref('')
</script>

<template>
  <BaseForm @submit.prevent="emit('search', input)">
    <div class="base-input-search__container">
      <input type="text" class="base-input-search" :placeholder="props.placeholder" v-model="input" />
      <button class="base-input-search__button" type="submit" :disabled="!input" data-testid="search-button">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </div>
  </BaseForm>
</template>

<style scoped>
.base-input-search__container {
  display: flex;
}

.base-input-search {
  border-radius: var(--spacing-md) 0 0 var(--spacing-md);
  padding: var(--spacing-md);
  border: var(--spacing-xsm) var(--color-border) solid;
}

.base-input-search:focus {
  border: var(--spacing-xsm) var(--color-dark-gray) solid;
}

.base-input-search__button {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0 var(--spacing-lg) 0 var(--spacing-lg);
  border-radius: 0 var(--spacing-md) var(--spacing-md) 0;
  cursor: pointer;
}

.base-input-search__button:disabled {
  filter: grayscale(0.5);
  cursor: not-allowed;
}
</style>