import { Metadata, ResolvingMetadata } from 'next'

interface Props {
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
  const movie = await fetch(`netflix-clone-tau-opal.vercel.app/api/movies/${movieId}`)
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
