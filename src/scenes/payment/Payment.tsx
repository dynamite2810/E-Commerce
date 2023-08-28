import Image from 'next/image';
import { useRouter } from 'next/router';

import Wrap from '../auth/components/Wrap';

const Payment = () => {
  const router = useRouter();

  return (
    <Wrap className="h-max py-6">
      <div
        className="rounded-3xl p-4 flex flex-col w-full h-full"
        style={{ background: '#FFF0F0', border: '1px solid black' }}
      >
        <div className="mx-10 my-0" style={{ borderBottom: '1px solid black' }}>
          <h3>Thanh toán đơn hàng</h3>
        </div>
        <div className="flex justify-center mt-4">
          <div className="mr-20">
            <Image src="logo-red.svg" alt="logo" width={100} height={100} className="" />
            <p className="text-lg">Mã quét để chuyển tiền</p>
            {/* <p className="text-lg">{bankName?.toString().toUpperCase()}</p> */}
            <p className="text-lg">Vietinbank</p>
            <p className="text-lg font-bold">Công Ty TNHH KinKin Logistic</p>
            {/* <p className="text-lg">{accountNumber}</p> */}
            <p className="text-lg">107870390625</p>
          </div>
          <div>
            <Image
              // src={`https://img.vietqr.io/image/${bankName}-${accountNumber}-qr_only.png?amount=${point}`}
              src={`https://img.vietqr.io/image/Vietinbank-107870390625-qr_only.png?amount=716000`}
              alt="qr-code"
              width={250}
              height={250}
            />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="px-3 py-2 bg-white mr-5 hover:bg-stone-100"
            style={{
              border: '1px solid #EE2D29',
              borderRadius: '5px',
              fontSize: '20px',
              width: '150px',
            }}
            onClick={() => router.push('/')}
          >
            Hoàn thành
          </button>
        </div>
      </div>
    </Wrap>
  );
};
export default Payment;
