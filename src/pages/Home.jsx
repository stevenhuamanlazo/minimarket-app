import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
      <h1>Bienvenido a Cafetería Central ☕</h1>
      <p>Explora nuestro catálogo con los mejores cafés de especialidad y postres.</p>
      <Link to="/productos" style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        backgroundColor: '#4e342e',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        Ver Catálogo Completo
      </Link>
    </div>
  );
}