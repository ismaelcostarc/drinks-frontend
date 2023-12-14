<script setup lang="ts">
interface Props {
  label?: string;
  required?: boolean;
}

const props = defineProps<Props>()
</script>

<template>
  <div class="base-input-text__container">
    <div class="base-input-text__label">
      <label :for="props.label">{{ props.label }}</label>
      <div class="base-input-text__required" v-if="props.required">*</div>
    </div>
    <input type="text" class="base-input-text" :id="props.label" />
  </div>
</template>

<style scoped>
.base-input-text__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.base-input-text__label {
  font-size: var(--font-size-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.base-input-text__required {
  color: var(--color-error);
}

.base-input-text {
  border-radius: var(--spacing-md);
  padding: var(--spacing-md);
  border: var(--spacing-xsm) var(--color-border) solid;
}
</style>