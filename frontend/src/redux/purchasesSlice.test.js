import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import purchasesReducer, { addPurchase, resetPurchases, fetchUserPurchases } from './purchasesSlice';

jest.mock('axios');

describe('🛒 purchasesSlice', () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    store = configureStore({
      reducer: {
        purchases: purchasesReducer,
      },
    });
  });

  test('✅ addPurchase agrega una compra y actualiza localStorage', () => {
    const compra = { id: 1, producto: 'Proteína', precio: 30 };

    store.dispatch(addPurchase(compra));

    const state = store.getState().purchases;

    expect(state.items).toContainEqual(compra);

    const localData = JSON.parse(localStorage.getItem('user_purchases'));
    expect(localData).toContainEqual(compra);
  });

  test('♻️ resetPurchases limpia estado y localStorage', () => {
    store.dispatch(addPurchase({ id: 2, producto: 'Creatina', precio: 25 }));
    store.dispatch(resetPurchases());

    const state = store.getState().purchases;

    expect(state).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });

    expect(localStorage.getItem('user_purchases')).toBeNull();
  });

  test('📡 fetchUserPurchases fulfilled', async () => {
    const userId = '123';
    const mockData = [
      { id: 1, producto: 'Creatina', precio: 25 },
      { id: 2, producto: 'Shaker', precio: 10 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchUserPurchases(userId));

    const state = store.getState().purchases;

    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockData);

    const localData = JSON.parse(localStorage.getItem('user_purchases'));
    expect(localData).toEqual(mockData);
  });

  test('❌ fetchUserPurchases rejected', async () => {
    const userId = '123';

    axios.get.mockRejectedValueOnce({
      response: { data: 'Error al cargar compras' },
    });

    await store.dispatch(fetchUserPurchases(userId));

    const state = store.getState().purchases;

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Error al cargar compras');
  });
});
