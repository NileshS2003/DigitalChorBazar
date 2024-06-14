import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateUser,
  fetchUser,
  SignInUser,
  SignInWithGoogle,
  SignOutUser,
} from "./authAPI";
import { IUser, IUserData } from "../../interfaces/user.interface";
import { RootState } from "../../app/store";
import { ErrorPayloadType } from "../../interfaces/error.interface";

interface AuthState {
  loggedInUser: IUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

// Adjust CreateUserAsync to return the correct types
export const CreateUserAsync = createAsyncThunk<
  IUser,
  IUserData,
  { rejectValue: ErrorPayloadType }
>("auth/createUser", async (userdata, { rejectWithValue }) => {
  try {
    const response = await CreateUser(userdata);
    return response;
  } catch (err: any) {
    return rejectWithValue({ message: err.message });
  }
});

// Adjust SignInUserAsync to return the correct types
export const SignInUserAsync = createAsyncThunk<
  IUser,
  IUserData,
  { rejectValue: ErrorPayloadType }
>("auth/signinUser", async (userdata, { rejectWithValue }) => {
  try {
    const response = await SignInUser(userdata);
    return response as IUser;
  } catch (err: any) {
    return rejectWithValue({ message: err.message });
  }
});

export const SignInWithGoogleAsync = createAsyncThunk<
  IUser,
  { email: string; username: string },
  { rejectValue: ErrorPayloadType }
>("auth/signinUserWithGoogle", async (userdata, { rejectWithValue }) => {
  try {
    const response = await SignInWithGoogle(userdata);
    return response as IUser;
  } catch (err: any) {
    return rejectWithValue({ message: err.message });
  }
});


//COpied from gemini
export const fetchUserAsync = createAsyncThunk<IUser, void, { rejectValue: ErrorPayloadType }>(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUser()
      return response as IUser;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Adjust SignOutUserAsync if necessary
export const SignOutUserAsync = createAsyncThunk(
  "user/SignOutUser",
  async () => {
    const response = await SignOutUser();
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        CreateUserAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.status = "succeeded";
          state.loggedInUser = action.payload;
          state.error = null;
        }
      )
      .addCase(CreateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message ?? "Failed to create user";
      })

      .addCase(SignInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        SignInUserAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.status = "idle";
          state.loggedInUser = action.payload;
        }
      )
      .addCase(SignInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload?.message ?? "Failed to create user";
      })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignOutUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(SignInWithGoogleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        SignInWithGoogleAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.status = "idle";
          state.loggedInUser = action.payload;
        }
      )
      .addCase(SignInWithGoogleAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload?.message ?? "Failed to create user";
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
      }) 
      .addCase(
        fetchUserAsync.rejected,
        (state, action: PayloadAction<ErrorPayloadType | undefined>) => {
          state.status = "failed";
          state.error = action.payload
            ? action.payload.message
            : "Failed to fetch user";
        }
      );
  },
});

export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
