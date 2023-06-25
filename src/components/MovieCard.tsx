'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon, PlayIcon } from 'lucide-react'
import { MovieInterface } from '@/types/movies'
import Image from 'next/image'

interface MovieCardProps {
  movies: MovieInterface
}

const MovieCard: React.FC<MovieCardProps> = ({ movies: data }) => {
  const router = useRouter()

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  )

  return (
    <div className='col-span group relative bg-zinc-900  '>
      <Image
        onClick={() => router.push(`/movie/${data.id}`)}
        src={data.thumbnailUrl}
        alt='Movie'
        width={300}
        height={450}
        draggable={false}
        className='
          duration
          h-full
          w-full
          cursor-pointer
          rounded-t-md
          object-cover
          shadow-xl
          transition
        '
      />
      <div
        className='
      invisible
        absolute
        top-0
        z-10
        h-full
        w-full
        scale-0
        items-center
        opacity-0
        transition
        duration-200
        delay-300
        group-hover:-translate-y-[11vw]
        group-hover:translate-x-[1px]
        group-hover:scale-110
        group-hover:opacity-100
        sm:visible
      '
      >
        <Image
          onClick={() => router.push(`/movie/${data.id}`)}
          src={data.thumbnailUrl}
          alt='Movie'
          width={300}
          height={450}
          draggable={false}
          className='
          duration
          h-full
          w-full
          cursor-pointer
          rounded-t-md
          object-cover
          shadow-xl
          transition
        '
        />
        <div
          className='
          absolute
          z-10
          w-full
          rounded-b-md
          bg-zinc-800
          p-2
          shadow-md
          transition
          lg:p-4
          '
        >
          <div className='flex flex-row items-center gap-3'>
            <div
              onClick={redirectToWatch}
              className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10'
            >
              <PlayIcon className='w-4 text-black lg:w-6' />
            </div>
            {/* <FavoriteButton movieId={data.id} /> */}
            <div
              onClick={() => router.push(`/movie/${data.id}`)}
              className='group/item ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10'
            >
              <ChevronDownIcon className='w-4 text-white group-hover/item:text-neutral-300 lg:w-6' />
            </div>
          </div>
          <p className='mt-4 font-semibold text-green-400'>
            New <span className='text-white'>2023</span>
          </p>
          <div className='mt-4 flex flex-row items-center gap-2'>
            <p className='text-[10px] text-white lg:text-sm'>{data.duration}</p>
          </div>
          <div className='mt-4 flex flex-row items-center gap-2 text-[8px] text-white lg:text-sm'>
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
