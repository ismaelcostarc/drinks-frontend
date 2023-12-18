import { useAuthStore } from "~/store/auth.store"

function goLogin() {
  return useRouter().push({ name: 'Login' })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Página pública que não necessita autenticação
  if (to.meta.dontNeedAuth) {
    return
  }

  const authStore = useAuthStore()
  const hasToken = !!authStore.getAuthToken()

  // Página pública que pode ter autenticação
  if (to.meta.public) {
    if (hasToken) {
      // Página pública com usuário logado
      const { data } = await authStore.fetchUser()
      authStore.setUser(data.value)
    }

    // Página pública com usuário deslogado
    return true
  }

  // Página privada que precisa estar autenticado
  // Página privada com usuário logado
  if (hasToken) {
    const { data } = await authStore.fetchUser()
    authStore.setUser(data.value)

    if (authStore.isAuthenticated) return true
  }
  // Página privada com usuário deslogado
  return goLogin()
})

