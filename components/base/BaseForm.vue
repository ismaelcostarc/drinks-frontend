<template>
  <form class="base-form">
    <slot />
  </form>
</template>

<style scoped>
.base-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>