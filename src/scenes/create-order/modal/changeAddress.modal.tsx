import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hook';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function ModalChangeAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [address, setAddress] = useState<any>();
  const auth = useAppSelector((state) => state.authState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const onSubmit = (data: any) => {
    setFullName(data.fullName);
    setPhoneNumber(data.phoneNumber);
    setAddress(data.address);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFullName(auth.currentUser?.name);
    setPhoneNumber(auth.currentUser?.phone);
    setAddress('Số 5, Yên Hòa, Nhân Chính, Hà Nội ');
  }, [auth]);
  const handleChangeFullName = (e: any) => {
    setFullName(e.target.value);
  };
  const handleChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAddress = (e: any) => {
    setAddress(e.target.value);
  };
  const Error = (name: string) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className="text-red-600 mb-2" key={type}>
              {message}
            </p>
          ))
        }
      />
    );
  };

  return (
    <>
      <div className="border border-black p-4">
        <div className="flex">
          <div>
            <Image width={30} height={30} className="w-6" src="/pin 1.png" alt="address" />
          </div>
          <div className="mt-2">Địa chỉ nhận hàng</div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="font-bold">
            {fullName} (+84) {phoneNumber?.replace(/^0/, '')}
          </div>
          <div>{address}</div>
          <div
            className="text-indigo-500 underline cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Đổi địa chỉ
          </div>
        </div>
      </div>
      <Modal
        title="Đổi địa chỉ"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={<div></div>}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="border border-black w-full outline-none p-1"
              type="text"
              placeholder="Tên người nhận..."
              value={fullName}
              {...register('fullName', {
                required: 'Vui lòng nhập tên người nhận hàng!',
                pattern: {
                  value: /^[a-zA-ZÀ-ỹ\s']+$/i,
                  message: 'Tên không chứa ký tự đặc biệt!',
                },
              })}
              onChange={(e) => handleChangeFullName(e)}
            />
            {Error('fullName')}
          </div>
          <div className="mt-1 mb-1">
            <input
              className="border border-black w-full outline-none p-1 mt-1"
              type="number"
              placeholder="Số điện thoại..."
              value={phoneNumber}
              {...register('phoneNumber', {
                required: 'Vui lòng nhập số điện thoại!',
                pattern: {
                  value: /^0[1-9]\d{8}$/i,
                  message: 'Số điện thoại không hợp lệ!',
                },
              })}
              onChange={(e) => handleChangePhoneNumber(e)}
            />
            {Error('phoneNumber')}
          </div>
          <div>
            <input
              className="border border-black w-full outline-none p-1 mt-1"
              type="text"
              placeholder="Địa chỉ nhận hàng..."
              value={address}
              {...register('address', {
                required: 'Vui lòng nhập địa chỉ nhận hàng!',
              })}
              onChange={(e) => handleChangeAddress(e)}
            />
            {Error('address')}
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="bg-blue-600 rounded-lg pt-1 pb-1 w-20 text-white font-bold "
              type="submit"
            >
              Thay đổi
            </button>
            <div className="w-6"></div>
            <button
              className="bg-red-600 rounded-lg  w-20 text-white font-bold "
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalChangeAddress;
