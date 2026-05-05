import { httpRequest } from './baseApi'
import type { Message, MessageRequest } from '../types/message'


export function list_messages(chat_id: string): Promise<Message[]> {
  return httpRequest<Message[]>(`/chat/${chat_id}/get_massages`)
}

export function create_message(chat_id: string, payload: MessageRequest): Promise<Message> {
  return httpRequest<Message>(`/chat/${chat_id}/send_message`, { method: "POST", body: payload })
}
