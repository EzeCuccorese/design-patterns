# Plan de Cambio: Incorporación y Extensión de Percentil 99 (P99 Latency)

## Descripción de la Tarea
Incorporar y extender el concepto de **Percentil 99 (P99 Latency)**, **Tail Latency** y **Observabilidad de Latencia en Sistemas Distribuidos** en la plataforma educacional.

## Detalle de Modificaciones

### 1. `src/data/definitions.ts`
- Agregar definición técnica `p99Latency`.

### 2. `src/data/studyGuide.ts`
- Agregar subsección extendida en `sre-devops`:
  - Definición y Falacia del Promedio
  - Distribución asimétrica (Long Tail)
  - Amplificación de Latencia en Microservicios (Fan-out tail latency: $1 - (0.99)^N$)
  - Instrumentación con Prometheus (`histogram_quantile`) y estructuras de datos (HDR Histogram, t-digest)
  - Estrategia SLO/SLA y Hedged Requests
  - Elevador pitch para entrevistas / LinkedIn

### 3. `src/data/flashcards.ts`
- Agregar tarjetas educativas de P99 y Tail Latency.

### 4. `src/data/quiz.ts`
- Agregar preguntas al módulo de evaluaciones sobre latencia P99 vs Promedios.

### 5. `src/data/seniorStaffExamData.ts`
- Referenciar la teoría de percentiles en el post-mortem de degradación de latencia P99.

## Plan de Verificación
- `npm run build`
- Revisión manual de la UI en la sección de SRE & DevOps.
