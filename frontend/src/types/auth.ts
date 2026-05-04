export interface User {
  id: string
  username: string
  name: string
}

export interface UserStorage {
  id: string
  user: string
}

export interface AuthResponse extends UserStorage {
  accessToken: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
}

export interface ApiErrorPayload {
  message: string
}
