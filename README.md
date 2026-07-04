# Catálogo Interactivo de Patrones de Diseño (Bento Grid)

Este es un portal interactivo y visual diseñado para el estudio autodidáctico de los **24 Patrones de Diseño clásicos (Gang of Four)**. Permite comprender conceptos teóricos, comparar implementaciones idiomáticas y limpias en cuatro lenguajes de programación clave (**Java 21, Python 3, TypeScript y Go**), y repasar analogías reales inspiradas en el reconocido blog *Mi granito de Java*.

El proyecto ha sido rediseñado bajo los principios de **YAGNI (You Aren't Gonna Need It)**, **SOLID** y **DRY (Don't Repeat Yourself)** para servir como un recurso modelo de arquitectura de software moderna.

---

## 🚀 Cómo Empezar (Docker)

El proyecto está completamente dockerizado. Puedes compilar y levantar la interfaz de usuario en menos de un minuto sin necesidad de instalar entornos locales de desarrollo.

### Requisitos
*   Tener instalado [Docker](https://www.docker.com/) y Docker Compose.

### Ejecución
1.  En la raíz del proyecto, ejecuta el siguiente comando en la terminal:
    ```bash
    docker-compose up --build -d
    ```
2.  Una vez completado, abre tu navegador y accede a:
    **`http://localhost:8080`**

3.  Para detener el contenedor:
    ```bash
    docker-compose down
    ```

---

## 📁 Estructura del Proyecto

El repositorio ha sido reorganizado de manera modular y limpia:

```
design-patterns/
├── index.html                   # Página HTML principal del dashboard Bento Grid
├── package.json                 # Gestión de dependencias de npm y Vite
├── tsconfig.json                # Configuración de compilación de TypeScript
├── Dockerfile                   # Nginx multi-stage para compilar y servir en producción
├── docker-compose.yml           # Orquestador del servicio web Docker
├── legacy/                      # CÓDIGO ANTERIOR PRESERVADO (Los 24 patrones originales en Java de 2015)
└── src/                         # Código fuente de la aplicación modular moderna
    ├── main.tsx                 # Entrada de arranque de React
    ├── App.tsx                  # Componente contenedor que orquesta el estado
    ├── index.css                # Estilos globales y grid Bento (soporta Tema Claro y Oscuro)
    ├── components/              # Componentes de UI reusables (SRP)
    │   ├── ThemeToggle.tsx      # Interruptor de Modo Claro (Predeterminado) / Oscuro
    │   ├── Sidebar.tsx          # Menú de navegación clasificado por tipo
    │   ├── BentoGrid.tsx        # Cuadrícula organizadora Bento
    │   ├── PatternCard.tsx      # Renderiza conceptos y ventajas del patrón
    │   ├── AnalogyCard.tsx      # Muestra la analogía didáctica (Mi granito de Java)
    │   ├── CodeViewer.tsx       # Visor con pestañas de lenguajes y resaltado PrismJS
    │   └── ConsoleSimulator.tsx # Terminal simulada con la salida del programa
    └── data/                    # Catálogo de patrones modularizado (DRY)
        ├── types.ts             # Interfaces TypeScript
        ├── index.ts             # Indexador central que agrupa los módulos de datos
        └── patterns/            # Un archivo TypeScript independiente por patrón
            ├── creational/      # Categoría: Creacionales (Singleton, Factory, etc.)
            ├── structural/      # Categoría: Estructurales (Adapter, Decorator, etc.)
            └── behavioral/      # Categoría: De Comportamiento (Observer, Chain, etc.)
```

---

## 🛠️ Principios de Arquitectura Aplicados

El proyecto fue reestructurado aplicando los siguientes conceptos de ingeniería de software:

*   **YAGNI (You Aren't Gonna Need It):** Evitamos crear un backend complejo o entornos ejecutables en el servidor para los snippets de código, ya que el objetivo del proyecto es el estudio comparativo. La aplicación es 100% estática en el cliente y ultrarrápida.
*   **SOLID (Single Responsibility Principle - SRP):**
    *   **UI:** Cada panel del Bento Grid es un componente React (`.tsx`) aislado con una sola responsabilidad de renderizado.
    *   **Datos:** Cada patrón de diseño se almacena en su propio archivo TypeScript. Si deseas modificar la explicación o el código del patrón `Singleton`, solo alteras `singleton.ts`, sin peligro de romper otros patrones.
*   **DRY (Don't Repeat Yourself):** Los estilos CSS están basados en variables unificadas (`styles.css`), y el visualizador de código (`CodeViewer.tsx`) reutiliza un único algoritmo de renderizado y resaltado sintáctico paramétrico.
*   **Preservación Histórica:** Todo el código Java original fue preservado en `legacy/` para mantener el historial intacto y permitir la libre consulta de las primeras versiones.

---

## 📚 Catálogo de Patrones

El catálogo incluye explicaciones y código comparativo en **Java 21, Python 3, TypeScript y Go** para:

### 1. Patrones Creacionales
*   **Singleton:** Garantiza una única instancia. (Ejemplo: `ConfigManager` seguro entre hilos con `sync.Once` en Go, holder en Java y metaclases en Python).
*   **Factory Method:** Creación desacoplada. (Ejemplo: Ensamblaje de autos Sedanes/Camiones).
*   **Builder:** Construcción paso a paso. (Ejemplo: Personalización de pizzas con API fluida).
*   **Abstract Factory:** Familias de componentes compatibles. (Ejemplo: Widgets de UI estilo Mac y Windows).
*   **Prototype:** Clonación de objetos existentes. (Ejemplo: Copias profundas de objetos geométricos).
*   **Object Pool:** Reuso de recursos pesados. (Ejemplo: Pool de conexiones a base de datos usando canales de Go y colas concurrentes).

### 2. Patrones Estructurales
*   **Adapter:** Conversor de interfaces incompatibles. (Ejemplo de *Mi granito de Java*: Convertidor de entidad `User` a record/DTO `UserDto` para seguridad).
*   **Composite:** Estructuras jerárquicas recursivas. (Ejemplo de *Mi granito de Java*: Sistema de archivos con directorios y archivos simples).
*   **Decorator:** Extensión dinámica de comportamiento. (Ejemplo de *Mi granito de Java*: Preparación de café añadiendo leche, azúcar y chocolate envoltura por envoltura).
*   **Facade:** Interfaz unificada simplificada. (Ejemplo: Inicializador secuencial de componentes de computadora).
*   **Proxy:** Control de acceso intermediario. (Ejemplo: Proxy de seguridad en Internet o almacenamiento en caché).
*   **Bridge:** Desacopla abstracción de implementación. (Ejemplo: Controles remotos universales acoplados a TVs/Radios).
*   **Flyweight:** Compartición eficiente de memoria RAM. (Ejemplo: Renderizado masivo de árboles compartiendo recursos de texturas en videojuegos).

### 3. Patrones de Comportamiento
*   **Chain of Responsibility:** Manejo secuencial delegable. (Ejemplo de *Mi granito de Java*: Cadena de mando militar delegando órdenes de soldado a oficial).
*   **Observer:** Suscripción y distribución de eventos. (Ejemplo de *Mi granito de Java*: Subastador notificando ofertas de forma dinámica a postores registrados).
*   **Strategy:** Familia de algoritmos intercambiables. (Ejemplo: Selección dinámica de modos de navegación en mapas).
*   **Command:** Peticiones encapsuladas en objetos. (Ejemplo: Comandos de luces inteligentes con soporte de deshacer/undo).
*   **State:** Comportamiento dependiente del estado interno. (Ejemplo: Modos de alerta de celulares - Sonido, Vibración, Silencioso).
*   **Template Method:** Esqueleto de algoritmo configurable. (Ejemplo: Minería de datos PDF y CSV compartiendo la estructura de lectura).
*   **Memento:** Captura y restauración del estado. (Ejemplo: Guardar y restaurar puntos del historial en un editor de texto).
*   **Mediator:** Comunicación de muchos-a-muchos simplificada. (Ejemplo: Torre de control aérea que coordina los despegues y aterrizajes).
*   **Iterator:** Recorrido secuencial de colecciones. (Ejemplo: Guía de turismo que recorre colecciones sin exponer el mapa interno).
*   **Visitor:** Operaciones externas sobre estructuras. (Ejemplo: Exportador de datos XML/JSON que actúa externamente sobre formas geométricas).
*   **Interpreter:** Evaluación gramatical del lenguaje. (Ejemplo: Motor que interpreta expresiones matemáticas básicas).
