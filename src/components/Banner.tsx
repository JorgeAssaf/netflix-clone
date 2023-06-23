import { Info, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

import prisma from '@/lib/prisma'
import Link from 'next/link'

const getRandom = async () => {
  const count = await prisma.movie.count()

  const random = Math.floor(Math.random() * count)
  const movie = await prisma.movie.findFirst({
    skip: random,
    take: 1,
  })

  return movie
}

const Banner = async () => {
  const data = await getRandom()
  console.log(data
  );
  return (

    <div className='w-full h-[600px] text-white'>

      <div className='absolute w-full  bg-gradient-to-r from-black'></div>
      <video
        poster={data?.thumbnailUrl}
        className='w-full  h-full brightness-50 object-cover object-center '
        src={data?.videoUrl}
        width={1920}
        height={1080}
        autoPlay
        loop
        muted
      />
      <div className='absolute w-full space-y-3 top-[20%] p-4 md:p-8'>
        <h1 className='text-4xl md:text-5xl font-bold'>{data?.title}</h1>
        <div className=''>

        </div>
        <p className=' text-sm text-gray-400'>
          Released: <span className='text-green-500'>New</span> | Rated: R | Time: {data?.duration} | Genre: {data?.genre}
        </p>
        <p className='w-full md:max-w-[70%] lg:max-w-[70%] xl:max-w-[40%] text-gray-200'>
          {data?.description}
        </p>
        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
          Play
        </button>
        <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
          Watch Later
        </button>
      </div>

    </div>
  )
}
export default Banner
