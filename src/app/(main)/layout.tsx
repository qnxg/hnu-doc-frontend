"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import Navbar from "@/src/components/navbar"
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
      {children}
    </div>
  )
}
