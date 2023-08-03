import React from 'react';
import ProductDetail from '@/scenes/product-detail/ProductDetail';
import { IProduct, TRecommendProductsReponse } from '@/interfaces/product.interface';

interface IProps {
  productDetail: IProduct;
  recomendProducts: IProduct[];
}

const index = ({ productDetail, recomendProducts }: IProps) => {
  return (
    <>
      <ProductDetail product={productDetail} recomendProducts={recomendProducts} />
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { req } = context;
  const { id } = params;
  const { cookies } = req;

  const dataProductDetail = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const productDetail: IProduct = await dataProductDetail.json();

  const dataRecomendProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}product/recommend?size=10`,
    {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  );

  const recomendProducts: TRecommendProductsReponse = await dataRecomendProducts.json();

  return {
    props: {
      productDetail,
      recomendProducts: recomendProducts?.list,
    },
  };
};

export default index;
