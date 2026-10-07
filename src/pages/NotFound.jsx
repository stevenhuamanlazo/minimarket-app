import { Link } from 'react-router-dom';
import { theme } from '../theme';

export function NotFound() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>404 - Ruta no encontrada</h1>
      <p>La sección que buscas no existe en el sitio del minimarket.</p>
      <Link
        to="/"
        style={{ color: theme.primary, fontWeight: 'bold', display: 'inline-block', marginTop: '1rem' }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
