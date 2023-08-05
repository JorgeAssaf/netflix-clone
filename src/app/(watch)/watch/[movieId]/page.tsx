'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMovie } from '@/hooks/useMovie'
import { ArrowLeft } from 'lucide-react'
import ReactHlsPlayer from 'react-hls-player'
import { TheosPlayer } from '@aka_theos/react-hls-player'
// import { Metadata, ResolvingMetadata } from 'next'

// interface Props {
//   params: { movieId: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent?: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const movieId = params.movieId
//   console.log(movieId)
//   // fetch data
//   const movie = await fetch(`netflix-clone-tau-opal.vercel.app/api/movies/${movieId}`)
//   const res = await movie.json()
//   console.log(res)

//   return {
//     title: res?.title || 'Movie'
//   }
// }


const Watch = ({ params: { movieId } }: { params: { movieId: string } }) => {
  const router = useRouter()
  const playerRef = useRef<HTMLVideoElement>(null)
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
      {movie?.videoUrl.includes('.m3u8') ? (
        <ReactHlsPlayer
          playerRef={playerRef}
          src={movie?.videoUrl}
          autoPlay={false}
          controls={true}
          className='h-full w-full'
        />
      ) : (
        <video
          className='h-full w-full'
          autoPlay
          controls
          src={movie?.videoUrl}
        ></video>
      )}
    </div>
  )
}

export default Watch
