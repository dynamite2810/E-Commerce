import ProductItem from './ProductItem';

const Suggest = () => {
  return (
    <div className="w-full mt-6 pb-32">
      <div
        className="w-full max-lg:grid-cols-4 grid-cols-5 gap-x-6 gap-y-8"
        style={{ display: 'grid' }}
      >
        {arrProduct.map((item, idx) => {
          return (
            <a
              href={`/product/${idx}`}
              className="text-black"
              style={{ background: '#D9D9D9', textDecoration: 'none' }}
              key={idx}
            >
              <ProductItem item={item} />
            </a>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-1/4 text-center text-white text-xl bg-dart-red py-2">Xem thêm</div>
      </div>
    </div>
  );
};

const arrProduct = [
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
  {
    name: '3Dカット）',
  },
  {
    name: 'ポケッタブルUVカットパーカ（3Dカット）',
  },
];

export default Suggest;
