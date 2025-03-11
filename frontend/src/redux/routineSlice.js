import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoutine = createAsyncThunk("routine/fetchRoutine", async () => {
  const response = await axios.get("http://localhost:5000"); // Asegúrate de que esta ruta coincida con tu API
  return response.data;
});

const routineSlice = createSlice({
  name: "routine",
  initialState: {
    today: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoutine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.today = action.payload;
      })
      .addCase(fetchRoutine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default routineSlice.reducer;
