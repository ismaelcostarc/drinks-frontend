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