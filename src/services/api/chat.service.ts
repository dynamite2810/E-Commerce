import { ApiClient } from "../../configs/api.config";
import { AxiosResponse } from "axios";


export const getRooms = async () => {
    const response: AxiosResponse<any> = await ApiClient.get('/chat/rooms');
    return response.data;
};

export const getListMessages = async (conversationActive: string , limit : number) => {
    const response: AxiosResponse<any> = await ApiClient.get(`/chat/rooms/${conversationActive}/messages?size=${limit}`);
    return response.data;
};

export const sendMessage = async (idConversation: string, msg: string, formData: FormData | null) => {
    if (formData) {
        const response: AxiosResponse<any> = await ApiClient.post(`/chat/rooms/${idConversation}/messages`, formData);
        return response.data;
    }
    else {
        const response: AxiosResponse<any> = await ApiClient.post(`/chat/rooms/${idConversation}/messages`, {
            content: msg
        });
        return response.data;
    }
};

