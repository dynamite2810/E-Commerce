import { Pagination } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { openNotificationWithIcon } from 'helper/notification_antd';

import { ApiClient } from '@/configs/api.config';
import { TPagination } from '@/interfaces/common.interface';
import { IPaymentRequest } from '@/interfaces/payment-requests.interface';
import { useAppSelector } from '@/redux/hook';
import { authState } from '@/redux/slices/auth.slice';
import Wrap from '../auth/components/Wrap';
import { PAYMENT_STATUS } from '@/constants/config.constant';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UserWallet = () => {
  const router = useRouter();
  const authReducer = useAppSelector(authState);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [paymentRequests, setPaymentRequests] = useState<IPaymentRequest[]>([]);
  const [pagination, setPagination] = useState<TPagination>();
  type FormDataState = FormData;
  const [formData, setFormData] = useState<FormDataState>(new FormData());

  useEffect(() => {
    setImageUrl(authReducer.currentUser?.avatar);
  }, [authReducer]);

  const handleChangeImage: ChangeEventHandler<HTMLInputElement> = async (event: any) => {
    const file = event.target.files?.[0];
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (isJpgOrPng && isLt5M) {
      getBase64(file as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      const formData = new FormData();
      formData.append('file', file);
      setFormData(formData);
      await ApiClient.patch('auth/update-info', formData);
      openNotificationWithIcon('success', 'Sửa ảnh thành công!');
    } else {
      !isJpgOrPng
        ? openNotificationWithIcon('error', 'Hình ảnh cần có định dạng .JPG, .PNG hoặc .JPEG!')
        : openNotificationWithIcon('error', 'Dung lượng ảnh không vượt quá 5MB!');
    }
  };

  const handleChangePage = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const getUserPayments = async () => {
    try {
      const { data } = await ApiClient.get(
        `/payment-history/payment-requests?page=${pagination?.currentPage || 1}`
      );
      setPaymentRequests(data.list);
      setPagination({
        ...pagination,
        totalPage: data.totalPage,
        totalRecord: data.totalRecord,
        currentPage: data.currentPage,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const requestStatus = (rqs: string) => {
    if (rqs.toUpperCase() === PAYMENT_STATUS.PENDING) {
      return 'Đang chờ';
    } else if (rqs.toUpperCase() === PAYMENT_STATUS.APPROVE) {
      return 'Hoàn tất';
    } else if (rqs.toUpperCase() === PAYMENT_STATUS.REJECT) {
      return 'Thất bại';
    }
  };

  const Page: React.FC = () => {
    return (
      <div>
        <Pagination
          defaultCurrent={1}
          total={pagination?.totalRecord}
          onChange={handleChangePage}
          showSizeChanger={false}
          current={pagination?.currentPage}
          pageSize={15}
        />
      </div>
    );
  };

  useEffect(() => {
    getUserPayments();
  }, [pagination?.currentPage]);

  return (
    <Wrap className="h-max py-6">
      <div
        className="rounded-3xl p-4 flex flex-col w-full h-full"
        style={{ background: '#FFF0F0', border: '1px solid black' }}
      >
        <div className="mx-10 my-0" style={{ borderBottom: '1px solid black' }}>
          <h3>Ví của tôi</h3>
          <p className="mb-4">Quản lý thông tin ví</p>
        </div>
        <div className="flex mt-5">
          <div className="w-full ml-10 mr-10">
            <div className="flex justify-between">
              <div className="flex">
                <Image
                  src="/icon-money.png"
                  alt=""
                  width={60}
                  height={60}
                  style={{ marginLeft: '10px', marginRight: '8px' }}
                />
                <div>
                  <h3>Số dư ví</h3>
                  <h3 className="" style={{ color: '#EE2D29' }}>
                    {authReducer.currentUser?.wallet?.point.toLocaleString() || 0} coin
                  </h3>
                </div>
              </div>
              <div className="">
                <button
                  className="px-8 py-2 bg-white mr-5 hover:bg-stone-100"
                  style={{ border: '1px solid #EE2D29', borderRadius: '5px', fontSize: '20px' }}
                  onClick={() => router.push('/charge-money')}
                >
                  Nạp tiền
                </button>
              </div>
            </div>
            <div
              className="w-100 mx-5 my-2"
              style={{ backgroundColor: '#D9D9D9', border: '1px solid black', borderRadius: '5px' }}
            >
              <div className="mx-5 py-1 mb-3" style={{ borderBottom: '1px solid black' }}>
                Lịch sử giao dịch
              </div>

              {paymentRequests.length !== 0 ? (
                paymentRequests.map((paymentRequest, index) => (
                  <div className="flex justify-between" key={index}>
                    <div className="ml-5 py-1 flex">
                      <Image
                        src="/icon-wallet.png"
                        alt="wallet"
                        width={40}
                        height={40}
                        style={{ marginRight: '10px' }}
                      />
                      <div>
                        {/* <div>Thanh toán đơn hàng {paymentRequest.id.slice(0, 8).toUpperCase()}</div> */}
                        <div>Nạp tiền vào ví</div>
                        <div className="text-xs opacity-70">
                          {moment(paymentRequest.createdAt).format('DD/MM/YYYY')}
                        </div>
                      </div>
                    </div>
                    <div className="mr-10 py-1 text-right">
                      <div>{paymentRequest.point.toLocaleString() || 0} coin</div>
                      <div className="text-xs opacity-70">
                        {requestStatus(paymentRequest.status)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="ml-5 py-1 flex justify-center items-center">Chưa có giao dịch</p>
              )}
            </div>
            <div className="w-100 mx-5 flex justify-center">
              <Page />
            </div>
          </div>
          {/* <div className="w-1/4 mt-3 mr-10">
            <div
              style={{
                display: 'flex',
                width: '150px',
                height: '150px',
                marginLeft: 'calc(50% - 75px)',
                alignItems: 'center',
              }}
            >
              <div>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="avatar"
                    width={150}
                    height={150}
                    style={{
                      minWidth: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      marginLeft: 'calc(100% - 75px)',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <label
              className="inline-block px-8 py-2 cursor-pointer bg-white mt-5 hover:bg-stone-100"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
                fontSize: '16px',
                marginLeft: 'calc(50% - 68px)',
              }}
            >
              <input
                type="file"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={handleChangeImage}
              />
              Chọn ảnh
            </label>
          </div> */}
        </div>
        <button
          className=" items-center justify-center border border-black mt-10 bg-[#ee2d29] hover:opacity-90"
          style={{
            width: '157px',
            borderRadius: '8px',
            color: 'white',
            padding: '5px 20px',
            fontSize: '25px',
            fontWeight: '400',
            marginLeft: 'calc(50% - 78.5px)',
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          Đóng
        </button>
      </div>
    </Wrap>
  );
};

export default UserWallet;
