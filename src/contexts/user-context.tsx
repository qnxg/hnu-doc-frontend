"use client"

import type { UserInfo } from "@/src/models/user"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getUserInfo, userLogout } from "@/src/apis/user"

interface UserContextValue {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode
  initialUser?: UserInfo | null
}) {
  const [user, setUser] = useState<UserInfo | null>(initialUser)

  useEffect(() => {
    if (!user) {
      getUserInfo()
        .then(response => setUser(response))
        .catch(() => setUser(null))
    }
  }, [user])

  const logout = () => {
    userLogout()
      .then(() => setUser(null))
      .catch(() => {
        console.error("Logout failed")
      })
  }

  const value = useMemo<UserContextValue>(() => ({ user, setUser, logout }), [user, logout])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error("useUser must be used within an UserContext")
  }
  return ctx
}
