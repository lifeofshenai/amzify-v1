import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const GetUsers = createAsyncThunk(
  "admin/get-all-users",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { token } = auth;
      const res = await axios({
        method: "GET",
        url: "admin/get-all-users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filters: JSON.stringify(data?.filters),
          pageNo: data?.pageNo,
          perPage: data?.perPage,
        },
      });
      return res.data;
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

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  usersCount: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
      state.usersCount = action.payload.count;
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
const { SetState } = adminSlice.actions;

export { SetState, GetUsers };

export default adminSlice.reducer;
