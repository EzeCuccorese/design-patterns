# Plan de Cambio: Landing de Inicio (Home Dashboard) & Expansión de Tooling

## Descripción de la Tarea
1. Crear el nuevo componente `HomeLanding.tsx` como portada principal de la plataforma al ingresar a la raíz (`#` o `#home`), mostrando una vista Bento Grid con el mapa de ruta y métricas de estudio.
2. Configurar el menú lateral (`Sidebar.tsx`) y el enrutador (`useHashRoute.ts`) para que en la vista de inicio los acordeones de patrones comiencen colapsados por defecto, evitando saturar la interfaz.
3. Reestructurar y expandir el módulo **Tooling de Desarrollo Moderno** (`tooling-dev`) con gráficos ASCII, tablas de rendimiento, ejemplos reales de archivos de configuración (`biome.json`, `.lintstagedrc.json`, `.commitlintrc.json`, `.devcontainer/devcontainer.json`, `turbo.json`) y dos nuevas subsecciones sobre **pnpm/Monorepos** y **Devcontainers**.

## Detalle de Archivos Afectados
- `src/components/HomeLanding.tsx` (Nuevo): Portada Bento Grid.
- `src/hooks/useHashRoute.ts`: Soporte de ruta por defecto `'home'`.
- `src/components/Sidebar.tsx`: Control de acordeones colapsados por defecto.
- `src/App.tsx`: Integración de la vista `HomeLanding`.
- `src/data/definitions.ts`: Definiciones técnicas adicionadas.
- `src/data/studyGuide.ts`: Subsecciones y configuraciones de `tooling-dev`.
- `src/data/flashcards.ts` & `src/data/quiz.ts`: Tarjetas y preguntas adicionadas.

## Plan de Verificación
- `npm run build`
- `docker compose up -d --build`
- Verificación visual de la UI.
