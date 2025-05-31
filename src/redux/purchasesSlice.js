import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Async thunk para obtener las compras del usuario
export const fetchUserPurchases = createAsyncThunk(
  "purchases/fetchUserPurchases",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/purchases/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📦 Cargar compras guardadas desde localStorage
const savedPurchases = localStorage.getItem("user_purchases");
const initialLocalData = savedPurchases ? JSON.parse(savedPurchases) : [];

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: {
    items: initialLocalData,      // Lista de compras
    status: "idle",               // idle | loading | succeeded | failed
    error: null                   // Errores de carga
  },
  reducers: {
    // 🧹 Limpiar compras
    resetPurchases: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user_purchases");
    },

    // ➕ Agregar nueva compra y guardar en localStorage
    addPurchase: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("user_purchases", JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPurchases.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
        localStorage.setItem("user_purchases", JSON.stringify(state.items));
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "No se pudieron cargar las compras.";
      });
  }
});

// 🟢 Exportaciones
export const { resetPurchases, addPurchase } = purchasesSlice.actions;
export default purchasesSlice.reducer;

