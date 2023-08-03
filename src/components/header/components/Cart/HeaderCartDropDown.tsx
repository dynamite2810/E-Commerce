import Image from 'next/image';
import { useRouter } from 'next/router';
import ProductItemCart from './item';
import Link from 'next/link';

interface IItemProps {
  name: string;
  price: string;
}

interface IPropsProduct {
  item?: IItemProps;
}

const HeaderCartDropDown = ({ item }: IPropsProduct) => {
  const router = useRouter();

  return (
    <>
      <div className="group cursor-pointer">
        <div className="flex bg-red px-10">
          <div className="relative">
            <div className="flex relative">
              <Image
                src="/cart.svg"
                width={40}
                height={40}
                alt={''}
                onClick={() => router.push('/cart')}
              />
              <div style={{ right: -10, top: -10, position: 'absolute', fontSize: 15 }}>
                {arrProductCart.length}
              </div>
            </div>
            <div
              style={{ left: '50%', transform: 'translate(-50%, 0%)' }}
              className="invisible rounded-md border border-black absolute z-50 w-96 bg-gray-100 px-6 right-1 text-gray-800 shadow-xl group-hover:visible"
            >
              <div
                onClick={() => router.push('/')}
                style={{ fontSize: 20, fontWeight: 400, paddingTop: 15, fontFamily: 'sans-serif' }}
              >
                Sản phẩm mới thêm
              </div>
              <br />
              {arrProductCart.map((item, idx) => (
                <Link href={`/product/${idx}`} key={idx} legacyBehavior>
                  <div className="text-black" style={{ textDecoration: 'none' }}>
                    <ProductItemCart item={item} />
                  </div>
                </Link>
              ))}
              <br />
              <span style={{ fontSize: 15 }} className="flex items-center py-1">
                {arrProductCart.length} sản phẩm
                <button
                  style={{ fontSize: 15 }}
                  onClick={() => router.push('/cart')}
                  className="bg-dart-red border font-sans px-4 py-1 rounded ml-auto border-black text-white"
                >
                  Xem thêm
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const arrProductCart = [
  {
    name: 'ポケッeqwwwwwwwwwwwwwwwwwwweeee',
    price: '¥3,990',
  },
  {
    name: '3Dカット）',
    price: '¥2,990',
  },
  {
    name: 'ポケッawwwwwwwwwwwwwwwwwwwwwwwwsdaw',
    price: '¥5,990',
  },
  {
    name: '3Dカットqwe2sd23213213123）',
    price: '¥1,990',
  },
];

export default HeaderCartDropDown;
