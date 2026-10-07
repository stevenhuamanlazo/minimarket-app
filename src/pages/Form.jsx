import { useState } from 'react';
import { theme } from '../theme';

// Validación de un campo: devuelve el mensaje de error o '' si es válido
const validate = (name, value) => {
  if (name === 'title') {
    return value.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres' : '';
  }
  if (name === 'price') {
    return Number(value) <= 0 ? 'El precio debe ser mayor a 0' : '';
  }
  return '';
};

const initialData = { title: '', price: '', description: '' };

export function Form() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // onChange: actualiza el valor (input controlado) y valida en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuccess('');
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  // onSubmit: valida todos los campos obligatorios antes de registrar
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: validate('title', formData.title),
      price: validate('price', formData.price),
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.price) {
      return;
    }

    console.log('Nuevo Producto Registrado:', formData);
    setSuccess(`Producto "${formData.title}" agregado exitosamente al catálogo.`);
    setFormData(initialData);
    setErrors({});
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    boxSizing: 'border-box',
    border: `1px solid ${theme.border}`,
    borderRadius: '4px',
  };
  const errorStyle = { color: theme.error, fontSize: '0.85rem' };

  return (
    <div style={{ padding: '2rem', maxWidth: '420px', margin: '0 auto' }}>
      <h2>Registrar Nuevo Producto</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Nombre del Producto *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Ej. Palta Hass 1kg"
          />
          {errors.title && <small style={errorStyle}>{errors.title}</small>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Precio (S/) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Ej. 3.50"
          />
          {errors.price && <small style={errorStyle}>{errors.price}</small>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Ej. Fruta fresca de temporada."
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.7rem',
            backgroundColor: theme.button,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Guardar Producto
        </button>

        {success && <p style={{ color: theme.button, fontWeight: 'bold' }}>{success}</p>}
      </form>
    </div>
  );
}
