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
      }
    ]
  }
];
