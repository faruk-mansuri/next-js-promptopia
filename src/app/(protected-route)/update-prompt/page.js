'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalContext } from '@/components/Provider';
import { Form, Loading } from '@/components';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePrompt = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const { user } = useGlobalContext();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('promptId');
  const [prompt, setPrompt] = useState(null);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return toast.error('Prompt ID not found');
    try {
      const response = await axios.patch(`/api/prompts/${promptId}`, {
        ...post,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSinglePrompt = async () => {
    setIsLoadingPrompt(true);
    try {
      const response = await axios.get(`/api/prompts/${promptId}`);
      const singlePrompt = response.data.prompt;
      setPrompt(singlePrompt);
      setPost({ prompt: singlePrompt.prompt, tag: singlePrompt.tag });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  useEffect(() => {
    if (promptId) getSinglePrompt();
  }, [promptId]);

  if (isLoadingPrompt) {
    return <Loading />;
  }

  if (!prompt) {
    return (
      <div className='mt-10'>
        <h1 className='text-3xl'>No prompt found with ID : {promptId}</h1>
      </div>
    );
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
