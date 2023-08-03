import React, { useState } from 'react';
import { Modal } from 'antd';

interface ModalProps {
  isModalOpenDeleteAll: boolean;
  setIsModalOpenDeleteAll: any;
  handleDeleteAll: any;
}

function ModalDelete(props: ModalProps) {
  const { isModalOpenDeleteAll = false, setIsModalOpenDeleteAll } = props;
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpenDeleteAll(true);
  };
  const handleDeleteAll = () => {
    var checkboxes = document.querySelector('#checkbox') as HTMLInputElement;
    if (checkboxes.checked === true) {
      setDataSource([]);
    } else {
      alert('Chọn tất cả sản phẩm để xóa!');
    }
  };
  const handleOk = () => {
    handleDeleteAll();
    setIsModalOpenDeleteAll(false);
  };

  const handleCancel = () => {
    setIsModalOpenDeleteAll(false);
  };
  return (
    <div>
      <Modal
        title={<p className="text-red-500">Xóa sản phẩm?</p>}
        open={isModalOpenDeleteAll}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex justify-end">
            <button
              className="bg-blue-600 rounded-lg p-2 w-20 text-white font-bold text-xl"
              onClick={handleOk}
            >
              Có
            </button>
            <div className="w-6"></div>
            <button
              className="bg-red-600 rounded-lg p-2 w-20 text-white font-bold text-xl"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        }
      >
        <p>Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng?</p>
      </Modal>
    </div>
  );
}
export default ModalDelete;
