import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IListing, IListingData } from "../../interfaces/listing.interface";
import { ErrorPayloadType } from "../../interfaces/error.interface";
import {
  createListing,
  deleteUserListing,
  editListing,
  getUserListing,
} from "./listingAPi";

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

export const getUserListingAsync = createAsyncThunk<
  IListing[] | ErrorPayloadType,
  string,
  { rejectValue: ErrorPayloadType }
>("listing/get", async (userId, { rejectWithValue }) => {
  try {
    const response = await getUserListing(userId);
    if (typeof response === "undefined")
      return rejectWithValue({ message: "did not get the response" });
    return response as IListing[];
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

export const deleteUserListingAsync = createAsyncThunk<
  IListing | ErrorPayloadType,
  string,
  { rejectValue: ErrorPayloadType }
>("listing/delete", async (listingId, { rejectWithValue }) => {
  try {
    const response = await deleteUserListing(listingId);
    if (typeof response === "undefined")
      return rejectWithValue({ message: "did not get the response" });
    return response as IListing;
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

export const editListingAsync = createAsyncThunk<
  IListing | ErrorPayloadType,
  { mahiti: IListing; listingId: string },
  { rejectValue: ErrorPayloadType }
>(
  "listing/edit",
  async (
    { mahiti, listingId }: { mahiti: IListing; listingId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await editListing({ mahiti, listingId });
      if (typeof response === "undefined")
        return rejectWithValue({ message: "did not get the response" });
      return response as IListing;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

interface ListingState {
  listings: IListing[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: ListingState = {
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
        state.error = action.payload?.message ?? "Failed to create listing";
        state.loading = false;
      })
      .addCase(createListingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserListingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload as IListing[];
      })
      .addCase(getUserListingAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? "Failed to create listing";
        state.loading = false;
      })
      .addCase(getUserListingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserListingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const id = (action.payload as IListing)._id as string;
        state.listings =
          state.listings?.filter((list) => list._id !== id) || null;
      })
      .addCase(deleteUserListingAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? "Failed to create listing";
        state.loading = false;
      })
      .addCase(deleteUserListingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editListingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const id = (action.payload as IListing)._id as string;
        state.listings =
          state.listings?.map((list) => {
            if (list._id === id) return action.payload as IListing;
            return list;
          }) || null;
      })
      .addCase(editListingAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? "Failed to create listing";
        state.loading = false;
      })
      .addCase(editListingAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

// export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;

// export const selectError = (state: RootState) => state.auth.error;

export default listingSlice.reducer;
