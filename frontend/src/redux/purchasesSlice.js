import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk para obtener las compras del usuario
export const fetchUserPurchases = createAsyncThunk(
  "purchases/fetchUserPurchases",
  async (userId) => {
    const res = await axios.get(`/api/purchases/${userId}`);
    return res.data;
  }
);

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {
    // Acción para limpiar el estado de compras
    resetPurchases: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPurchases.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// Exportación del reducer y acción
export const { resetPurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer;
