import React from 'react';
import { useRouter } from 'next/router';

import ProductItem from './components/ProductItem';
import { IProduct } from '@/interfaces/product.interface';
interface ISuggestProps {
  products: IProduct[];
}

const Suggest = ({ products }: ISuggestProps) => {
  const router = useRouter();

  return (
    <div className="w-full mt-6 pb-32">
      <div className="mb-3 font-medium font-sans text-2xl">Gợi ý hôm nay</div>
      <br />
      <div
        className="w-full max-lg:grid-cols-4 grid-cols-5 gap-x-6 gap-y-8"
        style={{ display: 'grid' }}
      >
        {products?.map((product: IProduct) => {
          return (
            <div
              className="text-black"
              style={{ textDecoration: 'none' }}
              key={product.id}
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
            >
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-1/4 text-center font-sans font-normal text-white text-2xl bg-dart-red py-3 cursor-pointer">
          Xem thêm
        </div>
      </div>
    </div>
  );
};

export default Suggest;
