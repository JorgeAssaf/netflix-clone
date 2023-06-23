import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/accions/getCurrentUser';
import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
export default async function Home() {

  const currentUser = await getCurrentUser();
  console.log(currentUser);

  if (!currentUser) {
    redirect('/auth');
  }
  return (
    <>
      <Navbar />
      <Banner />
      <MovieList title='Tre' />
    </>
  );
}
