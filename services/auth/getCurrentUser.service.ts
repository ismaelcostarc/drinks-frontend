import type { User } from "~/types/user.type";

export const getCurrentUserService = () => {
  return useCustomFetch<User>('/auth/current-user',
    { method: "GET" },
    true
  )
}