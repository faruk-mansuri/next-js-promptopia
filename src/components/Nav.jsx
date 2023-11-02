'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useGlobalContext } from './Provider';

const Nav = () => {
  const { user, setUser } = useGlobalContext();

  const router = useRouter();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const signOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
      toast.success('Logout successfully');
      router.replace('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.meg);
    }
  };

  return (
    <nav className='w-full mb-16 pt-3 flex justify-between '>
      <Link href='/' className='flex gap-2 '>
        <Image
          src='/assets/images/logo.svg'
          alt='promptopia logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text place-self-center '>Promptopia</p>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className='md:flex hidden'>
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>
            Create Post
          </Link>

          <button type='button' className='outline_btn' onClick={signOut}>
            Sign Out
          </button>

          <Link href='/profile'>
            <Image
              src='/assets/images/logo.svg'
              alt='profile-img'
              width={37}
              height={37}
            />
          </Link>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className='md:hidden flex relative cursor-pointer '>
        <div className='flex'>
          <Image
            src={user?.avatar || '/assets/images/default-user.png'}
            alt='profile-img'
            width={50}
            height={50}
            onClick={() => setToggleDropDown((preState) => !preState)}
          />

          {toggleDropDown && (
            <div className='dropdown'>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>

              <Link
                href='create-prompt'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                Create Prompt
              </Link>

              <button
                type='button'
                className='mt-5 w-full black_btn'
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
