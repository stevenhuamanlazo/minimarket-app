import { theme } from '../theme';

// Composición con children: envuelve el contenido de cada página
export function PageContainer({ title, children }) {
  return (
    <section style={{ padding: '1.5rem' }}>
      {title && <h2 style={{ color: theme.primary }}>{title}</h2>}
      {children}
    </section>
  );
}