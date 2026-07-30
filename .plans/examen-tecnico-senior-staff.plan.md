# Plan de Implementación: Examen e Evaluación Integral Sr/Staff (System Design, Refactoring & Troubleshooting)

## Resumen del Objetivo
Expandir el plan para construir un **Módulo de Evaluación y Estudio de Nivel Senior / Staff Engineer** de calibre de producción. El plan cubrirá no solo preguntas teóricas, sino los **3 pilares reales de evaluación** de empresas tecnológicas de alto tráfico (plataformas de mensajería masiva, microservicios distribuidos e integración multicanal):

1. **System Design & Arquitectura a Gran Escala (Alto Tráfico & Event-Driven)**.
2. **Desafío de Refactorización de Código en Vivo (Live Coding & Clean Architecture)**.
3. **Diagnóstico y Resolución de Incidentes en Producción (Troubleshooting & Incident Post-Mortem)**.
4. **Preguntas de Evaluación Crítica de Tradeoffs & Decisiones de Ingeniería**.

Todo el contenido se estructurará bajo el principio **DRY**, vinculando directamente con accesos navegables (`navigatePattern`, `navigateView`) a los patrones GoF, guías teóricas, catálogo de refactorización y algoritmos existentes en la plataforma.

---

## Lo que Faltaba e Incorporamos al Plan

### 1. Desafíos Prácticos por Pilares de Evaluación
* **Pilar A: Diseñar una Plataforma de Mensajería Event-Driven de Alta Concurrencia**
  * *Escenario*: Recepción masiva de Webhooks, encolado distribuido (Kafka/RabbitMQ), enrutamiento dinámico (Strategy/Chain of Responsibility), Rate Limiting por cliente (Redis Token Bucket) y persistencia idempotente (Outbox Pattern).
  * *Resolución Paso a Paso*: Diagrama visual, modelo de datos, estimación de capacidad, tolerancia a fallos y links a patrones `Observer`, `Strategy`, `Chain of Responsibility`, `resilience-eda` y `sre-devops`.
* **Pilar B: Refactorización de Código Monolítico Acoplado (Live Code Challenge)**
  * *Escenario*: Código "espagueti" con lógica de negocio mezclada con llamadas HTTP directas, mutaciones globales y falta de manejo de errores.
  * *Resolución Paso a Paso*: Proceso de refactorización aplicando Arquitectura Hexagonal, inyección de dependencias, DTOs inmutables, patrones `Adapter` y `Factory`, enlazando a las técnicas del catálogo `refactor` y `solid-clean`.
* **Pilar C: Diagnóstico de Incidentes Reales (Production Post-Mortem)**
  * *Escenario*: Degradación severa del P99 de latencia, acumulación de llamadas bloqueantes (*Thread Pool Exhaustion*), Fuga de Memoria (*Memory Leak en Event Loop/Heap*) y retraso de consumidores (*Kafka Lag*).
  * *Resolución Paso a Paso*: Análisis de logs/trazas (OpenTelemetry), aplicación de Circuit Breakers (Resilience4j), tuning de memoria Stack vs Heap y links directos a `computer-science`, `sre-devops` y `testing`.

### 2. Estructura de Datos e Interfaz DRY

#### `[NEW] src/data/seniorStaffExamData.ts`
* Estructura completa de las 4 modalidades (System Design, Refactorización en Vivo, Post-Mortem de Incidentes y Cuestionario de Tradeoffs).
* Cada ítem contendrá enlaces a recursos internos de la app (`targetPatternId`, `targetTopicId`, `targetView`).

#### `[NEW] src/components/SeniorStaffExam.tsx`
* Componente interactivo con pestañas por Pilar de Evaluación:
  * **System Design & Arquitectura**
  * **Refactorización de Código (Antes / Después)**
  * **Incidentes & Troubleshooting (Post-Mortem)**
  * **Cuestionario de Tradeoffs (Examen Cronometrado)**
* Botones de navegación DRY para saltar directamente al patrón, algoritmo o tema correspondiente en la app.

#### `[MODIFY] src/hooks/useHashRoute.ts`
* Soporte para la ruta `'senior-staff'` y navegación fluida entre vistas.

#### `[MODIFY] src/components/Sidebar.tsx` y `[MODIFY] src/App.tsx`
* Integración de la nueva vista en el menú principal.

---

## Plan de Verificación

### Pruebas Automatizadas
* Validar compilación de TypeScript y linters:
  ```bash
  npm run build
  ```

### Verificación Manual
* Navegar por los 4 pilares de evaluación en la vista **Examen Sr/Staff**.
* Probar la expansión de resoluciones paso a paso, análisis de tradeoffs y refactorizaciones de código.
* Presionar los botones de hipervínculo interno y verificar que redirijan correctamente a las tarjetas de patrones, guía de estudio o catálogo de refactorización sin recargar la aplicación.
