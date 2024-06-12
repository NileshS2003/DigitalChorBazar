import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from '../features/Auth/authSlice'

const store = configureStore({
  reducer: {
    auth : authReducer
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware()
  //       .prepend(
  //       )
  //       // prepend and concat calls can be chained
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
