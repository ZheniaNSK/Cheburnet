import { httpRequest } from './baseApi'
import type { Chat, ChatRequest } from '../types/chats'


export function list_chats(): Promise<Chat[]> {
  return httpRequest<Chat[]>('/chat')
}

export function get_chat(id: string): Promise<Chat> {
  return httpRequest<Chat>(`/chat/${id}`)
}

export function create_chat(payload: ChatRequest): Promise<Chat> {
  return httpRequest<Chat>('/chat', {
    method: 'POST',
    body: payload,
  })
}
