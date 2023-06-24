import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { movieId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const movieId = params.movieId
  console.log(movieId)
  // fetch data
  const movie = await fetch(`http://localhost:3000/api/movies/${movieId}`)
  const res = await movie.json()
  console.log(res)

  return {
    title: res?.title || 'Movie'
  }
}
export default function watchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <body>{children}</body>
}
