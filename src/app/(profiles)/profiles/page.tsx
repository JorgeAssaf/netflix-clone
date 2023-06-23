import { getCurrentUser } from '@/accions/getCurrentUser'

import Image from 'next/image'
import Link from 'next/link'

export default async function Profiles() {
  const currentUser = await getCurrentUser()


  return (
    <main className="grid place-content-center min-h-screen text-center ">
      <h2 className=' text-5xl ' >
        Who&apos;s watching?
      </h2>
      <Link href="/" className='my-10 flex justify-center'>
        <Image src='/default-blue.png' alt='Picture of the author' width={300} height={300} />
      </Link>
      <p className='text-lg'>
        {currentUser?.name}
      </p>

    </main>
  )

}
