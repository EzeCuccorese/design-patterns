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
    back: "Una clase debe tener una sola razón para sufrir modificaciones, lo que significa que debe resolver una única tarea enfocada a un solo actor o rol del negocio.",
    hint: "Piensa en 'un solo actor' o 'una sola razón de cambio'."
  },
  {
    id: 2,
    front: "¿Qué define el principio Abierto/Cerrado (OCP)?",
    back: "Las entidades de software (clases, módulos) deben estar abiertas para su extensión (a través de herencia o polimorfismo) pero estrictamente cerradas para su modificación directa.",
    hint: "Extensible sin editar el código fuente original."
  },
  {
    id: 3,
    front: "¿Qué exige el principio de Sustitución de Liskov (LSP)?",
    back: "Las subclases o tipos derivados deben poder sustituir a sus clases base sin alterar el comportamiento esperado ni la corrección del programa, sin lanzar excepciones imprevistas.",
    hint: "Si parece un pato pero necesita pilas, tienes el tipo de objeto incorrecto."
  },
  {
    id: 4,
    front: "¿Cuál es el núcleo del principio de Segregación de Interfaces (ISP)?",
    back: "Es preferible diseñar muchas interfaces específicas y delgadas a tener una sola interfaz gigantesca y monolítica, evitando obligar a los clientes a implementar métodos vacíos.",
    hint: "Evita contratos gigantescos con firmas de métodos no utilizadas."
  },
  {
    id: 5,
    front: "¿En qué se diferencia el principio de Inversión de Dependencias (DIP) de la Inyección de Dependencias (DI)?",
    back: "DIP es el principio arquitectónico abstracto (alto nivel no depende de bajo nivel, ambos dependen de abstracciones). DI es la técnica que implementa DIP inyectando las dependencias por constructor.",
    hint: "Abstracciones sobre implementaciones concretas."
  },
  {
    id: 6,
    front: "¿Qué establece el principio GRASP de Experto en Información?",
    back: "Se debe asignar la responsabilidad de una acción a la clase que posee la información necesaria para realizarla, reduciendo el acoplamiento y centralizando el conocimiento del dominio.",
    hint: "¿Quién calcula el total del carrito? El carrito, no el procesador de pagos."
  },
  {
    id: 7,
    front: "¿Cuándo se utiliza una Fabricación Pura (Pure Fabrication) en GRASP?",
    back: "Cuando queremos asignar responsabilidades de alta cohesión y bajo acoplamiento a una clase artificial que no representa un concepto del dominio real (ej. Logger, Database Connection, Exporter).",
    hint: "Concepto de software creado artificialmente para mantener el dominio limpio."
  },
  {
    id: 8,
    front: "¿Cuál es el rol del patrón GRASP Controlador?",
    back: "Es el primer objeto del sistema, más allá de la capa gráfica, que recibe las peticiones externas y coordina su ejecución delegando el flujo a los servicios o entidades del dominio.",
    hint: "Mediador inicial entre el cliente o capa de presentación y el dominio."
  },
  {
    id: 9,
    front: "¿Qué es el principio GRASP de Variaciones Protegidas?",
    back: "Identificar puntos de inestabilidad o cambio potencial y envolverlos en una interfaz estable y polimórfica para proteger al resto del sistema de variaciones futuras.",
    hint: "Concepto similar al OCP pero enfocado en aislar la inestabilidad."
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
    back: "Divide una transacción distribuida en una secuencia de transacciones locales en cada microservicio, ejecutando transacciones compensatorias (reversa) si ocurre un fallo intermedio.",
    hint: "Consistencia eventual mediante orquestación o coreografía ante fallos distribuidos."
  },
  {
    id: 20,
    front: "¿Qué es el Circuit Breaker y cuáles son sus tres estados?",
    back: "Patrón de resiliencia que evita llamadas a servicios externos caídos. Estados: Cerrado (tráfico normal), Abierto (falla rápido localmente) y Semi-abierto (prueba de recuperación).",
    hint: "Cortocircuita llamadas lentas o fallidas para liberar recursos."
  },
  {
    id: 21,
    front: "¿Qué problema resuelve el patrón Transactional Outbox?",
    back: "Garantiza la atomicidad al guardar datos en la base de datos local y publicar eventos en un broker (Kafka/RabbitMQ) insertando el mensaje en una tabla temporal dentro de la misma transacción.",
    hint: "Evita inconsistencias de red escribiendo en base de datos e inyectando cola en un solo paso ACID."
  },
  {
    id: 22,
    front: "¿Qué decisión impone el Teorema CAP ante una partición de red (P)?",
    back: "Obliga a elegir entre Consistencia (C - denegar peticiones para evitar datos desactualizados) o Disponibilidad (A - aceptar peticiones respondiendo con datos potencialmente obsoletos).",
    hint: "No puedes tener C y A simultáneamente si hay fallos de comunicación en red."
  },
  {
    id: 23,
    front: "¿Cuál es la diferencia técnica entre un Stub y un Mock?",
    back: "Un Stub es un doble pasivo que devuelve respuestas preconfiguradas fijas. Un Mock es un doble activo enfocado en verificar e inspeccionar cómo y cuántas veces se invocó la dependencia.",
    hint: "Stub alimenta el flujo del test; Mock audita las llamadas."
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
