'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const initialState = {
  password: '',
  confirmPassword: '',
};
const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = window.location.search.split('=')[1];
    setToken(token);
  }, []);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(
        'password not match! make sure password and confirm password must match'
      );
      return;
    }
    if (formData.password === '') {
      toast.error('please provide password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password: formData.confirmPassword,
      });
      toast.success('Password changed successfully');
      router.push('/login');
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center my-20'>
      <div className='w-96 border-2 border-purple-200 rounded-md p-4 shadow-md hover:shadow-lg transition-all '>
        <h1 className='text-4xl text-purple-400'>Reset Password</h1>
        {token ? (
          <div>
            <form className='flex flex-col py-2 mt-8 gap-4'>
              {/* PASSWORD */}
              <label
                htmlFor='password'
                className='text-sm uppercase tracking-wider text-slate-500'
              >
                password
              </label>
              <input
                id='password'
                name='password'
                type='text'
                className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
                value={formData.password}
                onChange={handleFormData}
              />
              {/* CONFIRM PASSWORD  */}
              <label
                htmlFor='confirm-password'
                className='text-sm uppercase tracking-wider text-slate-500'
              >
                confirm password
              </label>
              <input
                id='confirm-password'
                name='confirmPassword'
                type='password'
                className='px-2 py-1 bg-slate-100 rounded-sm tracking-wider'
                value={formData.confirmPassword}
                onChange={handleFormData}
              />

              {/* SUBMIT BTN */}
              <button
                type='submit'
                disabled={isLoading}
                onClick={handleResetPassword}
                className='mt-4 mb-4 px-2 py-1 border text-white uppercase  bg-purple-400  tracking-wide font-bold rounded-sm hover:bg-purple-500 transition-all '
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        ) : (
          'token not found'
        )}

        {isError && (
          <div>
            <h2 className='text-2xl text-red-700'>there was an error...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
