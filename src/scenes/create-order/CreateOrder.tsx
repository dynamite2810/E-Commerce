import React, { useState, useEffect } from 'react';
import Wrap from '../../scenes/auth/components/Wrap';
import { useAppSelector } from '@/redux/hook';
import cartListProduct from '../cart/cart.json';
import { ProductType } from './interface/product.interface';
import ModalChangeAddress from './modal/changeAddress.modal';
import Image from 'next/image';
import SelectLocation from './Locations/SelectLocation';

function CreateOrder() {
  const auth = useAppSelector((state) => state.authState);
  const [productDone, setProductDone] = useState<ProductType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transport, setTransport] = useState(180000);
  const [showCreateLocation, setShowCreateLocation] = useState(false);

  const handleAddressChangeClick = () => {
    setShowCreateLocation(true);
  };

  const handleWallet = () => {
    const wallet = document.querySelector('.wallet');
    const credit = document.querySelector('.credit');
    wallet?.setAttribute('style', 'display:block');
    credit?.setAttribute('style', 'display:none');
  };
  const handleCredit = () => {
    const wallet = document.querySelector('.wallet');
    const credit = document.querySelector('.credit');
    wallet?.setAttribute('style', 'display:none');
    credit?.setAttribute('style', 'display:block');
  };
  const productCartList = () => {
    const dataCart: ProductType[] = [];
    const listProduct = cartListProduct.map((value: any) => {
      value.listProduct.map((product: any, index: any) => {
        if (product.select === true) {
          dataCart.push({
            id: product.id,
            productName: product.productName,
            img: product.img,
            size: product.size,
            color: product.color,
            price: product.price,
            quantity: product.quantity,
            total: product.price * product.quantity,
          });
          let newTotal = 0;
          dataCart.map((cart) => {
            newTotal += Number(cart.total);
          });
          setTotalAmount(newTotal);
          setProductDone(dataCart);
        }
      });
    });
    console.log(productDone);
  };

  useEffect(() => {
    productCartList();
  }, []);

  return (
    <Wrap>
      <div>
        <div className="mt-2 mb-2">
          <p className="text-xl mt-2">Thanh Toán</p>
        </div>
        {/* address */}
        <div className="border border-black p-4">
          <div className="flex">
            <div>
              <Image width={30} height={30} className="w-6" src="/pin 1.png" alt="address" />
            </div>
            <div className="mt-2">Địa chỉ nhận hàng</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="font-bold">
              {auth.currentUser?.name} (+84) {auth.currentUser?.phone.replace(/^0/, '')}
            </div>
            <div>Số 05, Trung Hòa, Cầu Giấy, Hà Nội</div>
            <div
              className="text-indigo-500 underline cursor-pointer"
              onClick={handleAddressChangeClick}
            >
              {<SelectLocation />}
            </div>
          </div>
        </div>
        {/* order */}
        <div className="border border-black p-4  mt-3 mb-3">
          <div className="flex justify-between">
            <div className="font-bold text-base">Sản phẩm</div>
            <div className="flex">
              <div className="mr-4 text-slate-600 text-xs">Đơn giá</div>
              <div className="mr-16 ml-16 text-slate-600 text-xs">Số lượng</div>
              <div className="text-slate-600 text-xs">Thành tiền</div>
            </div>
          </div>
          <div className="flex">
            <div>Name_shop</div>
            <div className="border border-black ml-2 mr-2 h-3 mt-1"></div>
            <div className="flex relative">
              <div className="text-xl absolute bottom-1">
                <Image width={25} height={25} src="/chat 1.png" alt="" />
              </div>
              <div className="text-blue-600 ml-7 cursor-pointer">Chat ngay</div>
            </div>
          </div>

          {productDone.map((product) => {
            return (
              <div key={product.id} className="flex justify-between mt-5">
                <div className="flex">
                  <Image
                    width={60}
                    height={60}
                    className="w-16 h-16 object-cover"
                    src={product.img}
                    alt=""
                  />
                  <div className="ml-5 w-56">{product.productName}...</div>
                  <div className="ml-5 mt-5 text-slate-600">
                    Phân loại: {product.size}, {product.color}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-slate-600">{product.price.toLocaleString('vi-VN')}đ</div>
                  <div className="mr-20 ml-24 text-slate-600">{product.quantity}</div>
                  <div className="text-slate-600">{product.total?.toLocaleString('vi-VN')}đ</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* payment methods */}
        <div className="border border-black mt-3 mb-3">
          <div className="wallet">
            <div className="p-4 flex">
              <div>Phương thức thanh toán</div>
              <div>
                <button
                  className="w-28 border border-red-600 text-red-600 ml-5 mr-5"
                  onClick={handleWallet}
                  id="wallet"
                >
                  Ví
                </button>
              </div>
              <div>
                <button className="w-28 border border-black" onClick={handleCredit} id="credit">
                  Thẻ tín dụng
                </button>
              </div>
            </div>
            <div className="wallet pl-4 mb-3">
              Số dư ví: {auth.currentUser?.wallet?.point.toLocaleString()}đ
            </div>
          </div>

          <div className="credit mb-10 hidden">
            <div className="p-4 flex">
              <div>Phương thức thanh toán</div>
              <div>
                <button className="w-28 border border-black ml-5 mr-5" onClick={handleWallet}>
                  Ví
                </button>
              </div>
              <div>
                <button className="w-28 border border-red-600 text-red-600" onClick={handleCredit}>
                  Thẻ tín dụng
                </button>
              </div>
            </div>
            <div className="flex pl-4">
              <div className="mt-1">Chọn thẻ</div>
              <div className="ml-10">
                <div className="flex mb-3 relative">
                  <input type="checkbox" />
                  <Image height={20} width={20} className="ml-4 w-8" src="/visa 9.png" alt="visa" />

                  <div className="ml-8 mt-1 w-32">Techcombank</div>
                  <div className="mt-1">***6512</div>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <Image width={20} height={20} className="ml-4 w-8" src="/visa 9.png" alt="visa" />
                  <div className="ml-8 mt-1 w-32">TP Bank</div>
                  <div className="mt-1">***2342</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black"></div>
          <div className="justify-end flex">
            <div className="p-4 ">
              <div className="flex">
                <div className="w-36">Tổng tiền hàng</div>
                <div className="text-slate-600">{totalAmount.toLocaleString('vi-VN')}đ</div>
              </div>
              <div className="flex mt-3 mb-3">
                <div className="w-36">Phí vận chuyển</div>
                <div className="text-slate-600">{transport.toLocaleString('vi-VN')}đ</div>
              </div>
              <div className="flex">
                <div className="w-36">Tổng thanh toán</div>
                <div className="text-slate-600">
                  {(totalAmount + transport).toLocaleString('vi-VN')}đ
                </div>
              </div>
            </div>
          </div>
          <div className="border border-black"></div>
          <div className="p-4 text-right">
            <button className="bg-red-500 w-36 p-2 text-white rounded-lg">Đặt hàng</button>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export default CreateOrder;
