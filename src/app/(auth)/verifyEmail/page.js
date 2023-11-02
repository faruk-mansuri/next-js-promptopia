'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [token, setToken] = useState(null);
  const [verified, setVerified] = useState(false);
  const [isError, setIsError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyEmail', { token });
      setVerified(true);
    } catch (error) {
      setIsError(true);
      toast.error(error.response.data.msg);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const token = window.location.search.split('=')[1];
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) verifyUserEmail();
  }, [token]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>Verify your email</h1>
      <h2 className='mt-4 text-3xl p-2 bg-purple-400 rounded-lg'>
        {token ? token : 'token not found'}
      </h2>

      {verified && (
        <div className='grid place-items-center'>
          <h2 className='text-2xl'>Email verified</h2>
          <Link
            href='/login'
            className='mt-4 bg-purple-400 rounded-md px-4 py-2'
          >
            Login
          </Link>
        </div>
      )}

      {isError && (
        <div>
          <h2 className='text-2xl text-red-700'>there was an error...</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
