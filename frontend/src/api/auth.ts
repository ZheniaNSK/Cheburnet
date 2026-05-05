import { httpRequest } from './baseApi'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth'


export function login(payload: LoginRequest): Promise<AuthResponse> {
  return httpRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export function register(payload: RegisterRequest): Promise<User> {
  return httpRequest<User>('/auth/register', {
    method: 'POST',
    body: payload,
  })
}

export function getMe(): Promise<User> {
  return httpRequest<User>('/auth/me')
}
