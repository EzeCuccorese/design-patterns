export interface Subsection {
  title: string;
  description: string;
  details?: string[];
  code?: string;
  alert?: {
    type: 'note' | 'tip' | 'important' | 'warning' | 'caution';
    text: string;
  };
}

export interface StudySection {
  id: string;
  title: string;
  icon: string;
  introduction: string;
  subsections: Subsection[];
}

export const studyGuide: StudySection[] = [
  {
    id: "solid-clean",
    title: "Pilares de Diseño y Código Limpio",
    icon: "Shield",
    introduction: "Los pilares fundamentales para el diseño, desarrollo y mantenimiento de software escalable, modular y tolerante a fallos.",
    subsections: [
      {
        title: "Cohesión y Acoplamiento",
        description: "El diseño de software de calidad busca siempre lograr una alta cohesión interna y un bajo acoplamiento entre los distintos componentes.",
        details: [
          "Alta Cohesión: Significa que cada módulo o clase tiene una sola tarea lógica muy enfocada. Esto facilita su entendimiento, mantenimiento y pruebas.",
          "Bajo Acoplamiento: Representa la independencia que existe entre módulos. Si los módulos están desacoplados, los cambios internos en uno de ellos no repercuten en los demás."
        ]
      },
      {
        title: "Inyección de Dependencias (DI) vs Inversión de Dependencias (DIP)",
        description: "Es común confundir el principio abstracto con el patrón técnico que lo implementa.",
        details: [
          "DIP (Dependency Inversion Principle): Es el principio abstracto de diseño de SOLID. Establece que las clases de alto nivel (lógica de negocio) no deben depender de módulos de bajo nivel (bases de datos, red, controladores), sino que ambos deben depender de abstracciones (interfaces).",
          "DI (Dependency Injection): Es el patrón de diseño técnico que materializa DIP. Consiste en proveer (inyectar) las dependencias requeridas a un objeto desde el exterior, usualmente a través de su constructor, en lugar de que el propio objeto las instancie con 'new'."
        ]
      },
      {
        title: "SOLID (Resumen Rápido)",
        description: "Las cinco directrices indispensables para crear software mantenible y extensible:",
        details: [
          "SRP (Single Responsibility Principle): Una clase debe tener solo una razón para cambiar, resolviendo una única responsabilidad para un solo actor del negocio.",
          "OCP (Open/Closed Principle): El código debe estar abierto a la extensión pero cerrado a la modificación. Se implementa programando contra interfaces y abstrayendo el comportamiento.",
          "LSP (Liskov Substitution Principle): Las clases derivadas deben poder reemplazar a sus clases base sin alterar el comportamiento correcto del sistema. No se deben heredar clases para capar funcionalidades o lanzar excepciones imprevistas.",
          "ISP (Interface Segregation Principle): Es mejor diseñar interfaces pequeñas y enfocadas que una sola interfaz gigantesca que obligue a los clientes a implementar métodos inútiles.",
          "DIP (Dependency Inversion Principle): Depender exclusivamente de abstracciones (interfaces) y nunca de implementaciones concretas."
        ]
      }
    ]
  },
  {
    id: "grasp",
    title: "Principios GRASP",
    icon: "Layout",
    introduction: "General Responsibility Assignment Software Patterns. Directrices esenciales enfocadas en la asignación básica de responsabilidades de las clases durante el modelado de dominio.",
    subsections: [
      {
        title: "Experto en Información (Information Expert)",
        description: "Asigna la responsabilidad de realizar un cálculo o ejecutar una acción a aquella clase que posee la información necesaria para llevarla a cabo.",
        details: [
          "Ayuda a mantener la encapsulación y reduce el acoplamiento.",
          "Ejemplo: El objeto Carrito debe tener la responsabilidad de calcular el total de la compra porque contiene la lista de items, y no un servicio de pago externo."
        ]
      },
      {
        title: "Creador (Creator)",
        description: "¿Quién debe ser el responsable de instanciar un nuevo objeto B? La clase A debe crear a B si A contiene o agrega a B, A registra o usa estrechamente a B, o A tiene los datos para inicializar a B.",
        details: [
          "Promueve el bajo acoplamiento al delegar la creación en contenedores lógicos naturales."
        ]
      },
      {
        title: "Fabricación Pura (Pure Fabrication)",
        description: "Crear una clase altamente cohesiva que no represente un concepto real del dominio de negocio, sino que se diseñe exclusivamente para mantener el acoplamiento bajo y la cohesión alta.",
        details: [
          "Se aplica para evitar sobrecargar objetos del dominio con tareas de infraestructura.",
          "Ejemplos típicos: Exporters (PDFExporter), Loggers, manejadores de conexión a bases de datos."
        ]
      },
      {
        title: "Controlador (Controller)",
        description: "Es el primer objeto no gráfico que intercepta y coordina un mensaje del sistema externo hacia el dominio, actuando como manejador del flujo del caso de uso.",
        details: [
          "Separa la capa de presentación de la lógica interna."
        ]
      },
      {
        title: "Variaciones Protegidas (Protected Variations)",
        description: "Identificar los puntos de inestabilidad o variación futura en el sistema y envolverlos con una interfaz estable.",
        details: [
          "Protege a los clientes del impacto de cambios en elementos inestables o de terceros."
        ]
      }
    ]
  },
  {
    id: "code-smells",
    title: "Code Smells y Refactorización",
    icon: "Code",
    introduction: "Aprender a detectar síntomas de diseño defectuoso en el software legacy y cómo sanarlo mediante pasos estructurados.",
    subsections: [
      {
        title: "Primitive Obsession (Obsesión Primitiva)",
        description: "Uso de tipos primitivos (como String, int o Double) para modelar conceptos complejos del negocio que requieren sus propias reglas y validaciones.",
        details: [
          "Síntoma: Guardar un Email, Dirección o CBU como un String genérico, dispersando las validaciones por todo el código.",
          "Refactorización: Replace Data Value with Object. Crear un Value Object dedicado (ej. Email) que encapsule su propia validación y formato."
        ]
      },
      {
        title: "Feature Envy (Envidia de Funciones)",
        description: "Un método de una clase que accede y manipula los datos y getters de otra clase vecina más de lo que utiliza los datos de su propia clase.",
        details: [
          "Síntoma: El método calcula algo usando intensamente las propiedades del otro objeto.",
          "Refactorización: Move Method. Mover el método a la clase que posee los datos para respetar el principio de Experto en Información."
        ]
      },
      {
        title: "Switch Statements (Condicionales Múltiples)",
        description: "Estructuras condicionales o switch extensas que toman decisiones basadas en el tipo de un objeto.",
        details: [
          "Síntoma: Cada vez que se agrega un nuevo tipo de objeto, hay que modificar todas las estructuras switch distribuidas en el código.",
          "Refactorización: Replace Conditional with Polymorphism. Crear clases polimórficas bajo una interfaz o usar patrones como Strategy o State."
        ]
      },
      {
        title: "Long Method (Método Largo)",
        description: "Métodos que exceden las 15-20 líneas, volviéndose difíciles de leer, mantener y testear.",
        details: [
          "Refactorización: Extract Method. Delegar flujos lógicos intermedios en métodos privados cohesivos con nombres expresivos que expliquen su propósito."
        ]
      }
    ]
  },
  {
    id: "testing",
    title: "Estrategias de Testing",
    icon: "CheckCircle",
    introduction: "Conceptos esenciales para garantizar que la suite de pruebas automatizadas sea confiable, veloz y robusta.",
    subsections: [
      {
        title: "Doble de Prueba: Stub vs Mock",
        description: "Distinguir la forma y propósito de los dobles de prueba es crucial para evitar pruebas frágiles o mal diseñadas.",
        details: [
          "Stub (Doble Pasivo): Se utiliza para proveer respuestas fijas preconfiguradas que alimentan el flujo del componente bajo prueba. No verifica llamadas ni comportamiento.",
          "Mock (Doble Activo): Se enfoca en auditar y asertar la interacción. Valida si un método de la dependencia fue llamado, cuántas veces y con qué argumentos específicos."
        ]
      },
      {
        title: "El Ciclo TDD (Test-Driven Development)",
        description: "Metodología de diseño y desarrollo de software que escribe el test antes que el código productivo.",
        details: [
          "1. RED (Rojo): Escribir una prueba unitaria que falla (porque la funcionalidad aún no está codificada).",
          "2. GREEN (Verde): Codificar la lógica mínima indispensable para hacer que el test pase exitosamente.",
          "3. REFACTOR (Refactorizar): Limpiar y estructurar el diseño del código productivo y de prueba sin alterar el comportamiento."
        ]
      }
    ]
  },
  {
    id: "resilience-eda",
    title: "Resiliencia y Arquitecturas Distribuidas",
    icon: "Activity",
    introduction: "Patrones arquitectónicos avanzados diseñados para asegurar la alta disponibilidad, tolerancia a fallos y escalabilidad horizontal de sistemas distribuidos.",
    subsections: [
      {
        title: "Circuit Breaker (Patrón Cortocircuito)",
        description: "Protege al sistema local de la saturación al realizar llamadas a servicios externos inestables o lentos.",
        details: [
          "Estado Cerrado: Las peticiones fluyen normalmente hacia el servicio externo.",
          "Estado Abierto: Ante reiterados fallos o timeouts, el circuito se abre. Todas las peticiones fallan rápido localmente (fail-fast), liberando hilos de ejecución de inmediato.",
          "Estado Semi-abierto: Transcurrido un tiempo de enfriamiento, permite pasar unas pocas solicitudes de prueba para validar si el servicio externo se ha recuperado."
        ]
      },
      {
        title: "Saga Pattern (Saga Transaccional)",
        description: "Gestiona la consistencia eventual de transacciones de negocio distribuidas entre múltiples microservicios mediante secuencias locales y compensaciones.",
        details: [
          "Coreografía: Los servicios reaccionan asíncronamente a eventos de forma descentralizada.",
          "Orquestación: Un servicio central (Orquestador) mantiene el estado de la saga y comanda explícitamente a los demás qué hacer.",
          "Transacción Compensatoria: Acción inversa (rollback lógico) ejecutada secuencialmente para anular los efectos de pasos completados si un paso posterior de la saga falla."
        ]
      },
      {
        title: "Transactional Outbox Pattern",
        description: "Resuelve el problema de la atomicidad al guardar datos en una base de datos local y publicar un evento de forma confiable a un broker (Kafka/RabbitMQ).",
        details: [
          "Paso 1: Dentro de la misma transacción ACID local, la aplicación escribe la entidad de negocio y el evento a transmitir en una tabla temporal auxiliar llamada OUTBOX.",
          "Paso 2: Un proceso independiente (Message Relay, CDC como Debezium o un polling worker) lee secuencialmente la tabla OUTBOX, publica los eventos en el Broker de mensajería, y tras recibir el ACK, elimina o marca el registro como procesado."
        ],
        code: "[Aplicación] ──(Transacción ACID)──> [Base de Datos]\n" +
              "                                    ├──> Tabla: PEDIDO (Entidad de negocio)\n" +
              "                                    └──> Tabla: OUTBOX (Evento a enviar)\n" +
              "                                           │\n" +
              "                                     (CDC / Debezium)\n" +
              "                                           │\n" +
              "                                           ▼\n" +
              "                                     [Apache Kafka]"
      },
      {
        title: "Zero-Downtime Database Migrations (Expand / Contract)",
        description: "Permite actualizar esquemas de bases de datos compartidas (como renombrar una columna) sin interrumpir el funcionamiento del código viejo en despliegues Blue-Green.",
        details: [
          "1. Expand (Expandir): Se altera la base de datos para agregar el nuevo campo. Se despliega el código que escribe en ambos campos (viejo y nuevo) pero lee del viejo.",
          "2. Sync (Sincronizar): Se ejecuta un job en background para migrar datos históricos del campo viejo al nuevo.",
          "3. Transition (Transición): Se despliega código que ahora lee del campo nuevo, pero sigue escribiendo en ambos por si se requiere un rollback.",
          "4. Contract (Contraer): Una vez verificado el sistema, se actualiza el código para escribir solo en el nuevo campo y se remueve la columna vieja de la base de datos."
        ],
        code: "Fase 1 (Expand):     [DB vieja] <--- Lee/Escribe ---> [App V1]\n" +
              "                     [DB agrega campo nuevo] (Escritura dual)\n\n" +
              "Fase 2 (Transition): [DB] <--- Lee de nuevo / Escribe dual ---> [App V2 (BG)]\n" +
              "                     * Proceso asíncrono migra datos históricos.\n\n" +
              "Fase 3 (Contract):   [DB elimina campo viejo] <--- Lee/Escribe en nuevo ---> [App V3]"
      }
    ]
  },
  {
    id: "sre-devops",
    title: "SRE, DevOps e Infraestructura",
    icon: "Terminal",
    introduction: "Pautas de observabilidad, cultura de análisis de fallos y prácticas recomendadas de contenedores en la nube.",
    subsections: [
      {
        title: "Teorema CAP (Teorema de Brewer)",
        description: "En un sistema distribuido que sufre una partición de red inevitable (P), se debe elegir de forma obligatoria entre Consistencia (C) o Disponibilidad (A).",
        details: [
          "Sistemas CP (Consistencia + Tolerancia a Particiones): Ante fallos de red, los nodos aislados rechazan peticiones de los usuarios para evitar entregar datos desactualizados o inconsistentes (ej. Sistemas bancarios tradicionales).",
          "Sistemas AP (Disponibilidad + Tolerancia a Particiones): Los nodos aislados siguen respondiendo peticiones con la versión local de sus datos, asumiendo consistencia eventual (ej. Feeds de redes sociales)."
        ]
      },
      {
        title: "4 Señales de Oro de SRE (Golden Signals)",
        description: "Métricas esenciales recomendadas por Google para monitorear servicios de alta transaccionalidad:",
        details: [
          "1. Latencia: El tiempo requerido para procesar una solicitud. Se debe alertar en base a percentiles (P95/P99) y no promedios.",
          "2. Tráfico: La demanda del servicio medida en peticiones por segundo (RPS).",
          "3. Errores: La tasa de peticiones que fallan (ej. proporción de respuestas HTTP 5xx).",
          "4. Saturación: Qué tan lleno está el servicio, midiendo recursos limitados como pool de hilos del servidor web o conexiones de bases de datos."
        ]
      },
      {
        title: "Triage de Kubernetes en Crisis",
        description: "Cómo diagnosticar fallos cíclicos en pods (CrashLoopBackOff) disponiendo únicamente de acceso mediante kubectl y restricciones de seguridad de red:",
        details: [
          "Paso 1: kubectl describe pod <pod-name> -n <namespace>. Inspeccionar la sección 'Events' al final para identificar si fue matado por falta de memoria (OOMKilled - Exit Code 137) o fallos de sonda.",
          "Paso 2: kubectl logs <pod-name> -n <namespace> --previous. El flag '--previous' es fundamental: trae los logs del contenedor justo antes de que colapsara en el ciclo anterior, revelando excepciones de arranque.",
          "Paso 3: kubectl get events -n <namespace> --sort-by='.metadata.creationTimestamp'. Útil si el pod se queda en 'Pending' o 'ContainerCreating' sin escribir logs, revelando fallos de almacenamiento o falta de CPU en nodos."
        ]
      },
      {
        title: "Blameless Post-Mortem (Análisis de Caídas sin Culpables)",
        description: "Práctica cultural SRE enfocada en documentar y analizar incidentes graves de producción de forma constructiva.",
        details: [
          "Asume que los desarrolladores actúan con buena intención basándose en la información que poseían en ese instante.",
          "El análisis se enfoca en entender POR QUÉ fallaron los tests, las alertas o las defensas de la infraestructura, evitando apuntar a errores humanos concretos.",
          "Su meta es la mejora continua de los procesos preventivos."
        ]
      }
    ]
  }
];
