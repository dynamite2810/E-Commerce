import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hook';

import { ApiClient } from '@/configs/api.config';
import { MONEY } from '@/helper/money';
import { IPaymentHistory } from '@/interfaces/payment-histories.interface';
import { AxiosResponse } from 'axios';
import Wrap from '../auth/components/Wrap';
import { authState } from '@/redux/slices/auth.slice';

const ChargeMoney = () => {
  const [currentMoneyId, setCurrentMoneyId] = useState<number>(0);
  const [currentMoney, setCurrentMoney] = useState<number>(50000);
  const [currentMoneyInput, setCurrentMoneyInput] = useState<string>();
  const authReducer = useAppSelector(authState);
  const router = useRouter();
  

  const createPaymentHistory = async () => {
    // call api to get data
    if (currentMoney >= 50000) {
      const response: AxiosResponse<IPaymentHistory> = await ApiClient.post(
        `/payment-history/payment-histories`,
        { point: currentMoney }
      );
      router.push({
        pathname: '/scan-qrcode',
        query: {
          bankName: response.data?.bankName,
          accountNumber: response.data?.accountNumber,
          point: currentMoney,
        },
      });
    } else {
      router.push('/charge-money');
    }
  };

  const handleChangeMoneyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setCurrentMoneyId(-1);
    var removeChar = valueInput.replace(/[^0-9\.]/g, ''); // This is to remove alphabets and special characters.
    var removeDot = removeChar.replace(/\./g, ''); // This is to remove "DOT"
    valueInput = removeDot;
    var formatedNumber = valueInput.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    valueInput = formatedNumber;
    const number = valueInput.replaceAll('.', '');
    setCurrentMoneyInput(valueInput);
    setCurrentMoney(+number);
  };

  return (
    <Wrap className="h-max py-6">
      <div
        className="rounded-3xl p-4 flex flex-col w-full h-full"
        style={{ background: '#FFF0F0', border: '1px solid black' }}
      >
        <div className="mx-10 my-0" style={{ borderBottom: '1px solid black' }}>
          <h3>Nạp tiền</h3>
          <p className="mb-4">Quản lý thông tin ví</p>
        </div>
        <p className="mt-6 mx-10 text-lg mb-2">Số tiền nạp</p>
        <div className="flex justify-between mx-10 my-0 ">
          {MONEY.map((item, idx) => (
            <button
              className="px-2 py-2 bg-white border-2 border-blue-600 flex justify-center items-center"
              style={
                idx === currentMoneyId
                  ? {
                      borderRadius: '5px',
                      fontSize: '20px',
                      width: '130px',
                    }
                  : {
                      border: '1px solid #EE2D29',
                      borderRadius: '5px',
                      fontSize: '20px',
                      width: '130px',
                      margin: '1px 0',
                    }
              }
              key={idx}
              onClick={() => {
                setCurrentMoneyId(idx);
                setCurrentMoney(+item.value);
                setCurrentMoneyInput('');
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p className="mt-3 mx-10 text-lg">
          Số tiền khác (Số dư {authReducer.currentUser?.wallet?.point?.toLocaleString()} coin)
        </p>
        <input
          type="text"
          className="mt-3 mx-10 outline-none focus:outline-none mb-2 text-xl pl-5 "
          style={{ backgroundColor: '#D9D9D9', maxHeight: '69px', minHeight: '45px' }}
          placeholder="0 đ"
          id="input-money"
          maxLength={15}
          value={currentMoneyInput}
          onChange={handleChangeMoneyInput}
        />
        <p
          className={
            currentMoney < 50000 ? 'my-2 mx-10 text-sm text-red-600' : 'my-2 mx-10 text-sm'
          }
        >
          Số tiền nạp tối thiểu 50.000 đ
        </p>

        <div className="flex justify-center mt-4">
          <button
            className={
              currentMoney >= 50000
                ? 'px-8 py-2 mr-5 bg-[#EE2D29] border border-black hover:opacity-90'
                : 'px-8 py-2 mr-5 bg-[#EE2D29] opacity-50 cursor-not-allowed'
            }
            style={{
              borderRadius: '5px',
              fontSize: '20px',
              width: '150px',
              color: '#FFFFFF',
            }}
            onClick={createPaymentHistory}
          >
            Tiếp theo
          </button>
          <button
            className="px-8 py-2 bg-white mr-5 hover:bg-stone-100"
            style={{
              border: '1px solid #EE2D29',
              borderRadius: '5px',
              fontSize: '20px',
              width: '150px',
            }}
            onClick={() => router.push('/my-wallet')}
          >
            Đóng
          </button>
        </div>
      </div>
    </Wrap>
  );
};

export default ChargeMoney;
