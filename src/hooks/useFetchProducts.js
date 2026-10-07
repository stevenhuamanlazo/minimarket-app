import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Instancia de AbortController para cancelar peticiones al desmontar el componente
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Consumo de API filtrando productos de cafetería/abarrotes
        const response = await api.get('/products/category/groceries', {
          signal: controller.signal,
        });

        setProducts(response.data.products);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Petición abortada correctamente por el controlador');
        } else {
          setError(err.message || 'Error al obtener el catálogo de la cafetería');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Cleanup del useEffect para evitar memory leaks o renders innecesarios
    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
};