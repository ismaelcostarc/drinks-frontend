import { useAuthStore } from "~/store/auth.store"

export function useCustomFetch<T>(request: string, opts: any, auth?: boolean) {
  const config = useRuntimeConfig()

  if(auth) {
    opts.headers = {
      'Authorization': 'Bearer ' + useAuthStore().getAuthToken(),
      ...opts.headers,
    }
  }

  opts.immediate = true

  return useLazyFetch<T>(request, { baseURL: config.public.baseURL as string, ...opts })
}