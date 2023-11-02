import Loading from './Loading';
import PromptCard from './PromptCard';

const PromptCardList = ({ prompts, isLoading, handleTagClick }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='mt-16 prompt_layout'>
      {prompts.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

export default PromptCardList;
