import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainers: [
    { id: 1, name: "Juan", photo: "/juan.jpg", active: true },
    { id: 2, name: "Carlos", photo: "/carlos.jpg", active: true }
  ],
  events: [
    { name: "Aérobiocos", time: "04:00 p.m." },
    { name: "Activación de spinning", time: "02:35 p.m." }
  ]
};

const SliceTrainersList = createSlice({
  name: "trainersList",
  initialState,
  reducers: {
    addTrainer: (state, action) => {
      state.trainers.push(action.payload);
    },
    updateTrainerStatus: (state, action) => {
      const { id, active } = action.payload;
      const trainer = state.trainers.find((t) => t.id === id);
      if (trainer) trainer.active = active;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event, index) => index !== action.payload
      );
    }
  }
});

export const { addTrainer, updateTrainerStatus, addEvent, removeEvent } =
  SliceTrainersList.actions;
export default SliceTrainersList.reducer;
