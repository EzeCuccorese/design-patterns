# Plan de Cambio: Expansión de Tooling de Desarrollo Moderno

## Descripción de la Tarea
Reestructurar y expandir el módulo **Tooling de Desarrollo Moderno** (`tooling-dev`) incorporando gráficos ASCII de arquitectura de herramientas, ejemplos de configuración reales (`biome.json`, `.lintstagedrc.json`, `.commitlintrc.json`, `.devcontainer/devcontainer.json`, `turbo.json`), tablas comparativas de velocidad/rendimiento y dos nuevas subsecciones sobre **pnpm / Monorepos** y **Devcontainers**.

## Detalle de Modificaciones

### 1. `src/data/definitions.ts`
- Agregar términos técnicos: `pnpmContentAddressable`, `turborepoCaching`, `devcontainers`.

### 2. `src/data/studyGuide.ts`
- Expandir subsección **Branching Patterns** con gráfico ASCII, tabla comparativa e implementación de Feature Flag en TypeScript.
- Expandir subsección **Linters en Rust (Biome & Oxlint)** con tabla comparativa de rendimiento y archivos de configuración reales.
- Expandir subsección **Git Hooks (Husky, Commitlint, Lint-Staged)** con gráfico ASCII completo y archivos de configuración `.lintstagedrc.json` y `.commitlintrc.json`.
- Expandir subsección **Local CI/CD (`act`)** con gráfico ASCII y workflow `.github/workflows/ci.yml`.
- Nueva subsección **Gestores de Paquetes & Monorepos (pnpm & Turborepo)** con gráfico de symlinks y `turbo.json`.
- Nueva subsección **Devcontainers & Entornos de Desarrollo como Código** con archivo `.devcontainer/devcontainer.json`.

### 3. `src/data/flashcards.ts` y `src/data/quiz.ts`
- Agregar flashcards y preguntas de quiz evaluando pnpm, Devcontainers, Feature Flags y Conventional Commits.

## Plan de Verificación
- `npm run build`
- `docker compose up -d --build`
- Revisión visual de la interfaz.
