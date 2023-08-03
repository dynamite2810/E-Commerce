import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCategory } from '../category.service';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface CategoryType {
  id: number;
  thumbnail: string;
  name: string;
}
const ProductPortfolio: React.FC = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1400, min: 800 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 2,
    },
  };
  const getListCategory = async () => {
    try {
      const result = await getCategory();
      setCategory(result.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListCategory();
  }, []);

  return (
    <div className="mt-3">
      <div className="mb-3 font-medium text-2xl relative">Danh mục sản phẩm</div>
      <Carousel
        className=" shadow-md shadow-slate-400"
        responsive={responsive}
        swipeable={false}
        keyBoardControl={true}
        slidesToSlide={2}
        infinite={true}
        customLeftArrow={
          <FontAwesomeIcon
            icon={faAngleLeft as IconProp}
            size="2xl"
            style={{ color: 'gray', borderRadius: '50%' }}
            className="absolute transition border ease-in-out px-1 hover:shadow-lg hover:bg-white hover:scale-105 duration-100 left-2 max-w-4 cursor-pointer"
          />
        }
        customRightArrow={
          <FontAwesomeIcon
            icon={faAngleRight as IconProp}
            size="2xl"
            style={{ color: 'gray', borderRadius: '50%' }}
            className="absolute transition border ease-in-out px-1 hover:shadow-lg hover:bg-white hover:scale-105 duration-100 right-2 max-w-4 cursor-pointer"
          />
        }
      >
        {category.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                border: '1px solid gray',
              }}
              className={'flex flex-col box-border justify-center items-center py-4 cursor-pointer'}
            >
              <Image
                className=" items-center"
                src={item.thumbnail}
                alt={'Image'}
                width={100}
                height={100}
              />
              <p className="mt-2 font-normal font-sans text">{item.name}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductPortfolio;
