import { theme } from '../theme';

export function ProductCard({ product }) {
  return (
    <div
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
        padding: '1rem',
        width: '220px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Si el producto no tiene imagen (por ejemplo, en la vista previa del formulario) se muestra un ícono */}
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: '100%',
            height: '130px',
            objectFit: 'contain',
            borderRadius: '4px',
            backgroundColor: theme.bg,
          }}
        />
      ) : (
        <div
          style={{
            height: '130px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            borderRadius: '4px',
            backgroundColor: theme.bg,
          }}
        >
          🛒
        </div>
      )}

      {/* Etiqueta de categoría */}
      {product.category && (
        <span
          style={{
            alignSelf: 'flex-start',
            marginTop: '0.6rem',
            padding: '0.15rem 0.6rem',
            borderRadius: '999px',
            backgroundColor: '#E8F5E9',
            color: theme.primary,
            fontSize: '0.72rem',
            fontWeight: 600,
          }}
        >
          {product.category}
        </span>
      )}

      <h3 style={{ fontSize: '1.05rem', margin: '0.4rem 0' }}>{product.title}</h3>
      {/* IA: la descripción en español se cortaba por la altura fija → Solución manual: quitar height/overflow y usar flexGrow dentro de una tarjeta en columna */}
      <p style={{ color: theme.muted, fontSize: '0.85rem', flexGrow: 1 }}>
        {product.description}
      </p>
      <p style={{ fontWeight: 'bold', color: theme.price, margin: '0.5rem 0 0' }}>
        S/ {product.price.toFixed(2)}
      </p>
    </div>
  );
}