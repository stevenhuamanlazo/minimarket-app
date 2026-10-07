// Adaptación de los productos de la API (en inglés y en dólares) al contexto
// del minimarket: textos en español y precios en soles peruanos.

// Tipo de cambio USD → PEN (referencia: 6 de octubre de 2026, open.er-api.com).
// Es un valor fijo y editable; si cambia el mercado, solo se modifica esta constante.
export const TIPO_DE_CAMBIO = 3.44;

// Traducciones por id de producto (categoría "groceries" de dummyjson.com)
const traducciones = {
  16: { title: 'Manzana', description: 'Manzanas frescas y crujientes, ideales para comer solas o preparar postres y ensaladas.' },
  17: { title: 'Bistec de res', description: 'Corte de res jugoso y tierno, perfecto para freír, saltar o preparar a la parrilla.' },
  18: { title: 'Comida para gatos', description: 'Alimento balanceado para gatos adultos, con proteínas y nutrientes esenciales.' },
  19: { title: 'Carne de pollo', description: 'Pollo fresco y de calidad, versátil para guisos, frituras y platos al horno.' },
  20: { title: 'Aceite de cocina', description: 'Aceite vegetal refinado para freír, saltar y preparar todo tipo de comidas.' },
  21: { title: 'Pepino', description: 'Pepino fresco y refrescante, ideal para ensaladas, ceviches y bocaditos.' },
  22: { title: 'Comida para perros', description: 'Alimento nutritivo para perros, con proteínas y vitaminas para mantenerlos activos.' },
  23: { title: 'Huevos', description: 'Huevos frescos de granja, fuente de proteínas para el desayuno y la repostería.' },
  24: { title: 'Filete de pescado', description: 'Filete de pescado fresco, rico en proteínas y omega 3, listo para cocinar.' },
  25: { title: 'Pimiento verde', description: 'Pimiento verde crujiente y de sabor suave, ideal para salteados y rellenos.' },
  26: { title: 'Ají verde', description: 'Ají verde fresco con un toque picante para sazonar cremas, salsas y guisos.' },
  27: { title: 'Frasco de miel', description: 'Miel de abeja pura y natural, perfecta para endulzar infusiones y postres.' },
  28: { title: 'Helado', description: 'Helado cremoso en sabores clásicos, un postre ideal para compartir en familia.' },
  29: { title: 'Jugo', description: 'Jugo de frutas refrescante, listo para tomar en cualquier momento del día.' },
  30: { title: 'Kiwi', description: 'Kiwi dulce y ácido, rico en vitamina C, ideal para ensaladas de frutas y batidos.' },
  31: { title: 'Limón', description: 'Limones jugosos y aromáticos para ceviches, bebidas y aderezos.' },
  32: { title: 'Leche', description: 'Leche fresca y nutritiva, fuente de calcio para toda la familia.' },
  33: { title: 'Mora', description: 'Moras dulces y jugosas, perfectas para mermeladas, postres y batidos.' },
  34: { title: 'Café Nescafé', description: 'Café instantáneo de sabor intenso, ideal para empezar bien el día.' },
  35: { title: 'Papas', description: 'Papas frescas y versátiles para freír, hervir, hornear o preparar puré.' },
  36: { title: 'Proteína en polvo', description: 'Suplemento de proteína en polvo para batidos, ideal para deportistas.' },
  37: { title: 'Cebollas rojas', description: 'Cebollas rojas de sabor ligeramente dulce, ideales para ensaladas y salsa criolla.' },
  38: { title: 'Arroz', description: 'Arroz de grano largo, suelto y rendidor, la base de cualquier almuerzo.' },
  39: { title: 'Gaseosas', description: 'Gaseosas bien frías en varios sabores para acompañar tus comidas.' },
  40: { title: 'Fresa', description: 'Fresas dulces y jugosas, perfectas para postres, jugos y mermeladas.' },
  41: { title: 'Caja de pañuelos', description: 'Caja de pañuelos suaves y resistentes para el hogar y la oficina.' },
  42: { title: 'Agua', description: 'Agua purificada sin gas, ideal para mantenerte hidratado todo el día.' },
};

// Convierte dólares a soles redondeando a múltiplos de S/ 0.10, como se
// acostumbra en los precios de un comercio peruano.
export const aSoles = (usd) => Math.round(usd * TIPO_DE_CAMBIO * 10) / 10;

// Devuelve el producto con título y descripción en español y precio en soles.
// Si un id no tiene traducción, conserva los textos originales de la API.
export const adaptarProducto = (product) => {
  const t = traducciones[product.id];
  return {
    ...product,
    title: t?.title ?? product.title,
    description: t?.description ?? product.description,
    price: aSoles(product.price),
  };
};
