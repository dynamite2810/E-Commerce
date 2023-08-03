import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { CSSProperties } from 'styled-components';
import Image from 'next/image';

const CarouselBrand = () => {
  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
  };
  const arrowPrev = (onClickHandler: () => void, hasPrev: boolean, label: string) => {
    return (
      <button
        type="button"
        className="border-0 bg-transparent"
        onClick={onClickHandler}
        title={label}
        style={{ ...arrowStyles, left: 15 }}
      >
        <Image src="prev-icon.svg" width={15} height={15} alt={''} />
      </button>
    );
  };
  const arrowNext = (onClickHandler: () => void, hasPrev: boolean, label: string) => {
    return (
      <button
        type="button"
        className="border-0 bg-transparent"
        onClick={onClickHandler}
        title={label}
        style={{ ...arrowStyles, right: 0 }}
      >
        <Image src="next-icon.svg" width={15} height={15} alt={''} />
      </button>
    );
  };
  return (
    <div className="mt-10 flex items-center">
      <div className="w-3/5">
        <div className="flex justify-between mb-5 text-xl">
          <p className=" font-normal text-2xl">Nhãn hàng</p>
          <div className="flex pr-10">
            <p className=" font-normal text-xl cursor-pointer">Xem thêm</p>
            <Image src="next-icon.svg" width="15" height={15} alt={''} />
          </div>
        </div>
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={arrowPrev}
          renderArrowNext={arrowNext}
          infiniteLoop
        >
          <div className="w-full">
            <div className="w-full grid-cols-3 grid gap-y-8">
              {arrBrand.map((item, idx) => {
                return (
                  <div className="flex flex-col justify-between items-center" key={idx}>
                    <div className="flex items-center flex-1">
                      <Image
                        style={{ maxWidth: 100 }}
                        src={item.icon}
                        width={100}
                        height={99.51}
                        alt={''}
                      />
                    </div>
                    <p className="mt-4 font-normal font-sans text-2xl">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div></div>
          <div></div>
        </Carousel>
      </div>
      <div className="w-2/5 ml-8">
        <Image
          style={{ maxWidth: '100%' }}
          src="https://im.uniqlo.com/global-cms/spa/res0d2cb4c2f1b0058173f5040174f038e5fr.jpg"
          width={571}
          height={297}
          alt={''}
        />
      </div>
    </div>
  );
};

const arrBrand = [
  {
    name: 'Uniqlo',
    icon: 'uniqlo-icon.svg',
  },
  {
    name: 'Cool Mate',
    icon: 'coolmate-icon.svg',
  },
  {
    name: 'P&G',
    icon: 'p&g-icon.svg',
  },
  {
    name: 'OHui',
    icon: 'ohui-icon.svg',
  },
  {
    name: 'Essence',
    icon: 'essence-icon.svg',
  },
  {
    name: 'Teelab',
    icon: 'teelab-icon.svg',
  },
];

export default CarouselBrand;
