import React from 'react';

interface IWrap {
  children: React.ReactNode;
  background?: string;
  className?: string;
  style ?: Object
}

const Wrap = ({ children, background, className , style }: IWrap) => {
  return (
    <div className={`p-0 ${background ? background : ''} ${className || ''}`} style={{paddingLeft : '10%' , paddingRight : '10%'}}>
      {children}
    </div>
  );
};

export default Wrap;
