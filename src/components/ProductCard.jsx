export function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '1rem',
      width: '220px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
      backgroundColor: '#fff'
    }}>
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '4px' }} 
      />
      <h3 style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>{product.title}</h3>
      <p style={{ color: '#666', fontSize: '0.85rem', height: '40px', overflow: 'hidden' }}>{product.description}</p>
      <p style={{ fontWeight: 'bold', color: '#2e7d32', margin: '0.5rem 0 0' }}>S/ {product.price}</p>
    </div>
  );
}