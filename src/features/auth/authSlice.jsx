import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../Firebase/furebase.confige";

const initialState = {
  user: { email: "", role: "" },
  isLoading: true,
  isError: false,
  success: false,
  errorMessage: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password, reset }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const userEmail = data.user.email;

    return { userEmail, reset };
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`http://localhost:1000/user/${email}`);
  const data = await res.json();

  if (data.status) {
    return data;
  }

  return email;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();

  const data = await signInWithPopup(auth, googleProvider);

  return data.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.email = "";
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.user.email = payload.userEmail;
        state.isError = false;
        state.errorMessage = "";
        payload.reset();
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.user.email = "";
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.success = true;
        state.user.email = payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.user.email = "";
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(googleLogin.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.success = true;
        state.user.email = payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.user.email = "";
        state.isError = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = true;

        if (payload.status) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.user.email = "";
        state.isError = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { logout, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
