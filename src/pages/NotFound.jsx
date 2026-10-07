import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>404 - Ruta no encontrada</h1>
      <p>La sección que buscas no existe en el sitio de la cafetería.</p>
      <Link to="/" style={{ color: '#3e2723', fontWeight: 'bold' }}>Volver al inicio</Link>
    </div>
  );
}