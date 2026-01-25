import Navbar from "@/src/components/navbar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      {children}
    </div>
  )
}
