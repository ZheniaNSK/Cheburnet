export interface Message {
  id: string
  user: string
  chat: string
  text: string
  created_at: string
}

export interface MessageRequest {
  chat: string
  text: string
}