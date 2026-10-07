import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Form() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Complete los campos obligatorios.');
      return;
    }

    console.log('Nuevo Producto Registrado:', formData);
    alert(`Producto "${formData.title}" agregado exitosamente al catálogo.`);
    
    // Redirección client-side
    navigate('/productos');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Nombre del Producto *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            placeholder="Ej. Café Capuchino 250ml"
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Precio (S/) *</label>
          <input
            type="number"
            step="0.10"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            placeholder="Ej. 9.50"
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            placeholder="Ej. Café expreso con leche vaporizada y espuma de leche."
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '0.7rem', backgroundColor: '#3e2723', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}