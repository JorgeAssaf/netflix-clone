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
    <div className="px-4 md:px-12 my-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1 gap-5">
          {
            movies.map((movie) => (
              <MovieCard movies={movie} key={movie.id} />
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default MovieList