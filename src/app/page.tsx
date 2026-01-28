"use client"

import { IconLoader, IconLogin2 } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { userLogin } from "@/src/apis/user"
import { useUser } from "@/src/contexts/user-context"

function LoginForm() {
  const { setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [{ stuID, password }, setForm] = useState({ stuID: "", password: "" })

  const router = useRouter()

  const handleLogin = () => {
    if (!stuID || !password) {
      toast.error("请填写学号和密码")
      return
    }

    setIsLoading(true)
    userLogin({ stuid: stuID, password })
      .then((response) => {
        if (response.token && response.user) {
          document.cookie = `token=${response.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Strict; Secure`
          setUser(response.user)

          void router.push("/dashboard")
        }
      })
      .catch((error) => {
        switch (error.status) {
          case "PERMISSION_DENIED":
            toast.error("该账号已被封禁")
            break
          case "NOT_BIND_WEIHUDA":
            toast.error("请先绑定湖南大学微生活账号")
            break
          case "PASSWORD_ERROR":
            toast.error("学号或密码错误")
            break
          default:
            toast.error("登录失败，请稍后重试")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form className="w-96 h-144 p-8 rounded-lg shadow-md flex items-center justify-center">
      <FieldGroup className="w-full">
        <Field>
          <FieldLabel htmlFor="stu_id">学号</FieldLabel>
          <Input
            id="stu_id"
            type="text"
            value={stuID}
            onInput={e =>
              setForm(v => ({
                ...v,
                stuID: (e.target as HTMLInputElement).value,
              }))}
            placeholder="请输入学号"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">密码</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onInput={e =>
              setForm(v => ({
                ...v,
                password: (e.target as HTMLInputElement).value,
              }))}
            placeholder="请输入密码"
          />
        </Field>
        <Field>
          <Button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading
              ? <IconLoader className="animate-spin" />
              : <IconLogin2 />}
            登录
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default function IndexPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between">
        <div className="flex-1 flex flex-col gap-8">
          <span className="text-5xl">湖南大学试卷库</span>
          <span className="text-3xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto consequatur cupiditate dolorem doloribus ducimus eligendi esse exercitationem explicabo ipsam libero maxime nisi nostrum, nulla odit quas quia ratione rem!</span>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
