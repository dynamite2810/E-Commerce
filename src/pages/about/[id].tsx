import { useRouter } from 'next/router';
import React from 'react';

const AboutDetail = () => {
  const router = useRouter();

  return <div>About detail: {JSON.stringify(router.query)}</div>;
};

export default AboutDetail;
