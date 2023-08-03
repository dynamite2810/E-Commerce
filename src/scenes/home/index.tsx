import Suggest from '@/components/suggest-product';
import Image from 'next/image';
import WrapMainComponent from '../../components/wrap/WrapMainComponent';
import CarouselBrand from './components/CarouselBrand';
import ProductPortfolio from './components/ProductPortfolio';
import { TRecommendProductsReponse } from '@/interfaces/product.interface';

interface IHomeProps {
  recommendProductsReponse: TRecommendProductsReponse;
}

const Home = ({ recommendProductsReponse }: IHomeProps) => {
  return (
    <WrapMainComponent>
      <Image
        className="mt-3"
        style={{ width: '100%' }}
        src="https://web-jp-assets-v2.mercdn.net/_next/static/media/hero-banner-fallback-CPN.43cb0ccf.png"
        width={1484}
        height={309.17}
        alt="banner"
      />
      <ProductPortfolio />
      <CarouselBrand />
      <Suggest products={recommendProductsReponse?.list} />
    </WrapMainComponent>
  );
};

export default Home;
