import prisma from '@/lib/prisma'
import { FC } from 'react'
import MovieCard from './MovieCard'

interface MovieListProps {
  title: string
}
const getMovies = async () => {
  const movies = await prisma.movie.findMany()
  return movies
}
const MovieList: FC<MovieListProps> = async ({ title }) => {
  const movies = await getMovies()
  return (
    <div className='my-4 space-y-8 px-4 md:px-12'>
      <div>
        <p className='text-md mb-4 font-semibold text-white md:text-xl lg:text-2xl'>
          {title}
        </p>
        <div className='grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-4'>
          {movies.map((movie) => (
            <MovieCard movies={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
