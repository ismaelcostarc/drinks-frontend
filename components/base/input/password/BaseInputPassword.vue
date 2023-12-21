<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string;
  required?: boolean;
  placeholder?: string;
  modelValue: string;
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const showPassword = ref(false)
</script>

<template>
  <div class="base-input-password__container">
    <div class="base-input-password__label">
      <label :for="props?.label">{{ props?.label }}</label>
      <div class="base-input-password__required" v-if="props?.required">*</div>
    </div>
    <input :type="showPassword ? 'text' : 'password'" class="base-input-password" :id="props?.label"
      :placeholder="props?.placeholder" v-model="value" />

    <div class="base-input-password__show-password">
      <input type="checkbox" :id="props?.label + 'checkbox'" v-model="showPassword" />
      <label :for="props?.label + 'checkbox'">Mostrar senha</label>
    </div>
  </div>
</template>

<style scoped>
.base-input-password__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.base-input-password__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: var(--font-size-sm);
}

.base-input-password__required {
  color: var(--color-error);
}

.base-input-password {
  border-radius: var(--spacing-md);
  padding: var(--spacing-md);
  border: var(--spacing-xsm) var(--color-border) solid;
}

.base-input-password:focus {
  border: var(--spacing-xsm) var(--color-dark-gray) solid;
}

.base-input-password__show-password {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
}
</style>