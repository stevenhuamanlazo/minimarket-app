import { useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { ProductCard } from '../components/ProductCard';
import { PageContainer } from '../components/PageContainer';
import { getLocalProducts } from '../services/localProducts';
import { CATEGORIAS } from '../utils/productos';
import { theme } from '../theme';

export function List() {
  const { products, loading, error } = useFetchProducts();

  // Input controlado: el valor del buscador vive en el estado de React
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  // Productos registrados desde el formulario (se leen una sola vez al montar la página)
  const [locales] = useState(getLocalProducts);

  // Documentación de auditoría (Paso 5 de la guía):
  // Se evita el re-renderizado innecesario aislando el estado del fetch en el custom hook
  // con AbortController, y el filtro se calcula en cada render a partir del estado
  // (sin segundo estado ni segunda petición a la API al escribir en el buscador).
  const todos = [...locales, ...products];
  const filtrados = todos.filter(
    (product) =>
      (categoria === 'Todas' || product.category === categoria) &&
      product.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  // IA: PageContainer existía pero no se usaba, así que no había composición con children → Solución manual: envolver todo el contenido de la página con <PageContainer>
  // IA: el catálogo mezclaba productos de distintos rubros (comida, mascotas, hogar) → Solución manual: asignar una categoría a cada producto y filtrar con botones
  return (
    <PageContainer title="Catálogo de Productos del Minimarket">
      {/* Buscador controlado: onChange actualiza el estado */}
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="🔍 Buscar producto por nombre..."
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.6rem 0.8rem',
          marginTop: '0.5rem',
          boxSizing: 'border-box',
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          fontSize: '0.95rem',
        }}
      />

      {/* Filtros por categoría */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        {['Todas', ...CATEGORIAS].map((cat) => {
          const activa = categoria === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                border: `1.5px solid ${theme.button}`,
                backgroundColor: activa ? theme.button : '#fff',
                color: activa ? '#fff' : theme.primary,
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Renderizado Condicional: Carga */}
      {loading && <p style={{ marginTop: '1rem' }}>Cargando productos del minimarket...</p>}

      {/* Renderizado Condicional: Error */}
      {error && (
        <p style={{ color: theme.error, marginTop: '1rem' }}>Error al obtener datos: {error}</p>
      )}

      {/* Renderizado Iterativo + condicional con ternario */}
      {!loading && !error && (
        <>
          <p style={{ color: theme.muted, fontSize: '0.85rem', marginTop: '1rem' }}>
            Mostrando {filtrados.length} de {todos.length} productos
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem' }}>
            {filtrados.length > 0 ? (
              filtrados.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p>No se encontraron productos{busqueda && ` para "${busqueda}"`}.</p>
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
}