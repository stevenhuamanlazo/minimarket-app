import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { adaptarProducto } from '../utils/productos';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // StrictMode (solo en desarrollo) monta, desmonta y vuelve a montar el componente:
  // por eso verás 2 peticiones en la pestaña Network y la primera aparece como
  // "cancelled" gracias al AbortController. En producción solo hay una petición.
  useEffect(() => {
    // Instancia de AbortController para cancelar peticiones al desmontar el componente
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Consumo de API: categoría "groceries" (productos de minimarket)
        const response = await api.get('/products/category/groceries', {
          signal: controller.signal,
        });

        // Se adaptan al contexto local: textos en español y precios en soles.
        // Así el buscador también filtra por el nombre en español.
        setProducts(response.data.products.map(adaptarProducto));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Petición abortada correctamente por el controlador');
        } else {
          setError(err.message || 'Error al obtener el catálogo del minimarket');
        }
      } finally {
        // Si la petición fue abortada, el nuevo efecto sigue cargando:
        // no se apaga loading para evitar un parpadeo de "sin productos".
        if (!controller.signal.aborted) {
          setLoading(false);
        }
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
