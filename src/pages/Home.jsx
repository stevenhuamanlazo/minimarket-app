import { Link } from 'react-router-dom';
import { theme, APP_NAME } from '../theme';

export function Home() {
  return (
    <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
      <h1>Bienvenido a {APP_NAME} 🛒</h1>
      <p style={{ color: theme.muted }}>
        Frutas, verduras, carnes, lácteos y todo para tu despensa en un solo lugar.
      </p>
      <Link
        to="/productos"
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          padding: '0.7rem 1.4rem',
          backgroundColor: theme.button,
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Ver Productos
      </Link>
    </div>
  );
}
