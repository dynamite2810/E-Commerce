import { Search } from '@chatscope/chat-ui-kit-react';
import { Button, Checkbox, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

function EditLocation() {
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
      <div onClick={showModal}>
        <PlusOutlined className=" text-center align-text-top mt-1 pr-1" />
        Thêm địa chỉ
      </div>

      <Modal
        open={open}
        className=" overflow-y-auto max-h-screen"
        title="Thêm Địa Chỉ Nhận Hàng"
        width={550}
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
        ]}
      >
        <div style={{ minHeight: 600 }} className=" max-w-lg overflow-y-auto">
          <div className="flex h-10"></div>
          <div className="flex">
            <div className="flex">
              <br />
              <div className=" text-base">
                Tên người nhận :
                <input
                  type="text"
                  className="border rounded w-60 h-12 pl-1 mr-2"
                  placeholder="  Tên người nhận"
                />
              </div>
              <div className=" text-base">
                Số điện thoại :
                <input
                  type="number"
                  className="border rounded w-60 h-12 pl-1"
                  placeholder="  Số điện thoại"
                />
              </div>
            </div>
          </div>
          <br />
          Địa chỉ :
          <div className=" border rounded text-base">
            <input
              type="text"
              className="w-full h-12"
              placeholder="  Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            ></input>
          </div>
          <br />
          Loại Địa Chỉ :
          <div className="flex">
            <Button className="mr-3">Nhà Riêng</Button>
            <Button>Văn Phòng</Button>
          </div>
          <br />
          <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
        </div>
      </Modal>
    </>
  );
}

export default EditLocation;
