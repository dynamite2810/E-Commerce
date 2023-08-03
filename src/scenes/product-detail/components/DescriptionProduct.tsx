import React from 'react';

import { IProduct } from '@/interfaces/product.interface';

interface IDescriptionProductProps {
  product: IProduct;
}

const DescriptionProduct = ({ product }: IDescriptionProductProps) => {
  return (
    <div className="w-1/2">
      <div className="text-lg mb-2">Về sản phẩm này</div>
      <hr />
      <div className="py-4">
        <div className="text-base font-bold mb-3">Tổng quan</div>
        <p className='mr-5' dangerouslySetInnerHTML={{ __html: product?.overview } } />
      </div>
      <hr />
      <div className="py-4">
        <div className="text-base font-bold mb-3">Thông tin chi tiết sản phẩm</div>
        <p className='mr-5' dangerouslySetInnerHTML={{ __html: product?.description }} />
      </div>
      <hr />
      <div className="py-4">
        <div className="text-base font-bold mb-3">Giới hạn lại</div>
      </div>
      <hr />
    </div>
  );
};

export default DescriptionProduct;
