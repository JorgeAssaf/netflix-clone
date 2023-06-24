'use client'

import { useRouter } from 'next/navigation'
import { PlayIcon, X } from 'lucide-react'
import Modal from '@/components/Modal'
import { useMovie } from '@/hooks/useMovie'

const MovieModal = ({
  params: { movieId }
}: {
  params: { movieId: string }
}) => {
  const router = useRouter()
  const { movie, isError, isLoading } = useMovie(movieId)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <Modal>
      <div className='relative h-96'>
        <video
          poster={movie?.thumbnailUrl}
          autoPlay
          muted
          loop
          src={movie?.videoUrl}
          className='h-full w-full object-cover brightness-[60%]'
        />
        <button
          onClick={() => router.back()}
          className='absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70'
        >
          <X className='w-6 text-white' />
        </button>
        <div className='absolute bottom-[10%] left-10'>
          <p className='mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
            {movie?.title}
          </p>
          <div
            onClick={() => router.push(`/watch/${movie?.id}`)}
            className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10'
          >
            <PlayIcon className='w-4 text-black lg:w-6' />
          </div>
          {/* <FavoriteButton movieId={data?.id} /> */}
        </div>
      </div>

      <div className='px-12 py-8'>
        <div className='mb-8 flex flex-row items-center gap-2'>
          <p className='text-lg font-semibold text-green-400'>New</p>
          <p className='text-lg text-white'>{movie?.duration}</p>
          <p className='text-lg text-white'>{movie?.genre}</p>
        </div>
        <p className='text-lg text-white'>{movie?.description}</p>
      </div>
    </Modal>
  )
}

export default MovieModal
