'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();
  // console.log(user.email)

  const handleLogout = async () => {
    try {

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link href='/'>
        <Image src='/logo.png' width={150} height={50} alt='logo' className="w-14  md:w-36" />
      </Link>

    </div>
  );
};

export default Navbar;