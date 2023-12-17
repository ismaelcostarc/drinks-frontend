export const useAuthStore = defineStore('useAuthStore', () => {
  const setToken = (token?: string) => {
    if (process.client)
      localStorage.setItem('auth_token', token || '');
  }

  const getToken = (token?: string) => {
    if (process.client)
      return localStorage.getItem('auth_token');
  }

  return {
    setToken,
    getToken,
  }
})