import { profileReducer } from "./profileReducer";

describe("👤 profileReducer", () => {
  const initialState = {
    loading: false,
    userData: null,
    error: null,
    success: false,
  };

  test("debe retornar el estado inicial por defecto", () => {
    const state = profileReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test("debe manejar PROFILE_REQUEST", () => {
    const action = { type: "PROFILE_REQUEST" };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test("debe manejar PROFILE_SUCCESS", () => {
    const mockUserData = { name: "Jordan", email: "jordan@example.com" };
    const action = { type: "PROFILE_SUCCESS", payload: mockUserData };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      userData: mockUserData,
      success: true,
    });
  });

  test("debe manejar PROFILE_FAIL", () => {
    const error = "Error al cargar perfil";
    const action = { type: "PROFILE_FAIL", payload: error };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
      success: false,
    });
  });

  test("debe manejar PROFILE_RESET", () => {
    const estadoPrevio = {
      loading: true,
      userData: { name: "Jordan" },
      error: "Algo salió mal",
      success: true,
    };
    const action = { type: "PROFILE_RESET" };
    const state = profileReducer(estadoPrevio, action);
    expect(state).toEqual(initialState);
  });
});
