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
  }
};
