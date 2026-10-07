import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { ProductCard } from '../components/ProductCard';
import { theme } from '../theme';

const MAX_DESCRIPCION = 120;
const CATEGORIAS = [
  'Frutas y verduras',
  'Carnes y pescados',
  'Lácteos y huevos',
  'Despensa',
  'Bebidas',
  'Hogar y mascotas',
];

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

const initialData = { title: '', price: '', category: 'Despensa', description: '' };

// Campo reutilizable: etiqueta + control (children) + mensaje de error o ayuda
function Field({ id, label, required, error, hint, children }) {
  const message = { display: 'block', marginTop: '0.3rem', fontSize: '0.82rem' };
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600, fontSize: '0.9rem', color: theme.text }}
      >
        {label} {required && <span style={{ color: theme.error }}>*</span>}
      </label>
      {children}
      {error ? (
        <small style={{ ...message, color: theme.error }}>⚠ {error}</small>
      ) : (
        hint && <small style={{ ...message, color: theme.muted }}>{hint}</small>
      )}
    </div>
  );
}

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
    setSuccess(`Producto "${formData.title}" (${formData.category}) agregado exitosamente al catálogo.`);
    setFormData(initialData);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setSuccess('');
  };

  // Borde del campo: rojo si hay error, verde si es válido, neutro si está vacío
  const borderColor = (name) => (errors[name] ? theme.error : formData[name] ? theme.button : theme.border);

  const inputStyle = (name) => ({
    width: '100%',
    padding: '0.65rem 0.75rem',
    boxSizing: 'border-box',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    backgroundColor: '#fff',
    border: `1.5px solid ${name ? borderColor(name) : theme.border}`,
    borderRadius: '8px',
  });

  // Vista previa en vivo: reutiliza ProductCard con los datos escritos en el formulario
  const preview = {
    title: formData.title.trim() || 'Nombre del producto',
    description: formData.description.trim() || 'La descripción del producto aparecerá aquí.',
    price: Number(formData.price) > 0 ? Number(formData.price) : 0,
    thumbnail: null,
  };

  // IA: el formulario se veía muy simple → Solución manual: tarjeta con campos agrupados (Field con children), bordes según validación y vista previa con ProductCard
  return (
    <PageContainer title="Registrar Nuevo Producto">
      <p style={{ color: theme.muted, marginBottom: '1.25rem' }}>
        Completa los datos para agregar un producto al catálogo del minimarket.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div
          style={{
            flex: '1 1 380px',
            maxWidth: '520px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            borderTop: `4px solid ${theme.button}`,
          }}
        >
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>📝 Datos del producto</h3>

          {success && (
            <div
              role="status"
              style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#E8F5E9',
                borderLeft: `4px solid ${theme.button}`,
                borderRadius: '6px',
                color: theme.primary,
                fontSize: '0.9rem',
              }}
            >
              ✅ {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            <Field id="title" label="Nombre del producto" required error={errors.title}>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={inputStyle('title')}
                placeholder="Ej. Palta Hass 1kg"
              />
            </Field>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 150px' }}>
                <Field id="price" label="Precio" required error={errors.price}>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: theme.muted,
                        fontWeight: 600,
                      }}
                    >
                      S/
                    </span>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      style={{ ...inputStyle('price'), paddingLeft: '2.2rem' }}
                      placeholder="3.50"
                    />
                  </div>
                </Field>
              </div>

              <div style={{ flex: '1 1 180px' }}>
                <Field id="category" label="Categoría">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={inputStyle()}
                  >
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <Field
              id="description"
              label="Descripción"
              hint={`${formData.description.length}/${MAX_DESCRIPCION} caracteres`}
            >
              <textarea
                id="description"
                name="description"
                rows={3}
                maxLength={MAX_DESCRIPCION}
                value={formData.description}
                onChange={handleChange}
                style={{ ...inputStyle(), resize: 'vertical' }}
                placeholder="Ej. Fruta fresca de temporada."
              />
            </Field>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: theme.button,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                }}
              >
                Guardar producto
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '0.75rem 1.1rem',
                  backgroundColor: '#fff',
                  color: theme.primary,
                  border: `1.5px solid ${theme.button}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                }}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        <aside style={{ flex: '0 0 240px' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600, fontSize: '0.9rem', color: theme.muted }}>
            👁 Vista previa
          </p>
          <ProductCard product={preview} />
        </aside>
      </div>
    </PageContainer>
  );
}
