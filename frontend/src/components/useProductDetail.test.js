const { renderHook } = require('@testing-library/react-hooks');
const axios = require('axios');
const { useProductDetail } = require('./useProductDetail');

jest.mock('axios');

describe('useProductDetail', () => {
  const mockProduct = {
    id: 1,
    name: 'Producto de prueba',
    price: 50,
    image: '/img.jpg',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe obtener producto correctamente', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProduct });

    const { result, waitForNextUpdate } = renderHook(() => useProductDetail(1));

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('debe manejar error al obtener producto', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    const { result, waitForNextUpdate } = renderHook(() => useProductDetail(1));

    await waitForNextUpdate();

    expect(result.current.product).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error al cargar el producto. Intenta nuevamente más tarde.');
  });
});
