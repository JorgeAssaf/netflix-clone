'use client'
import { useRouter } from 'next/navigation'
import { useMovie } from '@/hooks/useMovie'
import { ArrowLeft } from 'lucide-react'
import { Metadata, ResolvingMetadata } from 'next'


const Watch = ({
  params: { movieId },
}: {
  params: { movieId: string }
}) => {
  const router = useRouter()


  const { movie, isError, isLoading } = useMovie(movieId)

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>error...</div>

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed z-10 flex w-full flex-row items-center gap-8 bg-black bg-opacity-70 p-4'>
        <ArrowLeft
          onClick={() => router.push('/')}
          className='w-4 cursor-pointer text-white transition hover:opacity-80 md:w-10'
        />
        <p className='text-1xl font-bold text-white md:text-3xl'>
          <span className='font-light'>Watching:</span> {movie?.title}
        </p>
      </nav>
      <video
        className='h-full w-full'
        autoPlay
        controls
        src={movie?.videoUrl}
      ></video>
    </div>
  )
}

export default Watch
