<script setup lang="ts">
import { login } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth.store';
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const email = ref('');
const password = ref('');

const isDisabled = computed(() => !email.value || !password.value)

const signIn = async () => {
  const response = await login({
    email: email.value,
    password: password.value,
  })

  if (response.error.value) {
    if (response.error.value.statusCode === 400) {
      toast.error("O e-mail ou senha estão incorretos.")
    }

    if (response.error.value.statusCode === 500) {
      toast.error("O servidor está fora do ar, tente novamente mais tarde.")
    }
  } else {
    useAuthStore().login(response?.data.value?.token ?? '')
    router.push({ name: 'Categories' })
  }
}

const signInWithoutLogin = () => {
  router.push({ name: 'Categories' })
}
</script>

<template>
  <NuxtLayout name="empty">
    <div class="base-card__container">
      <BaseCard size="medium" class="base-card">
        <template #header>
          <div class="logo">
            <img alt="logo" src="@/assets/img/logo.png" width="100" height="100" />
          </div>
        </template>
        <template #default>
          <BaseForm>
            <BaseInputText label="E-mail:" v-model="email" />
            <BaseInputText label="Senha:" v-model="password" />
          </BaseForm>
        </template>
        <template #footer>
          <div class="buttons__container">
            <BaseButton :disabled="isDisabled" @click="signIn">Login</BaseButton>
            <BaseButton type="link" size="small" @click="signInWithoutLogin">Entrar sem login</BaseButton>
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

.base-card__container>* {
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

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>