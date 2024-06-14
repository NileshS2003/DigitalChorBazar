import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../features/Auth/authSlice";
import listingReducer from "../features/lisitng/listingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
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
