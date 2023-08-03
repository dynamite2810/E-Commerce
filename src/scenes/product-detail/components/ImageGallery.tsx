import Image from 'next/image';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { IMedia, IProduct } from '@/interfaces/product.interface';

interface IImageGalleryProps {
  product: IProduct;
}

const ImageGallery = ({ product }: IImageGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index: any) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };
  return (
    <div className="w-1/2">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        autoPlay={true}
        // handleOnChange={() => {}}
        // autoFocus={true}
        infiniteLoop={true}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        className="max-w-full"
      >
        {product?.medias?.map((media: IMedia) => {
          return (
            <img src={media.url} height={765} width={765} key={media.id} alt={'Ảnh sản phẩm'} />
          );
        })}
      </Carousel>
      <div className="flex items-center">
        <div
          id="thumbnail-img"
        className="flex mt-3 max-w-85/100 overflow-x-auto"
        >
          {product?.medias?.map((media: IMedia, idx) => {
            return idx == currentSlide ? (
              <Image
                onClick={() => {
                  setCurrentSlide(idx);
                }}
                key={idx}
                id="img-active"
                className={`${
                  idx == currentSlide && 'border-2 border-black border-solid'
                } mr-2 rounded`}
                width={60}
                height={60}
                src={media.url}
                alt={''}
              />
            ) : (
              <Image
                onClick={() => {
                  setCurrentSlide(idx);
                }}
                key={idx}
                className={`${
                  idx == currentSlide && 'border-2 border-black border-solid'
                } mr-2 rounded cursor-pointer`}
                width={60}
                height={60}
                src={media.url}
                alt={''}
              />
            );
          })}
        </div>
        <div className="flex">
          <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            className="flex justify-center items-center border"
            style={{ width: 50, height: 50 }}
          >
            <Image width={30} height={30} src="/prev-icon.svg" alt={''} />
          </button>
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            className="flex justify-center items-center border ml-3"
            style={{ width: 50, height: 50 }}
          >
            <Image width={30} height={30} src="/next-icon.svg" alt={''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
