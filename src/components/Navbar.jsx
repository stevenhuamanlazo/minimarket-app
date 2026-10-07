import { NavLink } from 'react-router-dom';
import { theme, APP_NAME } from '../theme';

// Estilo del enlace: en React Router v6+ NavLink recibe una función con isActive
// (reemplaza al antiguo activeClassName) para dar feedback visual de la ruta activa.
const linkStyle = ({ isActive }) => ({
  color: isActive ? theme.accent : '#fff',
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: 'none',
});

export function Navbar() {
  return (
    <nav
      style={{
        padding: '1rem 1.5rem',
        backgroundColor: theme.primary,
        color: '#fff',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>🛒 {APP_NAME}</h2>
      <NavLink to="/" end style={linkStyle}>
        Inicio
      </NavLink>
      <NavLink to="/productos" style={linkStyle}>
        Productos
      </NavLink>
      <NavLink to="/nuevo-producto" style={linkStyle}>
        Nuevo Producto
      </NavLink>
    </nav>
  );
}
