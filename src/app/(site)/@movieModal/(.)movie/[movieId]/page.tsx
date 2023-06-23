'use client'

import { Play, X } from 'lucide-react'
import Modal from '@/components/Modal'
import { useMovie } from '@/hooks/useMovie'
import { useRouter } from 'next/navigation'



const MovieModal = ({
  params: { movieId },
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
          className='w-full brightness-[60%] object-cover h-full'
        />
        <button
          onClick={() => router.back()}
          className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
        >
          <X className='text-white w-6' />
        </button>
        <div className='absolute bottom-[10%] left-10'>
          <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
            {movie?.title}
          </p>
          <div className='flex flex-row gap-4 items-center'>
            <Play />
            {/* <FavoriteButton movieId={data?.id} /> */}
          </div>
        </div>
      </div>

      <div className='px-12 py-8'>
        <div className='flex flex-row items-center gap-2 mb-8'>
          <p className='text-green-400 font-semibold text-lg'>New</p>
          <p className='text-white text-lg'>{movie?.duration}</p>
          <p className='text-white text-lg'>{movie?.genre}</p>
        </div>
        <p className='text-white text-lg'>{movie?.description}</p>
      </div>
    </Modal>
  )
}

export default MovieModal
