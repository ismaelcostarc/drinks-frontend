import { getCurrentUser } from "~/services/auth.service";
import type { User } from "~/types/user.type";

export const useAuthStore = defineStore('useAuthStore', () => {
  const user = ref<User | null>()

  const setToken = (token?: string) => process.client && localStorage.setItem('auth_token', token || '')
  const getToken = (key: string) => process.client && localStorage.getItem(key)
  const removeToken = (key: string) => process.client && localStorage.removeItem(key)

  const getAuthToken = () => getToken('auth_token')
  const fetchUser = async () => await getCurrentUser()
  const setUser = (payload: User | null) => user.value = payload
  const getUser = () => user.value
  const login = (token: string) => setToken(token)
  const logout = () => removeToken('auth_token')
  const isAuthenticated = computed(() => !!user.value)

  return {
    fetchUser,
    setUser,
    getUser,
    getAuthToken,
    login,
    logout,
    isAuthenticated,
  }
})