import React, { useState, useCallback, useEffect } from 'react';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { AttachmentButton } from '@chatscope/chat-ui-kit-react';
import { openNotificationWithIcon } from './notification_antd';

interface IUploadFile {
    onSend: (formdata: FormData) => void
}

const UploadFile = ({ onSend }: IUploadFile) => {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const _handleSelectFile = async (file: File) => {
        if (file && acceptedImageTypes.includes(file['type'])){
            if (file.size < 5120000) {
                const formData = new FormData();
                formData.append('files', file);
                formData.append('content', '');
                onSend(formData);
            }
            else {
                openNotificationWithIcon('warning' , 'Không nhập file có dung lượng lớn hơn 5Mb');
            }
        }
        else {
            openNotificationWithIcon('error' , 'Vui lòng nhập file ảnh');
          }
        return false;
    };
    return (
        <Upload
            className="avatar-uploader"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={(file) => _handleSelectFile(file)}
            // onChange={handleChange}
            showUploadList={false}
        >
            <AttachmentButton />
        </Upload>
    );
};

export default UploadFile;