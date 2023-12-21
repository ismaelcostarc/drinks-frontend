<template>
  <div class="base-modal-container">
    <div class="base-modal">
      <BaseCard>
        <template #header>
          <slot name="header" />
        </template>

        <template #default>
          <slot />
        </template>

        <template #footer>
          <slot name="footer" />
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.base-modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-model {
  position: absolute;
  top: 0;
  left: 0;
}
</style>