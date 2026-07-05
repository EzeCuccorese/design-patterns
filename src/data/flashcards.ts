import { technicalDefinitions } from './definitions';

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  hint: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    front: "¿Cuál es la regla fundamental del Principio de Responsabilidad Única (SRP)?",
    back: technicalDefinitions.srp.description,
    hint: technicalDefinitions.srp.hint || ""
  },
  {
    id: 2,
    front: "¿Qué define el principio Abierto/Cerrado (OCP)?",
    back: technicalDefinitions.ocp.description,
    hint: technicalDefinitions.ocp.hint || ""
  },
  {
    id: 3,
    front: "¿Qué exige el principio de Sustitución de Liskov (LSP)?",
    back: technicalDefinitions.lsp.description,
    hint: technicalDefinitions.lsp.hint || ""
  },
  {
    id: 4,
    front: "¿Cuál es el núcleo del principio de Segregación de Interfaces (ISP)?",
    back: technicalDefinitions.isp.description,
    hint: technicalDefinitions.isp.hint || ""
  },
  {
    id: 5,
    front: "¿En qué se diferencia el principio de Inversión de Dependencias (DIP) de la Inyección de Dependencias (DI)?",
    back: technicalDefinitions.dip.description,
    hint: technicalDefinitions.dip.hint || ""
  },
  {
    id: 6,
    front: "¿Qué establece el principio GRASP de Experto en Información?",
    back: technicalDefinitions.informationExpert.description,
    hint: technicalDefinitions.informationExpert.hint || ""
  },
  {
    id: 7,
    front: "¿Cuándo se utiliza una Fabricación Pura (Pure Fabrication) en GRASP?",
    back: technicalDefinitions.pureFabrication.description,
    hint: technicalDefinitions.pureFabrication.hint || ""
  },
  {
    id: 8,
    front: "¿Cuál es el rol del patrón GRASP Controlador?",
    back: technicalDefinitions.controller.description,
    hint: technicalDefinitions.controller.hint || ""
  },
  {
    id: 9,
    front: "¿Qué es el principio GRASP de Variaciones Protegidas?",
    back: technicalDefinitions.protectedVariations.description,
    hint: technicalDefinitions.protectedVariations.hint || ""
  },
  {
    id: 10,
    front: "¿Qué problema resuelve el patrón Singleton y cuál es su mayor desventaja?",
    back: "Resuelve la necesidad de tener una única instancia global de una clase. Su desventaja es que actúa como una variable global oculta, dificultando el testing unitario y acoplando clases.",
    hint: "Única instancia, pero cuidado con las pruebas unitarias y los hilos."
  },
  {
    id: 11,
    front: "¿Cuál es el propósito del patrón Factory Method?",
    back: "Definir una interfaz para la creación de un objeto, pero dejar que las subclases decidan qué clase concreta instanciar en tiempo de ejecución.",
    hint: "Creación delegada a subclases sin usar 'new' de forma estática."
  },
  {
    id: 12,
    front: "¿Qué hace el patrón Adapter?",
    back: "Convierte la interfaz de una clase en otra interfaz que el cliente espera, permitiendo que clases con interfaces incompatibles trabajen juntas.",
    hint: "Actúa como un puente o traductor de interfaces incompatibles."
  },
  {
    id: 13,
    front: "¿Cómo funciona el patrón Decorator y qué ventaja ofrece sobre la herencia?",
    back: "Envuelve un objeto agregándole responsabilidades adicionales de manera dinámica en tiempo de ejecución, evitando la explosión de subclases estáticas de la herencia.",
    hint: "Envuelve clases en capas para sumar funcionalidades de forma flexible."
  },
  {
    id: 14,
    front: "¿Cuál es el objetivo principal de una Fachada (Facade)?",
    back: "Proveer una interfaz única, simplificada y de alto nivel sobre un subsistema complejo para facilitar su uso al cliente, sin impedir el acceso a las clases internas si es necesario.",
    hint: "Oculta la complejidad técnica pesada de un subsistema."
  },
  {
    id: 15,
    front: "¿Qué es un Proxy y cuáles son sus tipos más comunes?",
    back: "Un intermediario que controla el acceso a otro objeto. Tipos: Virtual Proxy (carga perezosa/lazy loading), Protection Proxy (seguridad/roles) y Remote Proxy (red/RPC).",
    hint: "Controla, audita o posterga el acceso al objeto real."
  },
  {
    id: 16,
    front: "¿Cómo se comunican el Subject y los Observers en el patrón Observer?",
    back: "El Subject (sujeto de interés) mantiene una lista de suscriptores (observers) y les notifica automáticamente cualquier cambio de estado invocando un método de su interfaz.",
    hint: "Relación uno a muchos para mantener estados sincronizados."
  },
  {
    id: 17,
    front: "¿Qué define el patrón de comportamiento Strategy?",
    back: "Define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables en tiempo de ejecución, variando el comportamiento del contexto de forma dinámica.",
    hint: "Permite cambiar algoritmos en ejecución sin condicionales gigantes."
  },
  {
    id: 18,
    front: "¿Qué significa encapsular una petición como un Command?",
    back: "Convertir una llamada a un método o acción en un objeto independiente que contiene toda la información necesaria para ejecutarla, facilitando encolamientos, logs y reversibilidad (Undo).",
    hint: "Acciones convertidas en objetos parametrizables con execute()."
  },
  {
    id: 19,
    front: "¿Cómo gestiona el patrón Saga las transacciones en una arquitectura de microservicios?",
    back: technicalDefinitions.sagaPattern.description,
    hint: technicalDefinitions.sagaPattern.hint || ""
  },
  {
    id: 20,
    front: "¿Qué es el Circuit Breaker y cuáles son sus tres estados?",
    back: technicalDefinitions.circuitBreaker.description,
    hint: technicalDefinitions.circuitBreaker.hint || ""
  },
  {
    id: 21,
    front: "¿Qué problema resuelve el patrón Transactional Outbox?",
    back: technicalDefinitions.transactionalOutbox.description,
    hint: technicalDefinitions.transactionalOutbox.hint || ""
  },
  {
    id: 22,
    front: "¿Qué decisión impone el Teorema CAP ante una partición de red (P)?",
    back: technicalDefinitions.capTheorem.description,
    hint: technicalDefinitions.capTheorem.hint || ""
  },
  {
    id: 23,
    front: "¿Cuál es la diferencia técnica entre un Stub y un Mock?",
    back: technicalDefinitions.stubVsMock.description,
    hint: technicalDefinitions.stubVsMock.hint || ""
  },
  {
    id: 24,
    front: "¿Por qué se recomiendan los Multi-Stage Builds (Docker) en entornos productivos?",
    back: "Permiten usar un contenedor pesado con compiladores y SDKs para compilar el código, y luego copiar el binario final a una imagen limpia y ultraliviana (ej. Alpine) para producción.",
    hint: "Separa el entorno de construcción del entorno de ejecución para ahorrar espacio y aumentar seguridad."
  },
  {
    id: 25,
    front: "¿En qué consiste un despliegue de tipo Canario (Canary Deployment)?",
    back: "Consiste en liberar la nueva versión del software a un porcentaje pequeño de usuarios reales (ej. 5%) para monitorear errores en producción antes de escalarla al 100% del tráfico.",
    hint: "Minimiza el impacto de bugs enviando tráfico progresivamente."
  },
  {
    id: 26,
    front: "¿Qué es la Arquitectura Hexagonal y cuál es su principal objetivo?",
    back: technicalDefinitions.cleanArchitecture.description,
    hint: technicalDefinitions.cleanArchitecture.hint || ""
  },
  {
    id: 27,
    front: "¿Qué significan las siglas CQRS y qué propone?",
    back: technicalDefinitions.cqrs.description,
    hint: technicalDefinitions.cqrs.hint || ""
  },
  {
    id: 28,
    front: "¿Cuál es la función del patrón BFF (Backend-for-Frontend)?",
    back: technicalDefinitions.bff.description,
    hint: technicalDefinitions.bff.hint || ""
  },
  {
    id: 29,
    front: "¿Qué promueve el enfoque Domain-Driven Design (DDD)?",
    back: technicalDefinitions.ddd.description,
    hint: technicalDefinitions.ddd.hint || ""
  },
  {
    id: 30,
    front: "¿Qué es Trunk-Based Development y qué ventajas ofrece?",
    back: technicalDefinitions.trunkBased.description,
    hint: technicalDefinitions.trunkBased.hint || ""
  },
  {
    id: 31,
    front: "¿Por qué se prefiere usar Biome u Oxlint sobre ESLint y Prettier en proyectos modernos?",
    back: technicalDefinitions.lintersRust.description,
    hint: technicalDefinitions.lintersRust.hint || ""
  },
  {
    id: 32,
    front: "¿Qué rol cumplen Husky y Lint-Staged en el flujo local de Git?",
    back: technicalDefinitions.gitHooks.description,
    hint: technicalDefinitions.gitHooks.hint || ""
  },
  {
    id: 33,
    front: "¿Cómo ayuda la herramienta 'Act' a la depuración de pipelines de integración continua?",
    back: technicalDefinitions.localCicd.description,
    hint: technicalDefinitions.localCicd.hint || ""
  },
  {
    id: 34,
    front: "¿Qué es GitOps y qué rol cumple ArgoCD o FluxCD?",
    back: technicalDefinitions.gitOps.description,
    hint: technicalDefinitions.gitOps.hint || ""
  },
  {
    id: 35,
    front: "¿Qué es OpenTelemetry y cuáles son sus tres pilares de observabilidad?",
    back: technicalDefinitions.openTelemetry.description,
    hint: technicalDefinitions.openTelemetry.hint || ""
  },
  {
    id: 36,
    front: "¿Cómo se orquesta un Canary Deployment usando una malla de servicios (Service Mesh) como Istio?",
    back: "Istio utiliza proxies Envoy (sidecars) para interceptar el tráfico de red de forma transparente y dividirlo de manera dinámica y precisa (ej. 95% a V1 y 5% a V2) en base a reglas de ruteo configuradas.",
    hint: "Ruteo dinámico de red mediante proxies sidecar Envoy."
  },
  {
    id: 37,
    front: "¿Qué ventajas de seguridad aportan las imágenes de contenedor de tipo Distroless?",
    back: technicalDefinitions.distroless.description,
    hint: technicalDefinitions.distroless.hint || ""
  },
  {
    id: 38,
    front: "¿Qué establece la Boy Scout Rule aplicada a la ingeniería de software?",
    back: "Establece que debes dejar el archivo o módulo que estás editando en un estado ligeramente más limpio y ordenado de como lo encontraste, reduciendo de manera continua la deuda técnica.",
    hint: "Deja el campamento más limpio de como lo encontraste."
  },
  {
    id: 39,
    front: "En DDD, ¿qué es un Bounded Context (Contexto Delimitado)?",
    back: "Es un límite explícito y conceptual dentro del cual un modelo de dominio y sus términos lógicos (ubiquitous language) tienen un significado único y consistente, evitando la ambigüedad semántica.",
    hint: "Frontera semántica donde las palabras significan exactamente una sola cosa."
  },
  {
    id: 40,
    front: "¿Cuál es la diferencia clave entre Inyección de Dependencias (DI) e Inversión de Dependencias (DIP)?",
    back: "DIP es el principio abstracto de diseño (los módulos de alto nivel dependen de abstracciones, no de detalles). DI es el patrón técnico concreto mediante el cual pasamos esas abstracciones al constructor.",
    hint: "DIP es la regla conceptual de diseño; DI es el mecanismo de inyección física."
  },
  {
    id: 41,
    front: "¿Qué tipo de datos se guardan en la memoria Stack (Pila) y cuál es su comportamiento de liberación?",
    back: "Se guardan variables locales de tipos primitivos (como int, boolean) y punteros de referencia a objetos. Su liberación es automática e instantánea al finalizar la ejecución del contexto de la función (LIFO).",
    hint: "Estructura secuencial rápida y local gestionada por la CPU."
  },
  {
    id: 42,
    front: "¿Qué tipo de datos se guardan en la memoria Heap (Montón) y qué error crítico ocurre si se llena?",
    back: "Se guardan todos los objetos instanciados físicamente (con new) y sus campos. Si se llena debido a excesos de objetos o fugas de memoria (memory leaks), el sistema operativo o runtime lanza un OutOfMemoryError (OOM).",
    hint: "Gran espacio de memoria de asignación dinámica gestionado por el Garbage Collector."
  },
  {
    id: 43,
    front: "¿En qué consiste el formato CSR (Compressed Sparse Row) para matrices dispersas?",
    back: "Comprime las filas de una matriz dispersa usando tres arrays planos: values (valores no nulos), col_indices (sus columnas) y row_offsets (punteros acumulativos de tamaño N + 1 que indican dónde inicia cada fila).",
    hint: "Comprime filas de ceros mediante punteros acumulativos para acelerar la multiplicación matriz-vector."
  },
  {
    id: 44,
    front: "¿Qué estructura de datos es indispensable para realizar un recorrido en amplitud (BFS - Level Order) en un árbol?",
    back: "Requiere obligatoriamente una Cola (Queue), la cual funciona bajo la política FIFO (First In, First Out) para recordar qué nodos vecinos debe visitar en el siguiente nivel jerárquico.",
    hint: "Estructura FIFO auxiliar en lugar de la pila recursiva de DFS."
  },
  {
    id: 45,
    front: "¿Cuál es la jerarquía general de eficiencia algorítmica de mejor a peor según la notación Big O?",
    back: "O(1) [Constante] < O(log N) [Logarítmica] < O(N) [Lineal] < O(N log N) [Linearítmica] < O(N^2) [Cuadrática] < O(2^N) [Exponencial] < O(N!) [Factorial].",
    hint: "Clasificación de eficiencia temporal y espacial estándar de la industria."
  },
  {
    id: 46,
    front: "¿Cómo se convierte un cuantificador codicioso (greedy) en uno perezoso (lazy) en Regex?",
    back: "Agregando un signo de pregunta (?) inmediatamente después del cuantificador principal (ej. transformar * en *?, o + en +?). Esto hace que se detenga en la primera coincidencia del patrón.",
    hint: "Detiene la codicia por defecto agregando un signo de interrogación."
  },
  {
    id: 47,
    front: "¿Qué comando de Linux permite identificar qué proceso (PID) tiene bloqueado el puerto 8080?",
    back: "lsof -i :8080 (List Open Files) o también ss -tulpn (Socket Statistics) filtrando por el puerto.",
    hint: "Resuelve el error local EADDRINUSE antes de matar el proceso."
  },
  {
    id: 48,
    front: "¿Qué es un Positive Lookbehind en una expresión regular y cuál es su sintaxis?",
    back: "Es un aserto de búsqueda que permite verificar si un patrón específico está justo antes de la coincidencia actual, sin incluir dichos caracteres en la captura final. Sintaxis: (?<=patrón).",
    hint: "Valida el texto anterior sin consumirlo."
  }
];
