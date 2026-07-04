export interface Question {
  id: number;
  topic: string;
  question: string;
  answers: string[];
  correctIndex: number;
  feedback: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  questions: Question[];
}

export const modulo1Questions: Question[] = [
  {
    id: 1,
    topic: "SOLID - DIP",
    question: "En el diseño orientado a objetos, ¿qué principio SOLID defiende que las clases dependan de interfaces o contratos y no de implementaciones concretas?",
    answers: [
      "Principio de Responsabilidad Única (SRP).",
      "Principio de Inversión de Dependencias (DIP).",
      "Principio de Segregación de Interfaces (ISP).",
      "Principio Open/Closed (OCP)."
    ],
    correctIndex: 1,
    feedback: "El principio de Inversión de Dependencias (DIP) estipula que las capas de negocio de alto nivel jamás deben depender de implementaciones de infraestructura (bajo nivel). Ambos deben depender de abstracciones lógicas."
  },
  {
    id: 2,
    topic: "SOLID - LSP",
    question: "Si una clase heredada lanza una excepción del tipo 'UnsupportedOperationException' para deshabilitar un método heredado de su clase base, ¿qué principio se está vulnerando directamente?",
    answers: [
      "Single Responsibility Principle (SRP).",
      "Principio de Sustitución de Liskov (LSP).",
      "Principio de Segregación de Interfaces (ISP).",
      "Interface Inversion Principle (IIP)."
    ],
    correctIndex: 1,
    feedback: "Liskov (LSP) exige que cualquier subclase pueda usarse indistintamente en lugar de su clase base sin romper el comportamiento esperado ni el contrato preestablecido."
  },
  {
    id: 3,
    topic: "Testing - Mocks vs Stubs",
    question: "¿Cuál es la diferencia primordial en el comportamiento entre un Mock y un Stub dentro de una suite de testing automatizada?",
    answers: [
      "El Stub lee datos desde bases de datos físicas y el Mock consume datos de archivos planos.",
      "El Stub es un doble pasivo que retorna estado simulado; el Mock es un doble activo diseñado para asertar e inspeccionar llamadas y comportamientos lógicos.",
      "No hay diferencias; son dos palabras que representan exactamente el mismo concepto en la industria.",
      "Los Stubs solo corren en servidores Apache Tomcat y los Mocks son para NodeJS."
    ],
    correctIndex: 1,
    feedback: "El Stub se usa de forma estática para alimentar de datos el flujo del test unitario, mientras que el Mock se enfoca en auditar y asertar de forma activa las llamadas internas."
  },
  {
    id: 4,
    topic: "Design Patterns - Factory",
    question: "¿Qué patrón de diseño creacional delega la responsabilidad de instanciar un tipo de producto específico a sus correspondientes subclases fábricas?",
    answers: [
      "Singleton Pattern.",
      "Factory Method Pattern.",
      "Facade Pattern.",
      "Strategy Pattern."
    ],
    correctIndex: 1,
    feedback: "Factory Method oculta la complejidad del instanciado delegando en métodos o clases fábricas concretas la creación del objeto según el parámetro."
  },
  {
    id: 5,
    topic: "Design Patterns - Decorator",
    question: "El patrón estructural 'Decorator' representa una alternativa altamente flexible y elástica frente a qué práctica rígida de POO?",
    answers: [
      "La Inyección de Dependencias.",
      "La herencia de clases estricta en tiempo de compilación.",
      "El Polimorfismo parametrizado.",
      "El desacoplamiento por interfaces."
    ],
    correctIndex: 1,
    feedback: "En lugar de extender clases mediante herencia de forma estática, Decorator te permite envolver clases para adherir nuevos comportamientos dinámicamente en tiempo de ejecución."
  },
  {
    id: 6,
    topic: "GRASP - Information Expert",
    question: "Según los principios GRASP, ¿qué directriz se enfoca en asignar responsabilidades lógicas a la clase que posee la información necesaria para realizar la acción?",
    answers: [
      "Creador (Creator).",
      "Experto en Información (Information Expert).",
      "Fabricación Pura (Pure Fabrication).",
      "Controlador (Controller)."
    ],
    correctIndex: 1,
    feedback: "El Experto en Información minimiza el acoplamiento distribuyendo responsabilidades en las entidades legítimas que controlan y conocen sus propios datos de negocio."
  },
  {
    id: 7,
    topic: "Design Patterns - Adapter",
    question: "El patrón de diseño estructural 'Adapter' se implementa primordialmente con el fin de:",
    answers: [
      "Monitorear las conexiones activas a base de datos en hilos secundarios.",
      "Traducir y mediar entre interfaces lógicas totalmente incompatibles para permitir que colaboren sin modificar las clases originales.",
      "Garantizar que una clase posea únicamente un punto de acceso estático global.",
      "Cifrar y compilar paquetes de datos binarios transmitidos por sockets TCP."
    ],
    correctIndex: 1,
    feedback: "El Adapter actúa como un traductor entre dos clases incapaces de comunicarse por diferencias en sus firmas técnicas o tipos de datos."
  },
  {
    id: 8,
    topic: "Code Smells - Feature Envy",
    question: "¿Qué olor de código (Code Smell) se asocia directamente a un método que depende de forma excesiva de los getters y datos internos de una clase ajena?",
    answers: [
      "Primitive Obsession.",
      "Feature Envy (Envidia de Funciones).",
      "Large Class.",
      "Lazy Class."
    ],
    correctIndex: 1,
    feedback: "Feature Envy ocurre cuando un método codicia la información de clases vecinas. La solución de refactorización típica es mover la función ('Move Method') a su verdadera clase."
  },
  {
    id: 9,
    topic: "TDD",
    question: "El flujo y ciclo de desarrollo iterativo TDD (Test-Driven Development) sigue el orden estricto de pasos denominado:",
    answers: [
      "Compilar -> Testear -> Desplegar.",
      "Escribir Código -> Escribir Test -> Modificar firmas.",
      "RED (Test que falla) -> GREEN (Código mínimo para que pase) -> REFACTOR (Optimizar el diseño).",
      "Mockear dependencias -> Guardar DB -> Confirmar merge."
    ],
    correctIndex: 2,
    feedback: "El flujo clásico 'Red, Green, Refactor' asegura que el software nazca con cobertura nativa de pruebas y sea inmune a roturas durante procesos de optimización del código."
  },
  {
    id: 10,
    topic: "Design Patterns - Observer",
    question: "El patrón de comportamiento 'Observer' establece un vínculo lógico de dependencias entre componentes caracterizado como:",
    answers: [
      "Relación de uno a uno de forma bidireccional.",
      "Relación uno a muchos, de modo que cuando el publicador principal cambia de estado, se notifican todos los observadores.",
      "Instanciación asincrónica en un pool de hilos locales.",
      "Composición física inmutable de clases hijas."
    ],
    correctIndex: 1,
    feedback: "Observer se implementa para desacoplar flujos de eventos. Permite que múltiples observadores independientes escuchen actualizaciones de estado de un sujeto central sin acoplar el código."
  },
  {
    id: 11,
    topic: "GRASP - Pure Fabrication",
    question: "Crear una clase 'PDFExporter' o 'ExcelExporter' representa una implementación directa de qué principio de asignación GRASP?",
    answers: [
      "Experto en Información.",
      "Fabricación Pura (Pure Fabrication).",
      "Indirección.",
      "Controlador."
    ],
    correctIndex: 1,
    feedback: "Al no pertenecer lógicamente al negocio real (un Cliente o un Pedido no tienen por qué saber cómo codificar binarios PDF), la Fabricación Pura inventa una clase cohesiva auxiliar exclusiva para el exportado."
  },
  {
    id: 12,
    topic: "SOLID - OCP",
    question: "El principio 'Open/Closed' (OCP) de SOLID indica conceptualmente que las entidades de software deben estructurarse de modo que queden:",
    answers: [
      "Abiertas al público en la nube y cerradas bajo protocolos JWT.",
      "Abiertas para su extensión mediante polimorfismo, pero estrictamente cerradas para su modificación directa.",
      "Abiertas al testing unitario de caja blanca pero cerradas a pruebas de integración.",
      "Abiertas a bases de datos relacionales pero cerradas a NoSQL."
    ],
    correctIndex: 1,
    feedback: "OCP busca evitar riesgos de regresión (romper código que ya funcionaba) obligándote a extender clases o heredar contratos en lugar de editar los archivos originales de lógica."
  },
  {
    id: 13,
    topic: "Design Patterns - Facade",
    question: "El patrón estructural clásico que oculta la altísima complejidad de un subsistema proveyendo una interfaz simplificada y amigable al cliente se denomina:",
    answers: [
      "Proxy Pattern.",
      "Facade Pattern (Fachada).",
      "Decorator Pattern.",
      "Bridge Pattern."
    ],
    correctIndex: 1,
    feedback: "Facade actúa como un punto de entrada sencillo que asocia y orquesta múltiples subsistemas técnicos, aislando la complejidad técnica pesada de la vista del cliente."
  },
  {
    id: 14,
    topic: "Design Patterns - Strategy",
    question: "El patrón de diseño 'Strategy' se engloba dentro de qué categoría de la clasificación de Gang of Four (GoF)?",
    answers: [
      "Patrones Creacionales.",
      "Patrones Estructurales.",
      "Patrones de Comportamiento.",
      "Patrones de Arquitectura de Red."
    ],
    correctIndex: 2,
    feedback: "Al encargarse de encapsular y alternar de forma interactiva diferentes algoritmos y flujos en tiempo de ejecución, Strategy clasifica netamente como patrón de Comportamiento."
  },
  {
    id: 15,
    topic: "Design Patterns - Singleton Concurrente",
    question: "El mecanismo de optimización del rendimiento multihilo denominado 'Double-Checked Locking' es una técnica ampliamente utilizada al codificar qué patrón?",
    answers: [
      "Factory Method.",
      "Singleton Pattern.",
      "Proxy Pattern.",
      "Adapter Pattern."
    ],
    correctIndex: 1,
    feedback: "En entornos concurrentes, Double-Checked Locking garantiza la inicialización segura (Thread-Safe) del Singleton controlando que solo el primer hilo instancie la variable bloqueando el recurso."
  },
  {
    id: 16,
    topic: "Branching - Trunk-Based Development",
    question: "¿Cuál es la principal ventaja de aplicar el flujo de ramificación 'Trunk-Based Development' frente a 'Git Flow' en un equipo ágil de alto rendimiento?",
    answers: [
      "Facilita la segregación de accesos de infraestructura limitando el acceso de los desarrolladores a producción.",
      "Promueve la integración continua real al fusionar cambios pequeños varias veces al día directamente en 'main', eliminando los largos periodos de integración y 'merge hells'.",
      "Permite prescindir completamente del uso de pruebas unitarias locales.",
      "Garantiza que no sea necesario contar con entornos de staging o prueba antes de lanzar."
    ],
    correctIndex: 1,
    feedback: "Trunk-Based Development acelera la entrega de valor al integrar cambios pequeños en una sola rama común, reduciendo la fricción de merges gigantes típicos de ramas de características de larga duración."
  },
  {
    id: 17,
    topic: "Clean Code - Boy Scout Rule",
    question: "¿Qué indica la conocida 'Boy Scout Rule' aplicada en el código de producción?",
    answers: [
      "Que no debes tocar el código de tus compañeros bajo ninguna circunstancia.",
      "Que los programadores más jóvenes deben dedicarse a documentar código en vez de programar lógica.",
      "Que debes dejar el archivo que estás modificando en un estado ligeramente más limpio y ordenado de como lo encontraste, reduciendo de forma continua la deuda técnica.",
      "Que cada archivo de código de negocio debe contener al menos 1000 líneas para ser considerado profesional."
    ],
    correctIndex: 2,
    feedback: "La regla de los Boy Scouts ('deja el campamento más limpio de como lo encontraste') ayuda a prevenir la acumulación de código spaguetti o deuda técnica a través de pequeñas mejoras incrementales."
  },
  {
    id: 18,
    topic: "Dependency Injection Best Practices",
    question: "En entornos profesionales como Spring Boot (Java), ¿por qué se desaconseja el uso de la inyección directa sobre campos (ej. colocar `@Autowired` sobre el atributo) y se promueve la inyección por constructor?",
    answers: [
      "Porque la inyección directa sobre campos está deprecada y no compila a partir de Java 17.",
      "Porque la inyección por constructor facilita el testeo unitario permitiendo pasar stubs/mocks manualmente, asegura la inmutabilidad mediante el uso de 'final' y previene referencias nulas en el arranque.",
      "Porque la inyección por constructor reduce el uso de memoria RAM en el clúster productivo.",
      "Porque el constructor hace que el bytecode sea compatible con frameworks de NodeJS."
    ],
    correctIndex: 1,
    feedback: "La inyección por constructor obliga a declarar las dependencias de forma explícita, facilitando la instanciación directa del componente en tests unitarios sin levantar un contexto pesado de framework."
  },
  {
    id: 19,
    topic: "Software Engineering - Conventional Commits",
    question: "¿Cuál es el propósito principal de seguir el estándar de Conventional Commits (ej. 'feat(auth): add login validation')?",
    answers: [
      "Bloquear la ejecución de tests automatizados si no se incluye el ticket de Jira.",
      "Que las herramientas automatizadas y pipelines puedan parsear el historial de git para generar automáticamente notas de lanzamiento (changelogs) e incrementos de versión semántica de forma confiable.",
      "Verificar que el autor del commit posea la firma digital PGP autorizada.",
      "Evitar que Git guarde el historial completo reduciendo el espacio en disco del repositorio."
    ],
    correctIndex: 1,
    feedback: "Conventional Commits provee una estructura predecible que permite a los pipelines de CI/CD determinar automáticamente la severidad del cambio y automatizar los releases semánticos."
  },
  {
    id: 20,
    topic: "Software Engineering - Code Reviews",
    question: "En un equipo de ingeniería maduro, ¿cuál debe ser el enfoque primordial de las revisiones de código (Code Reviews)?",
    answers: [
      "Encontrar errores de formato tipográficos y de espaciados, que deben ser la máxima prioridad del revisor humano.",
      "Fomentar la competencia sana determinando qué desarrollador comete menos fallos en el mes.",
      "Centrarse en aspectos arquitectónicos, legibilidad, modularidad y compartir conocimientos técnicos colectivos, dejando el control de formato y sintaxis a linters automatizados en el pipeline.",
      "Validar que el programador haya ejecutado el código al menos 100 veces de forma manual."
    ],
    correctIndex: 2,
    feedback: "El Code Review humano de alto valor evalúa las decisiones de diseño del software, la mantenibilidad y la semántica, mientras que la automatización se encarga del formato estático."
  },
  {
    id: 21,
    topic: "Memory Management - Stack Overflow",
    question: "¿Qué error crítico se produce de forma típica en la ejecución de un programa si la memoria Stack (Pila) se llena por completo, por ejemplo, mediante una llamada recursiva infinita?",
    answers: [
      "OutOfMemoryError (OOM).",
      "StackOverflowError.",
      "NullPointerException.",
      "MemoryLeakException."
    ],
    correctIndex: 1,
    feedback: "La Pila es pequeña y tiene un tamaño fijo definido por hilo. Si una función se llama a sí misma infinitamente, acumula frames en la pila hasta llenarla, disparando un StackOverflowError."
  },
  {
    id: 22,
    topic: "Memory Management - Stack vs Heap",
    question: "Al ejecutar la línea 'Cliente cliente = new Cliente();' en un lenguaje como Java, ¿cómo se distribuye la asignación de memoria RAM entre Stack y Heap?",
    answers: [
      "Tanto la variable 'cliente' como el objeto físico 'new Cliente()' se guardan en el Stack.",
      "El objeto físico 'new Cliente()' y sus atributos se crean en el Heap (Montón), mientras que la variable local 'cliente' (puntero/referencia) se guarda en el Stack (Pila).",
      "El objeto físico se almacena en el Stack y su puntero temporal se inyecta en el Heap.",
      "La memoria se asigna únicamente en el Stack ya que 'cliente' es una variable local."
    ],
    correctIndex: 1,
    feedback: "La instanciación con 'new' asigna memoria dinámica para el objeto en el Heap. La variable local del método que contiene la dirección de memoria de dicho objeto es una simple referencia guardada en el Stack."
  }
];

export const modulo2Questions: Question[] = [
  {
    id: 1,
    topic: "Microservices Integration",
    question: "En el contexto de microservicios, ¿cuál es la principal ventaja de utilizar el patrón API Gateway?",
    answers: [
      "Elimina la necesidad de utilizar bases de datos relacionales en el backend.",
      "Centraliza preocupaciones transversales (cross-cutting concerns) como autenticación, limitación de tasa (rate limiting) y enrutamiento, ocultando la topología interna al cliente.",
      "Convierte automáticamente solicitudes HTTP sincrónicas en eventos asincrónicos de Kafka.",
      "Garantiza transacciones ACID distribuidas entre todos los microservicios subyacentes."
    ],
    correctIndex: 1,
    feedback: "El API Gateway actúa como una fachada que centraliza la seguridad, el ruteo y la agregación de datos, evitando que los clientes frontend conozcan las IPs o estructuras de los microservicios internos."
  },
  {
    id: 2,
    topic: "Distributed Banking Architecture",
    question: "Se requiere diseñar un sistema bancario distribuido donde la consistencia absoluta de los saldos no puede bloquear el sistema de reportes de alta demanda. ¿Qué patrón arquitectónico es el más adecuado?",
    answers: [
      "Patrón Singleton distribuido.",
      "CQRS (Command Query Responsibility Segregation) separando la base de datos de escritura (saldos) de las vistas de lectura optimizadas (reportes).",
      "Two-Phase Commit (2PC) bloqueando las tablas de ambas bases de datos al mismo tiempo.",
      "Monolito modular compartiendo un único esquema de base de datos en memoria."
    ],
    correctIndex: 1,
    feedback: "CQRS permite separar físicamente el modelo y base de datos donde se hacen los comandos (escrituras) de donde se hacen las consultas (lecturas), permitiendo escalar el sistema de reportes independientemente."
  },
  {
    id: 3,
    topic: "Teorema CAP",
    question: "Según el Teorema CAP, en un sistema distribuido que sufre una partición de red (Network Partition - P), se debe elegir entre:",
    answers: [
      "Caché (Cache) o Rendimiento (Performance).",
      "Consistencia (Consistency) o Disponibilidad (Availability).",
      "Concurrencia (Concurrency) o Persistencia (Persistence).",
      "Acoplamiento (Coupling) o Cohesión (Cohesion)."
    ],
    correctIndex: 1,
    feedback: "El teorema CAP (Brewer) establece que ante una caída de red (Partición), debés elegir si el sistema sigue respondiendo pero con datos potencialmente desactualizados (Disponibilidad), o si rechaza peticiones para garantizar que nadie lea un dato falso (Consistencia)."
  },
  {
    id: 4,
    topic: "Event-Driven & Kafka",
    question: "En una arquitectura Event-Driven utilizando Apache Kafka, ¿qué es y para qué sirve una Dead Letter Queue (DLQ)?",
    answers: [
      "Es una cola secundaria en memoria RAM para consumir eventos más rápido.",
      "Es un tópico o cola especial donde se envían los mensajes que no pudieron ser procesados con éxito tras varios reintentos, para su posterior análisis o reprocesamiento manual.",
      "Es un patrón de seguridad que borra los eventos inyectados con SQL Injection.",
      "Es el log maestro donde Kafka guarda absolutamente todos los eventos saludables del sistema."
    ],
    correctIndex: 1,
    feedback: "La DLQ (Cola de Mensajes Muertos) actúa como un 'tacho de basura inteligente'. Aísla los mensajes 'envenenados' que causan excepciones en el consumidor para no bloquear el procesamiento del resto de la cola."
  },
  {
    id: 5,
    topic: "Caché Distribuido",
    question: "Usted debe diseñar la arquitectura para el pico de tráfico de un e-commerce durante el CyberMonday. Para aliviar la carga de lectura en la base de datos SQL principal, la mejor estrategia es:",
    answers: [
      "Implementar escalabilidad vertical agregando discos HDD.",
      "Implementar un clúster de caché distribuido en memoria (como Redis o Memcached) aplicando el patrón Cache-Aside.",
      "Convertir toda la base de datos SQL a un archivo CSV plano y leerlo desde el servidor Node.js.",
      "Crear un Circuit Breaker que apague la base de datos durante el pico de tráfico."
    ],
    correctIndex: 1,
    feedback: "El patrón Cache-Aside busca primero el dato en la memoria RAM hiper-rápida (Redis). Si no está (Cache Miss), va a la DB, lo guarda en Redis y lo devuelve, absorbiendo el 90% del impacto de lectura."
  },
  {
    id: 6,
    topic: "Saga Pattern Orchestration",
    question: "¿Cuál es la principal diferencia entre el patrón Saga implementado mediante 'Coreografía' vs 'Orquestación'?",
    answers: [
      "La orquestación es sincrónica (REST) y la coreografía es exclusiva de gRPC.",
      "En la coreografía los servicios publican y reaccionan a eventos de forma descentralizada; en la orquestación, un microservicio central (Orquestador) comanda explícitamente a los demás qué hacer.",
      "La coreografía requiere bases de datos SQL y la orquestación bases de datos NoSQL MongoDB.",
      "No hay diferencia, son dos términos para el mismo patrón transaccional."
    ],
    correctIndex: 1,
    feedback: "En la coreografía, los servicios bailan solos escuchando eventos (descentralizado). En la orquestación, hay un 'Director de orquesta' (un servicio controlador central) que mantiene el estado de la saga y lanza los comandos."
  },
  {
    id: 7,
    topic: "Modernización de Sistemas",
    question: "Al aplicar el patrón Strangler Fig (Higuera Estranguladora) para migrar un sistema Legacy monolítico hacia microservicios, el enfoque principal es:",
    answers: [
      "Apagar el sistema Legacy el viernes y encender los microservicios nuevos el lunes (Big Bang Rewrite).",
      "Interceptar las llamadas en el borde del sistema (ej. mediante un API Gateway) y redirigir gradualmente el tráfico de las funcionalidades modernizadas a los nuevos microservicios, estrangulando lentamente al legado.",
      "Crear una base de datos distribuida y forzar al monolito a usar GraphQL.",
      "Borrar el código fuente original del monolito rama por rama en Git."
    ],
    correctIndex: 1,
    feedback: "Es el patrón de modernización más seguro. El Facade/Gateway enruta endpoints específicos a los microservicios nuevos, mientras el resto sigue cayendo en el monolito, reemplazándolo módulo por módulo de forma segura."
  },
  {
    id: 8,
    topic: "Bases de Datos NoSQL",
    question: "Si su sistema necesita una alta disponibilidad, tiempos de respuesta de lectura ultra bajos y una estructura de datos flexible (sin esquemas rígidos), ¿qué tipo de base de datos es la elección arquitectónica más natural?",
    answers: [
      "Base de datos Relacional (RDBMS) fuertemente normalizada (ej. PostgreSQL).",
      "Base de datos orientada a Grafos (ej. Neo4j).",
      "Base de datos NoSQL orientada a Documentos o Clave-Valor (ej. MongoDB, DynamoDB).",
      "Archivos XML locales guardados en cada contenedor Docker."
    ],
    correctIndex: 2,
    feedback: "Las bases NoSQL están diseñadas para escalar horizontalmente de forma masiva, flexibilizar esquemas (JSON) y priorizar la velocidad y disponibilidad (BASE) por sobre la consistencia transaccional estricta (ACID)."
  },
  {
    id: 9,
    topic: "Event Sourcing",
    question: "El patrón 'Event Sourcing' dicta que:",
    answers: [
      "Se deben enviar notificaciones push a los celulares de los usuarios ante cada click.",
      "El estado de las entidades del sistema no se almacena como una foto final en la base de datos, sino como una secuencia inmutable de eventos que, al ser reproducidos (re-played), determinan el estado actual.",
      "El código fuente debe descargarse desde repositorios públicos mediante eventos HTTP.",
      "Los eventos solo pueden ser procesados si el cliente mantiene la conexión abierta mediante WebSockets."
    ],
    correctIndex: 1,
    feedback: "Es como el registro contable de un banco: no se borran errores (updates destructivos), se agrega una nueva transacción que anula la anterior. Permite tener auditoría total y reconstruir el estado en cualquier punto temporal."
  },
  {
    id: 10,
    topic: "Cloud Scaling",
    question: "En arquitecturas Cloud, el término 'Escalabilidad Horizontal' se refiere a:",
    answers: [
      "Añadir más memoria RAM, CPU o discos SSD a un servidor ya existente.",
      "Añadir más nodos, servidores físicos o instancias (pods) al balanceador de carga para distribuir el tráfico.",
      "Refactorizar el código para que las clases sean más cortas horizontalmente.",
      "Replicar la base de datos en zonas geográficas (continentes) diferentes para backups fríos."
    ],
    correctIndex: 1,
    feedback: "Horizontal (Scale Out/In) es agregar o quitar máquinas (instancias) manejadas por un Load Balancer. Vertical (Scale Up/Down) es inyectarle esteroides (RAM/CPU) a una sola máquina."
  },
  {
    id: 11,
    topic: "Tolerancia a fallas",
    question: "Si un microservicio externo responde pero con latencias intermitentes extremas (más de 30 segundos), y esto está agotando el pool de hilos de nuestro servicio local, el patrón de protección arquitectónica requerido es:",
    answers: [
      "Retry (Reintentos infinitos).",
      "Circuit Breaker configurado con un umbral de Timeout.",
      "Orquestación de Sagas.",
      "Load Balancing de Capa 4."
    ],
    correctIndex: 1,
    feedback: "Los timeouts lentos son los peores enemigos porque bloquean recursos (hilos, memoria). El Circuit Breaker detecta estos timeouts, se 'abre', y hace que las siguientes peticiones fallen rápido localmente liberando la CPU."
  },
  {
    id: 12,
    topic: "Rate Limiting Algorithms",
    question: "El algoritmo de 'Token Bucket' es una de las implementaciones más comunes para resolver arquitecturas de:",
    answers: [
      "Autenticación mediante JWT.",
      "Rate Limiting o Throttling.",
      "Descubrimiento de Servicios (Service Discovery).",
      "Balanceo de Carga por Round-Robin."
    ],
    correctIndex: 1,
    feedback: "El Token Bucket recarga 'fichas' a una tasa constante. Cada petición consume una ficha. Si el balde (bucket) se vacía, se retorna HTTP 429 (Too Many Requests). Es excelente porque permite ráfagas de tráfico controladas."
  },
  {
    id: 13,
    topic: "Architecture - Hexagonal Architecture",
    question: "En la Arquitectura Hexagonal (Puertos y Adaptadores), ¿cuál es la responsabilidad de un 'Adaptador de Salida' (Output Adapter)?",
    answers: [
      "Definir el caso de uso y las reglas de negocio principales.",
      "Implementar un contrato/interfaz (puerto de salida) provisto por el dominio para interactuar con un servicio o tecnología externa, como una base de datos SQL o cliente de API.",
      "Recibir la petición HTTP del usuario final y validar los esquemas JSON.",
      "Modelar las entidades y Value Objects del núcleo del negocio."
    ],
    correctIndex: 1,
    feedback: "Los puertos son las interfaces definidas por el dominio para aislarse tecnológicamente. Los adaptadores de salida implementan esas interfaces usando tecnologías físicas de infraestructura externas."
  },
  {
    id: 14,
    topic: "Architecture - CQRS",
    question: "Al implementar el patrón CQRS (Command Query Responsibility Segregation), ¿qué beneficio fundamental se busca al separar Comandos de Consultas?",
    answers: [
      "Evitar escribir tests de integración para las capas de persistencia.",
      "Optimizar y escalar las operaciones de lectura (Consultas) independientemente de las de escritura (Comandos), permitiendo usar bases de datos especializadas para cada función.",
      "Garantizar que todas las operaciones se realicen dentro de una única transacción ACID síncrona global.",
      "Eliminar el uso de APIs REST utilizando únicamente colas de mensajería asíncronas."
    ],
    correctIndex: 1,
    feedback: "CQRS reconoce que en la mayoría de los sistemas la lectura de datos es mucho más frecuente que la escritura, permitiendo crear modelos y almacenes optimizados exclusivamente para consultar datos de forma masiva."
  },
  {
    id: 15,
    topic: "Architecture - BFF (Backend-for-Frontend)",
    question: "¿En qué escenario es altamente recomendado implementar el patrón Backend-for-Frontend (BFF)?",
    answers: [
      "Cuando tenemos una única base de datos relacional compartida por múltiples servidores locales.",
      "Cuando nuestra aplicación interactúa con múltiples clientes específicos (ej. una App móvil, una web de escritorio) con requisitos de datos y pantallas drásticamente diferentes, evitando llamadas redundantes.",
      "Cuando queremos eliminar la capa de backend conectando la interfaz móvil directamente a la base de datos.",
      "Cuando el equipo de DevOps requiere configurar balanceadores de carga a nivel de capa de red física."
    ],
    correctIndex: 1,
    feedback: "Un BFF actúa como un intermediario a medida de la pantalla o cliente. Consolida múltiples peticiones a microservicios core en un solo payload optimizado para la red móvil o web."
  },
  {
    id: 16,
    topic: "Architecture - Domain-Driven Design (DDD)",
    question: "En Domain-Driven Design (DDD), ¿cuál es el propósito de definir un 'Bounded Context' (Contexto Delimitado)?",
    answers: [
      "Limitar la cantidad de memoria RAM que puede consumir un microservicio en el clúster.",
      "Establecer una frontera conceptual explícita donde un modelo lógico y sus términos de negocio (Lenguaje Ubicuo) tienen un único significado claro y consistente.",
      "Configurar redes privadas virtuales (VPCs) para restringir el tráfico HTTP.",
      "Implementar mecanismos de cifrado para las comunicaciones internas."
    ],
    correctIndex: 1,
    feedback: "DDD evita la confusión de conceptos. Por ejemplo, en una e-commerce, el término 'Usuario' significa algo distinto para el contexto de 'Seguridad' (credenciales), 'Facturación' (dirección de facturas) y 'Soporte' (tickets)."
  },
  {
    id: 17,
    topic: "Architecture - Event Sourcing",
    question: "En una arquitectura basada en eventos, ¿en qué consiste la técnica de 'Event Sourcing'?",
    answers: [
      "En guardar el estado actual de la entidad en una base de datos relacional y generar eventos temporales para alertas.",
      "En persistir de forma inmutable la secuencia completa de eventos de cambio de estado en lugar de guardar solo el estado final actual, permitiendo reconstruir la entidad en cualquier punto del tiempo.",
      "En interceptar todos los logs del sistema y enviarlos a Elastic Search de forma continua.",
      "En configurar colas redundantes en brokers locales ante eventuales fallos de red."
    ],
    correctIndex: 1,
    feedback: "Event Sourcing almacena la historia completa. El estado actual de un objeto es el resultado de aplicar secuencialmente todos los eventos pasados sobre dicho objeto, lo cual provee una auditoría perfecta."
  }
];

export const modulo3Questions: Question[] = [
  {
    id: 1,
    topic: "Git Strategies",
    question: "¿Cuál es la principal ventaja de realizar 'git rebase' en lugar de 'git merge' al integrar cambios de una rama secundaria?",
    answers: [
      "Rebase compila el código automáticamente antes de unir las ramas.",
      "Rebase evita conflictos de fusión en el 100% de los casos.",
      "Rebase mantiene un historial de commits lineal y limpio al reubicar tus commits locales sobre la punta de la rama destino, evitando commits de merge extras.",
      "Rebase reduce el tamaño físico de los archivos del repositorio en disco."
    ],
    correctIndex: 2,
    feedback: "El rebase linealiza el árbol de Git, facilitando la auditoría y lectura de commits al evitar los ruidosos commits de fusión automáticos ('Merge branch...')."
  },
  {
    id: 2,
    topic: "Docker Basics",
    question: "En Docker, ¿cuál es la diferencia clave entre usar la instrucción COPY y la instrucción ADD en un Dockerfile?",
    answers: [
      "ADD solo sirve para contenedores Windows; COPY es exclusivo para entornos Linux.",
      "COPY copia archivos locales del host al contenedor; ADD además permite descargar archivos desde URLs remotas y desempaquetar archivos tar comprimidos automáticamente.",
      "ADD es significativamente más rápido que COPY porque comprime la capa intermedia en tiempo real.",
      "No hay diferencia; son alias exactamente idénticos en la especificación de Docker."
    ],
    correctIndex: 1,
    feedback: "ADD tiene superpoderes adicionales (descomprime tarballs y descarga de URLs), pero por buenas prácticas de Docker y seguridad, siempre se recomienda usar COPY a menos que requieras esas funciones específicas."
  },
  {
    id: 3,
    topic: "Image Optimization",
    question: "Se requiere optimizar al máximo el peso de una imagen de Docker para un microservicio productivo. ¿Cuál es la estrategia recomendada?",
    answers: [
      "Ejecutar el contenedor con privilegios de root para evitar el cacheado de capas.",
      "Utilizar Multi-Stage Builds (construcción en etapas) y seleccionar imágenes base ultralivianas como Alpine o distroless.",
      "Guardar la imagen final directamente en formato comprimido zip en el host.",
      "Borrar la carpeta .git del host antes de compilar la imagen."
    ],
    correctIndex: 1,
    feedback: "Multi-stage builds te permite tener un contenedor de compilación pesado con SDKs, y luego arrastrar solo el binario final compilado a una imagen ultraliviana de producción (como Alpine), reduciendo el peso de gigabytes a megabytes."
  },
  {
    id: 4,
    topic: "Git Cherry-Pick",
    question: "En Git, el comando 'git cherry-pick' se utiliza específicamente para:",
    answers: [
      "Borrar un commit erróneo directamente de la rama remota main sin dejar rastros.",
      "Aplicar los cambios introducidos por uno o varios commits específicos de otra rama sobre la rama actual en la que estás parado.",
      "Verificar el rendimiento y consumo de memoria RAM de un pipeline en Jenkins.",
      "Hacer un clon parcial de un repositorio descargando solo los archivos de texto."
    ],
    correctIndex: 1,
    feedback: "Cherry-pick es un comando quirúrgico. Te permite ir a cualquier rama secundaria, tomar un único commit (por ejemplo, un bugfix de producción) e inyectarlo en tu rama activa."
  },
  {
    id: 5,
    topic: "CI/CD Concepts",
    question: "Dentro de un pipeline de CI/CD, ¿cuál es la diferencia conceptual entre Continuous Delivery (Entrega Continua) y Continuous Deployment (Despliegue Continuo)?",
    answers: [
      "Continuous Delivery requiere bases de datos SQL; Continuous Deployment solo funciona con NoSQL.",
      "En Continuous Delivery, el despliegue final a producción requiere una aprobación manual humana; en Continuous Deployment, los cambios que pasan todas las pruebas automatizadas se despliegan en producción automáticamente.",
      "Continuous Deployment solo corre en nubes públicas como AWS; Continuous Delivery es para servidores on-premise.",
      "Continuous Delivery es exclusivo de perfiles de QA; Continuous Deployment es para programadores backend."
    ],
    correctIndex: 1,
    feedback: "Ambos automatizan la compilación y el testing, pero el 'Deployment' va un paso más allá eliminando el botón de liberación manual: si el pipeline está en verde, el código impacta directamente en los usuarios de producción."
  },
  {
    id: 6,
    topic: "Kubernetes Pods",
    question: "En Kubernetes, ¿qué es un Pod?",
    answers: [
      "Es un servidor físico on-premise asignado al clúster.",
      "Es la unidad de ejecución más pequeña y básica que se puede crear y gestionar, la cual representa un grupo de uno o más contenedores estrechamente acoplados que comparten red y almacenamiento.",
      "Es una base de datos NoSQL distribuida en memoria RAM.",
      "Es un script de automatización exclusivo para entornos GCP."
    ],
    correctIndex: 1,
    feedback: "El Pod es el átomo de Kubernetes. Aunque suele contener un solo contenedor de Docker, representa la abstracción donde se ejecuta tu aplicación, compartiendo recursos de red local y volúmenes de almacenamiento."
  },
  {
    id: 7,
    topic: "Canary Deployment",
    question: "¿En qué consiste una estrategia de despliegue tipo 'Canary Deployment' (Despliegue Canario)?",
    answers: [
      "En duplicar la infraestructura física apagando el clúster original durante 30 minutos.",
      "En liberar la nueva versión del software de manera progresiva a un pequeño porcentaje de usuarios reales, permitiendo monitorear errores antes de escalarla al 100% del tráfico.",
      "En encriptar las conexiones SSL del balanceador mediante certificados DNS dinámicos.",
      "En migrar todas las bases de datos de Postgres a MongoDB de forma automática."
    ],
    correctIndex: 1,
    feedback: "Inspirado en los canarios usados en las minas de carbón para detectar gases tóxicos, este patrón despliega la versión nueva a una fracción mínima del tráfico (ej. 5%). Si hay bugs, solo afecta a ese 5% y el rollback es inmediato."
  },
  {
    id: 8,
    topic: "Docker Storage",
    question: "En Docker, ¿cuál es la diferencia principal entre un Volume (Volumen de Docker) y un Bind Mount?",
    answers: [
      "Los volúmenes solo corren en Mac y los bind mounts en Linux.",
      "Los volúmenes son gestionados internamente por Docker y están aislados del sistema de archivos del host; los bind mounts mapean directamente un directorio exacto del host al contenedor.",
      "Los bind mounts encriptan los datos en tránsito; los volúmenes guardan todo en texto plano.",
      "No hay diferencia, Docker obsoletizó los bind mounts en la versión v20."
    ],
    correctIndex: 1,
    feedback: "Los volúmenes son la forma recomendada de persistir datos porque Docker los gestiona de forma segura en un área aislada. Los bind mounts dependen de la estructura física de carpetas del host, siendo útiles para desarrollo local."
  },
  {
    id: 9,
    topic: "Prometheus & Grafana",
    question: "Al configurar alertas SRE, ¿cuál es la principal función de Prometheus y Grafana en un clúster de microservicios?",
    answers: [
      "Prometheus es un broker de mensajería; Grafana es la base de datos distribuida.",
      "Prometheus recolecta métricas numéricas del sistema mediante un modelo de extracción (pull); Grafana lee esa base de datos y la visualiza en tableros gráficos de alto impacto.",
      "Prometheus realiza el despliegue Blue-Green; Grafana ejecuta las pruebas unitarias.",
      "Prometheus escanea vulnerabilidades de código estático; Grafana enruta llamadas DNS."
    ],
    correctIndex: 1,
    feedback: "Prometheus actúa como el recolector y base de datos temporal de series de tiempo (CPU, memoria, peticiones HTTP). Grafana se conecta a él para dibujar los gráficos y dashboard analíticos."
  },
  {
    id: 10,
    topic: "Blameless Post-Mortem",
    question: "Bajo la cultura DevOps / SRE, ¿qué significa el concept de 'Blameless Post-Mortem' tras una caída grave del sistema?",
    answers: [
      "Identificar inmediatamente al culpable de haber subido el commit roto para suspenderlo temporalmente.",
      "Borrar los logs de auditoría para evitar multas del cliente bancario.",
      "Realizar una investigación técnica exhaustiva enfocada en entender POR QUÉ fallaron las defensas del sistema y de la infraestructura, sin buscar culpabilizar a las personas, para prevenir que vuelva a ocurrir.",
      "Restaurar la base de datos de producción ignorando los fallos del balanceador."
    ],
    correctIndex: 2,
    feedback: "El Blameless Post-Mortem asume que las personas trabajan con buena intención basándose en la información que tenían. Si hubo un fallo grave, la culpa es de la falta de alertas, tests o automatización de la infraestructura, no del dev."
  },
  {
    id: 11,
    topic: "KEDA scaling",
    question: "En Kubernetes, ¿qué es el componente denominado KEDA (Kubernetes Event-driven Autoscaling)?",
    answers: [
      "Autoescalar los pods de tu clúster basándose en eventos externos (como el tamaño de una cola de Kafka o RabbitMQ) en lugar de medir solo el consumo de CPU o memoria RAM física.",
      "Cifrar los tokens JWT en los endpoints REST.",
      "Configurar túneles VPN dinámicos entre múltiples proveedores de nube pública.",
      "Compilar código Node.js de manera concurrente en contenedores secundarios."
    ],
    correctIndex: 0,
    feedback: "KEDA es vital en arquitecturas dirigidas por eventos (EDA). Permite que tu servicio escale a 50 réplicas si la cola de Kafka se llena de mensajes, e incluso apagar los pods a cero si la cola está vacía, ahorrando costos cloud."
  },
  {
    id: 12,
    topic: "Infrastructure as Code",
    question: "Usted necesita automatizar la creación y el versionado de la infraestructura de red, servidores y balanceadores de carga en la nube de AWS. ¿Qué práctica técnica debe aplicar?",
    answers: [
      "Crear scripts Bash locales y ejecutarlos manualmente desde la consola del administrador.",
      "IaC (Infrastructure as Code - Infraestructura como Código) utilizando herramientas descriptivas declarativas como Terraform o CloudFormation.",
      "Configurar alertas en CloudWatch para que escalen de forma vertical las instancias EC2.",
      "Delegar el control al equipo de seguridad mediante políticas IAM de lectura."
    ],
    correctIndex: 1,
    feedback: "Infrastructure as Code (IaC) permite definir toda tu topología de red y servidores en archivos de texto planos (código declarativo). Esto permite versionar tu infraestructura en Git, automatizarla y replicar entornos idénticos sin errores manuales."
  },
  {
    id: 13,
    topic: "Git Stash",
    question: "En Git, ¿cuál es el propósito de utilizar 'git stash'?",
    answers: [
      "Subir commits directamente a la rama de producción sin pasar por un pipeline.",
      "Almacenar temporalmente los cambios no confirmados del directorio de trabajo en una pila interna de Git, permitiéndote limpiar tu entorno para cambiar de rama sin perder tu progreso.",
      "Compilar de forma estática las librerías compartidas del framework central.",
      "Descargar la base de datos de producción codificada en binario base64."
    ],
    correctIndex: 1,
    feedback: "Git stash es como un portapapeles temporal. Te permite ocultar y guardar tus cambios locales a medio hacer para limpiar tu entorno de trabajo, resolver una emergencia en otra rama, y luego recuperar tus cambios con 'git stash pop'."
  },
  {
    id: 14,
    topic: "Least Privilege Principle",
    question: "Al configurar políticas de seguridad IAM (Identity and Access Management) en nubes como AWS, Azure o GCP, el principio de 'Mínimo Privilegio' dicta que:",
    answers: [
      "Todos los desarrolladores deben poseer accesos de administrador absoluto para evitar trabas en el pipeline.",
      "Las credenciales de los servicios deben cambiarse manualmente cada 48 horas.",
      "Se debe otorgar a los usuarios y microservicios únicamente los permisos mínimos indispensables requeridos para llevar a cabo sus funciones lógicas específicas, reduciendo la superficie de ataque.",
      "Se deben bloquear todas las conexiones entrantes SSH al clúster."
    ],
    correctIndex: 2,
    feedback: "El principio de mínimo privilegio (Least Privilege) evita catástrofes: si un microservicio solo necesita leer de una base de datos, no debe tener permisos de escritura, borrado ni control de usuarios sobre el motor SQL."
  },
  {
    id: 15,
    topic: "Kubernetes Control Plane",
    question: "En Kubernetes, ¿qué componente es el responsable de mantener el estado deseado del clúster, monitorear la salud de los pods y recrear instancias si estas fallan?",
    answers: [
      "El Docker Daemon local.",
      "El Kube-Controller-Manager (y sus bucles de control internos).",
      "La base de datos relacional PostgreSQL del nodo máster.",
      "El pipeline de GitHub Actions."
    ],
    correctIndex: 1,
    feedback: "El plano de control de Kubernetes ejecuta bucles de control continuos (reconciliation loops). Si le indicas que quieres tener 3 pods, y uno muere, el controlador detecta el desvío y levanta un pod nuevo al instante."
  },
  {
    id: 16,
    topic: "Container Bloat",
    question: "¿Cuál delos siguientes problemas se resuelve implementando 'Multistage Builds' en Docker?",
    answers: [
      "Evita conflictos de red entre múltiples contenedores locales.",
      "La acumulación de herramientas de desarrollo, SDKs de compilación pesados y código intermedio dentro de la imagen productiva final, optimizando su tamaño y seguridad.",
      "Permite correr imágenes Linux dentro de servidores físicos Windows antiguos.",
      "Automatiza la encriptación SSL de los endpoints internos."
    ],
    correctIndex: 1,
    feedback: "Multistage build separa la etapa de compilación (build stage, que requiere JDK, compilers, etc.) de la de ejecución. Permite que la imagen que subes al registro solo contenga el ejecutable (jar, binario) y el runtime de ejecución."
  },
  {
    id: 17,
    topic: "Git Flow Lifecycle",
    question: "En Git Flow, ¿cuál es la diferencia de ciclo de vida entre una rama de tipo 'hotfix' y una rama de tipo 'feature'?",
    answers: [
      "Feature se bifurca de main; hotfix se bifurca de develop.",
      "Hotfix se utiliza para corregir errores urgentes directamente detectados en producción bifurcándose de main e integrándose tanto a main como a develop; feature se usa para nuevas funcionalidades integrándose solo a develop.",
      "Hotfix solo puede ser creada por perfiles SRE; feature es exclusiva de diseñadores UX.",
      "No hay diferencias; son dos términos para la misma rama temporal."
    ],
    correctIndex: 1,
    feedback: "Hotfix reacciona ante una emergencia en producción. Nace de main (que tiene el código productivo actual), se arregla el bug y se integra rápido a main (para parchear producción) y a develop (para no perder el parche en futuros desarrollos)."
  },
  {
    id: 18,
    topic: "Liveness Probe",
    question: "¿Qué es 'Liveness Probe' (Prueba de Supervivencia) en Kubernetes y cómo ayuda a la resiliencia?",
    answers: [
      "Es un test que mide si la base de datos externa acepta conexiones remotas encriptadas.",
      "Es un mecanismo con el cual el clúster comprueba periódicamente la salud interna de un contenedor dentro de un Pod; si la prueba falla, Kubernetes reinicia el contenedor de manera autónoma.",
      "Es una alerta que gatilla un correo electrónico al equipo de DevOps si la latencia sube.",
      "Es la fase del pipeline donde se ejecuta el escaneo de código SonarQube."
    ],
    correctIndex: 1,
    feedback: "La liveness probe detecta bloqueos infinitos de hilos (deadlocks) o caídas internas del proceso. Si tu servidor Java se congela y deja de responder llamadas, la sonda lo detecta, K8s destruye el contenedor y levanta uno nuevo."
  },
  {
    id: 19,
    topic: "Zero-Downtime Deployment",
    question: "Al planificar despliegues sin tiempo de inactividad (zero-downtime), ¿en qué consiste la estrategia 'Blue-Green Deployment'?",
    answers: [
      "En cambiar la IP pública del servidor dns principal cada 15 minutos de forma aleatoria.",
      "En mantener dos entornos productivos idénticos (Azul y Verde): uno activo con el tráfico real (Azul) y otro inactivo (Verde) donde se despliega la nueva versión. Tras validarla, se rota el router al 100% al entorno Verde.",
      "En ejecutar tests de regresión visual con paletas cromáticas contrastantes.",
      "En apagar la mitad del clúster para forzar el balanceo de carga."
    ],
    correctIndex: 1,
    feedback: "Blue-Green garantiza cero downtime y rollback inmediato. Al tener dos entornos paralelos, el cambio de tráfico ocurre a nivel del router/balanceador. Si la versión nueva (Verde) falla, el balanceador redirige de vuelta el tráfico a Azul en milisegundos."
  },
  {
    id: 20,
    topic: "Self-Hosted CI/CD",
    question: "¿Qué es un pipeline de CI/CD autohospedado (self-hosted runner/agent) y en qué escenario se prefiere frente a uno administrado?",
    answers: [
      "Es un pipeline que corre directo en la computadora personal del desarrollador.",
      "Es una máquina o servidor administrado físicamente por tu propia organización que ejecuta las tareas del pipeline de CI/CD, preferible cuando tienes políticas estrictas de privacidad de datos o necesitas conectarte a recursos de red locales privados.",
      "Es un script que ejecuta despliegues de forma manual mediante peticiones REST de noche.",
      "Es una base de datos NoSQL distribuida exclusiva para logs."
    ],
    correctIndex: 1,
    feedback: "Los runners autohospedados te dan control absoluto del hardware y de la seguridad de red. Son obligatorios si el pipeline necesita desplegar código dentro de servidores locales privados protegidos por un firewall corporativo estricto."
  },
  {
    id: 21,
    topic: "DevOps - GitOps",
    question: "En una arquitectura GitOps implementada con ArgoCD, ¿cómo se garantiza que el estado vivo del clúster coincida con el estado deseado?",
    answers: [
      "Un desarrollador ejecuta comandos manuales 'kubectl apply' cada vez que se hace merge a main.",
      "El servidor de ArgoCD corre un reconciliation loop continuo para comparar las definiciones yaml en Git con los recursos vivos de K8s, sobrescribiendo cualquier cambio manual (self-healing).",
      "Se deshabilita la edición de archivos yaml y se configura la base de datos de Kubernetes en modo de solo lectura.",
      "ArgoCD envía alertas de slack para que el administrador actualice los recursos a mano."
    ],
    correctIndex: 1,
    feedback: "GitOps se basa en la automatización del ruteo del estado deseado. El agente dentro de Kubernetes monitorea el repositorio Git (fuente de verdad) y aplica de forma activa cualquier cambio al clúster de forma autónoma."
  },
  {
    id: 22,
    topic: "DevOps - OpenTelemetry",
    question: "Al instrumentar un ecosistema distribuido con OpenTelemetry, ¿a qué nos referimos con la 'Trazabilidad Distribuida' (Distributed Tracing)?",
    answers: [
      "A mapear los servidores físicos en un plano cartográfico de red.",
      "A la capacidad de seguir y correlacionar el flujo exacto de una única petición a través de múltiples microservicios independientes mediante identificadores comunes (traceId).",
      "A guardar logs en archivos de texto encriptados de forma secuencial.",
      "A medir el uso de disco rígido y CPU en todos los nodos del clúster."
    ],
    correctIndex: 1,
    feedback: "Las trazas distribuidas permiten diagnosticar cuellos de botella en sistemas de microservicios: al asociar un traceId único a la petición original, se puede ver exactamente cuánto demoró cada servicio en procesarla."
  },
  {
    id: 23,
    topic: "DevOps - Canary & Istio",
    question: "Cuando orquestamos un despliegue Canary automatizado con una malla de servicios (Service Mesh) como Istio, ¿qué componente es el responsable de dividir el tráfico de red?",
    answers: [
      "El DNS público de la red externa.",
      "Los proxies sidecar (Envoy) inyectados en los pods, que interceptan y redirigen el tráfico HTTP/gRPC basándose en las reglas configuradas.",
      "El pipeline de integración continua GitHub Actions.",
      "El balanceador de carga física de hardware del data center."
    ],
    correctIndex: 1,
    feedback: "Istio inyecta proxies Envoy junto a cada contenedor. Estos sidecars interceptan la comunicación y dividen el tráfico (ej. 98% a V1 y 2% a V2) sin necesidad de modificar el código de la aplicación."
  },
  {
    id: 24,
    topic: "DevOps - Container Security (Distroless)",
    question: "¿Por qué el uso de imágenes base 'Distroless' de Google se considera una práctica recomendada de ciberseguridad en contenedores Docker?",
    answers: [
      "Porque comprimen la aplicación utilizando algoritmos avanzados reduciendo el uso de red.",
      "Porque no contienen shells (como bash o sh), administradores de paquetes ni utilidades del sistema operativo, reduciendo la superficie de ataque y los vectores de explotación.",
      "Porque encriptan automáticamente toda la base de datos local en tiempo de ejecución.",
      "Porque impiden el acceso HTTP no autorizado de forma nativa en el kernel."
    ],
    correctIndex: 1,
    feedback: "Al eliminar elementos del sistema operativo (bash, sh, apt/apk, curl, etc.) que no son necesarios para correr la aplicación, se neutraliza la capacidad de un atacante para ejecutar comandos o descargar herramientas maliciosas si el contenedor es vulnerado."
  },
  {
    id: 25,
    topic: "Tooling - Husky & Lint-Staged",
    question: "¿Qué beneficio principal aporta configurar Husky y Lint-Staged conjuntamente en un entorno de desarrollo de software?",
    answers: [
      "Habilitar la edición de código colaborativo en tiempo real dentro del IDE.",
      "Garantizar la calidad ejecutando el formateo y linter de forma automática local únicamente sobre los archivos que están en el área de preparación (staged) antes de permitir un commit.",
      "Ejecutar los pipelines de CI/CD completos en servidores en la nube de forma asíncrona.",
      "Migrar de forma segura la base de datos local de desarrollo."
    ],
    correctIndex: 1,
    feedback: "Husky automatiza los Git Hooks y Lint-Staged asegura que no perdamos tiempo analizando todo el proyecto: solo valida y formatea los archivos que modificaste y estás a punto de commitear."
  }
];

export const quizModules: QuizModule[] = [
  {
    id: "modulo1",
    title: "Ingeniería de Software",
    description: "Preguntas de SOLID, GRASP, patrones clásicos GoF y estrategias de testing automatizado.",
    timeLimitMinutes: 10,
    questions: modulo1Questions
  },
  {
    id: "modulo2",
    title: "Arquitectura de Software",
    description: "Casos prácticos de diseño distribuido, microservicios, CAP, Saga, resiliencia y escalabilidad.",
    timeLimitMinutes: 10,
    questions: modulo2Questions
  },
  {
    id: "modulo3",
    title: "Cultura DevOps",
    description: "Docker, Kubernetes, flujos de Git, CI/CD autohospedados e infraestructura Cloud.",
    timeLimitMinutes: 10,
    questions: modulo3Questions
  }
];
