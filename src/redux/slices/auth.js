import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const initialState = {
  user: {},
  token: "",
  isLoading: false,
};

const Signin = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signin", data);
      const response = await res.data;
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message, { theme: "colored" });
      if (error.response && error.response.data) {
        return rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        error: "Network Error",
      });
    }
  }
);

const ForgetPassword = createAsyncThunk(
  "auth/forget-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/forget-password", data);
      const response = await res.data;
      return response;
    } catch (error) {
      console.log("🚀 ~ error.response?:", error.response);
      toast.error(error.response?.data?.message, { theme: "colored" });
      if (error.response && error.response.data) {
        return rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        error: "Network Error",
      });
    }
  }
);

const Signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signup", data);
      const response = await res.data;
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message, { theme: "colored" });
      if (error.response && error.response.data) {
        return rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        error: "Network Error",
      });
    }
  }
);

const VerifyCode = createAsyncThunk(
  "auth/verify-code",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/verify-code", data);
      const response = await res.data;
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message, { theme: "colored" });
      if (error.response && error.response.data) {
        return rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        error: "Network Error",
      });
    }
  }
);

const ResetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put("/auth/reset-password", data, {
        headers: {
          Authorization: `bearer ${data.token}`,
        },
      });
      const response = await res.data;
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message, { theme: "colored" });
      if (error.response && error.response.data) {
        return rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        error: "Network Error",
      });
    }
  }
);

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    ChangeTheme: (state, action) => {
      state.theme = action.payload;
    },
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Signin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Signin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload?.token?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(Signin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(Signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(Signup.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(VerifyCode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(VerifyCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload?.token?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(VerifyCode.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ForgetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ForgetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ForgetPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ResetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload?.token?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { Logout, SetState, ChangeTheme } = adminAuthSlice.actions;

export {
  SetState,
  Logout,
  ChangeTheme,
  Signin,
  Signup,
  VerifyCode,
  ForgetPassword,
  ResetPassword,
};

export default adminAuthSlice.reducer;
