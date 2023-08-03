import React from 'react';

import ImageGallery from './ImageGallery';
import ProductSelectorContainer from './ProductSelectorContainer';
import { IProduct } from '@/interfaces/product.interface';

interface IProductBriefingProps {
  product: IProduct;
}

const ProductBriefing = ({ product }: IProductBriefingProps) => {
  return (
    <div className="flex mt-6">
      <ImageGallery product={product} />
      <ProductSelectorContainer product={product} />
    </div>
  );
};

export default ProductBriefing;
