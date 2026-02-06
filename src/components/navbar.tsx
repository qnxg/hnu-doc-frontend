"use client"

import { IconHome, IconLogout, IconSearch, IconUpload, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/src/contexts/user-context"

export default function Navbar() {
  const { user, logout } = useUser()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!user) {
    return <></>
  }

  // 导航链接配置
  const navItems = [
    { href: "/dashboard", label: "首页", icon: IconHome },
    { href: "/search", label: "搜索", icon: IconSearch },
    { href: "/upload", label: "上传", icon: IconUpload },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="w-full py-2 md:py-4 shadow-md flex items-center justify-between px-4 md:px-8 bg-white">
      {/* 左侧标题 */ }
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="text-lg md:text-xl font-bold text-gray-900 hover:text-primary transition-colors"
        >
          湖南大学试卷库
        </Link>
      </div>

      {/* 中间导航菜单 - 仅桌面端显示 */ }
      <div className="hidden md:flex items-center space-x-1">
        { navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Icon size={16} />
                { item.label }
              </Button>
            </Link>
          )
        }) }
      </div>

      {/* 右侧用户菜单 */ }
      <div className="flex items-center">
        <DropdownMenu>
          { isClient
            ? (
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-gray-100"
                  >
                    {/* 用户头像 */ }
                    <div
                      className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium"
                    >
                      { user.name.charAt(0).toUpperCase() }
                    </div>

                    {/* 宽屏幕下显示用户名 */ }
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      { user.name }
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              )
            : (
                <></>
              )}

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <IconUser size={16} />
              用户信息
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm">
              <div className="font-medium text-gray-900">{ user.name }</div>
              <div className="text-gray-500 text-xs">
                { `学号: ${user.stuID}` }
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
              <IconLogout size={16} />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
