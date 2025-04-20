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

// 🔻 NUEVO: recuperar de localStorage si existe
const savedPurchases = localStorage.getItem("user_purchases");
const initialLocalData = savedPurchases ? JSON.parse(savedPurchases) : [];

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: {
    items: initialLocalData, // NUEVO
    status: "idle",
    error: null
  },
  reducers: {
    // Acción para limpiar el estado de compras
    resetPurchases: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user_purchases"); // NUEVO
    },

    // NUEVO: Agregar nueva compra
    addPurchase: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("user_purchases", JSON.stringify(state.items)); // NUEVO
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

        // NUEVO: guardar también en localStorage
        localStorage.setItem("user_purchases", JSON.stringify(action.payload));
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// Exportación del reducer y acciones
export const { resetPurchases, addPurchase } = purchasesSlice.actions; // NUEVO
export default purchasesSlice.reducer;
