import reducer, { fetchTrainers } from "./trainersSlice";

describe("👨‍🏫 trainersSlice", () => {
  const initialState = {
    list: [],
    status: "idle",
    error: null,
  };

  test("debe retornar el estado inicial", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("debe manejar fetchTrainers.pending", () => {
    const action = { type: fetchTrainers.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  test("debe manejar fetchTrainers.fulfilled", () => {
    const fakeData = [{ id: 1, name: "Ash" }];
    const action = { type: fetchTrainers.fulfilled.type, payload: fakeData };
    const state = reducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.list).toEqual(fakeData);
  });

  test("debe manejar fetchTrainers.rejected", () => {
    const action = {
      type: fetchTrainers.rejected.type,
      error: { message: "No se pudo obtener entrenadores" },
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("No se pudo obtener entrenadores");
  });
});
