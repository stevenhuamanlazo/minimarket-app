import { useFetchProducts } from '../hooks/useFetchProducts';
import { ProductCard } from '../components/ProductCard';

export function List() {
  const { products, loading, error } = useFetchProducts();

  // Documentación de auditoría (Paso 5 de la guía):
  // Se evita el re-renderizado innecesario aislando el estado del fetch en el custom hook 
  // con AbortController, previniendo cascadas de red al cambiar de vista.

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Catálogo de Productos de Cafetería</h2>

      {/* Renderizado Condicional: Carga */}
      {loading && <p>Cargando productos de la cafetería...</p>}

      {/* Renderizado Condicional: Error */}
      {error && <p style={{ color: 'red' }}>Error al obtener datos: {error}</p>}

      {/* Renderizado Iterativo */}
      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No existen productos en el catálogo.</p>
          )}
        </div>
      )}
    </div>
  );
}