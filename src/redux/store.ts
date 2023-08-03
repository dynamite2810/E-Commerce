import { configureStore } from '@reduxjs/toolkit';

import postReducer from './slices/post.slice';
import authReducer from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    postState: postReducer,
    authState: authReducer,
  },
  middleware: (getDefaultMiddle) => getDefaultMiddle({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
