import React, { useState, useEffect } from 'react';
import Wrap from '../../scenes/auth/components/Wrap';
import { Table, Popover } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useRouter } from 'next/router';
import styles from './style/cart.module.scss';
import cartListProduct from './cart.json';
import { DataType } from './interface/cart.interface';
import ModalDelete from './modal/delete.modal';
import Image from 'next/image';

function Cart() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<DataType[]>([]);
  const [total, setTotal] = useState(0);
  // const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(1556000);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isModalOpenDeleteAll, setIsModalOpenDeleteAll] = useState(false);
  //handle delete table antd
  const handleDeleteAntd = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    // console.log(newData);
    var amount = 0;
    for(var index in newData) {
      amount += newData[index].price;
    }
    setTotalAmount(amount);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    setQuantity(newValue);
  };
  //list product
  const listProductCart = async () => {
    try {
      const dataCart: DataType[] = [];
      cartListProduct.map((value) => {
        const cartProduct = value.listProduct.map((product, index) => {
          dataCart.push({
            key: index,
            name: product.productName,
            price: product.price,
            quantity: product.quantity,
            total: product.price * product.quantity,
            color: product.color,
            size: product.size,
            img: product.img,
            select: product.select,
          });
        });
        setDataSource(dataCart);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProductCart();
  }, [total]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      width: '50%',
      render: (value, record) => {
        return (
          <div>
            <div className="flex">
              <div className="flex">
                <img className="w-16 h-16 object-cover mr-5" src={record.img} alt="" />
                <div className="w-36">{record.name}...</div>
              </div>
              <div className="mt-5 ml-7 text-slate-500">
                Phân loại: {record.size}, {record.color}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      className: styles.center,
      render: (price) => {
        return (
          <div>
            <div className="text-slate-500 pr-10">{price.toLocaleString()} đ</div>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      className: styles.center,
      render: (text, record) => {
        return (
          <div className="flex">
            <button
              className=" w-8 bg-slate-300 mr-1 outline-none rounded-none"
              onClick={() => {
                  quantity !== 1 ? setQuantity(quantity - 1) : 1;
              }}
            >
              -
            </button>
            
              <input
                type="number"
                className="w-14 bg-slate-300 flex justify-center align-items-center text-center outline-none"
                name="custom-input-number"
                value={quantity}
                onChange={handleChangeQuantity}
              />
            <button
              className=" w-8 bg-slate-300 ml-1 outline-none rounded-none"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>
        );
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'total',
      className: styles.center,
      render: (total) => {
        return (
          <div>
            {/* .toLocaleString() */}
            <div className="text-slate-500">{total.toLocaleString()} đ</div>
          </div>
        );
      },
    },
    {
      title: 'Xoá',
      dataIndex: 'delete',
      className: styles.center,
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          // <div className="text-center" onClick={() => handleDeleteAntd(record.key)}>
          //   <img className="w-8" src="/delete 5.png" alt="" />
          // </div>
          <Popover
            title="Bạn có chắc chắn muốn xóa?"
            placement="top"
            trigger="click"
            // open={open}
            // onOpenChange={handleOpenChange}
            content={
              <div className="text-right">
                <button
                  className="bg-blue-600 text-white rounded mr-1 w-8"
                  onClick={() => handleDeleteAntd(record.key)}
                >
                  Có
                </button>
                {/* <button onClick={hide} className="bg-red-600 text-white  rounded ml-1 w-8">
                  Hủy
                </button> */}
              </div>
            }
          >
            <Image height={20} width={20} className="w-8" src="/delete 5.png" alt="" />
          </Popover>
        ) : null,
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedData: DataType[] = newSelectedRowKeys.map((key) => {
      return dataSource.find((data) => data.key === key) as DataType;
    });
    setSelectedRowKeys(selectedData);
  };
  function onSelectAll(selected: any, selectedRows: any, changeRows: any) {
    if (selected === true) {
      setIsSelectAllChecked(!isSelectAllChecked);
    }
    handleClickInputCheckbox();
  }
  interface CheckedType {
    checked: boolean;
    select: boolean;
  }
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys.map((row) => row.key),
    onChange: onSelectChange,
    onSelectAll: onSelectAll,
    onSelect: (record, selected, selectedRows) => {
      if (selectedRows.length === dataSource.length) {
        setIsSelectAllChecked(!isSelectAllChecked);
      } else {
        setIsSelectAllChecked(false);
      }
    },
    // getCheckboxProps: (record: DataType) => {
    //   // console.log(record);
    //   return {
    //     checked: record.select,
    //   };
    // },
  };
  const handleClickInputCheckbox = () => {
    var checkboxes = document.querySelector('#checkbox') as HTMLInputElement;
    if (checkboxes.checked === true) {
      setSelectedRowKeys(dataSource);
    } else {
      setSelectedRowKeys([]);
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };
  const handleDeleteAll = () => {
    var checkboxes = document.querySelector('#checkbox') as HTMLInputElement;
    if (checkboxes.checked === true) {
      setDataSource([]);
    }
  };
  return (
    <Wrap>
      <div className="mt-5 mb-5">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          pagination={false}
          showHeader={true}
          // pagination={false}
          // bordered
        />
        <div className="border border-black mt-3 p-2">
          <div className="flex">
            <input
              id="checkbox"
              type="checkbox"
              className="w-4 h-4"
              onClick={handleClickInputCheckbox}
              checked={isSelectAllChecked}
            />
            <p className="ml-5">Chọn tất cả ({dataSource.length}) sản phẩm</p>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex">
              {/* <div className="mr-6 cursor-pointer text-rose-600" onClick={() => setIsModalOpenDeleteAll(true)}>
                Xóa
              </div> */}
              <ModalDelete
                isModalOpenDeleteAll={isModalOpenDeleteAll}
                setIsModalOpenDeleteAll={setIsModalOpenDeleteAll}
                handleDeleteAll={handleDeleteAll}
              />
            </div>
            <div>
              <p>
                Tổng thanh toán ({dataSource.length}) sản phẩm:{' '}
                {0 ? totalAmount : totalAmount.toLocaleString()} đ
              </p>
            </div>
          </div>
          <div className="text-end">
            <button
              className="bg-red-500 w-40 p-2 rounded-lg mt-3 mb-5 text-white"
              onClick={() => router.push('/create-order')}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export default Cart;
