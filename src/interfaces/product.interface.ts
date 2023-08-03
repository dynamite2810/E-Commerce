import { TPagination } from './common.interface';

export interface ICategory {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ISize {
  id: string;
  size: string;
}

export interface IColor {
  id: string;
  color: string;
}

export interface IMedia {
  id: string;
  productId: string;
  url: string;
  status: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  currencyUnit: string;
  sku: string;
  code: string;
  countryOfOrigin: string;
  sold: number;
  remaining: number;
  overview: string;
  description: string;
  shortDescription: string;
  star: number;
  status: string;
  createType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  shop: {
    id: string;
    name: string;
    avatar: string;
    prefixPhone: string;
    phone: string;
  };
  categories: ICategory[];
  sizes: ISize[];
  colors: IColor[];
  medias: IMedia[];
}

export type TRecommendProductsReponse = TPagination & {
  list: IProduct[];
};
