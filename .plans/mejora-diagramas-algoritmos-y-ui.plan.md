# Plan de Expansión del Proyecto: Diagramas Animados, Catálogo de Algoritmos y Mejoras UI

## 1. Objetivos del Plan

Expandir el proyecto `design-patterns` integrando un **Catálogo Completo de Algoritmos & Estructuras de Datos**, implementando **micro-animaciones SVG en los 23 patrones**, eliminando atribuciones fuera de Fuentes y añadiendo mejoras visuales en componentes clave (`RefactorCatalog`, `BentoGrid`, `QuizSimulator`).

---

## 2. Desglose por Módulos y Temáticas

### Módulo A: Remoción de "Mi Granito de Java" Fuera de Fuentes
* **`AnalogyCard.tsx`**: Cambiar título del header a `Analogía del Mundo Real`.
* **Archivos de Patrones (`chain.ts`, `observer.ts`, `adapter.ts`, `composite.ts`, `decorator.ts`)**: Limpiar prefijos de texto, manteniendo "Mi Granito de Java" estrictamente en `SourcesDetail.tsx`.

### Módulo B: Diagramas SVG Animados (23 Patrones de Diseño)
* **Corrección de IDs de Patrones**: Asignar alias para que los 23 patrones mapeen a sus SVGs (`factory`, `abstractfactory`, `objectpool`, `chain`, `template`).
* **Implementación de SVGs Faltantes**: `adapter`, `decorator` y `observer`.
* **Micro-animaciones CSS/SVG**:
  - Efectos `stroke-dasharray` en flechas de flujo para simular tráfico de invocaciones.
  - Efectos `hover` con resplandor y elevación en las cajas de clases.
  - Adaptabilidad de color según tema (Dark/Light).

### Módulo C: Nuevo Catálogo de Algoritmos & Estructuras de Datos
Crear datos (`src/data/algorithmsData.ts`) y vista interactiva (`src/components/AlgorithmCatalog.tsx`) con 5 temáticas sin duplicaciones:

1. **Estructuras de Datos & Árboles**:
   - Trie (Árbol de Prefijos y autocompletado).
   - Tipos de Árboles (Binario, BST, AVL/Red-Black, Heap, Árbol B/B+).
   - Recorridos de Árboles (In-Order, Pre-Order, Post-Order, BFS) con visualizador SVG.
2. **Complejidad Notación Big-O**:
   - Tabla comparativa visual ($\mathcal{O}(1)$, $\mathcal{O}(\log N)$, $\mathcal{O}(N)$, $\mathcal{O}(N \log N)$, $\mathcal{O}(N^2)$).
   - Ejemplos prácticos y tiempos en árboles.
3. **Algoritmos Fundamentales**:
   - Ordenamiento: QuickSort, MergeSort, BubbleSort.
   - Búsqueda y Grafos: Búsqueda Binaria, Dijkstra (GPS), PageRank.
   - Criptografía y Hash: SHA-256 / MD5, RSA (llave pública/privada).
   - Compresión: Codificación de Huffman.
4. **Inteligencia Artificial & Machine Learning**:
   - Backpropagation (redes neuronales).
   - K-Means (clustering).
   - Regresión Lineal y Logística.
5. **Gráficos, Optimización & Sistemas Distribuidos**:
   - Ray Tracing y FFT (Transformada Rápida de Fourier).
   - Algoritmos Genéticos y Programación Dinámica (Floyd-Warshall).
   - Consenso Distribuido (Raft / Paxos) y Filtro de Bloom.

### Módulo D: Mejoras Gráficas en Componentes Existententes
1. **`RefactorCatalog.tsx` / `RefactorCodeComparator.tsx`**: Resaltado de diferencias de código animado (líneas agregadas/removidas).
2. **`BentoGrid.tsx` / `PatternCard.tsx`**: Chips visuales de nivel de complejidad y frecuencia de uso en la industria.
3. **`QuizSimulator.tsx`**: Temporizador circular SVG animado con cuenta regresiva.

---

## 3. Plan de Verificación
- Executar `npm run lint` para 0 errores.
- Ejecutar `npm test` para asegurar que las pruebas pasen al 100%.
- Ejecutar `npm run build` para garantizar bundle sin errores.
