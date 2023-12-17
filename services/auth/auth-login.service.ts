interface AuthLoginPayload {
  email: string;
  password: string;
}

interface AuthLoginResponse {
  type: string;
  token: string;
  expires_at: string;
}

export const authLogin = (payload: AuthLoginPayload) => {
  return useCustomFetch<AuthLoginResponse>('/auth/login', { body: payload, method: "POST" })
}