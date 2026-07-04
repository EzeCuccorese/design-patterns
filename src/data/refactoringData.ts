export interface SmellItem {
  name: string;
  description: string;
}

export interface SmellGroup {
  id: string;
  name: string;
  color: string;
  summary: string;
  smells: SmellItem[];
}

export interface TechniqueItem {
  name: string;
  description: string;
}

export interface TechniqueGroup {
  id: string;
  name: string;
  techniques: TechniqueItem[];
}

export interface RefactoringCore {
  what: string;
  debt: string;
  ruleOfThree: string;
}

export const refactoringData = {
  core: {
    what: "Refactorizar es el proceso de modificar la estructura interna de un programa (mejorando su legibilidad, reduciendo acoplamiento y aumentando la cohesión) sin alterar su comportamiento observable. Su propósito es facilitar la adición de nuevas funciones y prevenir la acumulación de bugs.",
    debt: "Introducida por Ward Cunningham, explica que escribir código rápido y descuidado para entregar antes es como contraer una deuda financiera. Los parches y la falta de diseño son los intereses: a la larga, ralentizan el desarrollo hasta paralizarlo. Refactorizar es pagar el capital de esa deuda.",
    ruleOfThree: "1. Hazlo andar. 2. Si repites una solución similar por segunda vez, refunfuña. 3. Si la haces por tercera vez, detente y refactoriza aplicando un patrón o técnica."
  } as RefactoringCore,

  smells: [
    {
      id: "bloaters",
      name: "Acumuladores (Bloaters)",
      color: "#ef4444",
      summary: "Clases y métodos que han crecido tanto que son casi inmanejables. Se acumulan lentamente con el tiempo.",
      smells: [
        { name: "Método Largo (Long Method)", description: "Funciones gigantescas con demasiada lógica interna. Son difíciles de leer y depurar." },
        { name: "Clase Gigante (Large Class)", description: "Clases con demasiados campos, métodos y responsabilidades (violan el Principio de Responsabilidad Única - SRP)." },
        { name: "Obsesión Primitiva (Primitive Obsession)", description: "Usar tipos primitivos simples (como strings o números) para conceptos ricos del dominio (ej. teléfonos, emails, dinero) en lugar de crear pequeños Value Objects." },
        { name: "Lista de Parámetros Larga", description: "Pasar más de 3 o 4 parámetros en la firma de un método." },
        { name: "Grupitos de Datos (Data Clumps)", description: "Variables que siempre viajan juntas a través de múltiples partes del código (ej. coordenadas x/y/z o campos de dirección), indicando que deberían encapsularse en una clase." }
      ]
    },
    {
      id: "abusers",
      name: "Abusadores de la POO (OO Abusers)",
      color: "#f59e0b",
      summary: "Aplicación incorrecta o incompleta de los principios de Programación Orientada a Objetos.",
      smells: [
        { name: "Sentencias Switch (Switch Statements)", description: "Condicionales switch o if-else encadenados repetitivos y dependientes del tipo de objeto. Deben reemplazarse por interfaces y polimorfismo." },
        { name: "Campos Temporales (Temporary Field)", description: "Variables de instancia que solo se inicializan o usan bajo ciertas condiciones especiales, confundiendo la lectura de la clase." },
        { name: "Legado Rechazado (Refused Bequest)", description: "Subclases que heredan métodos de un padre pero que deciden no usarlos o lanzar excepciones del tipo 'No Implementado', rompiendo el principio LSP." },
        { name: "Clases Alternativas con Interfaces Diferentes", description: "Clases que hacen el mismo trabajo pero tienen firmas o nombres de métodos distintos." }
      ]
    },
    {
      id: "change",
      name: "Obstructores de Cambio (Change Preventers)",
      color: "#3b82f6",
      summary: "Malas prácticas que hacen extremadamente complejo y costoso añadir o modificar código.",
      smells: [
        { name: "Cambio Divergente (Divergent Change)", description: "Modificar una sola clase por muchos motivos de negocio distintos (ej. cambiar cómo se calcula el IVA y cómo se renderiza el PDF dentro de la misma clase Factura). Viola SRP." },
        { name: "Cirugía de Escopeta (Shotgun Surgery)", description: "Un cambio menor de requerimientos te obliga a modificar docenas de archivos o clases en cascada." },
        { name: "Jerarquías de Herencia Paralelas", description: "Cada vez que creas una subclase para una entidad A, te ves obligado a crear otra subclase en la jerarquía B para que el sistema funcione." }
      ]
    },
    {
      id: "dispensables",
      name: "Prescindibles (Dispensables)",
      color: "#6b7280",
      summary: "Código innecesario y redundante cuya ausencia mejoraría drásticamente la mantenibilidad.",
      smells: [
        { name: "Código Duplicado (Duplicate Code)", description: "El mismo algoritmo o bloque copiado y pegado en múltiples clases. Debe extraerse a un ancestro común o clase de servicio." },
        { name: "Comentarios Redundantes (Comments)", description: "Comentarios que explican cómo funciona un código confuso. Si necesitas comentar un bloque largo, es una señal de que debes refactorizarlo en un método autodescriptivo." },
        { name: "Clase Perezosa (Lazy Class)", description: "Una clase de poco uso o reducida a casi nada que no justifica el costo de mantenerla en el sistema." },
        { name: "Clase de Datos (Data Class)", description: "Clases reducidas puramente a contenedores de atributos públicos o con getters/setters simples, carentes de cualquier comportamiento lógico de negocio." },
        { name: "Código Muerto (Dead Code)", description: "Métodos, clases o variables importadas que nunca se invocan en el sistema y solo acumulan polvo digital." },
        { name: "Generalización Especulativa", description: "Crear interfaces abstractas y clases 'por si acaso' en el futuro. Viola el principio YAGNI (You Aren't Gonna Need It)." }
      ]
    },
    {
      id: "couplers",
      name: "Acopladores (Couplers)",
      color: "#8b5cf6",
      summary: "Indican un acoplamiento excesivo y dañino entre componentes del sistema.",
      smells: [
        { name: "Envidia de Características (Feature Envy)", description: "Un método de la clase A que accede constantemente a los campos e invoca los métodos de la clase B para hacer su trabajo. Debería moverse a la clase B." },
        { name: "Intimidad Inapropiada (Inappropriate Intimacy)", description: "Clases que dependen íntimamente de las partes internas o privadas de otras." },
        { name: "Cadenas de Mensajes", description: "Código estructurado como cliente.getFactura().getDetalle().getItem().getPrecio(). Genera un alto acoplamiento en cascada." },
        { name: "Intermediario (Middle Man)", description: "Una clase cuya única misión y métodos son delegar el trabajo a otra clase. Debería eliminarse para que el cliente acceda directamente al final." }
      ]
    }
  ] as SmellGroup[],

  techniques: [
    {
      id: "composing",
      name: "Composición de Métodos",
      techniques: [
        { name: "Extraer Método (Extract Method)", description: "Mover fragmentos de código cohesivo de un método gigante a un método privado independiente y autodescriptivo." },
        { name: "Método Inline (Inline Method)", description: "Fusionar el cuerpo de un método simple y obvio directamente en la llamada si la indirección no aporta valor." },
        { name: "Extraer Variable (Extract Variable)", description: "Guardar los pasos intermedios de expresiones condicionales complejas en variables claras." },
        { name: "Reemplazar Temp con Consulta", description: "Mover un cálculo intermedio asignado a una variable local hacia un método de consulta específico." }
      ]
    },
    {
      id: "moving",
      name: "Mover Características entre Objetos",
      techniques: [
        { name: "Mover Método / Campo (Move Method/Field)", description: "Trasladar comportamiento o atributos a la clase que realmente los usa con mayor frecuencia para reducir acoplamiento." },
        { name: "Extraer Clase (Extract Class)", description: "Tomar una clase con demasiadas responsabilidades y dividirla en dos clases cohesivas y enfocadas." },
        { name: "Ocultar Delegado (Hide Delegate)", description: "Agregar métodos de puente para evitar que el cliente tenga que conocer la estructura interna de los objetos dependientes de su proveedor." }
      ]
    },
    {
      id: "data",
      name: "Organización de Datos",
      techniques: [
        { name: "Reemplazar Valor con Objeto", description: "Convertir campos primitivos simples en pequeños objetos de valor inmutables que encapsulan reglas de negocio." },
        { name: "Reemplazar Número Mágico con Constante", description: "Mover números o cadenas directos dispersos por el código a constantes semánticas globales." },
        { name: "Encapsular Colección", description: "Impedir que los clientes editen directamente listas internas agregando copias inmutables o retornos de solo lectura." },
        { name: "Reemplazar Código de Tipo con Subclases/Estrategia", description: "Cambiar variables tipo bandera numérica por jerarquías polimórficas." }
      ]
    },
    {
      id: "conditionals",
      name: "Simplificación de Expresiones Condicionales",
      techniques: [
        { name: "Descomponer Condicional", description: "Mover expresiones complejas de los if y las ejecuciones de sus ramas a métodos autodescriptivos." },
        { name: "Reemplazar Anidados con Cláusulas de Guarda", description: "Retornar temprano (return / cláusulas de guarda) para aplanar la indentación y evitar anidamientos infinitos de if-else." },
        { name: "Reemplazar Condicional con Polimorfismo", description: "Resolver ramas switch encadenadas utilizando llamadas de métodos polimórficos de una interfaz compartida." },
        { name: "Introducir Objeto Nulo (Null Object)", description: "Retornar objetos inofensivos de comportamiento por defecto en lugar de valores null." }
      ]
    },
    {
      id: "calls",
      name: "Simplificación de Llamadas a Métodos",
      techniques: [
        { name: "Renombrar Método", description: "Cambiar nombres vagos por nombres auto-documentados que dejen en claro el propósito exacto de la función." },
        { name: "Separar Consulta de Modificador", description: "Estructurar métodos para que retornen datos (Query) o alteren estado (Command), pero nunca hagan ambas cosas a la vez (CQS)." },
        { name: "Preservar Objeto Completo", description: "Pasar un objeto de datos entero a un método en lugar de desarmarlo y pasar 6 parámetros sueltos." },
        { name: "Introducir Parámetro Objeto", description: "Agrupar un grupo repetitivo de parámetros sueltos en su propio tipo/struct." }
      ]
    },
    {
      id: "generalization",
      name: "Manejo de Generalización (Herencia y Abstracción)",
      techniques: [
        { name: "Subir / Bajar Método o Campo (Pull Up / Push Down)", description: "Trasladar campos o comportamientos comunes hacia la clase padre o clases hijas según corresponda." },
        { name: "Extraer Interfaz (Extract Interface)", description: "Declarar interfaces para exponer comportamientos compartidos entre clases no relacionadas de forma segura." },
        { name: "Reemplazar Herencia con Delegación", description: "Cambiar un enlace rígido de subclase por composición si la clase hija no aprueba la herencia 'es un' (is-a)." }
      ]
    }
  ] as TechniqueGroup[]
};
export default refactoringData;
