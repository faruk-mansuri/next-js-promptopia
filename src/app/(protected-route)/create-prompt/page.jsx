'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/components/Provider';
import { Form } from '@/components';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePrompt = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const { user } = useGlobalContext();

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/prompts/new', {
        userId: user._id,
        ...post,
      });
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='create'
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
