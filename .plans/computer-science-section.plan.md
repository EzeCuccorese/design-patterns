# Plan de Implementación: Sección de Ciencias de la Computación y Linux

Este plan detalla los pasos para agregar una nueva sección llamada **Ciencias de la Computación & Comandos de Linux** en la plataforma de estudio de Arquitectura y Diseño. Esta sección incluirá conceptos avanzados de matrices dispersas, árboles binarios, notación Big O, expresiones regulares avanzadas y comandos esenciales de infraestructura de Linux. Además, se integrarán simulaciones de código de algoritmos importantes, nuevas flashcards y un nuevo módulo de autoevaluación (quiz).

## Propósito de los Cambios
Enriquecer el material de estudio con temas clave evaluados en screenings técnicos rigurosos y entrevistas de arquitectura de software, proporcionando explicaciones conceptuales y ejemplos prácticos en TypeScript/Bash.

---

## Cambios Propuestos

### 1. Definiciones Técnicas
#### [MODIFY] [definitions.ts](file:///Users/eze/projects/design-patterns/src/data/definitions.ts)
- Agregar las nuevas definiciones bajo las claves correspondientes:
  - `sparseMatrix`: Definición de matrices dispersas, formatos COO, CSR y CSC.
  - `binaryTree`: Conceptos de árboles binarios, recorridos en profundidad (DFS) y amplitud (BFS).
  - `bigO`: Notación Big O y jerarquía de eficiencias matemáticas.
  - `regex`: Expresiones regulares avanzadas, greedy vs lazy y lookarounds.
  - `linuxCommands`: Comandos de diagnóstico de Linux (grep, sed, awk, lsof, ss, ps, chmod, chown).

### 2. Guía de Estudio
#### [MODIFY] [studyGuide.ts](file:///Users/eze/projects/design-patterns/src/data/studyGuide.ts)
- Registrar la nueva sección `computer-science` en la lista `studyGuide` con las subsecciones detalladas:
  - **Matrices Dispersas**: Concepto y explicación de COO, CSR y CSC. Código de conversión de matriz densa a CSR en TypeScript.
  - **Árboles Binarios**: Explicación de los recorridos DFS (Preorder, Inorder, Postorder) y BFS (Level-order). Implementaciones en TypeScript de los recorridos y nodos de árboles.
  - **Orden de Complejidad (Notación Big O)**: Tabla jerárquica de complejidades. Código con implementaciones de Búsqueda Binaria (\(O(\log N)\)) y Quick Sort (\(O(N \log N)\)).
  - **Regex Avanzado**: Detalle de Greedy vs Lazy y Lookarounds con ejemplos prácticos.
  - **Comandos de Linux**: La santísima trinidad (grep, sed, awk), red y procesos (lsof, ss, ps), y permisos (chmod, chown).

### 3. Componentes de Interfaz de Usuario
#### [MODIFY] [Sidebar.tsx](file:///Users/eze/projects/design-patterns/src/components/Sidebar.tsx)
- Importar el icono `Binary` de `lucide-react` para representar la nueva sección.
- Agregar un nuevo acordeón/sección en el menú de navegación lateral para "Ciencias de la Computación".
- Importar `flashcards` dinámicamente o usar su propiedad `.length` en lugar de tener hardcodeado `Flashcards (25)`.
- Manejar la expansión automática del nuevo acordeón cuando `activeView` sea `'computer-science'`.

#### [MODIFY] [TopicDetail.tsx](file:///Users/eze/projects/design-patterns/src/components/TopicDetail.tsx)
- Importar el icono `Binary` de `lucide-react`.
- Agregar `Binary` en el mapeo de iconos `iconMap`.

#### [MODIFY] [App.tsx](file:///Users/eze/projects/design-patterns/src/App.tsx)
- Registrar `computer-science` dentro de la lista de vistas soportadas por `TopicDetail`.
- Configurar el título del encabezado para retornar `"Ciencias de la Computación & Linux"` cuando `activeView === 'computer-science'`.

### 4. Autoevaluación y Repaso
#### [MODIFY] [flashcards.ts](file:///Users/eze/projects/design-patterns/src/data/flashcards.ts)
- Agregar 6 nuevas tarjetas (de la 26 a la 31) enfocadas en matrices dispersas, BFS, complejidad temporal, lazy regex y comandos críticos de Linux.

#### [MODIFY] [quiz.ts](file:///Users/eze/projects/design-patterns/src/data/quiz.ts)
- Agregar un nuevo módulo de preguntas `modulo4Questions` con 10 preguntas de screening rigurosas.
- Registrar el módulo 4 (`modulo4`) titulado `"Ciencias de la Computación & Linux"` en la lista de `quizModules`.

---

## Plan de Verificación

### Pruebas Automatizadas
- Compilar el proyecto usando `npm run build` para asegurar la integridad de tipos en TypeScript.
- Ejecutar el linter `npm run lint` (`oxlint`) para comprobar que el código editado cumple con las reglas estáticas.

### Verificación Manual
- Abrir la interfaz y navegar a la sección "Ciencias de la Computación" desde la barra lateral.
- Verificar que las tarjetas Bento rendericen adecuadamente, con sus respectivos bloques de código en TypeScript y Bash.
- Asegurarse de que el número dinámico de Flashcards refleje el valor actualizado en la barra lateral.
- Interactuar con el Simulador de Examen y completar el nuevo módulo 4 de preguntas.
