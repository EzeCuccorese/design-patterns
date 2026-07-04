export interface TechnicalDefinition {
  title: string;
  description: string;
  details: string[];
  hint?: string;
}

export const technicalDefinitions: Record<string, TechnicalDefinition> = {
  // SOLID
  srp: {
    title: "Principio de Responsabilidad Única (SRP)",
    description: "Una clase debe tener una sola razón para sufrir modificaciones, lo que significa que debe resolver una única tarea enfocada a un solo actor o rol del negocio.",
    details: [
      "SRP (Single Responsibility Principle): Una clase debe tener solo una razón para cambiar, resolviendo una única responsabilidad para un solo actor del negocio.",
      "Evita la creación de clases monolíticas (God Classes) que acumulan lógica dispar.",
      "Facilita enormemente el testing unitario y reduce el riesgo de efectos colaterales al alterar lógica de negocio."
    ],
    hint: "Piensa en 'un solo actor' o 'una sola razón de cambio'."
  },
  ocp: {
    title: "Principio Abierto/Cerrado (OCP)",
    description: "Las entidades de software (clases, módulos) deben estar abiertas para su extensión (a través de herencia o polimorfismo) pero estrictamente cerradas para su modificación directa.",
    details: [
      "OCP (Open/Closed Principle): El código debe estar abierto a la extensión pero cerrado a la modificación.",
      "Se implementa programando contra interfaces y abstrayendo el comportamiento.",
      "Permite sumar nuevos requerimientos sin alterar el código existente que ya está verificado y en producción."
    ],
    hint: "Extensible sin editar el código fuente original."
  },
  lsp: {
    title: "Principio de Sustitución de Liskov (LSP)",
    description: "Las subclases o tipos derivados deben poder sustituir a sus clases base sin alterar el comportamiento esperado ni la corrección del programa, sin lanzar excepciones imprevistas.",
    details: [
      "LSP (Liskov Substitution Principle): Las clases derivadas deben poder reemplazar a sus clases base sin alterar el comportamiento correcto del sistema.",
      "No se deben heredar clases para capar funcionalidades o lanzar excepciones de 'No Implementado' (Refused Bequest).",
      "Garantiza que la semántica y los contratos de la clase padre se respeten estrictamente en la jerarquía."
    ],
    hint: "Si parece un pato pero necesita pilas, tienes el tipo de objeto incorrecto."
  },
  isp: {
    title: "Principio de Segregación de Interfaces (ISP)",
    description: "Es preferible diseñar muchas interfaces específicas y delgadas a tener una sola interfaz gigantesca y monolítica, evitando obligar a los clientes a implementar métodos vacíos.",
    details: [
      "ISP (Interface Segregation Principle): Es mejor diseñar interfaces pequeñas y enfocadas que una sola interfaz gigantesca que obligue a los clientes a implementar métodos inútiles.",
      "Desacopla a los clientes de métodos del contrato que realmente no necesitan consumir.",
      "Fomenta el diseño de contratos cohesivos y modulares."
    ],
    hint: "Evita contratos gigantescos con firmas de métodos no utilizadas."
  },
  dip: {
    title: "Principio de Inversión de Dependencias (DIP)",
    description: "Los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender exclusivamente de abstracciones (interfaces), y las abstracciones no deben depender de los detalles.",
    details: [
      "DIP (Dependency Inversion Principle): Depender exclusivamente de abstracciones (interfaces) y nunca de implementaciones concretas.",
      "Diferencia con DI: DIP es el principio abstracto de diseño. DI (Inyección de Dependencias) es el patrón técnico que lo implementa.",
      "Permite desacoplar la lógica de negocio de la infraestructura física (bases de datos, red, librerías externas)."
    ],
    hint: "Abstracciones sobre implementaciones concretas."
  },

  // GRASP
  informationExpert: {
    title: "Experto en Información (Information Expert)",
    description: "Se debe asignar la responsabilidad de una acción o cálculo a aquella clase que posee la información necesaria para realizarla, manteniendo la encapsulación y centralizando el conocimiento.",
    details: [
      "Ayuda a mantener la encapsulación y reduce el acoplamiento.",
      "Fuerza a colocar la lógica junto a los datos que manipula.",
      "Ejemplo: El objeto Carrito debe tener la responsabilidad de calcular el total de la compra porque contiene la lista de items, y no un servicio de pago externo."
    ],
    hint: "¿Quién calcula el total del carrito? El carrito, no el procesador de pagos."
  },
  creator: {
    title: "Creador (Creator)",
    description: "Establece directrices para determinar qué clase debe ser la responsable de instanciar un nuevo objeto, delegando la creación a contenedores lógicos naturales.",
    details: [
      "La clase A debe crear a B si A contiene o agrega a B, A registra o usa estrechamente a B, o A tiene los datos para inicializar a B.",
      "Promueve el bajo acoplamiento al evitar que clases externas hagan 'new' directamente.",
      "Establece una jerarquía natural de control de ciclo de vida de los objetos."
    ],
    hint: "Asigna la creación al contenedor o agregador natural del objeto."
  },
  pureFabrication: {
    title: "Fabricación Pura (Pure Fabrication)",
    description: "Crear una clase altamente cohesiva que no represente un concepto real del dominio de negocio, sino que se diseñe exclusivamente para mantener el acoplamiento bajo y la cohesión alta.",
    details: [
      "Se aplica para evitar sobrecargar objetos del dominio con tareas de infraestructura (base de datos, logs, etc.).",
      "Mantiene el modelo de dominio libre de dependencias de sistemas externos.",
      "Ejemplos típicos: Exporters (PDFExporter), Loggers, manejadores de conexión a bases de datos."
    ],
    hint: "Concepto de software creado artificialmente para mantener el dominio limpio."
  },
  controller: {
    title: "Controlador (Controller)",
    description: "Es el primer objeto no gráfico, más allá de la capa de presentación, que recibe y coordina un mensaje del sistema externo hacia el dominio, actuando como manejador del caso de uso.",
    details: [
      "Separa la capa de presentación de la lógica interna.",
      "Evita colocar lógica de flujo de negocio directamente en los componentes gráficos de la interfaz.",
      "Delegado inicial de acciones de usuario a servicios del dominio."
    ],
    hint: "Mediador inicial entre el cliente o capa de presentación y el dominio."
  },
  protectedVariations: {
    title: "Variaciones Protegidas (Protected Variations)",
    description: "Identificar los puntos de inestabilidad o variación futura en el sistema y envolverlos con una interfaz estable, protegiendo al resto del sistema del impacto de cambios.",
    details: [
      "Protege a los clientes del impacto de cambios en elementos inestables o de terceros.",
      "Implementa flexibilidad ante requerimientos cambiantes.",
      "Concepto muy similar y relacionado con el principio Abierto/Cerrado (OCP)."
    ],
    hint: "Concepto similar al OCP pero enfocado en aislar la inestabilidad."
  },

  // SRE & RESILIENCIA
  circuitBreaker: {
    title: "Circuit Breaker (Patrón Cortocircuito)",
    description: "Patrón de resiliencia que evita llamadas a servicios externos caídos o lentos, fallando rápido localmente para liberar hilos y evitar saturaciones.",
    details: [
      "Estado Cerrado: Las peticiones fluyen normalmente hacia el servicio externo.",
      "Estado Abierto: Ante reiterados fallos o timeouts, el circuito se abre. Todas las peticiones fallan rápido localmente (fail-fast), liberando hilos de ejecución de inmediato.",
      "Estado Semi-abierto: Transcurrido un tiempo de enfriamiento, permite pasar unas pocas solicitudes de prueba para validar si el servicio externo se ha recuperado."
    ],
    hint: "Cortocircuita llamadas lentas o fallidas para liberar recursos."
  },
  sagaPattern: {
    title: "Saga Pattern (Saga Transaccional)",
    description: "Gestiona la consistencia eventual de transacciones de negocio distribuidas entre múltiples microservicios mediante secuencias locales y compensaciones.",
    details: [
      "Coreografía: Los servicios reaccionan asíncronamente a eventos de forma descentralizada sin un orquestador central.",
      "Orquestación: Un servicio central (Orquestador) mantiene el estado de la saga y comanda explícitamente a los demás qué pasos ejecutar.",
      "Transacción Compensatoria: Acción inversa (rollback lógico) ejecutada secuencialmente para anular los efectos de pasos completados si un paso posterior de la saga falla."
    ],
    hint: "Consistencia eventual mediante transacciones locales y reversas físicas ante fallos."
  },
  transactionalOutbox: {
    title: "Transactional Outbox Pattern",
    description: "Resuelve el problema de la atomicidad al guardar datos en la base de datos local y publicar eventos en un broker (Kafka/RabbitMQ) de forma confiable dentro de la misma transacción.",
    details: [
      "Paso 1: Dentro de la misma transacción ACID local, la aplicación escribe la entidad de negocio y el evento a transmitir en una tabla temporal auxiliar llamada OUTBOX.",
      "Paso 2: Un proceso independiente (Message Relay, CDC como Debezium o un polling worker) lee secuencialmente la tabla OUTBOX, publica los eventos en el Broker de mensajería, y tras recibir el ACK, elimina o marca el registro como procesado."
    ],
    hint: "Evita inconsistencias de red escribiendo en base de datos e inyectando cola en un solo paso ACID."
  },
  capTheorem: {
    title: "Teorema CAP (Teorema de Brewer)",
    description: "En un sistema distribuido que sufre una partición de red inevitable (P), se debe elegir de forma obligatoria entre Consistencia (C) o Disponibilidad (A).",
    details: [
      "Sistemas CP (Consistencia + Tolerancia a Particiones): Ante fallos de red, los nodos aislados rechazan peticiones de los usuarios para evitar entregar datos desactualizados o inconsistentes (ej. Sistemas bancarios).",
      "Sistemas AP (Disponibilidad + Tolerancia a Particiones): Los nodos aislados siguen respondiendo peticiones con la versión local de sus datos, asumiendo consistencia eventual (ej. Feeds de redes sociales)."
    ],
    hint: "No puedes tener C y A simultáneamente si hay fallos de comunicación en red."
  },
  stubVsMock: {
    title: "Doble de Prueba: Stub vs Mock",
    description: "Distinguir la forma y propósito de los dobles de prueba es crucial para evitar pruebas frágiles o mal diseñadas.",
    details: [
      "Stub (Doble Pasivo): Se utiliza para proveer respuestas fijas preconfiguradas que alimentan el flujo del componente bajo prueba. No verifica llamadas ni comportamiento.",
      "Mock (Doble Activo): Se enfoca en auditar y asertar la interacción. Valida si un método de la dependencia fue llamado, cuántas veces y con qué argumentos específicos."
    ],
    hint: "Stub alimenta el flujo del test; Mock audita las llamadas."
  },
  cleanArchitecture: {
    title: "Arquitectura Hexagonal (Puertos y Adaptadores)",
    description: "Patrón arquitectónico que desacopla el núcleo lógico de negocio (dominio) de los agentes externos e infraestructura (bases de datos, UI, transporte) a través de contratos específicos.",
    details: [
      "Núcleo / Dominio: Contiene las entidades y reglas de negocio puras, sin dependencias de frameworks ni librerías externas.",
      "Puertos (Interfaces): Contratos de entrada y salida definidos por el dominio para comunicarse con el exterior.",
      "Adaptadores: Implementaciones concretas de la infraestructura (ej. un repositorio SQL implementando un puerto de base de datos) que interactúan con el puerto."
    ],
    hint: "Desacopla la lógica de negocio pura de la tecnología y bases de datos a través de interfaces."
  },
  cqrs: {
    title: "CQRS (Command Query Responsibility Segregation)",
    description: "Separa de forma lógica u orgánica las operaciones que escriben o modifican datos (Comandos) de las operaciones que solo leen datos (Consultas).",
    details: [
      "Comandos (Commands): Representan intenciones de cambio de estado (crear, actualizar, eliminar). No retornan datos de negocio, solo éxito o error.",
      "Consultas (Queries): Recuperan información del sistema sin realizar ninguna mutación o efecto secundario.",
      "Optimización: Permite escalar la lectura independientemente de la escritura, incluso utilizando bases de datos diferentes optimizadas para cada rol (ej. PostgreSQL para comandos y Elasticsearch para consultas)."
    ],
    hint: "Rutas diferentes y modelos optimizados para escribir (Comandos) y leer (Consultas)."
  },
  bff: {
    title: "BFF (Backend-for-Frontend)",
    description: "Variante de API Gateway donde se crea un servicio intermedio específico para cada tipo de cliente (Web, Mobile, IoT) encargado de formatear, simplificar y consolidar los payloads de los microservicios.",
    details: [
      "Desacoplamiento: Evita que el cliente móvil tenga que hacer múltiples llamadas a distintos microservicios para armar una pantalla.",
      "Optimización de Red: Reduce la transferencia de datos enviando únicamente los campos específicos que el cliente en particular va a renderizar.",
      "Mantenimiento independiente: Los cambios en la interfaz móvil solo requieren alterar su BFF específico, reduciendo el acoplamiento con los microservicios core."
    ],
    hint: "Un microservicio API Gateway adaptado exclusivamente para las necesidades de un cliente específico."
  },
  ddd: {
    title: "Domain-Driven Design (DDD)",
    description: "Enfoque de desarrollo de software complejo centrado en el modelado del dominio de negocio, estrechamente alineado con expertos en la materia.",
    details: [
      "Lenguaje Ubicuo: Lenguaje común y formal utilizado de igual forma por desarrolladores y expertos del negocio en código y especificaciones.",
      "Bounded Context (Contexto Delimitado): Frontera conceptual donde un modelo de datos y sus términos tienen un significado único y consistente.",
      "Aggregate Root: Entidad padre que actúa como puerta de acceso para modificar cualquier elemento dentro de su frontera transaccional de negocio."
    ],
    hint: "Diseño centrado en el dominio de negocio usando un lenguaje unificado y límites contextuales claros."
  },
  lintersRust: {
    title: "Linters Modernos en Rust (Biome & Oxlint)",
    description: "Nueva generación de herramientas de desarrollo estático programadas en Rust que reemplazan a ESLint y Prettier, ejecutándose a velocidades hasta 100 veces mayores.",
    details: [
      "Rendimiento Extremo: Capaces de analizar y formatear millones de líneas de código en milisegundos, optimizando los tiempos del bucle de desarrollo local y de CI/CD.",
      "Configuración Unificada: Biome consolida formateo, linting y organización de importaciones en un único archivo de configuración simplificado.",
      "Sin dependencias Node: Al estar compilados a código nativo, no sufren del bloat ni sobrecarga de ejecución de Node.js."
    ],
    hint: "Herramientas de análisis de código ultra rápidas programadas en Rust que unifican linting y formateo."
  },
  gitHooks: {
    title: "Husky & Lint-Staged",
    description: "Automatización de disparadores Git (Git Hooks) en el entorno de desarrollo para validar que el código cumpla con los estándares antes de permitir un commit o push.",
    details: [
      "Husky: Facilita la configuración y compartición de hooks de Git de forma nativa e integrada en el package.json de Node.",
      "Lint-Staged: Ejecuta linters y pruebas únicamente sobre los archivos que están en el área de preparación (staged) en lugar de todo el proyecto, ahorrando tiempo.",
      "Garantía de Calidad: Evita que código con errores de compilación, fallos de formato o commits que rompan las convenciones lleguen al repositorio remoto."
    ],
    hint: "Bloquea localmente commits y pushes que no pasen el formato o los tests mínimos."
  },
  localCicd: {
    title: "Local CI/CD con Act",
    description: "Herramienta que permite ejecutar pipelines de GitHub Actions de forma local dentro de contenedores de Docker, acelerando la depuración del flujo de integración continua.",
    details: [
      "Ciclo de Feedback Rápido: Permite probar cambios en los workflows de CI/CD instantáneamente en la terminal sin tener que hacer push al repositorio remoto.",
      "Simulación Fiel: Usa imágenes Docker idénticas a las que utiliza GitHub Actions en la nube para asegurar el comportamiento correcto de variables y dependencias.",
      "Ahorro de Cómputo: Evita consumir minutos de cómputo del plan de la plataforma en la nube durante etapas de desarrollo y pruebas del pipeline."
    ],
    hint: "Prueba y corre tus workflows de GitHub Actions de forma local en Docker antes de subirlos."
  },
  gitOps: {
    title: "GitOps (ArgoCD / FluxCD)",
    description: "Práctica de DevOps para CD (Despliegue Continuo) donde Git actúa como la única fuente de verdad para el estado deseado de la infraestructura declarativa.",
    details: [
      "Estado Deseado Declarativo: La infraestructura y configuraciones de Kubernetes se definen en repositorios Git como código yaml.",
      "Reconciliación Activa: Un agente (ej. ArgoCD) dentro del clúster compara constantemente el estado en Git con el estado vivo del clúster.",
      "Autocuración (Self-healing): Si se altera un recurso manualmente en el clúster (desviación de configuración), el controlador GitOps sobrescribe los cambios para restaurar lo definido en Git."
    ],
    hint: "Git es la fuente de verdad: el clúster se auto-sincroniza con los archivos del repositorio."
  },
  openTelemetry: {
    title: "Observabilidad de 3 Pilares (OpenTelemetry)",
    description: "Estándar de la Cloud Native Computing Foundation (CNCF) para recolectar, procesar y exportar telemetría de sistemas distribuidos sin acoplarse a vendors de APM específicos.",
    details: [
      "Métricas: Datos cuantitativos agregados (ej. uso de CPU, tasa de errores HTTP) para entender el comportamiento general del sistema en el tiempo.",
      "Trazas (Traces): Permiten seguir el flujo de una petición a través de múltiples microservicios distribuidos mediante identificadores de correlación.",
      "Logs: Registros textuales estructurados con contexto temporal e identificadores asociados a la traza actual para depurar fallos específicos."
    ],
    hint: "Instrumentación unificada de Métricas, Trazas y Logs para diagnosticar sistemas distribuidos."
  },
  canaryIstio: {
    title: "Despliegues Canary con Service Mesh (Istio)",
    description: "Estrategia avanzada de despliegue de software que consiste en rutear progresivamente una fracción mínima de tráfico real de red hacia la nueva versión del servicio.",
    details: [
      "Service Mesh (Malla de Servicios): Istio intercepta y administra el tráfico de red entre microservicios utilizando proxies sidecar (Envoy).",
      "Control de Tráfico Fino: Permite dividir el tráfico de forma precisa (ej. enviar 98% a V1 y 2% a V2) mediante Custom Resources como VirtualServices.",
      "Monitoreo Canary: Si la V2 presenta errores o latencias elevadas en el 2% de tráfico, se revierte el ruteo a V1 automáticamente sin afectar a la masa crítica de usuarios."
    ],
    hint: "Enrutamiento inteligente de tráfico progresivo (ej. 5%, 20%, 100%) hacia la nueva versión de un servicio."
  },
  distroless: {
    title: "Contenedores Seguros Distroless",
    description: "Imágenes de contenedor mínimas de producción que contienen exclusivamente la aplicación y su runtime de ejecución (ej. node o jre), eliminando sistemas de archivos completos, gestores de paquetes y shells.",
    details: [
      "Reducción de Superficie de Ataque: Al no contar con terminales (bash, sh) ni utilidades de red (curl, wget), se neutralizan la mayoría de los vectores de explotación de vulnerabilidades.",
      "Imágenes Livianas: Reducen el tamaño del contenedor a lo indispensable, acelerando los tiempos de descarga y despliegue en la nube.",
      "Cumplimiento y Auditoría: Facilitan la aprobación de escaneos de seguridad estáticos en pipelines (Trivy, Grype) al carecer de dependencias de sistema operativo obsoletas."
    ],
    hint: "Imágenes de Docker mínimas sin shell, sin gestores de paquetes, reduciendo vulnerabilidades."
  },
  trunkBased: {
    title: "Trunk-Based Development",
    description: "Patrón de branching en Git que prioriza la integración frecuente de cambios pequeños directamente en una rama única principal ('trunk' o main), evitando ramas de características de larga duración.",
    details: [
      "Integración Continua Real: Los desarrolladores integran sus cambios varias veces al día. Reduce drásticamente los conflictos de merge masivos ('merge hell').",
      "Feature Flags: Permite integrar código incompleto a producción desactivando la funcionalidad en tiempo de ejecución hasta que esté lista para su lanzamiento.",
      "Velocidad de Entrega: Acelera la entrega de valor y es clave para habilitar pipelines de despliegue continuo de alto rendimiento."
    ],
    hint: "Integraciones cortas directas a la rama principal apoyadas por feature flags."
  },
  stackVsHeap: {
    title: "Memoria Stack vs Heap (La Pila y El Montón)",
    description: "Dos áreas de memoria RAM asignadas a un proceso por el sistema operativo, diferenciándose en velocidad, tamaño, estructuración y control del ciclo de vida de los datos.",
    details: [
      "La Pila (Stack): Estructura LIFO (Last In First Out) ultra rápida gestionada por la CPU para guardar variables locales de tipo primitivo y punteros de referencia a objetos.",
      "El Montón (Heap): Zona de memoria dinámica y de gran tamaño utilizada para almacenar objetos complejos. Su ciclo de vida es dinámico y requiere liberación (Garbage Collector en lenguajes modernos).",
      "Ciclo de vida: Al finalizar la función, el frame de la Pila se destruye al instante. Los objetos del Heap permanecen hasta que el Garbage Collector los recolecta."
    ],
    hint: "Pila es LIFO y rápida para variables locales; Montón es dinámico y grande para objetos instanciados."
  }
};
