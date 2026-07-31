# Plan de Trabajo: Agregar Preguntas de Tooling en quiz.ts

## Objetivo
Agregar 3 preguntas de opción múltiple al módulo `modulo3Questions` en `/Users/eze/projects/design-patterns/src/data/quiz.ts` cubriendo:
1. Python & Ruff / uv (Rust tooling en Python frente a Flake8/Black).
2. pnpm Content-Addressable Store (hard links, symlinks y prevención de dependencias fantasma).
3. Devcontainers (`.devcontainer/devcontainer.json` para entornos aislados políglotas en Docker).

## Archivos Afectados
- `src/data/quiz.ts`: Agregar preguntas con IDs 31, 32 y 33 a la constante `modulo3Questions`.

## Verificación
- Ejecutar `npm run build` (`tsc -b && vite build`) para asegurar que la sintaxis TypeScript sea válida y no rompa la compilación.
- Verificar mediante `npm test` las suites de testing existentes.
