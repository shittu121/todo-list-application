import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/AuthSlice';
import todoSlice from '../features/todo/TodoSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;