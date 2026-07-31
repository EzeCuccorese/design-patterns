# Plan de Cambio: Expansión de Principios de Diseño (SOLID, GRASP, Clean Code)

## Descripción de la Tarea
Reestructurar y expandir significativamente la sección de **Principios de Diseño** (SOLID, GRASP, Clean Code y Principios Pragmáticos) en la plataforma, equiparándola en nivel de detalle, ejemplos de código (Violación vs Solución), analogías y tablas comparativas con la sección de Patrones de Diseño.

## Detalle de Modificaciones

### 1. `src/data/studyGuide.ts`
- **SOLID**: Crear 5 subsecciones dedicadas (SRP, OCP, LSP, ISP, DIP) con conceptos, Code Smells asociados y bloques de código TypeScript comparativos (❌ Violación vs ✅ Solución Refactorizada).
- **Principios Pragmáticos & Clean Code**: Añadir subsección con DRY, KISS, YAGNI, Ley de Demeter y Composición sobre Herencia.
- **GRASP**: Expandir a los 9 principios de Craig Larman (Information Expert, Creator, Controller, Low Coupling, High Cohesion, Pure Fabrication, Indirection, Polymorphism, Protected Variations), cada uno con detalles técnicos y código TypeScript explicativo.

### 2. `src/data/definitions.ts`
- Actualizar y enriquecer las definiciones para dar soporte a los nuevos principios y conceptos añadidos.

### 3. `src/data/flashcards.ts` & `src/data/quiz.ts`
- Incorporar tarjetas de memoria y preguntas de evaluación relativas a las violaciones y soluciones de SOLID, GRASP y Ley de Demeter.

## Plan de Verificación
- `npm run build`
- `docker compose up -d --build`
- Validación visual de la interfaz.
