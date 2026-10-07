import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#3e2723', color: '#fff', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>☕ Cafetería Central</h2>
      <NavLink 
        to="/" 
        end
        style={({ isActive }) => ({
          color: isActive ? '#ffb74d' : '#fff',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none'
        })}
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/productos" 
        style={({ isActive }) => ({
          color: isActive ? '#ffb74d' : '#fff',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none'
        })}
      >
        Catálogo
      </NavLink>
      <NavLink 
        to="/nuevo-producto" 
        style={({ isActive }) => ({
          color: isActive ? '#ffb74d' : '#fff',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none'
        })}
      >
        Nuevo Producto
      </NavLink>
    </nav>
  );
}