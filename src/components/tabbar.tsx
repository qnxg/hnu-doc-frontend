"use client"

import { IconHome, IconSearch, IconUpload } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/src/contexts/user-context"

export default function Tabbar() {
  const { user } = useUser()
  const pathname = usePathname()

  // 如果用户未登录，不显示 tabbar
  if (!user) {
    return null
  }

  // 导航链接配置
  const navItems = [
    { href: "/dashboard", label: "首页", icon: IconHome },
    { href: "/search", label: "搜索", icon: IconSearch },
    { href: "/upload", label: "上传", icon: IconUpload },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="w-full bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full flex flex-col items-center gap-1 py-2 px-1 h-auto rounded-lg transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
