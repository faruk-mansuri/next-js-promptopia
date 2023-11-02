import React from 'react';

const Loading = () => {
  return (
    <div className='grid place-content-center'>
      <div className='mx-auto my-8 animate-spin inline-block h-12 w-12  rounded-full border-4 border-white border-l-orange-600'></div>
    </div>
  );
};

export default Loading;
