import React from 'react';
import useSWR from 'swr';

import { IPost } from '@/interfaces/post.interface';
import { getPosts } from '@/services/api/post.service';

interface IPostPage {
  posts: IPost[];
}

// const PostPage = ({ posts }: IPostPage) => {
const PostPage = () => {
  const { data, error, isLoading } = useSWR('api/post', getPosts);

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((post: IPost, key: number) => (
        <div key={key}>
          <h3>{post.title}</h3>
          <div>{post.body}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();

//   return {
//     props: {
//       posts: data,
//     },
//   };
// };

export default PostPage;
