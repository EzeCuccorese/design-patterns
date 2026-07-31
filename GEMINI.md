# Reglas del Proyecto — Catálogo de Patrones de Diseño

## Stack Tecnológico

* **Framework**: Vite + React 19 (TypeScript strict)
* **Routing**: Hash-based routing (`useHashRoute.ts`) — NO usar React Router
* **Estilos**: CSS puro con variables CSS (light/dark via clase `.dark` en `<html>`)
* **Highlighting**: PrismJS cargado vía `src/utils/prismLoader.ts`
* **State**: Local state con `useState` / `useCallback`. Persistencia en `localStorage` vía hooks custom
* **Lazy Loading**: Todos los componentes de vista se cargan con `React.lazy` + `Suspense`

## Arquitectura del Proyecto

* **Layout principal**: Bento Grid de 12 columnas (`grid-template-columns: repeat(12, 1fr)`)
* **Componentes**: `src/components/` — cada vista es un componente independiente
* **Datos**: `src/data/` — archivos TypeScript puros exportando arrays/objetos tipados
* **Hooks**: `src/hooks/` — `useHashRoute`, `useStudyProgress`
* **Punto de entrada CSS**: `src/index.css` — archivo único, no modular

## Convenciones de Código

* **Idioma del UI**: Español (Argentina). Textos, labels, tooltips y comments en español
* **Idioma del código**: Inglés para nombres de variables, funciones, tipos e interfaces
* **Commits**: Inglés, Conventional Commits (`type(scope): description`)
* **Imports de iconos**: Usar `lucide-react` exclusivamente — NO usar otras librerías de iconos
* **Inline styles vs CSS**: Preferir clases CSS en `index.css`. Inline styles solo para lógica condicional dinámica (ej. colores que dependen de estado)

## Breakpoints CSS

* `1024px` — Sidebar se convierte en drawer mobile
* `768px` — Ajustes de padding y tipografía tablet
* `640px` — Layout compacto mobile (código, consola, flashcards)

## Reglas Específicas

* **NO agregar dependencias** de CSS frameworks (Tailwind, Bootstrap, etc.)
* **NO usar `var`** en TypeScript — siempre `const` o `let` con tipos explícitos
* **NO usar transiciones en `*`** — aplicar solo a elementos interactivos específicos
* **Preservar accesibilidad**: `:focus-visible`, `aria-label`, `role` en elementos interactivos
* **Preservar `prefers-reduced-motion`**: cualquier animación nueva debe respetar la media query
