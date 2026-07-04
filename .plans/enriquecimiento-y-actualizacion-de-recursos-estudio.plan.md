# Plan de Implementación: Enriquecimiento del Ecosistema de Estudio (Ingeniería, Arquitectura, Tooling y DevOps)

Este plan de implementación detalla la investigación del proyecto, las mejoras propuestas y la estrategia para actualizar el proyecto de **Patrones de Diseño** con conceptos modernos de la industria actual en Ingeniería de Software, Arquitectura, Tooling de Desarrollo y DevOps/SRE.

---

## 1. Contexto e Investigación

El proyecto actual consiste en un **Catálogo Interactivo de Patrones de Diseño (Bento Grid)** que utiliza:
- **Frontend**: React 19, TypeScript, Vite 8, Lucide React, PrismJS y Zod para configuraciones de entorno seguras.
- **Modulos de Estudio**:
  - Explicación de los 24 patrones clásicos con snippets en 4 lenguajes (Java, Python, TypeScript, Go).
  - Sección de Principios de Diseño: SOLID, GRASP, Refactoring y Testing/TDD.
  - Sección de Arquitectura & DevOps: Resiliencia Distribuida (Circuit Breaker, Saga, Transactional Outbox, CAP) y SRE & Infraestructura (Expand/Contract migrations, Golden Signals, K8s Triage, Blameless Post-Mortem).
  - Un simulador de exámenes interactivo (Quiz) y un mazo de Flashcards.

### Oportunidades de Mejora
Para alinear la plataforma de estudio con lo que se requiere hoy en la industria de primer nivel, proponemos incorporar:
1. **Ingeniería de Software**: Trunk-Based Development vs Git Flow en equipos ágiles, y mejores prácticas de Code Reviews y la Boy Scout Rule.
2. **Arquitectura de Software**: Conceptos centrales de Hexagonal Architecture (Puertos y Adaptadores), BFF (Backend-for-Frontend), CQRS y Domain-Driven Design (DDD - Bounded Contexts, Ubiquitous Language, Aggregate Roots).
3. **Tooling Dev**: El cambio de paradigma hacia linters rápidos basados en Rust (Oxlint, Biome), la automatización de pre-commits con Husky & Lint-staged, y la ejecución local de pipelines de integración mediante Act.
4. **DevOps / SRE**: Despliegues declarativos con GitOps (ArgoCD), Observabilidad moderna con el estándar OpenTelemetry y dashboards (Prometheus/Grafana), despliegues progresivos (Canary) utilizando Service Meshes (Istio) y el uso de imágenes Distroless para maximizar la ciberseguridad.

---

## 2. Cambios Propuestos

### 2.1 Enriquecimiento de Datos de Estudio (`src/data/`)

#### [MODIFY] [definitions.ts](file:///Users/eze/projects/design-patterns/src/data/definitions.ts)
- Incorporar definiciones teóricas cohesivas y consejos (hints) para:
  - `cleanArchitecture` (Arquitectura Hexagonal / Puertos y Adaptadores).
  - `cqrs` (Command Query Responsibility Segregation).
  - `bff` (Backend-for-Frontend).
  - `ddd` (Domain-Driven Design).
  - `lintersRust` (Biome / Oxlint).
  - `gitHooks` (Husky & Lint-staged).
  - `localCicd` (Act GitHub Actions Local).
  - `gitOps` (ArgoCD / FluxCD).
  - `openTelemetry` (Métricas, Logs y Trazas).
  - `canaryIstio` (Service Mesh e inyección de tráfico Canary).
  - `distroless` (Contenedores seguros y mínimos).
  - `trunkBased` (Branching pattern ágil y continuo).

#### [MODIFY] [studyGuide.ts](file:///Users/eze/projects/design-patterns/src/data/studyGuide.ts)
- **SOLID & Código Limpio**: Agregar subsecciones para "Branching Patterns: Trunk-Based Development vs Git Flow" y "Prácticas de Code Review & Boy Scout Rule".
- **Resiliencia & Arquitecturas Distribuidas**: Agregar subsecciones para "Hexagonal Architecture (Puertos y Adaptadores)", "BFF (Backend-for-Frontend)" y "CQRS (Command Query Responsibility Segregation)".
- **SRE, DevOps e Infraestructura**: Agregar subsecciones para "GitOps & ArgoCD", "Observabilidad Moderna: OpenTelemetry, Prometheus & Grafana", "Estrategias de Despliegue Canary con Service Mesh (Istio)" y "Contenedores Distroless: Ciberseguridad en Producción".
- **Nueva Sección `tooling-dev`**: Agregar un nuevo bloque de estudio temático enfocado en Tooling:
  - Título: "Tooling de Desarrollo Moderno".
  - Subsecciones: "Linters & Formateadores en Rust (Biome & Oxlint)", "Husky, Commitlint & Lint-Staged" y "Local CI/CD con Act (GitHub Actions Local)".

#### [MODIFY] [flashcards.ts](file:///Users/eze/projects/design-patterns/src/data/flashcards.ts)
- Expandir el mazo agregando 15 nuevas tarjetas conceptuales interactivas (del ID 26 al 40) que pregunten y expliquen brevemente cada uno de estos nuevos conceptos de la industria.

#### [MODIFY] [quiz.ts](file:///Users/eze/projects/design-patterns/src/data/quiz.ts)
- Incorporar 15 preguntas nuevas distribuidas en los 3 módulos del examen:
  - **Módulo 1 (Ingeniería)**: Preguntas de Trunk-Based Development, prácticas de Code Review y Clean Code.
  - **Módulo 2 (Arquitectura)**: Preguntas de Hexagonal Architecture, CQRS, BFF y Domain-Driven Design (DDD).
  - **Módulo 3 (DevOps)**: Preguntas de GitOps con ArgoCD, OpenTelemetry, Service Mesh (Istio), imágenes Distroless y automatización de hooks con Husky.

---

### 2.2 Integración en la Interfaz de Usuario (`src/components/` y `src/App.tsx`)

#### [MODIFY] [Sidebar.tsx](file:///Users/eze/projects/design-patterns/src/components/Sidebar.tsx)
- Agregar el botón "Tooling de Desarrollo" en el submenú de "Arquitectura & DevOps" que llame a `onSelectTopic('tooling-dev')`.
- Expandir el `useEffect` para asegurar que el acordeón se despliegue automáticamente si la vista activa es `'tooling-dev'`.

#### [MODIFY] [App.tsx](file:///Users/eze/projects/design-patterns/src/App.tsx)
- Agregar `'tooling-dev'` a la lista de tópicos que renderizan `TopicDetail`.
- Mapear el ID `'tooling-dev'` a la cabecera correspondiente: `"Tooling de Desarrollo Moderno"` en `getHeaderTitle()`.

---

### 2.3 Actualización de Documentación (`README.md`)

#### [MODIFY] [README.md](file:///Users/eze/projects/design-patterns/README.md)
- Reestructurar el `README.md` del proyecto para destacar que no solo cubre patrones de diseño Gang of Four clásicos, sino que provee una suite completa de estudio interactiva alineada a las exigencias modernas de la industria.
- Añadir la sección detallada: **"🚀 Prácticas y Tecnologías Modernas de la Industria"** estructurada en:
  1. *Ingeniería de Software* (Trunk-Based, Code Reviews).
  2. *Arquitectura de Software* (Hexagonal, BFF, CQRS, DDD).
  3. *Tooling de Desarrollo* (Biome, Oxlint, Husky, Act).
  4. *DevOps & Observabilidad* (GitOps, OpenTelemetry, Canary/Service Mesh, Distroless).

---

## 3. Plan de Verificación

### Pruebas Automatizadas
1. **Linter y Estilo**:
   ```bash
   npm run lint
   ```
2. **Compilación de TypeScript**:
   ```bash
   npm run build
   ```
   Esto asegura que no haya errores de tipado o importaciones rotas en las nuevas definiciones y componentes.

### Verificación Manual
1. Ejecutar localmente el servidor de desarrollo (`npm run dev`) y verificar:
   - Que en el Sidebar aparezca el nuevo tópico "Tooling de Desarrollo" bajo la sección de "Arquitectura & DevOps".
   - Que al seleccionar "Tooling de Desarrollo", la vista cambie mostrando las nuevas tarjetas informativas con diagramas o códigos y que los colores respeten el tema (claro/oscuro).
   - Que el mazo de Flashcards ahora tenga 40 tarjetas en lugar de 25 y se puedan rotar correctamente con animaciones 3D.
   - Que el simulador de Quiz cargue los nuevos ítems de opción múltiple en cada módulo y ofrezca el feedback correcto.
   - Verificar la legibilidad y links en el `README.md` actualizado.
