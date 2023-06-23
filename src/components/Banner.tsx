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
    <div className='relative h-[30vh] md:h-[90.25vh] w-full overflow-hidden text-white'>
      <div className='h-[30vh] md:h-[90.25vh] w-full'>
        <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-br from-black/70 to-black/70'></div>
        <video
          poster={data?.thumbnailUrl}
          className='w-screen  h-full brightness-50 object-cover object-center '
          src={data?.videoUrl}
          width={1920}
          height={1080}
          autoPlay
          loop
          muted
        />
        <div className='absolute top-[30%] ml-4 w-3/5 lg:w-2/4 space-y-3 md:top-[30%] md:ml-16'>
          <p className='text-1xl h-full w-full  font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl'>
            {data?.title}
          </p>

          <p className='text-[0.5rem] md:text-sm
           text-gray-400'>
            Released: <span className='text-green-500'>New</span> | Rated: R | Time: {data?.duration} | Genre: {data?.genre}
          </p>
          <p className='  text-[8px]  text-white drop-shadow-xl  md:text-lg '>
            {data?.description}
          </p>
          <div className='mt-3 flex flex-row items-center gap-3 md:mt-4'>
            {/* <PlayButton movieId={data.id} /> */}
            <Link href={`/movie/${data?.id}`}

              className='flex
              w-auto 
              text-[0.5rem]
              md:text-sm
              flex-row 
              items-center rounded-md 
              bg-white/30 px-2
              py-[0.2rem]
              text-xs font-semibold 
              text-white
              transition
              hover:bg-opacity-20
              md:px-4
              md:py-2
              lg:text-lg
            '
            >
              <Info className='mr-1 w-4 md:w-7' />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner
