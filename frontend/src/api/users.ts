import type { User } from "../types/auth";
import { httpRequest } from "./baseApi";

export function list_users(): Promise<User[]> {
  return httpRequest<User[]>('/auth/all_users')
}