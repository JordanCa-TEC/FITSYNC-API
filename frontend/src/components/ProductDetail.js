import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setError('Error al cargar el producto. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Solo se actualiza cuando cambia el id

  return { product, loading, error };
};
