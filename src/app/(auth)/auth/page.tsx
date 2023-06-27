'use client'

import { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
          <Image
            src='/logo.png'
            width={150}
            height={50}
            alt='logo'
            className='w-28 md:w-36'
          />
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
              className='mt-10'
              size={variant === 'login' ? 'full' : 'default'}
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </Button>
            <div className='mt-8 flex flex-row items-center justify-center gap-4'>
              <Button
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='flex  w-auto cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              >
                <svg
                  width='24px'
                  height='24px'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path
                      d='M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z'
                      fill='#4285F4'
                    ></path>{' '}
                    <path
                      d='M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z'
                      fill='#34A853'
                    ></path>{' '}
                    <path
                      d='M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z'
                      fill='#FBBC05'
                    ></path>{' '}
                    <path
                      d='M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z'
                      fill='#EB4335'
                    ></path>{' '}
                  </g>
                </svg>
              </Button>
              {/* <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              ></div> */}
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
