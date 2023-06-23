import { getCurrentUser } from '@/accions/getCurrentUser'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Netflix Clone - Auth',

}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return <body >{children}</body>
}
