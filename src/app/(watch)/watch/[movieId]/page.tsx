'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMovie } from '@/hooks/useMovie'
import { ArrowLeft } from 'lucide-react'
import ReactHlsPlayer from 'react-hls-player'
import videojs from 'video.js'
import VideoPlayer from '@/components/video-player'
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
  const { movie, isError, isLoading } = useMovie(movieId)
  console.log(movie?.videoUrl);
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
        <VideoPlayer url={movie?.videoUrl} />
      ) : (
        <video src={movie?.videoUrl} controls className='h-full w-full'></video>
      )}
    </div>
  )
}

export default Watch
