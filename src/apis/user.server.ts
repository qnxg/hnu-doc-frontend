import type { UserInfo } from "@/src/apis/user"
import request from "@/src/lib/server"

export function getUserInfoServer() {
  return request.get<UserInfo>("/user/whoami")
}
