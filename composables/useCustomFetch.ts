import { useToast } from "vue-toastification"
import { useAuthStore } from "~/store/auth.store"

export function useCustomFetch<T>(request: string, opts: any, auth?: boolean) {
  const config = useRuntimeConfig()
  const toast = useToast()

  if(auth) {
    opts.headers = {
      'Authorization': 'Bearer ' + useAuthStore().getAuthToken(),
      ...opts.headers,
    }
  }

  opts.immediate = true

  const response = useFetch<T>(request, { baseURL: config.public.baseURL as string, ...opts })

  if (response.error.value?.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }

  return response
}