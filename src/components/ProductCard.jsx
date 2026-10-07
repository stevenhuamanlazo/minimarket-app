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
      }}
    >
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
      <h3 style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>{product.title}</h3>
      <p style={{ color: theme.muted, fontSize: '0.85rem', height: '40px', overflow: 'hidden' }}>
        {product.description}
      </p>
      <p style={{ fontWeight: 'bold', color: theme.price, margin: '0.5rem 0 0' }}>
        $ {product.price}
      </p>
    </div>
  );
}
