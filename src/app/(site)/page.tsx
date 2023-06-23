import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/accions/getCurrentUser';
import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
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
      <section className='md:space-y-24'>
        <div className='flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-evenly md:items-start md:px-4 md:py-8'>
          adasd
        </div>


      </section>
    </>
  );
}
