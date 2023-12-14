<template>
  <div class="base-card__container">
    <BaseCard size="large">
      <template #header>logotipo</template>
      <template #default>
        <BaseForm>
          <BaseInputText label="E-mail:"/>
          <BaseInputText label="Senha:"/>
        </BaseForm>
      </template>
      <template #footer>
        <div class="buttons__container">
          <BaseButton>Entrar</BaseButton>
          <BaseButton type="link" size="small">Cadastre-se</BaseButton>
        </div>
      </template>
    </BaseCard>
  </div>
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

.buttons__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>