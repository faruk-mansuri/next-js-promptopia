'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';

const GlobalContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/users/current-user');
      setUser(response.data.user);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
