import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Netflix Clone with Next.js 13',
  authors: [{ name: 'Jorge Assaf', url: 'assafdev.xyz' }],
  keywords: [
    'Web Development',
    'Next.js',
    'Netflix',
    'Clone',
    'Tailwind CSS',
    'TypeScript',
    'Jorge Assafs',
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  applicationName: 'Netflix Clone',
  category: 'Web Development',
  colorScheme: 'dark',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className={inter.className}>
      {children}
    </html>
  )
}
