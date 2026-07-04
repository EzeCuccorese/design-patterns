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
  }
];
