import type { User } from "./auth"

export interface Message {
  id: string
  user: string
  chat: string
  text: string
  created_at: string
  chat_user: User
}

export interface MessageRequest {
  chat: string
  text: string
}