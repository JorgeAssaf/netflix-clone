import { getCurrentUser } from "@/accions/getCurrentUser"
import { redirect } from "next/navigation"

export default async function SiteLayout({
  children,
  movieModal,
}: {
  children: React.ReactNode,
  movieModal: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth")
  }
  return (
    <body>
      {children}

      {movieModal}
    </body>
  )
}
