import { getCurrentUser } from "@/accions/getCurrentUser"
import { redirect } from "next/navigation"

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth")
  }
  return (
    <body>
      {children}
    </body>
  )
}
