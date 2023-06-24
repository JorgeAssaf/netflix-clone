'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
const Navbar = () => {
  return (
    <div className='absolute z-[100] flex w-full items-center justify-between p-4'>
      <Link href='/'>
        <Image
          src='/logo.png'
          width={150}
          height={50}
          alt='logo'
          className='w-28 md:w-36'
        />
      </Link>
      <Button
        onClick={() => signOut({ callbackUrl: '/auth' })}
        size={'lg'}
        className='m-0'
        variant={'netflix'}
      >
        Logout
      </Button>
    </div>
  )
}

export default Navbar
