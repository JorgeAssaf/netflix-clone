'use client'

import { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'

const Auth = () => {
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/profiles'
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
        password
      })

      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <div className="absolute h-full w-full bg-[url('/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className='h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/logo.png' className='h-12' alt='Logo' />
        </nav>
        <div className='flex justify-center'>
          <div className='mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md'>
            <h2 className='mb-8 text-4xl font-semibold text-white'>
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

              {error ? <p className='text-sm text-red-500'>{error}</p> : null}
            </div>
            <Button
              variant='netflix'
              size={variant === 'login' ? 'full' : 'default'}
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </Button>
            <div className='mt-8 flex flex-row items-center justify-center gap-4'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              ></div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              ></div>
            </div>
            <p className='mt-12 text-neutral-500'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='ml-1 cursor-pointer text-white hover:underline'
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
