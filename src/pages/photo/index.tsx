import React from 'react';

import { IPhoto } from '@/interfaces/photo.interface';
interface IPhotoPage {
  photos: IPhoto[];
}

const PhotoPage = ({ photos }: IPhotoPage) => {
  return (
    <div>
      {photos?.map((photo: IPhoto, key: number) => (
        <div key={key}>
          <div>{photo.title}</div>
          {/* <img src={photo.url} alt="url" /> */}
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const data = await response.json();
  return {
    props: {
      photos: data,
    },
  };
}

export default PhotoPage;
