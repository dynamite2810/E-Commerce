import { AxiosResponse } from "axios";

import { ApiClient } from "@/configs/api.config"
import { IPost } from "@/interfaces/post.interface";

export const getPosts = async () => {
  const response: AxiosResponse<IPost[]> = await ApiClient.get("/posts");
  return response.data;
}

export const getPostDetail = async (id: string) => {
  const response: AxiosResponse<IPost> = await ApiClient.get(`/posts/${id}`);
  return response.data;
}