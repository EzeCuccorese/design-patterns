import { technicalDefinitions } from './definitions';

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
          `DIP (Dependency Inversion Principle): ${technicalDefinitions.dip.description}`,
          "DI (Dependency Injection): Es el patrón de diseño técnico que materializa DIP. Consiste en proveer (inyectar) las dependencias requeridas a un objeto desde el exterior, usualmente a través de su constructor, en lugar de que el propio objeto las instancie con 'new'."
        ]
      },
      {
        title: "SOLID (Resumen Rápido)",
        description: "Las cinco directrices indispensables para crear software mantenible y extensible:",
        details: [
          `SRP (Single Responsibility Principle): ${technicalDefinitions.srp.description}`,
          `OCP (Open/Closed Principle): ${technicalDefinitions.ocp.description}`,
          `LSP (Liskov Substitution Principle): ${technicalDefinitions.lsp.description}`,
          `ISP (Interface Segregation Principle): ${technicalDefinitions.isp.description}`,
          `DIP (Dependency Inversion Principle): ${technicalDefinitions.dip.description}`
        ]
      },
      {
        title: "Branching Patterns: Trunk-Based vs Git Flow",
        description: "La velocidad de despliegue en la industria moderna está directamente ligada al patrón de control de versiones elegido.",
        details: [
          `Trunk-Based Development: ${technicalDefinitions.trunkBased.description}`,
          "Git Flow: Enfoque clásico con múltiples ramas de larga duración (develop, master, release, hotfix). Tiende a generar integraciones complejas o cuellos de botella en equipos ágiles.",
          "Cuándo usar: Trunk-Based es ideal para equipos con alta cobertura de tests y despliegue continuo; Git Flow se prefiere en software de lanzamientos programados o regulados."
        ]
      },
      {
        title: "Prácticas de Code Review & Boy Scout Rule",
        description: "La revisión de código y la mentalidad de limpieza continua son las mejores herramientas de prevención de bugs y propagación del conocimiento.",
        details: [
          "Boy Scout Rule: 'Deja siempre el campamento más limpio de como lo encontraste'. Fomenta dejar el archivo que modificas ligeramente mejor estructurado o limpio.",
          "Revisiones constructivas: Enfocarse en el diseño del código, la modularidad y la semántica, delegando el control de espacios y formato a linters automáticos.",
          "Propagación del conocimiento: El code review sirve no solo para buscar bugs, sino para que todo el equipo entienda las decisiones de diseño del sistema."
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
        title: technicalDefinitions.informationExpert.title,
        description: technicalDefinitions.informationExpert.description,
        details: technicalDefinitions.informationExpert.details
      },
      {
        title: technicalDefinitions.creator.title,
        description: technicalDefinitions.creator.description,
        details: technicalDefinitions.creator.details
      },
      {
        title: technicalDefinitions.pureFabrication.title,
        description: technicalDefinitions.pureFabrication.description,
        details: technicalDefinitions.pureFabrication.details
      },
      {
        title: technicalDefinitions.controller.title,
        description: technicalDefinitions.controller.description,
        details: technicalDefinitions.controller.details
      },
      {
        title: technicalDefinitions.protectedVariations.title,
        description: technicalDefinitions.protectedVariations.description,
        details: technicalDefinitions.protectedVariations.details
      }
    ]
  },
  {
    id: "testing",
    title: "Estrategias de Testing & TDD",
    icon: "CheckCircle",
    introduction: "Conceptos esenciales de aserción de calidad y pruebas unitarias que definen la modularidad y desacoplamiento en el diseño de componentes.",
    subsections: [
      {
        title: technicalDefinitions.stubVsMock.title,
        description: technicalDefinitions.stubVsMock.description,
        details: technicalDefinitions.stubVsMock.details
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
    title: "Resiliencia & Arquitecturas Distribuidas",
    icon: "Activity",
    introduction: "Patrones arquitectónicos avanzados diseñados para asegurar la alta disponibilidad, tolerancia a fallos y consistencia de datos en sistemas distribuidos.",
    subsections: [
      {
        title: technicalDefinitions.circuitBreaker.title,
        description: technicalDefinitions.circuitBreaker.description,
        details: technicalDefinitions.circuitBreaker.details
      },
      {
        title: technicalDefinitions.sagaPattern.title,
        description: technicalDefinitions.sagaPattern.description,
        details: technicalDefinitions.sagaPattern.details
      },
      {
        title: technicalDefinitions.transactionalOutbox.title,
        description: technicalDefinitions.transactionalOutbox.description,
        details: technicalDefinitions.transactionalOutbox.details,
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
        title: technicalDefinitions.capTheorem.title,
        description: technicalDefinitions.capTheorem.description,
        details: technicalDefinitions.capTheorem.details
      },
      {
        title: technicalDefinitions.cleanArchitecture.title,
        description: technicalDefinitions.cleanArchitecture.description,
        details: technicalDefinitions.cleanArchitecture.details,
        code: "          [Adaptador de Entrada: UI/Web]\n" +
              "                        │\n" +
              "                        ▼ (Llamadas)\n" +
              "           [Puerto de Entrada: Interfaz Interactor]\n" +
              "                        │\n" +
              "                        ▼\n" +
              "            [Núcleo Lógico de Dominio]\n" +
              "                        ▲\n" +
              "                        │\n" +
              "           [Puerto de Salida: Interfaz Repositorio]\n" +
              "                        ▲\n" +
              "                        │ (Implementa)\n" +
              "        [Adaptador de Salida: DB / Infraestructura]"
      },
      {
        title: technicalDefinitions.cqrs.title,
        description: technicalDefinitions.cqrs.description,
        details: technicalDefinitions.cqrs.details,
        code: "[Cliente UI] ──── Comando (Escribir) ───> [Command Controller] ──> [Write DB]\n" +
              "                                                                      │\n" +
              "                                                                 (Sincroniza)\n" +
              "                                                                      ▼\n" +
              "[Cliente UI] <─── Consulta (Leer) ─────── [Query Controller] ◄─── [Read DB]"
      },
      {
        title: "BFF (Backend-for-Frontend) & Domain-Driven Design (DDD)",
        description: "Estructuración moderna de microservicios basada en el negocio y optimización de clientes móviles y web.",
        details: [
          `BFF: ${technicalDefinitions.bff.description}`,
          `DDD: ${technicalDefinitions.ddd.description}`,
          "Integración industrial: En sistemas complejos, cada Bounded Context (DDD) expone microservicios independientes, y las aplicaciones cliente acceden a ellos a través de un BFF dedicado que agrega y simplifica los datos."
        ]
      }
    ]
  },
  {
    id: "sre-devops",
    title: "SRE, DevOps e Infraestructura",
    icon: "Terminal",
    introduction: "Pautas de observabilidad, cultura de análisis de fallos y despliegues sin interrupciones en la nube.",
    subsections: [
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
          "Paso 2: kubectl logs <pod-name> -n <namespace> --previous. El flag '--previous' es fundamental: trae los logs del contenedor justo antes de que colapsara en el ciclo anterior, revealing excepciones de arranque.",
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
      },
      {
        title: "GitOps & ArgoCD",
        description: "Automatización de despliegues y mantenimiento declarativo utilizando repositorios de Git como la única fuente de verdad.",
        details: [
          `GitOps: ${technicalDefinitions.gitOps.description}`,
          "Reconciliación: Herramientas como ArgoCD o Flux detectan activamente desviaciones entre el repositorio Git y el clúster de Kubernetes, auto-reparando los recursos locales en minutos.",
          "Seguridad: Evita otorgar credenciales de administración del clúster a los desarrolladores o herramientas externas de CI/CD; el agente dentro de K8s tira del repositorio Git de forma interna y segura."
        ]
      },
      {
        title: "Observabilidad Moderna: OpenTelemetry, Prometheus & Grafana",
        description: "La trinidad de la observabilidad y los estándares unificados en la nube para sistemas distribuidos.",
        details: [
          `OpenTelemetry: ${technicalDefinitions.openTelemetry.description}`,
          "Trazabilidad Distribuida: Permite seguir el flujo y la latencia exacta de un request de usuario cruzando múltiples microservicios a través de IDs de traza (traceId).",
          "Métricas y Logs: Prometheus recolecta las métricas agregadas de los endpoints y Grafana provee la visualización centralizada para la toma de decisiones y alertas preventivas."
        ],
        code: "[Request] ──> [BFF (traceId=abc)] ──> [Microservicio Ventas (traceId=abc)]\n" +
              "                                         │\n" +
              "                     (Envía métricas/trazas mediante gRPC/HTTP)\n" +
              "                                         ▼\n" +
              "                         [Colector OpenTelemetry]\n" +
              "                            ├──> Métricas ──> [Prometheus] ──> [Grafana]\n" +
              "                            └──> Trazas ────> [Jaeger / APM]"
      },
      {
        title: "Estrategias de Despliegue Canary con Service Mesh (Istio)",
        description: "Cómo implementar ruteo dinámico de red para lanzamientos seguros de software.",
        details: [
          `Canary Deployments: ${technicalDefinitions.canaryIstio.description}`,
          "Proxy Envoy: Un sidecar intercepta el tráfico de red de los contenedores de forma transparente.",
          "Automatización: Si el análisis de métricas en Prometheus detecta un aumento de errores 5xx o latencia en el contenedor Canary, el despliegue se cancela (rollback automático) sin afectar al 95% restante del tráfico."
        ]
      },
      {
        title: "Contenedores Distroless: Ciberseguridad en Producción",
        description: "Maximización de la seguridad en despliegues minimizando el tamaño y dependencias de los contenedores.",
        details: [
          `Distroless: ${technicalDefinitions.distroless.description}`,
          "Diferencia con Alpine: Alpine Linux incluye BusyBox y apk (gestor de paquetes), lo que aún deja superficie para ataques. Distroless no tiene gestores de paquetes ni shell.",
          "Implementación: Se usa compilación multi-stage de Docker. Compilas con un SDK completo y copias el binario resultante a la imagen distroless base."
        ]
      }
    ]
  },
  {
    id: "tooling-dev",
    title: "Tooling de Desarrollo Moderno",
    icon: "Terminal",
    introduction: "Las herramientas y flujos de automatización que hoy maximizan la velocidad y calidad del desarrollo local en la industria.",
    subsections: [
      {
        title: "Linters & Formateadores en Rust (Biome & Oxlint)",
        description: "El cambio de paradigma en el análisis de código estático por herramientas nativas de alto rendimiento.",
        details: [
          `Biome & Oxlint: ${technicalDefinitions.lintersRust.description}`,
          "Velocidad: Analizan miles de archivos en milisegundos. Libera la CPU local y acorta drásticamente el feedback loop del programador en su IDE.",
          "Configuración Simplificada: Reduce la complejidad del ecosistema de JavaScript consolidando formateador y linter en una sola herramienta libre de conflictos."
        ]
      },
      {
        title: "Husky, Commitlint & Lint-Staged",
        description: "Validación automatizada local en pre-commit para proteger el repositorio de código erróneo.",
        details: [
          `Husky: ${technicalDefinitions.gitHooks.description}`,
          "Commitlint: Valida que los mensajes de commit sigan especificaciones estándar (ej. Conventional Commits) para automatizar notas de lanzamiento.",
          "Lint-staged: Ahorra recursos ejecutando el formateo y linter únicamente sobre el conjunto de archivos modificados activos."
        ],
        code: "git commit -m \"feat: add bff component\"\n" +
              "  │\n" +
              "  ├──> [Husky pre-commit] ──> [Lint-staged] ──> Oxlint / Biome (Solo archivos staged)\n" +
              "  │                                               └──> Exitoso?\n" +
              "  │                                                      │ (Sí)\n" +
              "  ▼                                                      ▼\n" +
              "  ├──> [Husky commit-msg] ──> [Commitlint] ──> ¿Conventional Commit?\n" +
              "  │                                                      │ (Sí)\n" +
              "  ▼                                                      ▼\n" +
              "[Commit Guardado Exitosamente]"
      },
      {
        title: "Local CI/CD con Act (GitHub Actions Local)",
        description: "Ejecución y depuración local de tus pipelines sin necesidad de pushear a la nube.",
        details: [
          `Act: ${technicalDefinitions.localCicd.description}`,
          "Funcionamiento: Lee el archivo YAML del workflow y levanta contenedores de Docker idénticos a los del clúster de GitHub para correr cada paso.",
          "Uso: Ideal para depurar variables de entorno, dependencias de compilación y scripts complejos de bash en minutos."
        ]
      }
    ]
  }
];
