import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorPayloadType } from "../../interfaces/error.interface";
import { updateUser } from "./userApi";
import { IUser } from "../../interfaces/user.interface";

/********************It's a forced conversion kind of thing ************************* */
export const updateUserAsync = createAsyncThunk<
  IUser | ErrorPayloadType,
  { mahiti: IUser; userId: string },
  { rejectValue: ErrorPayloadType }
>(
  "listing/edit",
  async (
    { mahiti, userId }: { mahiti: IUser; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUser({ mahiti, userId });
      if (typeof response === "undefined")
        return rejectWithValue({ message: "did not get the response" });
      return response as IUser;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

interface ListingState {
  userInfo: IUser | null;
  loading: boolean;
  error: null | string;
}

const initialState: ListingState = {
  userInfo: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        // const id = (action.payload as IUser)._id as string;
        state.userInfo = action.payload as IUser;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? "Failed to create listing";
        state.loading = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

// export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;

// export const selectError = (state: RootState) => state.auth.error;

export default listingSlice.reducer;
