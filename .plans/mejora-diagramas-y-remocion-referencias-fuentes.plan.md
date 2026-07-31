# Plan de Mejora de Diagramas de Patrones y Limpieza de Referencias a Fuentes

## 1. Diagnóstico del Problema

### A. Fallback de Diagramas a Círculo Genérico ("Concepto")
Al revisar `PatternDiagram.tsx` contra los IDs reales de los patrones en `src/data/index.ts`, se detectaron 8 patrones que caen en el bloque `default:` renderizando un círculo estático genérico con el texto "Concepto":

1. **Descalce de IDs en los cases del switch**:
   - `factory` (en la vista era `'factory-method'`)
   - `abstractfactory` (en la vista era `'abstract-factory'`)
   - `objectpool` (en la vista era `'object-pool'`)
   - `chain` (en la vista era `'chain-of-responsibility'`)
   - `template` (en la vista era `'template-method'`)

2. **Diagramas SVG faltantes**:
   - `adapter` (Adapter Pattern)
   - `decorator` (Decorator Pattern)
   - `observer` (Observer Pattern)

### B. Referencia Fuera de la Sección Fuentes
El usuario ha solicitado de forma explícita remover cualquier alusión o texto `"Mi granito de Java"` fuera de la sección "Fuentes". Se detectaron menciones en:
- `AnalogyCard.tsx`: Título de la tarjeta (`Mi Granito de Java (Analogía)`).
- Archivos de datos de patrones: `chain.ts`, `observer.ts`, `adapter.ts`, `composite.ts`, `decorator.ts` (`Rescatado de *Mi granito de Java*, ...`).

---

## 2. Soluciones Propuestas

### Fase 1: Remoción de Referencias a "Mi granito de Java" fuera de Fuentes
1. **`AnalogyCard.tsx`**: Cambiar el título a `Analogía del Mundo Real`.
2. **Archivos de Patrones (`chain.ts`, `observer.ts`, `adapter.ts`, `composite.ts`, `decorator.ts`)**: Remover la frase de prefijo dejando las analogías limpias y profesionales.
3. **`SourcesDetail.tsx`**: Mantener la atribución a "Mi Granito de Java" únicamente en esta vista como fuente de consulta oficial.

### Fase 2: Corrección y Creación de Diagramas SVG en `PatternDiagram.tsx`
1. **Soporte Completo de IDs y Alias**:
   - Mapear `case 'factory': case 'factory-method':`
   - Mapear `case 'abstractfactory': case 'abstract-factory':`
   - Mapear `case 'objectpool': case 'object-pool':`
   - Mapear `case 'chain': case 'chain-of-responsibility':`
   - Mapear `case 'template': case 'template-method':`
2. **Implementación de Diagramas Faltantes**:
   - **`adapter`**: Diagrama SVG con `Client`, `Target` interface, `Adapter` y `Adaptee` con flechas de traducción de métodos.
   - **`decorator`**: Diagrama SVG con `Component`, `ConcreteComponent`, `BaseDecorator` y `ConcreteDecorator` con envoltorio dinámico.
   - **`observer`**: Diagrama SVG con `Subject` (notificador/suscriptor), `Observer` interface, `ConcreteSubject` y `ConcreteObserver` mostrando el flujo de notificación.

---

## 3. Plan de Verificación

- Ejecutar `npm run lint` para garantizar 0 errores de sintaxis o linter.
- Ejecutar `npm test` para asegurar que las pruebas sigan pasando.
- Verificar mediante `npm run build` la compilación del paquete.
