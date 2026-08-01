export interface ExamLink {
  label: string;
  targetView?: string;
  targetPatternId?: string;
  targetTopicId?: string;
}

export interface SeniorStaffPillarItem {
  id: string;
  title: string;
  subtitle: string;
  pillar: 'system-design' | 'live-refactoring' | 'troubleshooting' | 'tradeoffs';
  tags: string[];
  scenario: string;
  challenge: string;
  stepByStepResolution: {
    stepNumber: number;
    title: string;
    description: string;
    details: string[];
    codeSnippet?: {
      language: string;
      code: string;
    };
  }[];
  deepTheory: {
    title: string;
    content: string;
  }[];
  tradeoffAnalysis: {
    option: string;
    isRecommended: boolean;
    pros: string[];
    cons: string[];
    verdict: string;
  }[];
  dryLinks: ExamLink[];
}

export const seniorStaffExamData: SeniorStaffPillarItem[] = [
  // PILAR 1: SYSTEM DESIGN
  {
    id: 'sd-messaging-platform',
    pillar: 'system-design',
    title: 'Diseño de Plataforma de Mensajería Event-Driven Multicanal',
    subtitle: 'Procesamiento de +50k Webhooks/seg con Rate Limiting y Garantía Exactly-Once',
    tags: ['System Design', 'Kafka', 'Outbox Pattern', 'Redis Rate Limiting', 'Idempotencia'],
    scenario: `Una empresa de mensajería empresarial procesa 50,000 webhooks por segundo provenientes de múltiples proveedores (WhatsApp, Telegram, Webhooks propios).
El sistema sufre deSpikes de tráfico donde el proveedor satura los microservicios backend, provocando pérdida de mensajes, peticiones duplicadas y caídas en bases de datos relacionales por contención de locks.`,
    challenge: 'Diseñar la arquitectura distribuida para garantizar alta disponibilidad (99.99%), procesamiento asíncrono idempotente, Rate Limiting multinivel por cliente y cero pérdida de mensajes durante caídas de infraestructura.',
    stepByStepResolution: [
      {
        stepNumber: 1,
        title: 'Capa de Ingesta Desacoplada (Ingress API & Buffer distribuido)',
        description: 'Separar inmediatamente la recepción HTTP de la lógica de procesamiento de negocio usando Ingress Workers livianos y Apache Kafka.',
        details: [
          'El worker HTTP recibe la petición Webhook, valida la firma criptográfica (HMAC-SHA256) y publica inmediatamente en Kafka Topic sin tocar base de datos.',
          'Retorna HTTP 202 Accepted en menos de 5ms.',
          'Usa Kafka con Partition Key = `tenant_id` para garantizar orden secuencial estricto por cliente sin bloquear otros clientes.'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `// Express / Fastify Ingress Handler desacoplado
app.post('/api/v1/webhooks/:tenantId', async (req, res) => {
  const { tenantId } = req.params;
  if (!verifySignature(req)) return res.status(401).send('Invalid Signature');

  const payload = {
    messageId: req.headers['x-message-id'] || crypto.randomUUID(),
    tenantId,
    data: req.body,
    timestamp: Date.now()
  };

  // Publicación asíncrona a Kafka con Partition Key
  await kafkaProducer.send({
    topic: 'incoming-webhooks',
    messages: [{ key: tenantId, value: JSON.stringify(payload) }]
  });

  return res.status(202).send({ status: 'ACCEPTED', messageId: payload.messageId });
});`
        }
      },
      {
        stepNumber: 2,
        title: 'Rate Limiting Distribuido por Tenant (Redis Sliding Window Log)',
        description: 'Evitar que un tenant ' + 'ruidoso' + ' consuma los recursos del clúster mediante un limitador distribuido.',
        details: [
          'Se implementa un middleware de Rate Limiting con Redis utilizando el algoritmo Token Bucket o Sliding Window.',
          'Si un tenant excede su cuota (ej. 1,000 msgs/sec), la petición en cola Kafka no se descarta; se desvía a una cola de retraso (Delay Queue / DLQ) o se pospone la lectura del offset.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Procesamiento Idempotente y Patrón Outbox (Transactional Outbox)',
        description: 'Garantizar que si un worker falla a mitad del procesamiento de un mensaje, no se generen mensajes duplicados hacia el cliente final.',
        details: [
          'Se almacena el `message_id` en una tabla de de-duplicación idempotente con Redis (TTL de 24hs) o MongoDB unique index.',
          'Para emitir eventos hacia otros microservicios se aplica Transactional Outbox Pattern: la mutación de estado y el evento Outbox se escriben en la misma transacción local de BD.'
        ]
      }
    ],
    deepTheory: [
      {
        title: 'Garantías de Entrega: At-Least-Once vs Exactly-Once',
        content: 'En sistemas distribuidos reales, lograr Exactly-Once de punta a punta es extremadamente complejo e ineficiente. La práctica recomendada para Staff Engineers es implementar At-Least-Once en la capa de mensajería (Kafka/RabbitMQ con retries) combinado con Idempotencia en los consumidores finales.'
      },
      {
        title: 'Patrón Transactional Outbox',
        content: 'Resuelve el problema de dual-write (escribir en BD y publicar en Kafka al mismo tiempo sin transacciones de 2 fases). Consiste en guardar el evento en una tabla Outbox de la misma BD relacional dentro de la misma transacción de negocio, y delegar a un proceso CDC (Debezium / Kafka Connect) la lectura del log transaccional.'
      }
    ],
    tradeoffAnalysis: [
      {
        option: 'Enrutamiento Asíncrono con Kafka + Consumer Groups (Recomendado)',
        isRecommended: true,
        pros: ['Desacoplamiento total', 'Buffer elástico para absorber picos', 'Orden garantizado por Partition Key'],
        cons: ['Eventual Consistency en la respuesta', 'Mayor complejidad de infraestructura'],
        verdict: 'Es la arquitectura estándar de la industria para plataformas de mensajes de alta concurrencia.'
      },
      {
        option: 'Procesamiento Sincrónico Directo a Base de Datos Relacional',
        isRecommended: false,
        pros: ['Consistencia ACID inmediata', 'Simplicidad inicial de desarrollo'],
        cons: ['Saturación de pool de conexiones', 'Cascada de fallos durante picos de tráfico (Cascading Failures)'],
        verdict: 'Inviable a escala Senior/Staff. Causa outages bajo picos moderados de tráfico.'
      }
    ],
    dryLinks: [
      { label: 'Ver Patrón Observer', targetPatternId: 'observer' },
      { label: 'Ver Patrón Strategy', targetPatternId: 'strategy' },
      { label: 'Ver Patrón Chain of Responsibility', targetPatternId: 'chain' },
      { label: 'Ver Guía de Arquitecturas Distribuidas & Resiliencia', targetTopicId: 'resilience-eda' },
      { label: 'Ver Guía de SRE, DevOps e Infraestructura', targetTopicId: 'sre-devops' }
    ]
  },

  // PILAR 2: LIVE REFACTORING
  {
    id: 'rf-hexagonal-clean',
    pillar: 'live-refactoring',
    title: 'Refactorización de Monolito Acoplado a Arquitectura Hexagonal',
    subtitle: 'Desacoplando Lógica de Negocio de HTTP, MongoDB y Servicios de Terceros',
    tags: ['Refactorización', 'SOLID', 'Arquitectura Hexagonal', 'Inyección de Dependencias', 'Ports & Adapters'],
    scenario: `Un servicio legado procesa notificaciones de clientes. El controlador HTTP instanció directamente la conexión a MongoDB, realiza validaciones de negocio en la capa de vista, llama a la API de Twilio hardcodeada y devuelve respuestas HTTP personalizadas desde clases internas.
Cualquier intento de agregar pruebas unitarias requiere levantar MongoDB y Twilio real.`,
    challenge: 'Refactorizar este módulo aplicando el Principio de Inversión de Dependencias (DIP), Arquitectura Hexagonal (Puertos y Adaptadores) y patrones Creacionales/Estructurales.',
    stepByStepResolution: [
      {
        stepNumber: 1,
        title: 'Identificación de Smells y Violaciones de SOLID',
        description: 'Auditar el código acoplado identificando violaciones de SRP, DIP y OCP.',
        details: [
          'Violación de SRP: El controlador valida email, calcula tarifas, persiste en BD y envía HTTP externa.',
          'Violación de DIP: El dominio depende directamente de SDKs externos (MongoDriver y TwilioClient).'
        ]
      },
      {
        stepNumber: 2,
        title: 'Definición de Puertos de Dominio (Interfaces de Entradas y Salidas)',
        description: 'Crear abstracciones inmutables de los servicios externos.',
        details: [
          'Definir `NotificationRepository` (puerto de salida para guardar notificaciones).',
          'Definir `MessageGateway` (puerto de salida para enviar mensajes SMS/WhatsApp).'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `// 1. Puertos (Interfaces del Dominio)
export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
}

export interface MessageGateway {
  send(recipient: string, message: string): Promise<boolean>;
}`
        }
      },
      {
        stepNumber: 3,
        title: 'Implementación del Caso de Uso Puro (Dominio Desacoplado)',
        description: 'Encapsular las reglas de negocio en la clase `SendNotificationUseCase` inyectando los puertos.',
        details: [
          'La lógica de negocio se vuelve 100% testeable con Mocks/Stubs en memoria sin requerir BD ni red.'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `// 2. Caso de Uso (Dominio Puro)
export class SendNotificationUseCase {
  constructor(
    private readonly repo: NotificationRepository,
    private readonly gateway: MessageGateway
  ) {}

  async execute(command: { userId: string; phone: string; text: string }): Promise<void> {
    const notification = new Notification(command.userId, command.phone, command.text);
    notification.validateOrThrow();

    const delivered = await this.gateway.send(notification.phone, notification.text);
    if (!delivered) {
      notification.markAsFailed();
    } else {
      notification.markAsSent();
    }

    await this.repo.save(notification);
  }
}`
        }
      },
      {
        stepNumber: 4,
        title: 'Creación de Adaptadores de Infraestructura (Patrón Adapter)',
        description: 'Implementar los adaptadores para MongoDB y Twilio/WhatsApp de manera intercambiable.',
        details: [
          'Si en el futuro se reemplaza MongoDB por PostgreSQL o DynamoDB, la capa de dominio permanece 100% intacta.'
        ]
      }
    ],
    deepTheory: [
      {
        title: 'Inversión de Dependencias (DIP) y Puertos y Adaptadores',
        content: 'El núcleo del negocio jamás conoce los detalles técnicos de almacenamiento ni comunicación. Los detalles de infraestructura dependen de las abstracciones del negocio, no al revés.'
      }
    ],
    tradeoffAnalysis: [
      {
        option: 'Arquitectura Hexagonal con Puertos & Adaptadores (Recomendado)',
        isRecommended: true,
        pros: ['Testabilidad ultrarrápida sin bases de datos', 'Facilidad para intercambiar proveedores de mensajería', 'Aislamiento de reglas de negocio'],
        cons: ['Ligero incremento inicial en el número de clases e interfaces'],
        verdict: 'Indispensable para proyectos de escala empresarial y posiciones Sr/Staff.'
      },
      {
        option: 'Mantenimiento del Diseño Monolítico Directo',
        isRecommended: false,
        pros: ['Rápido para prototipos de 1 día (Spikes)'],
        cons: ['Deuda técnica exponencial', 'Pruebas de integración extremadamente lentas y frágiles'],
        verdict: 'Anti-patrón de desarrollo (Big Ball of Mud).'
      }
    ],
    dryLinks: [
      { label: 'Ver Patrón Adapter', targetPatternId: 'adapter' },
      { label: 'Ver Patrón Factory Method', targetPatternId: 'factory' },
      { label: 'Ver Sección SOLID & Código Limpio', targetTopicId: 'solid-clean' },
      { label: 'Ver Catálogo de Refactorización', targetView: 'refactor' }
    ]
  },

  // PILAR 3: TROUBLESHOOTING & INCIDENT POST-MORTEM
  {
    id: 'tb-p99-memory-leak',
    pillar: 'troubleshooting',
    title: 'Post-Mortem: Degradación de P99 Latency & Memory Leak en Producción',
    subtitle: 'Diagnóstico de OutOfMemory (OOM) y Thread Exhaustion durante Event Loop Spikes',
    tags: ['Troubleshooting', 'Memory Leak', 'Heap vs Stack', 'Circuit Breaker', 'OpenTelemetry'],
    scenario: `En un despliegue de viernes a la tarde, el servicio de notificaciones en tiempo real comenzó a aumentar su latencia P99 de 120ms a 14,000ms. 
A las 2 horas, los pod de Kubernetes sufrieron reinicios por 'OOMKilled' (Out Of Memory). Los logs muestran miles de advertencias de 'Event Loop Blocked' y timeouts hacia el pool de bases de datos.`,
    challenge: 'Actuar como Staff Engineer para realizar la investigación forense, aislar la causa raíz (Root Cause), aplicar mitigación inmediata sin downtime y prevenir la recurrencia.',
    stepByStepResolution: [
      {
        stepNumber: 1,
        title: 'Mitigación Inmediata de Emergencia (Rollback vs Traffic Shedding)',
        description: 'Detener la degradación del servicio reduciendo el impacto al usuario final.',
        details: [
          'Inspeccionar el Dashboard de Canarios (Istio / Prometheus) y aplicar Rollback inmediato a la revisión previa estable.',
          'Si el Rollback no es viable por migraciones de esquema, activar Rate Limiting en el API Gateway y aplicar Shedding del 30% del tráfico no crítico.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Análisis Forense con Heapsnapshot y Trazas Distribuidas',
        description: 'Inspeccionar los volcados de memoria y métricas de OpenTelemetry.',
        details: [
          'El análisis de Heapsnapshot revela millones de objetos `EventEmitter` retenidos en memoria global debido a listeners de eventos que nunca fueron desuscritos (`removeListener`).',
          'Las trazas de OpenTelemetry revelan que ante la falla de un microservicio externo, los clientes continuaron reintentando sin Exponential Backoff, saturando el pool de hilos.'
        ],
        codeSnippet: {
          language: 'javascript',
          code: `// Causa Raíz encontrada en el código: Memory Leak por Event Listeners no liberados
class UserSessionManager {
  constructor() {
    this.sessions = new Map();
  }
  
  onUserConnect(user) {
    // ERROR: Se agrega un listener global en cada conexión pero NUNCA se remueve
    globalNotificationEmitter.on('broadcast', (data) => {
      this.sendToUser(user.id, data);
    });
  }
}`
        }
      },
      {
        stepNumber: 3,
        title: 'Implementación del Fix de Causa Raíz y Patrón Circuit Breaker',
        description: 'Remover el leak de memoria y envolver las llamadas remotas frágiles con Resilience4j / Circuit Breaker.',
        details: [
          'Corregir la desuscripción explícita de listeners al cerrar la sesión.',
          'Envolver llamadas externas en un Circuit Breaker configurado con Sliding Window de 100 peticiones y umbral de falla del 50%.'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `// Solución: Desuscripción explícita + Circuit Breaker
class UserSessionManager {
  onUserConnect(user) {
    const handler = (data) => this.sendToUser(user.id, data);
    globalNotificationEmitter.on('broadcast', handler);

    // Liberación estricta al desconectar (Sustitución de recursos)
    user.on('disconnect', () => {
      globalNotificationEmitter.removeListener('broadcast', handler);
    });
  }
}`
        }
      }
    ],
    deepTheory: [
      {
        title: 'Diagnóstico de P99 Latency & Tail Latency en Producción',
        content: 'El P99 (Percentil 99) refleja la experiencia del 99% de las peticiones. En este incidente, mientras el promedio ocultaba la degradación inicial, el P99 escaló de 120ms a 14.000ms debido a la amplificación de llamadas por el Event Loop bloqueado y el memory leak. Medir P99 mediante PromQL histogram_quantile es fundamental para la observabilidad SRE.'
      },
      {
        title: 'Gestión de Memoria: Pila (Stack) vs Montón (Heap)',
        content: 'La Pila (Stack) almacena variables locales y punteros de ejecución de ciclo corto (rápida, LIFO, auto-liberada). El Montón (Heap) almacena objetos instanciados dinámicamente. Si se retienen referencias en variables globales o closures sin limpiar, el Recolector de Basura (Garbage Collector) jamás los liberará, causando OOM.'
      },
      {
        title: 'Estados de un Circuit Breaker',
        content: 'CLOSED (Tráfico normal) -> OPEN (Fallas detectadas, rechaza llamadas inmediatamente sin sobrecargar el servicio remoto) -> HALF-OPEN (Prueba un porcentaje pequeño de tráfico para verificar recuperación).'
      }
    ],
    tradeoffAnalysis: [
      {
        option: 'Circuit Breaker + Retries con Exponential Backoff y Jitter (Recomendado)',
        isRecommended: true,
        pros: ['Evita la cascada de fallos en el ecosistema de microservicios', 'Respuesta inmediata en estado OPEN sin esperar timeouts largos'],
        cons: ['Requiere ajustar métricas de apertura y ventanas de observación'],
        verdict: 'Práctica imprescindible para resiliencia en arquitecturas distribuidas.'
      },
      {
        option: 'Reintentos Infinitos Sincrónicos sin Backoff',
        isRecommended: false,
        pros: ['Fácil de escribir en un bucle for'],
        cons: ['Genera DDOS involuntario sobre el microservicio caído (*Thundering Herd Problem*)'],
        verdict: 'Anti-patrón crítico en ingeniería.'
      }
    ],
    dryLinks: [
      { label: 'Ver Patrón Proxy (Circuit Breaker)', targetPatternId: 'proxy' },
      { label: 'Ver Tema Memoria Stack vs Heap en Ciencias de la Computación', targetTopicId: 'computer-science' },
      { label: 'Ver Guía de SRE, DevOps & Observabilidad (OpenTelemetry)', targetTopicId: 'sre-devops' },
      { label: 'Ver Estrategias de Testing & TDD', targetTopicId: 'testing' }
    ]
  },

  // PILAR 4: TRADEOFFS DE ARQUITECTURA
  {
    id: 'to-distributed-transactions',
    pillar: 'tradeoffs',
    title: 'Evaluación de Tradeoffs: Saga Orchestration vs Choreography vs 2PC',
    subtitle: 'Consistencia en Transacciones Distribuidas a Escala Global',
    tags: ['Tradeoffs', 'Saga Pattern', '2PC', 'Eventual Consistency', 'CQRS'],
    scenario: `Un sistema de compras procesa transacciones que requieren actualizar el Inventario, debitar Saldo del Cliente, generar Factura y notificar al proveedor logístico.
El equipo debate si utilizar Two-Phase Commit (2PC), Saga basada en Eventos (Choreography) o Saga basada en un Orquestador Centralizado (Orchestration).`,
    challenge: 'Como Staff Engineer, evalúa los pro, contras y viabilidad técnica de cada alternativa considerando latencia, acoplamiento, observabilidad y compensaciones transaccionales.',
    stepByStepResolution: [
      {
        stepNumber: 1,
        title: 'Descarte de 2PC (Two-Phase Commit) en Microservicios',
        description: 'Explicar por qué 2PC no escala en la nube moderna.',
        details: [
          '2PC requiere bloqueos distribuidos (Distributed Locks) en las bases de datos de todos los servicios durante la fase de Prepare.',
          'Si un servicio responde lento, bloquea las filas de base de datos de todos los demás servicios, destruyendo el rendimiento.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Comparativa: Saga Coreografía vs Saga Orquestación',
        description: 'Analizar el acoplamiento y la complejidad de observabilidad.',
        details: [
          'Saga Coreografía: Cada servicio escucha eventos y reacciona. Ideal para workflows cortos (2-3 pasos). Riesgo de dependencias circulares y dificultad para rastrear el estado global.',
          'Saga Orquestación: Un orquestador explícito (ej. Temporal / Camunda / State Machine) coordina los pasos y ejecuta las acciones compensatorias si falla un paso.'
        ]
      }
    ],
    deepTheory: [
      {
        title: 'Teorema CAP y PACELC',
        content: 'El Teorema CAP (Consistencia, Disponibilidad, Tolerancia a Particiones) establece que ante una partición de red (P), un sistema distribuido debe elegir entre Consistencia (C) o Disponibilidad (A). PACELC extiende CAP: Si no hay partición (E), el sistema debe elegir entre Latencia (L) y Consistencia (C).'
      }
    ],
    tradeoffAnalysis: [
      {
        option: 'Saga Orquestada con Transacciones Compensatorias (Recomendado para flujos complejos)',
        isRecommended: true,
        pros: ['Estado de la transacción centralizado y fácil de auditar', 'Lógica de compensación/rollback clara', 'Evita ciclos de dependencia'],
        cons: ['Requiere mantener el orquestador como componente crítico de infraestructura'],
        verdict: 'Es la solución preferida por Staff Engineers para procesos de negocio complejos (>3 microservicios).'
      },
      {
        option: 'Two-Phase Commit (2PC / XA Transactions)',
        isRecommended: false,
        pros: ['Garantía de consistencia ACID inmediata'],
        cons: ['Punto único de fallo', 'Contención masiva de memoria y locks de BD', 'Incompatible con escalabilidad horizontal'],
        verdict: 'Obsoleto en arquitectura de microservicios.'
      }
    ],
    dryLinks: [
      { label: 'Ver Patrón Command', targetPatternId: 'command' },
      { label: 'Ver Patrón State', targetPatternId: 'state' },
      { label: 'Ver Patrón Mediator', targetPatternId: 'mediator' },
      { label: 'Ver Guía de Arquitecturas Distribuidas & Resiliencia', targetTopicId: 'resilience-eda' }
    ]
  }
];
