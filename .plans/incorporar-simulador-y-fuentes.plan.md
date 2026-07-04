# Plan de Implementación: Simulador de Examen, Flashcards y Guía de Estudio (Agnóstico)

Este plan detalla la incorporación del simulador de exámenes (screening de 3 módulos), las 25 flashcards interactivas y la guía de estudio de arquitectura de software y SRE en el proyecto de patrones de diseño, de manera totalmente agnóstica a "Flux IT".

## Cambios Propuestos

1. **Datos del Simulador y Flashcards**:
   * Creación de `src/data/quiz.ts` con 3 módulos de preguntas (Ingeniería de Software, Arquitectura de Software, Cultura DevOps).
   * Creación de `src/data/flashcards.ts` con 25 tarjetas conceptuales interactivas en español.
   * Creación de `src/data/studyGuide.ts` con los contenidos teóricos estructurados a partir de `InfoEntrenamiento.html`.

2. **Componentes de Interfaz de Usuario (UI)**:
   * Creación de `src/components/QuizSimulator.tsx`: Simulador interactivo con retroalimentación inmediata, barra de progreso y cronómetro simulado.
   * Creación de `src/components/Flashcards.tsx`: Componente con animación 3D de giro de tarjeta.
   * Creación de `src/components/StudyGuide.tsx`: Guía estructurada con navegación interna y diagramas de resiliencia y SRE.

3. **Modificaciones de Estructura**:
   * `src/components/Sidebar.tsx`: Sumar accesos rápidos de navegación a la Guía, Flashcards y Simulador.
   * `src/App.tsx`: Expandir rutas y estados de vistas.
   * `src/index.css`: Agregar clases CSS para rotación 3D.

## Plan de Verificación

* Ejecutar `npm run build` para asegurar compilación estricta de TypeScript.
* Probar el flujo del quiz e historial de intentos.
* Validar la correcta renderización visual en modo claro y modo oscuro.
