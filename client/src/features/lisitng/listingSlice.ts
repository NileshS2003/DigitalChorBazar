import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IListing, IListingData } from "../../interfaces/listing.interface";
import { ErrorPayloadType } from "../../interfaces/error.interface";
import { createListing } from "./listingAPi";

/********************It's a forced conversion kind of thing ************************* */

export const createListingAsync = createAsyncThunk<
IListing | ErrorPayloadType,
  IListingData,
  { rejectValue: ErrorPayloadType }
>("listing/create", async (listingData, { rejectWithValue }) => {
  try {
    const response = await createListing(listingData);
    if (typeof response === "undefined")
      return rejectWithValue({ message: "did not get the response" });
    return response as IListing;
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

interface IinitailState {
  listings: IListing[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: IinitailState = {
  listings: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createListingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.listings?.push(action.payload as IListing);
      })
      .addCase(createListingAsync.rejected, (state, action) => {
        state.error=action.payload?.message ?? "Failed to create listing";
        state.loading = false;

      })
      .addCase(createListingAsync.pending, (state) => {
        state.loading = true; 
      });
  },
});

// export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;

// export const selectError = (state: RootState) => state.auth.error;

export default listingSlice.reducer;
