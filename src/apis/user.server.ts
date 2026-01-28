import type { UserInfo } from "@/src/apis/user"
import request from "@/src/lib/server"

export async function getUserInfoServer() {
  return await request.get<UserInfo>("/user/whoami")
}
