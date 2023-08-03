import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IPost } from '@/interfaces/post.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { postState, requestGetPostDetail } from '@/redux/slices/post.slice';
import LineSkeleton from '@/components/skeleton/LineSkeleton';

// const PostDetailPage = ({ post }: { post: IPost }) => {
const PostDetailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postReducer = useAppSelector(postState);
  const { postId } = router.query;

  useEffect(() => {
    if (postId) {
      dispatch(requestGetPostDetail(postId as string));
    }
  }, [postId]);

  if (postReducer.loading) return <LineSkeleton />;

  return (
    <div>
      <h3>{postReducer?.currentPost?.title}</h3>
      <div>{postReducer?.currentPost?.body}</div>
    </div>
  );
};

// export const getServerSideProps = async (context: any) => {
//   const { params } = context;
//   const { postId } = params;

//   const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//   const data = await response.json();

//   return {
//     props: {
//       post: data,
//     },
//   };
// };

export default PostDetailPage;
