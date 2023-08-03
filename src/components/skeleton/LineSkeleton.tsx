import React from 'react';
import { Skeleton } from 'antd';

const LineSkeleton = () => {
  return <Skeleton.Input className="TableSkeleton__loading" active />;
};

export default LineSkeleton;
