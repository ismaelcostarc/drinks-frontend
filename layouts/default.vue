<script setup lang="ts">
import { useLayoutStore } from '@/store/layout.store'
import { routerKey } from 'vue-router';
import { useAuthStore } from '~/store/auth.store';

const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const router = useRouter()

const pending = ref(true)
pending.value = false

const goDrinksSearch = (payload: string) => {
  router.push(`/drinks/search/${payload}`)
}

const logout = () => {
  authStore.logout()
  router.go(0)
}

const redirectToLogin = () => {
  router.push({ name: 'Login' })
}

const goFavorites = () => {
  router.push({ name: 'Favorites' })
}
</script>

<template>
  <div class="container">
    <BaseCard size="full">
      <div class="header">
        <div class="title">
          <NuxtLink v-if="layoutStore.backLink" :to="layoutStore.backLink">
            <BaseButton type="link">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </BaseButton>
          </NuxtLink>
          <BaseTitle>{{ layoutStore.title }}</BaseTitle>
        </div>

        <div class="buttons">
          <template v-if="!pending">
            <template v-if="authStore.isAuthenticated">
              <BaseButton type="link" @click="goFavorites">
                Favoritos
              </BaseButton>
              <BaseInputSearch placeholder="Pesquisar" @search="goDrinksSearch" />
              <BaseButton type="error" @click="logout">Sair</BaseButton>
            </template>

            <template v-else>
              <BaseInputSearch placeholder="Pesquisar" @search="goDrinksSearch" />
              <BaseButton @click="redirectToLogin">Entrar</BaseButton>
            </template>
          </template>
        </div>
      </div>
    </BaseCard>

    <BaseCard size="full">
      <slot />
    </BaseCard>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg);
}

@media (max-width: 720px) {
  .header {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg)
  }

  .buttons {
    flex-direction: column;
    align-items: center;
  }

  .button--favorites span {
    text-align: center;
  }
}

.buttons {
  display: flex;
  gap: var(--spacing-md);
  align-items: stretch;
}

.button--favorites {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm)
}
</style>