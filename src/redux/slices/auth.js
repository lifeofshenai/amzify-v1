import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const initialState = {
  user: {},
  token: "",
  isLoading: false,
  isSendEmailLoading: false,
  vendorDetails: {
    companyName: "",
    companyNumber: "",
    countryOfIncorporation: "",
    ein: "",
    firstName: "",
    lastName: "",
    taxNumber: "",
    vatNumber: "",
    logoUrl: "",
  },
  currentStep: 0,
  domainStatus: null,
  steps: [
    {
      id: "company-details",
      title: "Company Details",
      description: "Enter your company information",
      completed: false,
      required: true,
    },
    {
      id: "payment-setup",
      title: "Payment Setup",
      description: "Set up your payment method",
      completed: false,
      required: true,
    },
    {
      id: "domain-email",
      title: "Domain & Email",
      description: "Set up your business domain and email",
      completed: false,
      required: false,
    },
    {
      id: "email-verification",
      title: "Account Setup",
      description: "Verify email and create password",
      completed: false,
      required: true,
    },
  ],
};

const Signin = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signin", data);
      return res.data;
    } catch (error) {
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
      return res.data;
    } catch (error) {
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
      return res.data;
    } catch (error) {
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

const SendVerificationEmail = createAsyncThunk(
  "auth/send-verification-email",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/send-verification-email", data);
      return res.data;
    } catch (error) {
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
      return res.data;
    } catch (error) {
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
      return res.data;
    } catch (error) {
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state, action) => {
      state.user = null;
      state.token = null;
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
      state.token = action.payload?.token?.token;
    });
    builder.addCase(Signup.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(SendVerificationEmail.pending, (state) => {
      state.isSendEmailLoading = true;
    });
    builder.addCase(SendVerificationEmail.fulfilled, (state, action) => {
      state.isSendEmailLoading = false;
    });
    builder.addCase(SendVerificationEmail.rejected, (state, action) => {
      state.isSendEmailLoading = false;
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

const { Logout, SetState } = authSlice.actions;

export {
  SetState,
  Logout,
  Signin,
  Signup,
  SendVerificationEmail,
  VerifyCode,
  ForgetPassword,
  ResetPassword,
};

export default authSlice.reducer;
