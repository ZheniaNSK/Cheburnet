import type { User } from "./auth"

export interface Chat {
  id: string
  user1: string
  user2: string
  created_at: string
  chat_user: User
}

export interface ChatRequest {
  user2: string
}
