<script setup lang="ts">
const email = ref('');
const password = ref('');

const isDisabled = computed(() => !email.value || !password.value)
</script>

<template>
  <NuxtLayout name="empty">
    <div class="base-card__container">
      <BaseCard size="medium" class="base-card">
        <template #header>logotipo</template>
        <template #default>
          <BaseForm>
            <BaseInputText label="E-mail:" v-model="email"/>
            <BaseInputText label="Senha:" v-model="password" />
          </BaseForm>
        </template>
        <template #footer>
          <div class="buttons__container">
            <BaseButton :disabled="isDisabled">Entrar</BaseButton>
            <BaseButton type="link" size="small">Cadastre-se</BaseButton>
          </div>
        </template>
      </BaseCard>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.base-card__container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: var(--color-primary);
}

.base-card__container > * {
  margin: 0 auto;
}

.base-card {
  padding: var(--spacing-xl)
}

.buttons__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}
</style>