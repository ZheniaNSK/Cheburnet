import { httpRequest } from './baseApi'
import type { Message } from '../types/message'


export function list_messages(chat_id: string): Promise<Message[]> {
  return httpRequest<Message[]>(`/chat/${chat_id}/get_massages`)
}

export function create_messages(chat_id: string, payload: Message): Promise<Message> {
  return httpRequest<Message>(`/chat/${chat_id}/send_messages`, { method: "POST", body: payload })
}
