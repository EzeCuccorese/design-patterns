import { technicalDefinitions } from './definitions';

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Subsection {
  title: string;
  description: string;
  details?: string[];
  code?: string;
  table?: TableData;
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
        title: "Cohesión y Acoplamiento: La Piedra Angular del Diseño",
        description: "El diseño de software de calidad busca siempre lograr una alta cohesión interna y un bajo acoplamiento entre los distintos componentes del sistema.",
        details: [
          "Alta Cohesión: Cada módulo o clase tiene un único objetivo lógico muy enfocado. Facilita el entendimiento, mantenimiento y las pruebas unitarias.",
          "Bajo Acoplamiento: Mide el grado de independencia entre módulos. Si están desacoplados, los cambios internos en uno de ellos no repercuten en los demás.",
          "Relación con SOLID: SOLID es el conjunto de directrices prácticas diseñadas específicamente para maximizar la cohesión y minimizar el acoplamiento."
        ]
      },
      {
        title: "SOLID 1: Principio de Responsabilidad Única (SRP)",
        description: "Una clase debe tener una sola razón para sufrir modificaciones, lo que significa que debe resolver una única tarea enfocada a un solo actor o rol del negocio.",
        details: [
          `SRP: ${technicalDefinitions.srp.description}`,
          "Code Smells Relacionados: God Class (clases gigantes con miles de líneas), Divergent Change (modificar la misma clase por requerimientos de distintos departamentos), Shotgun Surgery (un solo cambio requiere modificar decenas de clases).",
          "Beneficio: Pruebas unitarias hiper-enfocadas, refactorizaciones seguras y nulo riesgo de romper lógica no relacionada."
        ],
        code: "// ❌ VIOLACIÓN: Clase 'God Object' con múltiples razones de cambio\n" +
              "class InvoiceService {\n" +
              "  calculateTax(invoice: Invoice) { /* Lógica fiscal */ }\n" +
              "  saveToDatabase(invoice: Invoice) { /* SQL Query */ }\n" +
              "  generatePdf(invoice: Invoice) { /* Formateo PDF */ }\n" +
              "  sendEmail(invoice: Invoice) { /* Protocolo SMTP */ }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN SRP: Clases cohesivas con un solo rol de negocio\n" +
              "class TaxCalculator { calculate(invoice: Invoice) { /* ... */ } }\n" +
              "class InvoiceRepository { save(invoice: Invoice) { /* ... */ } }\n" +
              "class InvoicePdfGenerator { generate(invoice: Invoice) { /* ... */ } }\n" +
              "class EmailNotifier { send(invoice: Invoice) { /* ... */ } }"
      },
      {
        title: "SOLID 2: Principio Abierto/Cerrado (OCP)",
        description: "Las entidades de software (clases, módulos) deben estar abiertas para su extensión pero estrictamente cerradas para su modificación directa.",
        details: [
          `OCP: ${technicalDefinitions.ocp.description}`,
          "Code Smell Relacionado: Escaleras `switch` o `if/else` condicionales comprobando tipos de objetos para alterar el flujo.",
          "Mecanismo de Resolución: Programar contra interfaces o contratos abstractos y utilizar polimorfismo o el patrón Strategy para inyectar nuevos comportamientos."
        ],
        code: "// ❌ VIOLACIÓN: Modificar la clase ante cada nuevo método de pago\n" +
              "class PaymentProcessor {\n" +
              "  process(payment: any) {\n" +
              "    if (payment.type === 'CREDIT') { /* Lógica Tarjeta */ }\n" +
              "    else if (payment.type === 'PAYPAL') { /* Lógica Paypal */ }\n" +
              "    else if (payment.type === 'CRYPTO') { /* ¡Tuvimos que editar código testeado! */ }\n" +
              "  }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN OCP: Extensión mediante contratos sin editar código existente\n" +
              "interface PaymentMethod { process(amount: number): void; }\n" +
              "class CreditCardPayment implements PaymentMethod { process(amount: number) { /* ... */ } }\n" +
              "class CryptoPayment implements PaymentMethod { process(amount: number) { /* ... */ } }\n\n" +
              "class PaymentProcessor {\n" +
              "  process(method: PaymentMethod, amount: number) { method.process(amount); }\n" +
              "}"
      },
      {
        title: "SOLID 3: Principio de Sustitución de Liskov (LSP)",
        description: "Las subclases o tipos derivados deben poder sustituir a sus clases base sin alterar el comportamiento esperado ni la corrección del programa.",
        details: [
          `LSP: ${technicalDefinitions.lsp.description}`,
          "Code Smell Relacionado: Subclases que lanzan `UnsupportedOperationException`, sobreescriben métodos dejándolos vacíos o fortalecen las precondiciones del padre.",
          "Regla de Oro: Si `B` hereda de `A`, cualquier programa que use `A` debe funcionar exactamente igual si se le pasa una instancia de `B`."
        ],
        code: "// ❌ VIOLACIÓN: Subclase rompe el contrato y la expectativa del tipo padre\n" +
              "class Bird { fly() { console.log('Volando...'); } }\n" +
              "class Ostrich extends Bird {\n" +
              "  fly() { throw new Error('¡Las avestruces no vuelan!'); } // ❌ Crash inesperado en runtime\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN LSP: Jerarquía de contratos coherente que respeta capacidades realistas\n" +
              "interface Bird { eat(): void; }\n" +
              "interface FlyingBird extends Bird { fly(): void; }\n\n" +
              "class Goldfinch implements FlyingBird { eat() { /* ... */ } fly() { /* ... */ } }\n" +
              "class Ostrich implements Bird { eat() { /* ... */ } } // No promete lo que no puede cumplir"
      },
      {
        title: "SOLID 4: Principio de Segregación de Interfaces (ISP)",
        description: "Es preferible diseñar muchas interfaces específicas y delgadas a tener una sola interfaz gigantesca y monolítica.",
        details: [
          `ISP: ${technicalDefinitions.isp.description}`,
          "Code Smell Relacionado: Fat Interfaces (interfaces 'gordas' que fuerzan a las clases cliente a implementar métodos con firmas vacías o lanzar excepciones).",
          "Mecanismo: Dividir contratos extensos en interfaces atómicas orientadas a roles específicos de consumo."
        ],
        code: "// ❌ VIOLACIÓN: Interfaz monolítica que obliga a implementar métodos inútiles\n" +
              "interface MultiFunctionDevice {\n" +
              "  print(): void;\n" +
              "  scan(): void;\n" +
              "  fax(): void;\n" +
              "}\n" +
              "class SimplePrinter implements MultiFunctionDevice {\n" +
              "  print() { /* ok */ }\n" +
              "  scan() { throw new Error('No soportado'); } // ❌ Obligado a implementar\n" +
              "  fax() { throw new Error('No soportado'); }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN ISP: Interfaces segredadas y enfocadas a capacidades reales\n" +
              "interface Printer { print(): void; }\n" +
              "interface Scanner { scan(): void; }\n\n" +
              "class BasicPrinter implements Printer { print() { /* ... */ } }\n" +
              "class SmartCopier implements Printer, Scanner { print() { /* ... */ } scan() { /* ... */ } }"
      },
      {
        title: "SOLID 5: Principio de Inversión de Dependencias (DIP)",
        description: "Los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender exclusivamente de abstracciones (interfaces).",
        details: [
          `DIP: ${technicalDefinitions.dip.description}`,
          "Distinción conceptual clave: DIP es el principio abstracto de diseño. DI (Inyección de Dependencias) es la técnica concreta de inyección. IoC Container es el framework/tooling que automatiza la creación e inyección."
        ],
        table: {
          headers: ["Concepto", "Naturaleza", "Propósito Principal"],
          rows: [
            ["DIP (Dependency Inversion)", "Principio de Diseño (Abstracto)", "Establece que el dominio no debe depender de detalles de infraestructura."],
            ["DI (Dependency Injection)", "Patrón Técnico (Concreto)", "Técnica de pasar dependencias al constructor en lugar de hacer 'new'."],
            ["IoC Container", "Tooling / Framework", "Contenedor (ej. Spring, NestJS, Inversify) que orquesta la instanciación e inyección."]
          ]
        },
        code: "// ❌ VIOLACIÓN: Lógica de negocio (Alto Nivel) acoplada a infraestructura (Bajo Nivel)\n" +
              "class OrderService {\n" +
              "  private db = new MySQLDatabase(); // ❌ Acoplado rígidamente a MySQL con 'new'\n" +
              "  saveOrder(order: any) { this.db.query('INSERT INTO...'); }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN DIP: Inyección del contrato abstracto por constructor\n" +
              "interface OrderRepository { save(order: any): void; }\n" +
              "class PostgresRepository implements OrderRepository { save(order: any) { /* ... */ } }\n\n" +
              "class OrderService {\n" +
              "  constructor(private repo: OrderRepository) {} // Abstracción inyectada\n" +
              "  saveOrder(order: any) { this.repo.save(order); }\n" +
              "}"
      },
      {
        title: "Principios Pragmáticos: DRY, KISS, YAGNI & Ley de Demeter",
        description: "Guías fundamentales de ingeniería de software para evitar la sobre-ingeniería y mantener la simplicidad operativa.",
        details: [
          `DRY: ${technicalDefinitions.dry.description}`,
          `KISS: ${technicalDefinitions.kiss.description}`,
          `YAGNI: ${technicalDefinitions.yagni.description}`,
          `Ley de Demeter: ${technicalDefinitions.lawOfDemeter.description}`,
          `Composición sobre Herencia: ${technicalDefinitions.compositionOverInheritance.description}`
        ],
        code: "// ❌ VIOLACIÓN Ley de Demeter: 'Train Wreck' navegando grafos de objetos internos\n" +
              "const city = user.getAccount().getBillingAddress().getCity().getName();\n\n" +
              "// ✅ SOLUCIÓN Ley de Demeter: Encapsulación con método directo de alto nivel\n" +
              "const city = user.getBillingCity();\n\n" +
              "// ❌ VIOLACIÓN Composición vs Herencia: Jerarquía de herencia rígida y frágil\n" +
              "class SuperAdminUser extends AdminUser { /* herencia profunda */ }\n\n" +
              "// ✅ SOLUCIÓN Composición: Objeto compuesto que recibe estrategias/roles dinámicos\n" +
              "class User {\n" +
              "  constructor(private permissions: Permission[]) {}\n" +
              "  hasAccess(perm: Permission) { return this.permissions.includes(perm); }\n" +
              "}"
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
    introduction: "General Responsibility Assignment Software Patterns. Las 9 directrices fundamentales desarrolladas por Craig Larman para la asignación de responsabilidades a clases en el modelado orientado a objetos.",
    subsections: [
      {
        title: technicalDefinitions.informationExpert.title,
        description: technicalDefinitions.informationExpert.description,
        details: technicalDefinitions.informationExpert.details,
        code: "// ❌ VIOLACIÓN: Un servicio externo calcula el total navegando datos ajenos\n" +
              "class CheckoutService {\n" +
              "  calculateTotal(cart: ShoppingCart) {\n" +
              "    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\n" +
              "  }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN GRASP Information Expert: El Carrito calcula su total porque POSEE la información\n" +
              "class ShoppingCart {\n" +
              "  private items: CartItem[] = [];\n" +
              "  calculateTotal(): number {\n" +
              "    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);\n" +
              "  }\n" +
              "}"
      },
      {
        title: technicalDefinitions.creator.title,
        description: technicalDefinitions.creator.description,
        details: technicalDefinitions.creator.details,
        code: "// ❌ VIOLACIÓN: Un controlador externo crea las líneas del pedido sin tener relación directa\n" +
              "const item = new OrderItem(product, quantity);\n" +
              "order.addItem(item);\n\n" +
              "// ✅ SOLUCIÓN GRASP Creator: El Order crea sus OrderItems porque los CONTIENE y AGREGA\n" +
              "class Order {\n" +
              "  private items: OrderItem[] = [];\n" +
              "  createItem(product: Product, quantity: number) {\n" +
              "    const item = new OrderItem(product, quantity);\n" +
              "    this.items.push(item);\n" +
              "  }\n" +
              "}"
      },
      {
        title: technicalDefinitions.controller.title,
        description: technicalDefinitions.controller.description,
        details: technicalDefinitions.controller.details,
        code: "// ❌ VIOLACIÓN: Lógica de negocio en la capa gráfica o de presentación\n" +
              "button.onClick = () => { /* validar stock, cobrar tarjeta, actualizar DB */ };\n\n" +
              "// ✅ SOLUCIÓN GRASP Controller: Un UseCase/Controlador orquesta el flujo de negocio\n" +
              "class CreateOrderController {\n" +
              "  constructor(private useCase: CreateOrderUseCase) {}\n" +
              "  handleRequest(req: Request) {\n" +
              "    return this.useCase.execute(req.body);\n" +
              "  }\n" +
              "}"
      },
      {
        title: technicalDefinitions.lowCoupling.title,
        description: technicalDefinitions.lowCoupling.description,
        details: technicalDefinitions.lowCoupling.details,
        code: "// ❌ VIOLACIÓN: Alto acoplamiento a una clase concreta de base de datos\n" +
              "class OrderManager {\n" +
              "  private db = new OracleDatabase(); // Si cambia la DB, rompe OrderManager\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN GRASP Low Coupling: Acoplamiento hacia una interfaz estable\n" +
              "class OrderManager {\n" +
              "  constructor(private db: DatabaseConnection) {} // Dependencia abstracta\n" +
              "}"
      },
      {
        title: technicalDefinitions.highCohesion.title,
        description: technicalDefinitions.highCohesion.description,
        details: technicalDefinitions.highCohesion.details,
        code: "// ❌ VIOLACIÓN: Baja cohesión (Clase mezclando envío de emails con procesamiento matemático)\n" +
              "class UserManager {\n" +
              "  registerUser() { /* ... */ }\n" +
              "  sendSMSToken() { /* ... */ }\n" +
              "  renderUserProfileHTML() { /* UI Rendering */ }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN GRASP High Cohesion: Módulos hiper-enfocados\n" +
              "class UserRegistrationService { register() { /* ... */ } }\n" +
              "class SmsNotificationService { sendToken() { /* ... */ } }"
      },
      {
        title: technicalDefinitions.pureFabrication.title,
        description: technicalDefinitions.pureFabrication.description,
        details: technicalDefinitions.pureFabrication.details,
        code: "// ❌ VIOLACIÓN: Contaminar el objeto de dominio User con lógica de exportación física\n" +
              "class User {\n" +
              "  exportToPDF() { /* Lógica compleja de renderizado PDF */ }\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN GRASP Pure Fabrication: Fabricar una clase artificial de servicio\n" +
              "class UserPdfExporter {\n" +
              "  export(user: User): Buffer { /* Lógica de PDF aislada del dominio */ }\n" +
              "}"
      },
      {
        title: technicalDefinitions.indirection.title,
        description: technicalDefinitions.indirection.description,
        details: technicalDefinitions.indirection.details,
        code: "// ❌ VIOLACIÓN: Servicio de ventas acoplado directamente al servicio de inventario y facturación\n" +
              "class SalesService { /* llama a InventoryService y BillingService directamente */ }\n\n" +
              "// ✅ SOLUCIÓN GRASP Indirection: Introducir un Mediador o Event Bus intermedio\n" +
              "class EventBus {\n" +
              "  publish(event: DomainEvent) { /* desacopla emisor de receptores */ }\n" +
              "}"
      },
      {
        title: technicalDefinitions.graspPolymorphism.title,
        description: technicalDefinitions.graspPolymorphism.description,
        details: technicalDefinitions.graspPolymorphism.details,
        code: "// ❌ VIOLACIÓN: Estructuras condicionales para manejar variaciones por tipo\n" +
              "function getTax(user: User) {\n" +
              "  if (user.type === 'RETAIL') return user.amount * 0.21;\n" +
              "  if (user.type === 'WHOLESALE') return user.amount * 0.10;\n" +
              "}\n\n" +
              "// ✅ SOLUCIÓN GRASP Polymorphism: Delegar el comportamiento al tipo específico\n" +
              "interface UserTaxStrategy { calculateTax(amount: number): number; }\n" +
              "class RetailTax implements UserTaxStrategy { calculateTax(amount: number) { return amount * 0.21; } }\n" +
              "class WholesaleTax implements UserTaxStrategy { calculateTax(amount: number) { return amount * 0.10; } }"
      },
      {
        title: technicalDefinitions.protectedVariations.title,
        description: technicalDefinitions.protectedVariations.description,
        details: technicalDefinitions.protectedVariations.details,
        code: "// ❌ VIOLACIÓN: Consumir la API directa inestable de un proveedor de pagos de terceros\n" +
              "import { UnstableStripeSDK } from 'third-party-sdk';\n\n" +
              "// ✅ SOLUCIÓN GRASP Protected Variations: Envolver la API inestable con una interfaz estable propia\n" +
              "interface PaymentGateway { charge(amount: number): Promise<boolean>; }\n" +
              "class StripeAdapter implements PaymentGateway {\n" +
              "  async charge(amount: number) { /* aísla cambios del SDK de terceros */ return true; }\n" +
              "}"
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
        title: "Análisis Profundo de Latencia: Percentil 99 (P99) vs Promedio & Tail Latency",
        description: "Estándar de ingeniería y System Design para medir latencia real en arquitecturas distribuidas a escala.",
        details: [
          `P99 (Percentil 99): ${technicalDefinitions.p99Latency.description}`,
          "¿Por qué el promedio es engañoso?: En distribuciones no-Gaussianas (asimétricas), el promedio enmascara picos catastróficos. Si 99 usuarios responden en 1ms y 1 usuario sufre un bloqueo de 10.000ms (10s), el promedio dará ~100ms (parece aceptable), ocultando que 1 de cada 100 clientes experimentó un fallo grave.",
          "Causas de la Cola de Latencia (Long-Tail Latency): Pausas del Garbage Collector (Stop-the-World), contención de locks en Base de Datos, reintentos de red por pérdida de paquetes, I/O saturation y cold starts de Serverless/Kubernetes.",
          "Amplificación de Tail Latency (Efecto Fan-out en Microservicios): Si un request del usuario dispara 100 llamadas en paralelo a backend microservices y cada uno tiene un P99 de 10ms (1% de chance de lentitud), la probabilidad de que la petición completa se retrase es P(lento) = 1 - (0.99)^100 ≈ 63.4%. ¡Más de la mitad de los usuarios sufrirán la latencia P99!",
          "Instrumentación PromQL en Prometheus: Se calcula analizando histogramas con la función `histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`. Para reducir overhead en producción se emplean algoritmos de aproximación como HDR Histogram o t-digest.",
          "Técnicas de Mitigación (Speculative Retries / Hedged Requests): Estrategia pionera de Google (Jeffrey Dean) donde si una solicitud no responde en su percentil P95, se envía una segunda petición idéntica 'hedged' a réplica y se toma el resultado de la primera en responder, eliminando el P99 tail.",
          "Impacto en SLAs/SLOs: Definir contratos de nivel de servicio basados en percentiles (ej. P99 < 100ms) garantiza la estabilidad de la experiencia de usuario a escala, evitando falsos positivos de salud por métricas promedio."
        ],
        code: "// Cálculo de P99 PromQL en Prometheus:\n" +
              "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))\n\n" +
              "// Efecto Fan-out en Microservicios (Amplificación de Tail Latency):\n" +
              "[Request Cliente] ───> [Gateway] ──┬──> Subservicio 1 (P99 = 10ms)\n" +
              "                                  ├──> Subservicio 2 (P99 = 10ms)\n" +
              "                                  │    ...\n" +
              "                                  └──> Subservicio 100 (P99 = 10ms)\n" +
              "Probabilidad de Latencia Alta Total = 1 - (0.99)^100 ≈ 63.4%"
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
    introduction: "Las herramientas y flujos de automatización de alto rendimiento que maximizan la velocidad y calidad del desarrollo local en TypeScript, Python, Go y Java.",
    subsections: [
      {
        title: "Branching Patterns & Feature Flags (Multi-Lenguaje)",
        description: "Estrategias de ramificación modernas (Trunk-Based vs Git Flow) y desacoplamiento de despliegue mediante Feature Toggles en TypeScript, Python, Go y Java.",
        details: [
          `Trunk-Based Development: ${technicalDefinitions.trunkBased.description}`,
          "Git Flow: Enfoque clásico con múltiples ramas de larga duración (develop, master, release). Presenta alto riesgo de 'merge hell' y cuellos de botella en entornos ágiles.",
          "Feature Flags / Feature Toggles: Patrón esencial para Trunk-Based que permite fusionar código a 'main' diariamente manteniendo funcionalidades incompletas ocultas mediante banderas en tiempo de ejecución."
        ],
        table: {
          headers: ["Criterio", "Trunk-Based Development", "Git Flow"],
          rows: [
            ["Vida media de rama", "Ultra corta (< 24 horas)", "Larga (semanas o meses)"],
            ["Frecuencia de despliegue", "Múltiples veces por día", "Por lanzamientos programados (sprints)"],
            ["Riesgo de Merge Hell", "Casi nulo (integración continua real)", "Muy alto (conflictos masivos en rebase)"],
            ["Mecanismo de Despliegue", "Feature Flags / Toggles en runtime", "Merge congelado entre ramas de release"]
          ]
        },
        code: "// 1. TYPESCRIPT\n" +
              "class FeatureFlags {\n" +
              "  static isEnabled(feature: string): boolean {\n" +
              "    return process.env[`FEATURE_${feature}`] === 'true';\n" +
              "  }\n" +
              "}\n" +
              "if (FeatureFlags.isEnabled('NEW_CHECKOUT')) { /* nuevo flujo */ }\n\n" +
              "# 2. PYTHON\n" +
              "import os\n" +
              "class FeatureFlags:\n" +
              "    @staticmethod\n" +
              "    def is_enabled(feature: str) -> bool:\n" +
              "        return os.getenv(f'FEATURE_{feature.upper()}', 'false').lower() == 'true'\n\n" +
              "// 3. GO (Golang - Thread-Safe)\n" +
              "type FeatureFlags struct { flags map[string]bool }\n" +
              "func (f *FeatureFlags) IsEnabled(feature string) bool {\n" +
              "    return f.flags[feature]\n" +
              "}\n\n" +
              "// 4. JAVA 21\n" +
              "public record FeatureFlags(Map<String, Boolean> flags) {\n" +
              "    public boolean isEnabled(String feature) {\n" +
              "        return flags.getOrDefault(feature, false);\n" +
              "    }\n" +
              "}"
      },
      {
        title: "Linters & Formateadores de Alto Rendimiento (Multi-Lenguaje)",
        description: "Análisis estático y formateo nativo acelerado en TypeScript (Biome/Oxlint), Python (Ruff), Go (golangci-lint) y Java (Spotless).",
        details: [
          `TypeScript (Biome & Oxlint): ${technicalDefinitions.lintersRust.description}`,
          `Python (Ruff & uv): ${technicalDefinitions.ruffPython.description}`,
          `Go (golangci-lint): ${technicalDefinitions.golangciLint.description}`,
          `Java (Spotless): ${technicalDefinitions.spotlessJava.description}`
        ],
        table: {
          headers: ["Lenguaje", "Herramienta Moderna", "Reemplaza a", "Ventaja Clave"],
          rows: [
            ["TypeScript/JS", "Biome / Oxlint", "ESLint, Prettier, Babel", "100x más rápido, parseo AST en una sola pasada en Rust."],
            ["Python", "Ruff & uv", "Flake8, Black, isort, pip", "Linter/formatter y gestor de paquetes escrito en Rust."],
            ["Go", "golangci-lint", "Linters individuales de Go", "Ejecución concurrente reutilizando el AST de Go."],
            ["Java", "Spotless & Gradle Cache", "Formateadores IDE manuales", "Integración CI/CD estricta con comprobación incremental."]
          ]
        },
        code: "// 1. TYPESCRIPT (biome.json)\n" +
              "{\n" +
              "  \"$schema\": \"https://biomejs.dev/schemas/1.8.3/schema.json\",\n" +
              "  \"formatter\": { \"enabled\": true, \"indentStyle\": \"space\" },\n" +
              "  \"linter\": { \"enabled\": true, \"rules\": { \"recommended\": true } }\n" +
              "}\n\n" +
              "# 2. PYTHON (pyproject.toml - Ruff Config)\n" +
              "[tool.ruff]\n" +
              "line-length = 88\n" +
              "select = [\"E\", \"F\", \"I\", \"B\"] # Pyflakes, pycodestyle, isort, bugbear\n\n" +
              "# 3. GO (.golangci.yml)\n" +
              "linters:\n" +
              "  enable:\n" +
              "    - errcheck\n" +
              "    - gosimple\n" +
              "    - govet\n" +
              "    - staticcheck\n\n" +
              "// 4. JAVA (build.gradle - Spotless Plugin)\n" +
              "spotless {\n" +
              "  java { googleJavaFormat('1.17.0') }\n" +
              "}"
      },
      {
        title: "Git Hooks & Automatización Local Multi-Lenguaje (Husky, Commitlint & pre-commit)",
        description: "Validación automatizada antes del commit para proteger el repositorio en todos los stacks tecnológicos.",
        details: [
          `Husky & Commitlint: ${technicalDefinitions.gitHooks.description}`,
          "pre-commit Framework (Python/Go/Java/TS): Herramienta agnóstica escrita en Python que gestiona e instala automáticamente hooks en repositorios políglotas.",
          "Conventional Commits: Especificación estricta para mensajes de commit (ej. `feat(auth): add jwt support`, `fix(api): handle timeout`), permitiendo la generación automática de changelogs y versionado semántico."
        ],
        code: "git commit -m \"feat(core): add multi-language support\"\n" +
              "  │\n" +
              "  ├──> [Pre-commit Hook] ──> [pre-commit / Husky]\n" +
              "  │                                 │\n" +
              "  │        ┌────────────────────────┼────────────────────────┐\n" +
              "  │        ▼                        ▼                        ▼\n" +
              "  │   [TS/JS: Biome]        [Python: Ruff]         [Go: golangci-lint]\n" +
              "  │        │                        │                        │\n" +
              "  │        └────────────────────────┼────────────────────────┘\n" +
              "  │                                 ▼ Exitoso? (Sí)\n" +
              "  ├──> [Commitlint] ──────────> ¿Es Conventional Commit?\n" +
              "  │                                 ▼ Exitoso? (Sí)\n" +
              "  ▼\n" +
              "[Commit Guardado en Git]\n\n" +
              "# Configuración Agnóstica Multi-Lenguaje (.pre-commit-config.yaml):\n" +
              "repos:\n" +
              "  - repo: https://github.com/astral-sh/ruff-pre-commit\n" +
              "    rev: v0.4.0\n" +
              "    hooks:\n" +
              "      - id: ruff\n" +
              "      - id: ruff-format"
      },
      {
        title: "Gestores de Paquetes & Build Systems (pnpm, uv, go mod, Gradle)",
        description: "Optimización de almacenamiento de dependencias y cachés de compilación en TypeScript, Python, Go y Java.",
        details: [
          `TypeScript (pnpm & Turborepo): ${technicalDefinitions.pnpmContentAddressable.description}`,
          `Python (uv & poetry): ${technicalDefinitions.ruffPython.description}`,
          `Go (go mod): ${technicalDefinitions.golangciLint.description}`,
          `Java (Gradle & Maven): ${technicalDefinitions.spotlessJava.description}`
        ],
        code: "// ESTRUCTURA DE ENLACES SIMBÓLICOS DE PNPM (Ahorro de RAM/Disco):\n" +
              "Tienda Global (~/.local/share/pnpm/store/v3)\n" +
              "  └── [react@18.2.0] <────── Hard Link ──────┐\n" +
              "                                             │\n" +
              "Proyecto / node_modules                      │\n" +
              "  └── .pnpm/react@18.2.0/node_modules/react ─┘ (Symlink aislado)\n\n" +
              "// CONFIGURACIÓN DE TURBOREPO (turbo.json - Multi-package caching):\n" +
              "{\n" +
              "  \"pipeline\": {\n" +
              "    \"build\": { \"dependsOn\": [\"^build\"], \"outputs\": [\"dist/**\"] },\n" +
              "    \"test\": { \"dependsOn\": [\"build\"], \"outputs\": [] }\n" +
              "  }\n" +
              "}"
      },
      {
        title: "Devcontainers & Entornos Políglotas como Código",
        description: "Estandarización del entorno completo de desarrollo en Docker para TypeScript, Python, Go y Java 21.",
        details: [
          `Devcontainers: ${technicalDefinitions.devcontainers.description}`,
          "Eliminación de conflictos entre desarrolladores en Mac M-Series, Linux y Windows (WSL2).",
          "Auto-configuración del IDE con extensiones de lenguaje, SDKs y herramientas pre-instaladas."
        ],
        code: "// .devcontainer/devcontainer.json (Entorno Políglota de Producción):\n" +
              "{\n" +
              "  \"name\": \"Polyglot Dev Environment (TS, Python, Go, Java)\",\n" +
              "  \"image\": \"mcr.microsoft.com/devcontainers/base:ubuntu-22.04\",\n" +
              "  \"features\": {\n" +
              "    \"ghcr.io/devcontainers/features/node:1\": { \"version\": \"22\" },\n" +
              "    \"ghcr.io/devcontainers/features/python:1\": { \"version\": \"3.12\" },\n" +
              "    \"ghcr.io/devcontainers/features/go:1\": { \"version\": \"1.22\" },\n" +
              "    \"ghcr.io/devcontainers/features/java:1\": { \"version\": \"21\" }\n" +
              "  },\n" +
              "  \"customizations\": {\n" +
              "    \"vscode\": {\n" +
              "      \"extensions\": [\n" +
              "        \"biomejs.biome\",\n" +
              "        \"charliermarsh.ruff\",\n" +
              "        \"golang.Go\",\n" +
              "        \"vscjava.vscode-java-pack\"\n" +
              "      ]\n" +
              "    }\n" +
              "  }\n" +
              "}"
      },
      {
        title: "Local CI/CD con Act (GitHub Actions Local)",
        description: "Ejecución y depuración local de tus pipelines sin necesidad de pushear a la nube.",
        details: [
          `Act: ${technicalDefinitions.localCicd.description}`,
          "Funcionamiento: Lee el archivo YAML del workflow y levanta contenedores de Docker idénticos a los del clúster de GitHub para correr cada paso.",
          "Uso: Ideal para depurar variables de entorno, dependencias de compilación y scripts complejos de bash en minutos."
        ],
        code: "# Ejecución local de GitHub Actions con Act:\n" +
              "$ act push                              # Ejecuta eventos de push localmente\n" +
              "$ act -j test                           # Ejecuta únicamente el job 'test'\n" +
              "$ act -s GITHUB_TOKEN=secret_token_123  # Pasa secretos locales simulados"
      }
    ]
  },
  {
    id: "computer-science",
    title: "Ciencias de la Computación & Linux",
    icon: "Binary",
    introduction: "Compendio avanzado de estructuras de datos de bajo nivel, complejidad algorítmica, análisis de patrones de texto y comandos esenciales de diagnóstico en Linux.",
    subsections: [
      {
        title: "Memoria Stack vs Heap: La Pila y El Montón",
        description: "Cuando un programa se ejecuta, el sistema operativo le asigna dos áreas de memoria RAM principales para trabajar: La Pila (Stack) y El Montón (Heap). Entender la diferencia entre ambas y saber qué se guarda en cada lugar es fundamental para responder preguntas de bajo nivel y optimización.",
        details: [
          "1. La Pila (Stack): Estructura de memoria secuencial muy rápida y ordenada bajo el principio LIFO (Last In, First Out) gestionada automáticamente por la CPU. Guarda variables locales primitivas, punteros/referencias que apuntan a objetos y contextos de ejecución de funciones. Su tamaño es reducido; si se llena (ej. por recursividad infinita), el programa colapsa con un StackOverflowError.",
          "2. El Montón (Heap): Zona de memoria de gran tamaño, desordenada y dinámica. La memoria se asigna y libera bajo demanda a lo largo del ciclo de vida de la aplicación. Guarda todos los objetos instanciados físicamente (con new o dinámicos) y sus atributos/campos. Si se acumulan objetos sin liberar sus referencias (fugas de memoria/memory leaks), se llena la memoria y el sistema operativo mata el proceso lanzando un OutOfMemoryError (OOM).",
          "3. Liberación de memoria: Al finalizar la ejecución de una función, su bloque de variables (frame) en la Pila se destruye instantáneamente. En cambio, los objetos físicos en el Heap permanecen hasta que un proceso en background llamado Garbage Collector (en Java, Node.js, Python) pasa, detecta qué objetos ya no tienen referencias activas desde la Pila, y los destruye físicamente."
        ],
        code: "// 1. JAVA\n" +
              "public void procesar() {\n" +
              "    int edad = 30;                         // (1) Guardado directamente en la Pila (primitivo)\n" +
              "    Cliente cliente = new Cliente(\"Eze\");  // (2) Objeto físico en el Heap; la referencia local va en la Pila\n" +
              "}\n\n" +
              "// 2. NODE.JS (TypeScript)\n" +
              "function procesar() {\n" +
              "    let edad = 30;                         // Guardado en la Pila (primitivo del motor V8)\n" +
              "    let cliente = new Cliente(\"Eze\");      // Objeto instanciado en el Heap; referencia local en la Pila\n" +
              "}\n\n" +
              "// 3. PYTHON\n" +
              "def procesar():\n" +
              "    edad = 30                              // Entero en Python (es un objeto, pero optimizado en cache de enteros)\n" +
              "    cliente = Cliente(\"Eze\")               // Instancia física en el Heap; variable local de referencia en la Pila\n\n" +
              "// 4. GO (Escape Analysis)\n" +
              "func procesar() *Cliente {\n" +
              "    edad := 30                             // Pila: asignado en el frame local de la función\n" +
              "    cliente := &Cliente{Nombre: \"Eze\"}     // El compilador detecta que se retorna el puntero, por lo que\n" +
              "    return cliente                         // 'escapa' el objeto al Heap para que sobreviva a la función\n" +
              "}\n\n" +
              "PILA (Stack)                   MONTÓN (Heap)\n" +
              "┌──────────────┐               ┌─────────────────────────────────┐\n" +
              "│ edad = 30    │               │                                 │\n" +
              "├──────────────┤               │   Cliente (\"Eze\") <─────────────┤ (Objeto real)\n" +
              "│ cliente ─────┼──────────────>│   { nombre: \"Eze\", ... }        │\n" +
              "└──────────────┘               └─────────────────────────────────┘",
        table: {
          headers: ["Característica", "La Pila (Stack)", "El Montón (Heap)"],
          rows: [
            ["Tipo de acceso", "Secuencial (LIFO), ordenado y ultra rápido por la CPU.", "Aleatorio, un poco más lento (requiere buscar punteros en memoria)."],
            ["Tamaño máximo", "Muy limitado (usualmente pocos Megabytes definidos por hilo).", "Muy grande (toda la RAM disponible asignada al proceso)."],
            ["Contenido", "Variables locales primitivas y referencias/punteros a objetos.", "Objetos reales creados con 'new' o dinámicos, y sus atributos."],
            ["Gestión", "Automática por hardware (CPU / compilador).", "Manual (C/C++) o automática vía Garbage Collector (Java, Node, Python, Go)."],
            ["Error por exceso", "StackOverflowError (ej. por recursividad infinita).", "OutOfMemoryError (OOM) (ej. por fugas de memoria o exceso de objetos)."]
          ]
        }
      },
      {
        title: "Matrices Dispersas (Sparse Matrices)",
        description: "Formas optimizadas de almacenar matrices con alta cantidad de ceros para evitar el desperdicio de RAM y ciclos de CPU. Se implementan principalmente tres esquemas de compresión:",
        details: [
          "COO (Coordinate List): Almacena una lista de tuplas (fila, columna, valor) únicamente para los elementos que no son cero. Óptimo para creación dinámica o incremental.",
          "CSR (Compressed Sparse Row): Almacena tres arrays planos: 'values' (valores no nulos), 'col_indices' (columnas de esos valores) y 'row_offsets' (punteros acumulativos de tamaño N+1 que marcan dónde inicia cada fila en 'values'). Es el estándar para cálculo numérico.",
          "CSC (Compressed Sparse Column): Formato gemelo de CSR pero comprimiendo por columnas. Ideal para accesos rápidos verticales u operaciones por columnas."
        ],
        code: "// Conversión de Matriz Densa a CSR (Compressed Sparse Row)\n" +
              "interface CSRMatrix {\n" +
              "  values: number[];\n" +
              "  colIndices: number[];\n" +
              "  rowOffsets: number[];\n" +
              "}\n\n" +
              "function denseToCSR(matrix: number[][]): CSRMatrix {\n" +
              "  const rows = matrix.length;\n" +
              "  const cols = matrix[0]?.length || 0;\n" +
              "  const values: number[] = [];\n" +
              "  const colIndices: number[] = [];\n" +
              "  const rowOffsets: number[] = [0];\n\n" +
              "  let nonZeroCount = 0;\n" +
              "  for (let r = 0; r < rows; r++) {\n" +
              "    for (let c = 0; c < cols; c++) {\n" +
              "      const val = matrix[r][c];\n" +
              "      if (val !== 0) {\n" +
              "        values.push(val);\n" +
              "        colIndices.push(c);\n" +
              "        nonZeroCount++;\n" +
              "      }\n" +
              "    }\n" +
              "    rowOffsets.push(nonZeroCount);\n" +
              "  }\n" +
              "  return { values, colIndices, rowOffsets };\n" +
              "}"
      },
      {
        title: "Árboles Binarios (Binary Trees)",
        description: "Estructuras de datos jerárquicas recursivas donde cada nodo posee un hijo izquierdo y otro derecho como máximo. Sus algoritmos de recorrido se dividen según cómo se visite el nodo raíz y sus hijos:",
        details: [
          "DFS - Preorder (Raíz -> Izquierda -> Derecha): Se procesa primero el nodo padre, ideal para operaciones de clonación o copia estructurada del árbol.",
          "DFS - Inorder (Izquierda -> Raíz -> Derecha): En un BST, procesa los nodos de menor a mayor. Devuelve los elementos en orden ascendente perfecto.",
          "DFS - Postorder (Izquierda -> Derecha -> Raíz): Visita primero todos los hijos antes de procesar el padre, ideal para borrar nodos o liberar memoria sin dejar referencias perdidas (leaks).",
          "BFS - Level-Order (Recorrido en Amplitud): Visita los nodos nivel por nivel de izquierda a derecha. Requiere una Cola (FIFO) auxiliar en lugar de recursión."
        ],
        code: "interface TreeNode<T> {\n" +
              "  value: T;\n" +
              "  left: TreeNode<T> | null;\n" +
              "  right: TreeNode<T> | null;\n" +
              "}\n\n" +
              "// DFS Preorder: Raíz -> Izquierda -> Derecha\n" +
              "function preOrder<T>(node: TreeNode<T> | null, res: T[] = []): T[] {\n" +
              "  if (node) {\n" +
              "    res.push(node.value);\n" +
              "    preOrder(node.left, res);\n" +
              "    preOrder(node.right, res);\n" +
              "  }\n" +
              "  return res;\n" +
              "}\n\n" +
              "// DFS Inorder: Izquierda -> Raíz -> Derecha\n" +
              "function inOrder<T>(node: TreeNode<T> | null, res: T[] = []): T[] {\n" +
              "  if (node) {\n" +
              "    inOrder(node.left, res);\n" +
              "    res.push(node.value);\n" +
              "    inOrder(node.right, res);\n" +
              "  }\n" +
              "  return res;\n" +
              "}\n\n" +
              "// DFS Postorder: Izquierda -> Derecha -> Raíz\n" +
              "function postOrder<T>(node: TreeNode<T> | null, res: T[] = []): T[] {\n" +
              "  if (node) {\n" +
              "    postOrder(node.left, res);\n" +
              "    postOrder(node.right, res);\n" +
              "    res.push(node.value);\n" +
              "  }\n" +
              "  return res;\n" +
              "}\n\n" +
              "// BFS Level-Order: Recorrido por niveles usando una Cola\n" +
              "function levelOrder<T>(root: TreeNode<T> | null): T[] {\n" +
              "  if (!root) return [];\n" +
              "  const result: T[] = [];\n" +
              "  const queue: TreeNode<T>[] = [root];\n" +
              "  while (queue.length > 0) {\n" +
              "    const current = queue.shift()!;\n" +
              "    result.push(current.value);\n" +
              "    if (current.left) queue.push(current.left);\n" +
              "    if (current.right) queue.push(current.right);\n" +
              "  }\n" +
              "  return result;\n" +
              "}"
      },
      {
        title: "Orden de Complejidad (Notación Big O)",
        description: "Clasificación matemática de la eficiencia temporal (tiempo de ejecución) y espacial (consumo de memoria RAM) de un algoritmo al procesar una entrada de tamaño N que tiende a infinito.",
        details: [
          "O(1) - Constante: Inmune al tamaño de los datos (acceso por índice en array o búsqueda directa en un Hash Map).",
          "O(log N) - Logarítmico: El espacio de búsqueda se reduce a la mitad en cada ciclo (Búsqueda Binaria).",
          "O(N) - Lineal: El tiempo crece proporcionalmente al tamaño de la entrada (bucle simple).",
          "O(N log N) - Linearítmico: El estándar de oro de ordenamientos eficientes de división y conquista (Merge Sort, Quick Sort).",
          "O(N^2) - Cuadrático: Bucles anidados típicos en ordenamientos simples e ineficientes (Bubble Sort).",
          "O(2^N) - Exponencial: Algoritmos recursivos ineficientes de crecimiento explosivo (Fibonacci simple sin memorización).",
          "O(N!) - Factorial: Colapso del sistema con N > 15 (Fuerza bruta para el Problema del Viajante de Comercio)."
        ],
        code: "// Búsqueda Binaria - O(log N) sobre array ordenado\n" +
              "function binarySearch(arr: number[], target: number): number {\n" +
              "  let left = 0, right = arr.length - 1;\n" +
              "  while (left <= right) {\n" +
              "    const mid = Math.floor((left + right) / 2);\n" +
              "    if (arr[mid] === target) return mid;\n" +
              "    if (arr[mid] < target) left = mid + 1;\n" +
              "    else right = mid - 1;\n" +
              "  }\n" +
              "  return -1;\n" +
              "}\n\n" +
              "// Quick Sort - O(N log N) caso promedio\n" +
              "function quickSort(arr: number[]): number[] {\n" +
              "  if (arr.length <= 1) return arr;\n" +
              "  const pivot = arr[Math.floor(arr.length / 2)];\n" +
              "  const left = arr.filter(x => x < pivot);\n" +
              "  const mid = arr.filter(x => x === pivot);\n" +
              "  const right = arr.filter(x => x > pivot);\n" +
              "  return [...quickSort(left), ...mid, ...quickSort(right)];\n" +
              "}"
      },
      {
        title: "Expresiones Regulares (Regex) Avanzadas",
        description: "Operadores y motores de búsqueda de texto complejos enfocados en la precedencia lógica y optimización de captura:",
        details: [
          "Greedy (Codicioso): Cuantificadores como '*' o '+' capturan la coincidencia más larga posible extendiéndose hasta el final del texto.",
          "Lazy (Perezoso): Agregar '?' (como '*?' o '+?') fuerza al motor a detenerse en la primera coincidencia válida (evita capturar texto excedente).",
          "Positive Lookahead (?=...): Encuentra coincidencia si está seguida por un patrón sin incluirlo en el resultado final (ej. \\d+(?=\\sUSD)).",
          "Negative Lookahead (?!...): Coincide si NO está seguida por el patrón.",
          "Positive Lookbehind (?<=...): Coincide si el patrón está inmediatamente antes (ej. (?<=\\$)\\d+).",
          "Negative Lookbehind (?<!...): Coincide si el patrón NO está inmediatamente antes."
        ],
        code: "// 1. Greedy vs Lazy\n" +
              "const text = \"<a>texto</a>\";\n" +
              "text.match(/<.*>/);   // Greedy match -> [\"<a>texto</a>\"]\n" +
              "text.match(/<.*?>/);  // Lazy match   -> [\"<a>\"]\n\n" +
              "// 2. Lookarounds\n" +
              "const prices = \"100 USD, 200 EUR, $150, -50\";\n\n" +
              "// Positive Lookahead (números seguidos de ' USD')\n" +
              "prices.match(/\\d+(?=\\sUSD)/g);       // [\"100\"]\n\n" +
              "// Positive Lookbehind (números precedidos de '$')\n" +
              "prices.match(/(?<=\\$)\\d+/g);         // [\"150\"]\n\n" +
              "// Negative Lookbehind (números no precedidos de '-')\n" +
              "prices.match(/(?<!-)\\d+/g);          // [\"100\", \"200\", \"150\", \"50\"]"
      },
      {
        title: "Diagnóstico de Infraestructura: Comandos de Linux",
        description: "Directrices de administración, solución de problemas y análisis de logs desde consolas Bash corporativas:",
        details: [
          "grep (Global Regular Expression Print): Filtro recursivo e insensible a mayúsculas para rastrear logs (ej. grep -ri 'error' /var/log/nginx/).",
          "sed (Stream Editor): Edición y sustitución directa en flujos de texto (ej. sed -i 's/localhost/10.0.0.5/g' config.env).",
          "awk: Procesador de columnas estructuradas en logs. Ideal para reportar combinaciones específicas (ej. awk '{print $1, $9}' access.log | grep '500').",
          "lsof -i :8080: Identifica qué PID tiene bloqueado el puerto de red para mitigar fallos de tipo EADDRINUSE.",
          "ss -tulpn: Muestra todos los sockets TCP/UDP abiertos detallando puertos y procesos dueños de forma instantánea.",
          "ps aux --sort=-%mem: Lista todos los procesos activos ordenados de mayor a menor consumo de memoria para evitar OOMKilled.",
          "chmod 400 key.pem: Otorga permisos estrictos de solo lectura al dueño, requeridos por SSH para llaves privadas de AWS/nube.",
          "chown -R www-data:www-data /var/www/html: Cambia propietario y grupo de forma recursiva al usuario del servidor web de Linux."
        ],
        code: "# Rastrear de forma insensible a mayúsculas y recursiva la palabra \"error\" en logs\n" +
              "grep -ri \"error\" /var/log/nginx/\n\n" +
              "# Reemplazar in-place 'localhost' por '10.0.0.5' en config.env\n" +
              "sed -i 's/localhost/10.0.0.5/g' config.env\n\n" +
              "# Extraer la IP ($1) y el Estado HTTP ($9) de access.log y filtrar los errores 500\n" +
              "awk '{print $1, $9}' access.log | grep \"500\"\n\n" +
              "# Listar PID ocupando el puerto 8080\n" +
              "lsof -i :8080\n\n" +
              "# Ver sockets TCP (-t) y UDP (-u) escuchando (-l) con procesos (-p) numéricos (-n)\n" +
              "ss -tulpn\n\n" +
              "# Ver procesos ordenados por consumo descendente de memoria RAM\n" +
              "ps aux --sort=-%mem\n\n" +
              "# Cambiar permisos a solo lectura para el dueño (requerido por llaves SSH .pem)\n" +
              "chmod 400 key.pem\n\n" +
              "# Cambiar dueño y grupo al servidor web www-data de forma recursiva (-R)\n" +
              "chown -R www-data:www-data /var/www/html"
      }
    ]
  }
];
