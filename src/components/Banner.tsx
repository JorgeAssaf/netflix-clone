import { Info, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'

const getRandom = async () => {
  const count = await prisma.movie.count()

  const random = Math.floor(Math.random() * count)
  const movie = await prisma.movie.findFirst({
    skip: random,
    take: 1
  })

  return movie
}

const Banner = async () => {
  const data = await getRandom()

  return (
    <div className='md:h-[700px] h-[600px] w-full text-white'>
      <div className='absolute w-full  bg-gradient-to-r from-black'></div>
      <video
        poster={data?.thumbnailUrl}
        className='h-full  w-full object-cover object-center brightness-50 '
        src={data?.videoUrl}
        width={1920}
        height={1080}
        autoPlay
        loop
        muted
      />
      <div className='absolute top-[25%] w-full space-y-3 p-4 md:p-8'>
        <h1 className='text-4xl font-bold md:text-6xl'>{data?.title}</h1>
        <div className=''></div>
        <p className=' text-sm text-gray-400'>
          Released: <span className='text-green-500'>New</span> | Rated:{' '}
          {data?.genre === 'Comedy' || 'Adventure' ? 'B' : 'A'} | Time:{' '}
          {data?.duration} | Genre: {data?.genre}
        </p>
        <p className='w-full text-gray-200 md:max-w-[70%] lg:max-w-[70%] xl:max-w-[40%]'>
          {data?.description}
        </p>
        <div className='flex items-center'>
          <Button asChild variant={'ghost'}>
            <Link
              href={`/movie/${data?.id}`}
              className={` border  border-gray-300 bg-gray-300 px-5 py-2 text-black`}
            >
              <Info className='mr-2 inline-block' size={20} />
              <span>More Info</span>
            </Link>
          </Button>

          <Button
            variant={'ghost'}
            className='ml-4 border border-gray-300 px-5 py-2 text-white'
          >
            Watch Later
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Banner
