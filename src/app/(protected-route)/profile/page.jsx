'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/components/Provider';
import { Loading, Profile } from '@/components';

const ProfilePage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (promptId) => {
    router.push(`update-prompt?promptId=${promptId}`);
  };

  const handleDelete = async (promptId) => {
    const hasConfirm = confirm('Are you sure you want to delete this prompt?');
    if (hasConfirm) {
      try {
        await axios.delete(`/api/prompts/${promptId}`);
        const filteredPrompts = prompts.filter(
          (prompt) => prompt._id !== promptId
        );
        toast.success('Prompt deleted successfully');
        setPrompts(filteredPrompts);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const fetchPrompts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/prompts/users/${user._id}/posts`);
      setPrompts(response.data.prompts);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      prompts={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
