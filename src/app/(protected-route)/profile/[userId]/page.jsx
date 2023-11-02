'use client';

import { Loading, Profile } from '@/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = ({ params }) => {
  const { userId } = params;
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [prompts, setPrompts] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(false);

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchPrompts = async () => {
    if (!user) return;
    setIsLoadingPrompts(true);
    try {
      const response = await axios.get(`/api/prompts/users/${user._id}/posts`);
      setPrompts(response.data.prompts);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPrompts();
    }
  }, [user]);

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <Profile
      name={user?.username}
      desc={`Welcome to your personalized profile page. Explore ${user?.username} exceptional prompts and be inspired by the power of their imagination`}
      isLoadingPrompts={isLoadingPrompts}
      prompts={prompts}
    />
  );
};

export default UserProfile;
