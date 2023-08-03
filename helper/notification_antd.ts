import {
    notification,
} from "antd";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotificationWithIcon = (type : NotificationType, description : string, message = "Thông báo") => {
    notification[type]({
        message,
        description,
        duration: 3,
    });
};