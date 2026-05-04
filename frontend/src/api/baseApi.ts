import type { ApiErrorPayload, User, UserStorage } from '../types/auth.ts'
import { message } from "antd"


type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN_STORAGE_KEY = 'accessToken'
const USER_STORAGE_KEY = 'user'

export function getAccessTokenInStorage(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAccessTokenInStorage(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearAccessTokenInStorage(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export function getUserInStorage(): UserStorage | null {
  const user_str = localStorage.getItem(USER_STORAGE_KEY)
  return user_str ? JSON.parse(user_str) as UserStorage : null
}

export function setUserInStorage(user: UserStorage): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearUserInStorage(): void {
  localStorage.removeItem(USER_STORAGE_KEY)
}

interface RequestOptions extends Omit<RequestInit, 'method' | 'body' | 'headers'> {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  auth?: boolean
}

export async function httpRequest<T>(
  path: string,
  { method = 'GET', body, headers = {} }: RequestOptions = {},
): Promise<T> {
  let requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  const token = getAccessTokenInStorage()
  if (token) {
    requestHeaders = {
      ...requestHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}/`, {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (response.status === 204) {
    return undefined as T
  }

  const data = (await response.json().catch(() => null)) as T | ApiErrorPayload | null

  if (!response.ok) {
    const payload = (data ?? undefined) as ApiErrorPayload | undefined
    const msg = payload?.message ?? `HTTP ${response.status}`

    if (response.status === 401 || response.status === 403 && !["/auth/login", "/auth/register"].includes(path)) {
      window.location.href = "/auth/login"
    }

    message.error(msg)
  }

  return data as T
}
