'use client'

import axios from 'axios'
import { useCallback, useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Auth = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])
  useEffect(() => {
    setError(params.get('error') as string)
  }, [params])
  console.log(error)
  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <div className="absolute h-full w-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/logo.png' className='h-12' alt='Logo' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id='name'
                  type='text'
                  label='Username'
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id='email'
                type='email'
                label='Email address or phone number'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type='password'
                id='password'
                label='Password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />

              {error ? <p className='text-red-500 text-sm'>{error}</p> : null}
            </div>
            <Button
              variant='netflix'
              size={variant === 'login' ? 'full' : 'default'}
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </Button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              ></div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              ></div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
