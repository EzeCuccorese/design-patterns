# Plan de Trabajo: Reestructuración y Enriquecimiento de Contenido

Este plan detalla los cambios propuestos para reorganizar las secciones de la plataforma, enriquecer la teoría de **Memoria Stack vs Heap (La Pila y El Montón)** con la información provista, e implementar soporte para tablas comparativas en la interfaz de usuario, incluyendo ejemplos en 4 lenguajes (**Java, Node/TypeScript, Python y Go**).

---

## Cambios Propuestos

### 1. Reubicación Coherente de Tópicos
*   **Mover "Memoria Stack vs Heap: La Pila y El Montón"**:
    *   *Origen:* `solid-clean` (Pilares de Diseño y Código Limpio).
    *   *Destino:* `computer-science` (Ciencias de la Computación & Linux).
    *   *Razón:* Es un concepto de arquitectura de computadoras y gestión de memoria a bajo nivel, por lo que pertenece conceptualmente a Ciencias de la Computación junto a matrices dispersas, árboles y Big O.
*   *(Opcional) Mover "Branching Patterns: Trunk-Based vs Git Flow"*:
    *   *Origen:* `solid-clean`.
    *   *Destino:* `tooling-dev` (Tooling de Desarrollo Moderno).
    *   *Razón:* Los patrones de ramificación de código están directamente ligados al flujo de trabajo del desarrollador, linters, pre-commits y pipelines de integración continua.

---

### 2. Enriquecimiento del Contenido "Stack vs Heap"
Actualizaremos las explicaciones de la pila y el montón para incluir todo el detalle técnico solicitado:
*   **La Pila (Stack):** Definición detallada (LIFO, CPU, variables locales primitivas, referencias, contextos de ejecución, comportamiento en la entrada/salida de funciones y el límite `StackOverflowError`).
*   **El Montón (Heap):** Definición detallada (memoria dinámica grande, objetos de `new`, Garbage Collector, límite `OutOfMemoryError`).
*   **Ejemplos Prácticos en 4 Lenguajes:**
    *   **Java**: Método `procesar()` con tipos primitivos e instanciación de objetos.
    *   **Node (JavaScript/TypeScript)**: Variables primitivas en bloque local e instanciación de objetos complejos.
    *   **Python**: Referencias a objetos locales y enteros/objetos en memoria.
    *   **Go**: Variables locales primitivas vs objetos/estructuras que se escapan al montón (escape analysis).
    *   Explicación paso a paso detallando qué sucede exactamente en la pila y en el montón, y el ciclo de vida de los objetos en el montón tras finalizar la ejecución de las funciones.
*   **Gráfico ASCII:** Mantener y mejorar el gráfico para visualizar la referencia de la pila al montón.

---

### 3. Soporte para Tablas Comparativas en la Interfaz
Para poder mostrar el **Cuadro Comparativo Rápido** de manera profesional y wow (cumpliendo con las directrices estéticas premium), introduciremos soporte nativo para tablas en la estructura de las guías de estudio:

#### Modificaciones en el Código:
1.  **`src/data/studyGuide.ts`**:
    *   Extender la interfaz `Subsection` para admitir una propiedad opcional `table`:
        ```typescript
        export interface TableData {
          headers: string[];
          rows: string[][];
        }
        ```
    *   Actualizar la sección de Stack vs Heap para estructurar el cuadro comparativo en el formato `table`.
2.  **`src/components/TopicDetail.tsx`**:
    *   Añadir lógica de renderizado para `sub.table`. Si está presente, renderizar un componente de tabla HTML estructurado (`<table>`, `<thead>`, `<tbody>`).
3.  **`src/index.css`**:
    *   Agregar estilos premium para las tablas en el dashboard (bordes suaves, tipografía moderna, fondos sutiles para el encabezado, animaciones de hover y compatibilidad total con el modo oscuro).

---

## Archivos Afectados

*   `src/data/definitions.ts`
*   `src/data/studyGuide.ts`
*   `src/components/TopicDetail.tsx`
*   `src/index.css`

---

## Plan de Verificación

### Pruebas Automatizadas
*   Ejecutar `npm run build` para asegurar que las definiciones de tipo de TypeScript sigan compilando correctamente y no haya errores de empaquetado.
*   Ejecutar `npm run lint` para validar que el formato de código sea correcto.

### Verificación Manual
*   Iniciar el servidor de desarrollo (`npm run dev`) y navegar a la sección de **Ciencias de la Computación** en la barra lateral para verificar la correcta visualización del bloque de teoría enriquecido y la tabla comparativa con un diseño premium y responsive.
