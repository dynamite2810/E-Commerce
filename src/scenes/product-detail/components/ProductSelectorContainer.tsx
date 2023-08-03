import React, { useState } from 'react';
import { SIZE } from '@/helper/property';
import { IColor, IProduct, ISize } from '@/interfaces/product.interface';
import { ApiClient } from '@/configs/api.config';

interface IProductSelectorContainerProps {
  product: IProduct;
}

const ProductSelectorContainer = ({ product }: IProductSelectorContainerProps) => {
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [currentSize, setCurrentSize] = useState<string>('');
  const [colorID, setColorID] = useState<string>('');
  const [sizeID, setSizeID] = useState<string>('');

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    setQuantity(newValue);
  };
  const addToCard = async () => {
    try {
      if (!colorID || !sizeID) {
        alert('Vui lòng chọn phân loại sản phẩm! ');
      } else {
        const addToCard = await ApiClient.post('cart/add-to-cart', {
          productId: product.id,
          amount: quantity,
          colorId: colorID,
          sizeId: sizeID,
        });
        console.log(33, addToCard);
        alert('Thêm vào giỏ hàng thành công!');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="flex-1 px-8">
      <div>
        <p className="text-xl">カラー: {currentColor}</p>
        <div className="flex gap-x-4 mt-3">
          {product?.colors?.map((color: IColor) => (
            <div
              className={
                color?.color === currentColor
                  ? 'w-16 h-11 border-2 border-blue-600 border-solid flex justify-center items-center cursor-pointer'
                  : 'w-16 h-11  border-1 border-gray-300 border-solid flex justify-center items-center cursor-pointer'
              }
              style={{ backgroundColor: color?.color }}
              key={color?.id}
              onClick={() => {
                setColorID(color.id);
                setCurrentColor(color?.color);
              }}
              id="color-active"
            ></div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-xl">サイズ: 男女兼用 {currentSize}</p>
        <div className="flex gap-x-4">
          {product?.sizes?.map((size: ISize) => (
            <div
              className={
                size?.size === currentSize
                  ? 'w-16 h-11  border-2 border-blue-600 border-solid flex justify-center items-center cursor-pointer'
                  : 'w-16 h-11  border border-gray-300 border-solid flex justify-center items-center cursor-pointer'
              }
              key={size?.id}
              onClick={() => {
                setSizeID(size.id);
                setCurrentSize(size?.size);
              }}
              id="size-active"
            >
              {size.size}
            </div>
          ))}
        </div>
      </div>
      <div className="text-red-500 mt-6 mb-4">
        <p className="text-2xl">{`${product?.price?.toLocaleString()} ${product?.currencyUnit}`}</p>
      </div>
      <div className="flex items-center">
        <p className="text-lg mr-6">Số lượng</p>
        <div>
          <div className="custom-number-input h-10 w-32">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button
                onClick={() => {
                  quantity !== 1 ? setQuantity(quantity - 1) : 1;
                }}
                className="border-r bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                className="outline-none focus:outline-none text-center w-full bg-gray-300 
                font-semibold text-lg hover:text-black focus:text-black md:text-basecursor-default 
                flex items-center text-gray-700"
                name="custom-input-number"
                value={quantity}
                onChange={handleChangeQuantity}
              />
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className="border-l bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="text-white text-center text-2xl border-0 outline-none bg-dart-red w-1/2 mt-6"
        style={{ height: 60 }}
        onClick={addToCard}
      >
        Mua ngay
      </button>
    </div>
  );
};

export default ProductSelectorContainer;
