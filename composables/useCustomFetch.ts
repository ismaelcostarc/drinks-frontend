import { useToast } from "vue-toastification"
import { useAuthStore } from "~/store/auth.store"
import type { ResponseAPI } from "~/types/response-api.type"

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

  const response = useFetch<ResponseAPI<T>>(request, { baseURL: config.public.baseURL as string, ...opts })

  if (response.error.value?.statusCode === 500) {
    toast.error("O servidor está fora do ar, tente novamente mais tarde.")
  }

  return response
}