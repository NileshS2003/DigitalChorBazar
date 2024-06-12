import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUser } from './authAPI';
import { IUser, IUserData } from '../../interfaces/user.interface';
import { RootState } from '../../app/store';
import { ErrorPayloadType } from '../../interfaces/error.interface';


interface AuthState {
  loggedInUser: IUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};



// Adjust CreateUserAsync to return the correct types
export const CreateUserAsync = createAsyncThunk<IUser, IUserData, { rejectValue: ErrorPayloadType}>(
  'auth/createUser',
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await CreateUser(userdata);
      return response;
    } catch (err: any) {
      return rejectWithValue({ message: err.message });
    }
  }
);

// // Adjust SignInUserAsync to return the correct types
// export const SignInUserAsync = createAsyncThunk<IUser, IUserData, { rejectValue: ErrorPayloadType}>(
//   "user/signinUser",
//   async (userdata, { rejectWithValue }) => {
//     try {
//       const response = await SignInUser(userdata);
//       return response as IUser ;
//     } catch (err: any) {
//       return rejectWithValue({ message: err.message });
//     }
//   }
// );

// // Adjust SignOutUserAsync if necessary
// export const SignOutUserAsync = createAsyncThunk(
//   "user/SignOutUser",
//   async () => {
//     const response = await SignOutUser();
//     return response;
//   }
// );


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(CreateUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = 'succeeded';
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(CreateUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Failed to create user';
      })

        // .addCase(SignInUserAsync.pending, (state) => {
        //   state.status = "loading";
        // })
        // .addCase(SignInUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        //   state.status = "idle";
        //   state.loggedInUser = action.payload;
        // })
        // .addCase(SignInUserAsync.rejected, (state, action) => {
        //   state.status = "idle";
        //   state.error = action.payload as ErrorPayload;
        // })
        // .addCase(SignOutUserAsync.pending, (state) => {
        //   state.status = "loading";
        // })
        // .addCase(SignOutUserAsync.fulfilled, (state) => {
        //   state.status = "idle";
        //   state.loggedInUser = null;
        // });
    },
  });
  
  export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
  
  export const selectError = (state: RootState) => state.auth.error;
  
  export default authSlice.reducer;
  