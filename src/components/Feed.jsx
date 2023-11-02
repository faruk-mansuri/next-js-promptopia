'use client';
import { useState, useEffect } from 'react';
import PromptCardList from './PromptsCardList';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleTagClick = (tag) => {
    if (tag.startsWith('#')) {
      setSearchText(tag.slice(1));
    } else {
      setSearchText(tag);
    }
  };

  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/prompts?search=${searchText}`);
      setPrompts(response.data.prompts);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      console.log(searchText);
      fetchPrompts();
    }, 750);
    return () => clearTimeout(timeOutID);
  }, [searchText]);

  return (
    <div className='feed'>
      <form className='relative w-full flex '>
        <input
          type='text'
          placeholder='Search for a tag or username'
          className='search_input peer'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>

      {isLoading ? (
        <Loading />
      ) : prompts.length < 1 ? (
        <div className='mt-10'>
          <h1 className='text-3xl'>No prompt found</h1>
        </div>
      ) : (
        <PromptCardList
          prompts={prompts}
          isLoading={isLoading}
          handleTagClick={handleTagClick}
        />
      )}
    </div>
  );
};

export default Feed;
