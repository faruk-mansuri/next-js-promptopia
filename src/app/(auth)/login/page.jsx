'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      toast.error('Please provide email and password');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', formData);
      toast.success('User logged in successfully');
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex justify-center my-20 mx-20'>
      <div className='w-full max-w-md border-2 border-orange-100 rounded-md p-4 shadow-md hover:shadow-lg transition-all '>
        <h1 className='text-4xl font-bold text-center tracking-wider text-orange-500 uppercase mt-4 mb-4'>
          Login
        </h1>
        <hr className='border-orange-100' />

        <form className='flex flex-col py-2 mt-8 gap-4'>
          {/* EMAIL */}
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='email'
              className='text-sm uppercase tracking-wider text-slate-500'
            >
              email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='email'
              className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
              value={formData.email}
              onChange={handleFormData}
            />
          </div>

          {/* PASSWORD */}
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='password'
              className='text-sm uppercase tracking-wider text-slate-500'
            >
              password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
              className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
              value={formData.password}
              onChange={handleFormData}
            />
          </div>

          {/* SUBMIT BTN */}
          <button
            onClick={handleLogin}
            type='submit'
            className='grid place-items-center mt-4 mb-4 p-2 border text-white uppercase  bg-orange-400  tracking-wide font-bold rounded-sm hover:bg-orange-500 transition-all '
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='animate-spin inline-block h-6 w-6  rounded-full border-4 border-white border-l-orange-600'></span>
            ) : (
              'Login'
            )}
          </button>
          <p className='text-center'>
            Do not have an account!{' '}
            <Link href='signup' className='text-blue-500'>
              Register?
            </Link>
          </p>
          <p className='text-center mt-2'>
            <Link
              href='forgot-password'
              className='text-orange-400 font-bold hover:text-orange-500'
            >
              Forgot password ?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
