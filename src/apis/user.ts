import type { UserInfo } from "@/src/models/user"
import request from "@/src/lib/client"

export interface LoginRequest {
  stuid: string
  password: string
}

export interface LoginResponse {
  token: string
  user: UserInfo
}

export async function userLogin(data: LoginRequest) {
  return await request.post<LoginResponse>("/user/login", data)
}

export async function getUserInfo() {
  return await request.get<UserInfo>("/user/whoami")
}

export async function userLogout() {
  return await request.get("/user/logout")
}
