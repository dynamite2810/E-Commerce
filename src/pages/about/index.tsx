import { useRouter } from 'next/router';
import React from 'react';

const AboutPage = () => {
  const router = useRouter();

  const goToDetailPage = () => {
    router.push({
      pathname: '/about/[id]',
      query: {
        id: 1003,
        name: 'chien',
      },
    });
  };

  return (
    <>
      <div>AboutPage</div>
      <button onClick={goToDetailPage}>Go to about detail</button>
    </>
  );
};

export default AboutPage;
