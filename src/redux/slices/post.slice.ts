import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPost } from "@/interfaces/post.interface";
import { getPostDetail } from "@/services/api/post.service";
import { RootState } from "../store";

export interface PostState {
  currentPost: IPost | null,
  loading: boolean
}

const initialState: PostState = {
  currentPost: null,
  loading: false
};

export const requestGetPostDetail = createAsyncThunk('auth/user-info', async (id: string) => {
  const res = await getPostDetail(id);
  return res;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestGetPostDetail];
    actionList.forEach(action => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      })
    })

    builder.addCase(requestGetPostDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentPost = action.payload;
    })
  }
})

export const postState = (state: RootState) => state.postState;
export default postSlice.reducer;

