import Image from 'next/image';

import WrapMainComponent from '../../components/wrap/WrapMainComponent';
import DescriptionProduct from './components/DescriptionProduct';
import ProductBriefing from './components/ProductBriefing';
import { IProduct } from '@/interfaces/product.interface';
import Suggest from '@/components/suggest-product';

interface IProductDetailProps {
  product: IProduct;
  recomendProducts: IProduct[];
}

const ProductDetail = ({ product, recomendProducts }: IProductDetailProps) => {
  return (
    <WrapMainComponent className="mt-3">
      <div className="mb-4">{product?.categories && product?.categories.join(',')}</div>
      <div className="text-2xl">{product?.name}</div>
      <div>{product?.star || '5'} (0 đánh giá)</div>
      <p dangerouslySetInnerHTML={{ __html: product?.shortDescription }} />
      <div>Mã sản phẩm: {product?.code}</div>

      <ProductBriefing product={product} />

      <div className="w-full mt-8 flex">
        <DescriptionProduct product={product} />

        <div className="w-1/2 mb-4">
          <Image
            src={product?.medias && product?.medias[0]?.url}
            style={{ maxWidth: '100%' }}
            width={765}
            height={1020}
            alt="Ảnh mô tả"
          />
        </div>
      </div>
      <Suggest products={recomendProducts} />
    </WrapMainComponent>
  );
};

export default ProductDetail;
