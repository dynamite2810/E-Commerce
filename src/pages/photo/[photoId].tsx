import { useRouter } from 'next/router';
import React from 'react';

import { IPhoto } from '@/interfaces/photo.interface';
interface IPhotoDetailPage {
  photo: IPhoto;
}

const PhotoDetailPage = ({ photo }: IPhotoDetailPage) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return <div>{photo?.title}</div>;
};

export async function getStaticProps(context: any) {
  const { params } = context;
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.photoId}`);
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      photo: data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { photoId: '1' } }],
    fallback: true,
  };
}

export default PhotoDetailPage;
