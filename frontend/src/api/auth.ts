import { apiFetch } from './apiCient'

interface LoginResponse {
  access_token: string
  admin: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
}

export const loginAdmin = (email: string, password: string) =>
  apiFetch<LoginResponse>('/auth/login', 'POST', undefined, { email, password })