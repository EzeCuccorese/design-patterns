# Plan de Cambio: Tooling Multi-Lenguaje, Landing Bento Grid & Ejecución Paralela con N Agentes

## Descripción de la Tarea
1. Expandir el módulo **Tooling de Desarrollo Moderno** (`tooling-dev`) garantizando cobertura completa en los **4 lenguajes estándar de la plataforma**: **TypeScript**, **Python**, **Go** y **Java**.
2. Crear la vista `HomeLanding.tsx` (Landing de Inicio Bento Grid) y configurar `Sidebar.tsx` / `useHashRoute.ts` para abrir la portada limpia con acordeones colapsados por defecto.
3. Planificar la ejecución paralela dividiendo la tarea en **4 subagentes especializados**.

## Detalle por Lenguaje en Tooling
- **TypeScript**: Biome, Oxlint, Husky, pnpm, Turborepo.
- **Python**: `ruff` (linter/formatter en Rust), `uv` (package manager en Rust), `pre-commit` framework.
- **Go**: `golangci-lint` (.golangci.yml), `go mod`, `gofmt`.
- **Java**: `Spotless` (Gradle/Maven), `Checkstyle`, Gradle Build Cache.
- **Feature Flags**: Ejemplos en TypeScript, Python, Go y Java.

## Plan de Verificación
- `npm run build`
- `docker compose up -d --build`
