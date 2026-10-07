# Minimarket Fresco 🛒

SPA (Single Page Application) hecha con React para la **Práctica Semana 06** del curso Desarrollo de Aplicaciones Web (IS093A) – UNCP.

Catálogo de un minimarket que consume productos de abarrotes desde una API pública, con enrutamiento del lado del cliente, formulario controlado y manejo de estados de carga y error.

## Tecnologías

- React + Vite
- React Router (`BrowserRouter`, `NavLink`)
- Axios con `async/await` y `AbortController`
- Estilos inline con un tema centralizado (`src/theme.js`)

## API

`https://dummyjson.com/products/category/groceries`

Los datos de la API (en inglés y en dólares) se adaptan en `src/utils/productos.js`: títulos y descripciones en español y precios convertidos a soles (S/) con un tipo de cambio fijo.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── components/   Navbar, ProductCard
├── hooks/        useFetchProducts (axios + async/await + AbortController)
├── pages/        Home, List, Form, NotFound
├── services/     api.js (instancia de axios)
└── theme.js      paleta de colores y nombre de la app
```

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con buscador y estados de carga/error |
| `/nuevo-producto` | Formulario controlado con validación en tiempo real |
| `*` | Página 404 |
