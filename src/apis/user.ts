import request from "@/src/lib/client"

export interface LoginRequest {
  stuid: string
  password: string
}

export interface UserInfo {
  stuID: string
  name: string
  permissions: string[]
}

export interface LoginResponse {
  token: string
  info: UserInfo
}

export function userLogin(data: LoginRequest) {
  return request.post<LoginResponse>("/user/login", data)
}

export function getUserInfo() {
  return request.get<UserInfo>("/user/whoami")
}

export function userLogout() {
  return request.get("/user/logout")
}
