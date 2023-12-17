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

interface GetCurrentUserResponse {
  id: string;
  email: string;
  remember_me_token: string;
  created_at: string;
  updated_at: string;
}

export const getCurrentUser = () => {
  return useCustomFetch<GetCurrentUserResponse>('/auth/current-user',
    { method: "GET" },
    true
  )
}