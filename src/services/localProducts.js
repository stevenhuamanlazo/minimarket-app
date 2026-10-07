// Productos registrados desde el formulario: se guardan en localStorage del navegador
// para que aparezcan en el catálogo (la API de prueba es de solo lectura).
const KEY = 'minimarket_productos';

export const getLocalProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

// Agrega un producto al inicio de la lista. Devuelve true si se pudo guardar.
export const addLocalProduct = (product) => {
  try {
    localStorage.setItem(KEY, JSON.stringify([product, ...getLocalProducts()]));
    return true;
  } catch {
    return false; // sin almacenamiento disponible o cuota excedida
  }
};