import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/purchases`, {
          withCredentials: true // necesario si usás cookies para el auth
        });
        setPurchases(response.data);
      } catch (err) {
        console.error("Error al obtener las compras:", err);
        setError("Error al cargar las compras. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  return { purchases, loading, error };
};
