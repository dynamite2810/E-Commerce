import Image from 'next/image';
import React from 'react';

interface ItemProps {
  name: string;
}

interface PropsProduct {
  item: ItemProps;
}

const ProductItem = ({ item }: PropsProduct) => {
  return (
    <div className="w-full">
      <Image
        height={286}
        width={286}
        src="https://image.uniqlo.com/GU/ST3/jp/imagesgoods/346495/item/jpgoods_08_346495.jpg?width=300"
        style={{ width: '100%' }}
        alt={''}
      />
      <div className="p-2">
        <div className="text-lg">{item.name}</div>
        <p className="text-lg" style={{ color: '#FD0101' }}>
          ¥2,990
        </p>
        <div className="flex">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            className="fr-ec-icon fr-ec-icon--default fr-ec-star--full fr-ec-rating-static__item--small"
            role="presentation"
            style={{ width: 14, height: 14 }}
          >
            <path d="M12.4759 1.95805L14.6839 8.75205H21.8279C22.3119 8.75205 22.5139 9.37205 22.1219 9.65705L16.3419 13.8561L18.5499 20.6501C18.6999 21.1111 18.1719 21.4941 17.7809 21.2091L12.0009 17.0101L6.22088 21.2091C5.82888 21.4941 5.30188 21.1111 5.45188 20.6501L7.65988 13.8561L1.87888 9.65705C1.48688 9.37205 1.68888 8.75205 2.17288 8.75205H9.31688L11.5249 1.95805C11.6749 1.49705 12.3259 1.49705 12.4759 1.95805Z"></path>
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            className="fr-ec-icon fr-ec-icon--default fr-ec-star--full fr-ec-rating-static__item--small"
            role="presentation"
            style={{ width: 14, height: 14 }}
          >
            <path d="M12.4759 1.95805L14.6839 8.75205H21.8279C22.3119 8.75205 22.5139 9.37205 22.1219 9.65705L16.3419 13.8561L18.5499 20.6501C18.6999 21.1111 18.1719 21.4941 17.7809 21.2091L12.0009 17.0101L6.22088 21.2091C5.82888 21.4941 5.30188 21.1111 5.45188 20.6501L7.65988 13.8561L1.87888 9.65705C1.48688 9.37205 1.68888 8.75205 2.17288 8.75205H9.31688L11.5249 1.95805C11.6749 1.49705 12.3259 1.49705 12.4759 1.95805Z"></path>
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            className="fr-ec-icon fr-ec-icon--default fr-ec-star--full fr-ec-rating-static__item--small"
            role="presentation"
            style={{ width: 14, height: 14 }}
          >
            <path d="M12.4759 1.95805L14.6839 8.75205H21.8279C22.3119 8.75205 22.5139 9.37205 22.1219 9.65705L16.3419 13.8561L18.5499 20.6501C18.6999 21.1111 18.1719 21.4941 17.7809 21.2091L12.0009 17.0101L6.22088 21.2091C5.82888 21.4941 5.30188 21.1111 5.45188 20.6501L7.65988 13.8561L1.87888 9.65705C1.48688 9.37205 1.68888 8.75205 2.17288 8.75205H9.31688L11.5249 1.95805C11.6749 1.49705 12.3259 1.49705 12.4759 1.95805Z"></path>
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            className="fr-ec-icon fr-ec-icon--default fr-ec-star--full fr-ec-rating-static__item--small"
            role="presentation"
            style={{ width: 14, height: 14 }}
          >
            <path d="M12.4759 1.95805L14.6839 8.75205H21.8279C22.3119 8.75205 22.5139 9.37205 22.1219 9.65705L16.3419 13.8561L18.5499 20.6501C18.6999 21.1111 18.1719 21.4941 17.7809 21.2091L12.0009 17.0101L6.22088 21.2091C5.82888 21.4941 5.30188 21.1111 5.45188 20.6501L7.65988 13.8561L1.87888 9.65705C1.48688 9.37205 1.68888 8.75205 2.17288 8.75205H9.31688L11.5249 1.95805C11.6749 1.49705 12.3259 1.49705 12.4759 1.95805Z"></path>
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            focusable="false"
            className="fr-ec-icon fr-ec-icon--default fr-ec-star--empty fr-ec-rating-static__item--small"
            role="presentation"
            style={{ width: 14, height: 14 }}
          >
            <path d="M12.4759 1.95805L14.6839 8.75205H21.8279C22.3119 8.75205 22.5139 9.37205 22.1219 9.65705L16.3419 13.8561L18.5499 20.6501C18.6999 21.1111 18.1719 21.4941 17.7809 21.2091L12.0009 17.0101L6.22088 21.2091C5.82888 21.4941 5.30188 21.1111 5.45188 20.6501L7.65988 13.8561L1.87888 9.65705C1.48688 9.37205 1.68888 8.75205 2.17288 8.75205H9.31688L11.5249 1.95805C11.6749 1.49705 12.3259 1.49705 12.4759 1.95805Z"></path>
          </svg>
          <p className="ml-2">4.3</p>
        </div>
        <p>(399 レビューを見る)</p>
      </div>
    </div>
  );
};

export default ProductItem;
