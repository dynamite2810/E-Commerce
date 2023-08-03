import { TRecommendProductsReponse } from '@/interfaces/product.interface';
import Home from '../scenes/home/index';

export default function index(recommendProductsData: TRecommendProductsReponse) {
  return (
    <>
      <Home recommendProductsReponse={recommendProductsData} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const { cookies } = req;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/recommend?size=10`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data: TRecommendProductsReponse = await response.json();

  return {
    props: data,
  };
}
