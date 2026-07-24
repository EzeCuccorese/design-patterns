# Plan de Mejora Integral: Arquitectura, Rendimiento y UX

## 1. Diagnóstico del Proyecto

Tras realizar un análisis profundo del repositorio `design-patterns`, se han identificado las siguientes áreas de oportunidad y falencias principales:

### A. Enrutamiento y Navegación
* **Falencia**: La navegación entre vistas (`activeView`, `selectedPattern`, `selectedCategory`) depende 100% de `useState` en `App.tsx`.
* **Consecuencia**: Al recargar la página (`F5`), compartir un enlace o usar los botones "Atrás/Adelante" del navegador, se pierde el estado actual y se regresa al inicio.

### B. Rendimiento y Tamaño del Bundle (Code Splitting)
* **Falencia**: El archivo JS compilado supera los **614 kB** en un único chunk (`dist/assets/index-CeVp-ld2.js`).
* **Consecuencia**: Se degrada la velocidad de carga inicial (LCP/INP). Componentes y data masiva (vistas de Quiz, Flashcards, Fuentes y Diagramas) se descargan de golpe aunque no se utilicen de inmediato.

### C. Linting y Prevención de Bugs (`oxlint`)
* **Falencia**: Advertencia en `QuizSimulator.tsx` por dependencia faltante en `useEffect` del temporizador (`[gameState, timeLeft]`).
* **Consecuencia**: Re-creación continua de temporizadores cada segundo, riesgo de desincronización y advertencia en el linter.

### D. Ausencia de Suite de Pruebas Automáticas (`npm test`)
* **Falencia**: El proyecto carece del script `npm test` y de una suite de pruebas automatizadas con `vitest`.
* **Consecuencia**: Incumplimiento de la regla del workflow que exige ejecutar tests antes de hacer push y falta de garantía contra regresiones.

### E. UX / Accesibilidad y Búsqueda Global
* **Falencia**: Ausencia de una herramienta de búsqueda global para navegar ágilmente entre los 23+ patrones y temas de arquitectura. Acordeones en Sidebar con poca semántica ARIA.
* **Consecuencia**: Navegación lenta al estudiar temas específicos y baja accesibilidad para lectores de pantalla.

### F. Persistencia del Progreso de Estudio
* **Falencia**: No hay seguimiento visual de qué patrones han sido estudiados, marcados como favoritos o completados.
* **Consecuencia**: El estudiante no tiene claridad sobre su avance en el catálogo de patrones.

---

## 2. Plan de Soluciones Progresivo

### Fase 1: Correcciones Críticas & Configuración de Testing
1. **Solucionar Warning de `oxlint`**: Refactorizar el temporizador en `QuizSimulator.tsx` usando un hook de intervalo limpio o referencias sin reinstanciar en cada segundo.
2. **Configurar Vitest & Testing**:
   - Instalar `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
   - Agregar script `"test": "vitest run"` a `package.json`.
   - Crear pruebas para `QuizSimulator`, filtrado de patrones y utilidades.

### Fase 2: Enrutamiento con URL Hash & Code Splitting
1. **Sincronización de Navegación con URL**:
   - Implementar un listener de `window.location.hash` en `App.tsx` para sincronizar `activeView`, `pattern` y `category` con la URL (`#pattern/singleton`, `#quiz`, etc.).
2. **Code Splitting (Lazy Loading)**:
   - Convertir vistas secundarias pesadas (`QuizSimulator`, `Flashcards`, `SourcesDetail`, `RefactorDetail`, `TopicDetail`) a `React.lazy` con `Suspense` y spinners visuales.
   - Configurar `manualChunks` en `vite.config.ts` para aislar librerías de terceros (React, Prism, Lucide).

### Fase 3: Búsqueda Global & Persistencia de Progreso
1. **Barra de Búsqueda Global**:
   - Crear componente `GlobalSearch.tsx` en el header o sidebar con modal/desplegable rápido (filtra por nombre de patrón, categoría o palabra clave).
2. **Persistencia de Progreso (`useStudyProgress`)**:
   - Crear hook personalizado para almacenar en `localStorage` los patrones leídos/completados y favoritos.
   - Mostrar indicador de progreso (%) en la Sidebar.
