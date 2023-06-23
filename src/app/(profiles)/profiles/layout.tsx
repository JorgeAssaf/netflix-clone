import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Netflix Clone - Profile',
}

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <body>{children}</body>
}
