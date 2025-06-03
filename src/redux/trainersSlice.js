import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrainers = createAsyncThunk("trainers/fetchTrainers", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}`); //  API
  return response.data;
});

const trainersSlice = createSlice({
  name: "trainers",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default trainersSlice.reducer;
