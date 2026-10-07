import { useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { ProductCard } from '../components/ProductCard';
import { PageContainer } from '../components/PageContainer';
import { theme } from '../theme';

export function List() {
  const { products, loading, error } = useFetchProducts();

  // Input controlado: el valor del buscador vive en el estado de React
  const [busqueda, setBusqueda] = useState('');

  // Documentación de auditoría (Paso 5 de la guía):
  // Se evita el re-renderizado innecesario aislando el estado del fetch en el custom hook
  // con AbortController, y el filtro se calcula en cada render a partir del estado
  // (sin segundo estado ni segunda petición a la API al escribir en el buscador).
  const filtrados = products.filter((product) =>
    product.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  // IA: PageContainer existía pero no se usaba, así que no había composición con children → Solución manual: envolver todo el contenido de la página con <PageContainer>
  return (
    <PageContainer title="Catálogo de Productos del Minimarket">
      {/* Buscador controlado: onChange actualiza el estado */}
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar producto por nombre..."
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.6rem',
          marginTop: '0.5rem',
          boxSizing: 'border-box',
          border: `1px solid ${theme.border}`,
          borderRadius: '6px',
        }}
      />

      {/* Renderizado Condicional: Carga */}
      {loading && <p style={{ marginTop: '1rem' }}>Cargando productos del minimarket...</p>}

      {/* Renderizado Condicional: Error */}
      {error && (
        <p style={{ color: theme.error, marginTop: '1rem' }}>Error al obtener datos: {error}</p>
      )}

      {/* Renderizado Iterativo + condicional con ternario */}
      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {filtrados.length > 0 ? (
            filtrados.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No se encontraron productos{busqueda && ` para "${busqueda}"`}.</p>
          )}
        </div>
      )}
    </PageContainer>
  );
}