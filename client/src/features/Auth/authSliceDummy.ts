import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInUser, CreateUser, SignOutUser } from "./authAPI";
// import { updateUser } from '../user/userAPI';
import { IUser, IUserData } from "../../interfaces/user.interface";
import { RootState } from "../../app/store";

const initialState: {
  loggedInUser: IUser | null;
  status: string;
  error: Error | null;
} = {
  loggedInUser: null, //should contain only id and role
  status: "idle",
  error: null,
};

export const CreateUserAsync = createAsyncThunk<IUser, IUserData>(
  "user/createUser",
  async (userdata) => {
    const response = await CreateUser(userdata);
    // Explicitly cast response to the expected type
    return response as IUser;
  }
);

export const SignInUserAsync = createAsyncThunk(
  "user/signinUser",
  async (userdata: IUserData, { rejectWithValue }) => {
    try {
      const response = await SignInUser(userdata);
      return response as IUser;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const SignOutUserAsync = createAsyncThunk(
  "user/SignOutUser",
  async () => {
    const response = await SignOutUser();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.loggedInUser = action.payload;
        state.loggedInUser = action.payload;
      })
      .addCase(SignInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(SignInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUser = action.payload;
      // })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignOutUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

// export const { increment } = authSlice.actions;

export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
