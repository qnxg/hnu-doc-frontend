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
    <div className="flex flex-col h-screen items-center">
      <Navbar />
      <div className="flex flex-1 w-full overflow-y-scroll items-start justify-center pt-4 md:pt-8 px-4 lg:px-16">
        {children}
      </div>
      <Tabbar />
    </div>
  )
}
