import { repeatElement } from '@/helper/convert';
import { IProduct } from '@/interfaces/product.interface';

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div
      className="w-full h-full flex flex-col cursor-pointer product-item">
      <img
        src={product?.medias && product?.medias[0]?.url}
        alt="Ảnh sản phẩm"
        style={{ minHeight: 240, maxHeight: 240 }}
        className="w-full object-cover"
      />
      <div className='h-full flex flex-col justify-between py-1.5'>
        <div className="px-2">
          <div className="text-base max-line-2">{product?.name}</div>
        </div>
        <div className="pl-2">
          <p className="" style={{ color: '#FD0101' }}>
            {`${product?.price.toLocaleString('vi-VN')} ${product?.currencyUnit}`}
          </p>
          <div className=" flex line-clamp-1 overflow-hidden text-ellipsis ">
            <div className="flex items-center">
              {repeatElement(
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-dark-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>,
                product?.star || 5
              )}
              <p className="ml-2 text-sm font-medium text-dart-500 dark:text-dart-400">
                {product?.star || 5}
              </p>
            </div>
            <p className="ml-1">(0 đánh giá)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
