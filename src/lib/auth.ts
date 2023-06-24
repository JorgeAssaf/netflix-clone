import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user || !user.hashedPassword) {
            throw new Error('Email does not exist');
          }

          const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

          if (!isCorrectPassword) {
            throw new Error('Incorrect password');
          }

          return user;
        } catch (error: any) {
          console.log(error.message)
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/auth',
    error: '/auth'

  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};