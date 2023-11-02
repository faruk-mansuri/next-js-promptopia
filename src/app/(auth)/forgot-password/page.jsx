'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerificationEmail = async (e) => {
    e.preventDefault();
    if (email === '') {
      toast.error('Please provide email');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center my-20'>
      <div className='w-96 border-2 border-purple-200 rounded-md p-4 shadow-md hover:shadow-lg transition-all '>
        <h1 className='text-3xl text-center text-purple-400 my-6'>
          Forgot Password
        </h1>
        <hr />

        <form className='flex flex-col py-2 '>
          {/* EMAIL */}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SUBMIT BTN */}
          <button
            onClick={handleSendVerificationEmail}
            type='button'
            className='mt-4 mb-4 px-2 py-1 border text-white uppercase  bg-purple-400  tracking-wide font-bold rounded-sm hover:bg-purple-500 transition-all '
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
