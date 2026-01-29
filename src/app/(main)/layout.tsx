"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import Navbar from "@/src/components/navbar"
import Tabbar from "@/src/components/tabbar"
import { useUser } from "@/src/contexts/user-context"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (!user?.stuID || !user.name) {
      void router.push("/")
    }
  }, [user])

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="flex flex-1 w-full items-center justify-center px-4 lg:px-16 pb-16 md:pb-4">
        {children}
      </div>
      <Tabbar />
    </div>
  )
}
