import React from 'react';
import Image from 'next/image';

interface IItemProps {
  name: string;
  price: string;
}

interface IPropsProduct {
  item: IItemProps;
}

const ProductItemCart = ({ item }: IPropsProduct) => {
  const displayText = item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name;
  return (
    <>
      <div className="w-full shadow-sm transition ease-in-out duration-500 hover:shadow-md hover:-translate-y-0.5 flex items-center mb-2">
        <Image
          src="https://image.uniqlo.com/GU/ST3/jp/imagesgoods/346495/item/jpgoods_08_346495.jpg?width=300"
          alt={''}
          width={50}
          height={50}
        />
        <div className="text-xl overflow-hidden text-ellipsis font-sans ml-2">{displayText}</div>
        <p className=" ml-auto font-sans text-xl" style={{ color: '#FD0101' }}>
          {item.price}
        </p>
      </div>
    </>
  );
};

export default ProductItemCart;
