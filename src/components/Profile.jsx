import Loading from './Loading';
import PromptCard from './PromptCard';
import Link from 'next/link';

const Profile = ({
  name,
  desc,
  prompts,
  handleEdit,
  handleDelete,
  isLoadingPrompts,
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} profile</span>
      </h1>

      <p className='desc text-left'>{desc}</p>

      {isLoadingPrompts ? (
        <Loading />
      ) : prompts < 1 ? (
        <div className='mt-10'>
          <h1 className='text-3xl'>No prompt found</h1>
          <Link
            href='/create-prompt'
            className='inline-block mt-4 py-1 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600'
          >
            Create Prompt
          </Link>
        </div>
      ) : (
        <div className='mt-16 prompt_layout'>
          {prompts.map((prompt) => {
            return (
              <PromptCard
                key={prompt._id}
                post={prompt}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Profile;
