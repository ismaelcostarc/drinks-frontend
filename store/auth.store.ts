import { getCurrentUser } from "~/services/auth.service";

export const useAuthStore = defineStore('useAuthStore', () => {
  const setToken = (token?: string) => process.client && localStorage.setItem('auth_token', token || '')
  const getToken = (key: string) => process.client && localStorage.getItem(key)
  const removeToken = (key: string) => process.client && localStorage.removeItem(key)

  const getAuthToken = () => getToken('auth_token')
  const getUser = async () => await getCurrentUser()
  const login = (token: string) => setToken(token)
  const logout = () => removeToken('auth_token')

  return {
    getUser,
    getAuthToken,
    login,
    logout,
  }
})