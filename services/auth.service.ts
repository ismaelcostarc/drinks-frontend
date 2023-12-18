import type { User } from "~/types/user.types";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  type: string;
  token: string;
  expires_at: string;
}

export const login = (payload: LoginPayload) => {
  return useCustomFetch<LoginResponse>('/auth/login', { body: payload, method: "POST" })
}

export const getCurrentUser = () => {
  return useCustomFetch<User>('/auth/current-user',
    { method: "GET" },
    true
  )
}