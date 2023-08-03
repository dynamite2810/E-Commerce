import { Search } from '@chatscope/chat-ui-kit-react';
import { Button, Checkbox, Modal } from 'antd';
import React, { useState } from 'react';
import EditLocation from './EditLocations';
import Link from 'next/link';

function SelectLocation() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleAddAddress = () => {
    // Xử lý logic khi thêm địa chỉ
  };

  return (
    <>
      <Button
        className=" text-center align-middle"
        type="primary"
        style={{ background: '#1677ff' }}
        onClick={showModal}
      >
        Đổi địa chỉ
      </Button>
      <Modal
        open={open}
        className=" overflow-y-auto max-h-screen"
        title="Địa Chỉ Nhận Hàng"
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className=" text-center align-middle" key="back" onClick={handleCancel}>
            Thoát
          </Button>,
          <Button
            className=" text-center align-middle"
            key="submit"
            style={{ background: '#1677ff' }}
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Xác Nhận
          </Button>,
          <Button
            className=" text-center  align-middle"
            key="submit"
            style={{ background: '#1677ff' }}
            type="primary"
            onClick={handleAddAddress}
          >
            {<EditLocation />}
          </Button>,
        ]}
      >
        <div style={{ minHeight: 600 }} className=" max-w-lg overflow-y-auto">
          <div className="flex h-10">
            <Search
              className=" w-96 font-sans font-normal"
              style={{ fontSize: 20 }}
              placeholder="Tìm thành phố, Quận/Huyện"
            ></Search>
            <Button
              className=" text-center ml-5 mt-1"
              key="link"
              href=""
              type="primary"
              onClick={handleOk}
            >
              Tìm Địa Chỉ
            </Button>
          </div>
          <br />
          <div className=" font-sans font-normal text-xl  ">Địa chỉ của tôi</div>
          <br />
          <div className="flex">
            <Checkbox defaultChecked></Checkbox>
            <div className="flex ml-2">
              <br />
              <div className="text-base">Tên Người Nhận</div>
              <div className=" mx-1">|</div>
              <div className=" opacity-60 text-base">Số Điện Thoại</div>
              <Link className=" text-cyan-600 text-lg ml-40" href={''}>
                Cập nhật
              </Link>
            </div>
          </div>
          <div className=" overflow-hidden line-clamp-2 text-ellipsis mb-3 ml-6 opacity-60 text-base">
            Địa chỉ nhận hàng
          </div>
          <hr />
        </div>
      </Modal>
    </>
  );
}

export default SelectLocation;
