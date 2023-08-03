import { ApiClient } from '@/configs/api.config';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ErrorMessage } from '@hookform/error-message';
import { Radio } from 'antd';
import { openNotificationWithIcon } from 'helper/notification_antd';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Wrap from '../../scenes/auth/components/Wrap';
import styles from './style/profile.module.scss';

//import upload avatar
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import FormData from 'form-data';
import { unwrapResult } from '@reduxjs/toolkit';
import { updateProfile } from '@/redux/slices/auth.slice';
import Image from 'next/image';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
//=======================================================
function Profile() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [gender, setGender] = useState();
  const [bod, setBod] = useState();
  const [isFormChanged, setIsFormChanged] = useState(false);
  //upload antd
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  type FormDataState = FormData;
  const [formData, setFormData] = useState<any>(new FormData());
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  //validation input

  //lấy thông tin user
  const auth = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: 'all',
  });

  const getInfoUser = async () => {
    try {
      const result = await ApiClient.get('user/info');
      setEmail(result.data.user.email);
      setUsername(result.data.user.username);
      setFullName(result.data.user.name);
      setPhone(result.data.user.phone);
      setGender(result.data.user.gender);
      setBod(result.data.user.dob.split('T')[0].split('-').join('-'));
    } catch (error) {
      console.log(error);
    }
  };
  const validationDate = auth.currentUser?.dob?.split('T')[0].split('-').join('-');
  useEffect(() => {
    setImageUrl(auth.currentUser?.avatar);
    setValue('username', auth.currentUser?.username);
    setValue('fullName', auth.currentUser?.name);
    setValue('phone', auth.currentUser?.phone);
    setValue('gender', auth.currentUser?.gender);
    setValue('dob', validationDate);
    getInfoUser();
  }, [auth]);

  //======================================================
  //update profile user
  const onSubmit = async () => {
    try {
      if (!isFormChanged) {
        openNotificationWithIcon('error', 'Thông tin không có thay đổi, cập nhật thất bại!');
      } else {
        formData.set('username', username);
        formData.set('name', fullName);
        formData.set('phone', phone);
        formData.set('gender', gender);
        formData.set('dob', bod);
        const resultAction = await dispatch(updateProfile(formData));
        unwrapResult(resultAction);
        openNotificationWithIcon('success', 'Sửa thông tin thành công!');
        router.push('/');
      }
    } catch (error: any) {
      openNotificationWithIcon('error', error.message);
    }
  };
  //onchange
  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value);
    setIsFormChanged(true);
  };
  const handleChangeFullName = (e: any) => {
    setFullName(e.target.value);
    setIsFormChanged(true);
  };
  const handleChangePhoneNumber = (e: any) => {
    setPhone(e.target.value);
    setIsFormChanged(true);
  };
  const handleChangeSex = (e: any) => {
    setGender(e.target.value);
    setIsFormChanged(true);
  };
  const handleChangeBirthday = (e: any) => {
    setBod(e.target.value);
    setIsFormChanged(true);
  };

  //upload avatar========================================
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList([
      {
        ...newFileList[newFileList.length - 1],
        status: 'done',
      },
    ]);
    console.log(fileList);
  };

  const _handleSelectFile = async (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      openNotificationWithIcon('error', 'Kích thước file ảnh không lớn hơn 5MB!');
    } else if (isJpgOrPng) {
      getBase64(file, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      const formData = new FormData();
      formData.append('file', file);
      setFormData(formData);
      setIsFormChanged(true);
    } else {
      openNotificationWithIcon('error', 'Vui lòng chọn định dạng ảnh png, jpg, jpeg!');
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChangeLabel: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0] as RcFile;
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      openNotificationWithIcon('error', 'Kích thước file ảnh không lớn hơn 5MB!');
    } else if (isJpgOrPng) {
      getBase64(file as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      const formData = new FormData();
      formData.append('file', file);
      setFormData(formData);
      setIsFormChanged(true);
    } else {
      openNotificationWithIcon('error', 'Vui lòng chọn định dạng ảnh png, jpg, jpeg!');
    }
  };
  //===================avatar============================================================
  const minYear = 1980;
  const maxYear = 2023;
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
    <Wrap>
      <div>
        <div className={styles.container_profile}>
          <div className={styles.form_profile_header}>
            <div>
              <div className={styles.ho_so}>Hồ Sơ Của Tôi</div>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div>
              <button
                className="bg-dart-red p-1 w-24 rounded-md mt-6 text-white font-bold border border-black"
                onClick={() => router.push('/my-wallet')}
              >
                Ví
              </button>
            </div>
          </div>
          <div className={styles.hr}></div>
          <div className={styles.form_profile_content}>
            {/*content left */}
            <div className={styles.form_profile_content_left}>
              <div>
                <div className="flex mt-2 mb-2">
                  <p className="w-28 text-gray-400">Tên đăng nhập</p>
                  <div>
                    <input
                      className="bg-gray-300 border-none outline-none p-1 w-52"
                      id="inp-fullName"
                      type="text"
                      placeholder="Tên đăng nhập"
                      value={fullName}
                      {...register('fullName', {
                        required: 'Vui lòng nhập tên đăng nhập!',
                        pattern: {
                          value: /^[a-zA-ZÀ-ỹ\s']+$/i,
                          message: 'Tên không chứa ký tự đặc biệt!',
                        },
                      })}
                      onChange={(e) => handleChangeFullName(e)}
                    />
                    {Error('fullName')}
                  </div>
                </div>
                <div className="flex mt-2 mb-2">
                  <p className="w-28 text-gray-400">Tên</p>
                  <div>
                    <input
                      className="bg-gray-300 border-none outline-none p-1 w-52"
                      id="inp-username"
                      type="text"
                      placeholder="Tên"
                      value={username}
                      {...register('username', {
                        required: 'Vui lòng nhập tên!',
                        pattern: {
                          value: /^[a-zA-ZÀ-ỹ\s']+$/i,
                          message: 'Tên không chứa ký tự đặc biệt!',
                        },
                      })}
                      onChange={(e) => handleChangeUsername(e)}
                    />
                    {Error('username')}
                  </div>
                </div>
                <div className="flex mt-2 mb-2">
                  <p className="w-28 text-gray-400">Email</p>
                  <div>
                    <input
                      className="bg-gray-300 border-none outline-none p-1 w-52"
                      id="inp-email"
                      type="text"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex mt-2 mb-2">
                  <p className="w-28 text-gray-400">Số điện thoại</p>
                  <div>
                    <input
                      className="bg-gray-300 border-none outline-none p-1 w-52"
                      id="inp-phone"
                      type="number"
                      placeholder="Số điện thoại"
                      value={phone}
                      {...register('phone', {
                        required: 'Vui lòng nhập số điện thoại!',
                        pattern: {
                          value: /^0[1-9]\d{8}$/i,
                          message: 'Số điện thoại không hợp lệ!',
                        },
                      })}
                      onChange={(e) => handleChangePhoneNumber(e)}
                    />
                    {Error('phone')}
                  </div>
                </div>
                <div className="flex mt-2 mb-2 relative">
                  <p className="w-28 text-gray-400">Mật khẩu</p>
                  <input
                    className="bg-gray-300 border-none outline-none p-1 w-52"
                    id="inp-password"
                    type="password"
                    placeholder="***********"
                  />
                  <p className="absolute right-1 top-1 text-blue-800">Thay đổi</p>
                </div>
              </div>
              <div className="ml-7">
                <div className="flex mt-2 mb-3">
                  <p className="w-20 text-gray-400">Giới tính</p>
                  <Radio.Group onChange={(e) => handleChangeSex(e)} value={gender}>
                    <Radio value="nam"> Nam </Radio>
                    <Radio value="nữ"> Nữ </Radio>
                    <Radio value="khác"> Khác </Radio>
                  </Radio.Group>
                </div>
                <div className="flex mt-4 mb-2">
                  <p className="w-20 text-gray-400">Ngày sinh</p>
                  <div>
                    <input
                      className="bg-gray-300 w-48 border-none outline-none p-1"
                      id="inp-date"
                      type="date"
                      value={bod}
                      min={`${minYear}-01-01`}
                      max={`${maxYear}-12-31`}
                      {...register('dob', {
                        required: 'Vui lòng điền ngày, tháng, năm sinh!',
                      })}
                      onChange={(e) => {
                        handleChangeBirthday(e);
                      }}
                    />
                    {Error('dob')}
                  </div>
                </div>
              </div>
            </div>
            {/*content right */}
            <div className={styles.form_hr}></div>
            <div className={styles.form_profile_content_right}>
              <div className={styles.form_image}>
                <>
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    accept="image/jpeg, image/png"
                    showUploadList={false}
                    beforeUpload={(file) => _handleSelectFile(file)}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          minWidth: '140px',
                          height: '140px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                        width={140}
                        height={140}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </>
                <div>
                  <label className="block w-28 p-1 border border-black  rounded mt-8 text-center bg-white">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      style={{ display: 'none', cursor: 'pointer' }}
                      onChange={handleChangeLabel}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-dart-red p-1 w-24 rounded-md mb-3 text-white font-bold border border-black"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export default Profile;
