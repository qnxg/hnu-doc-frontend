import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import React from "react"
import { Toaster } from "sonner"
import { getUserInfoServer } from "@/src/apis/user.server"
import { UserProvider } from "@/src/contexts/user-context"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "湖南大学试卷库",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserInfoServer()
    .then(response => response)
    .catch(() => null)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${geistMono.variable} antialiased`}
      >
        <UserProvider initialUser={user}>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}
