export interface CategoryOverview {
  id: 'creational' | 'structural' | 'behavioral';
  name: string;
  definition: string;
  what: string;  // ¿Qué es?
  how: string;   // ¿Cómo se usan?
  when: string;  // ¿Cuándo usarlos?
  nativeInsight: string; // Explicación de resolución nativa en lenguajes modernos
}

export const categoryOverviews: Record<'creational' | 'structural' | 'behavioral', CategoryOverview> = {
  creational: {
    id: 'creational',
    name: 'Patrones Creacionales',
    definition: 'Diseños que manejan los mecanismos de creación de objetos, intentando crear objetos de una manera adecuada a la situación.',
    what: 'Son patrones que abstraen el proceso de instanciación. Evitan que el cliente cree instancias directamente con el operador "new", delegando la lógica de creación a fábricas o constructores especializados.',
    how: 'Se usan encapsulando la lógica de inicialización y controlando el ciclo de vida de las instancias. Permiten definir si necesitamos una única instancia en memoria (Singleton), clonar un objeto existente (Prototype) o construirlo por partes (Builder).',
    when: 'Úsalos cuando tu sistema debe ser independiente de cómo se crean, componen y representan sus productos; cuando las clases a instanciar se especifican en tiempo de ejecución; o para evitar duplicación de memoria RAM.',
    nativeInsight: 'En lenguajes modernos, varios de estos patrones se resuelven nativamente:\n\n• Singleton en TypeScript/Node: Se resuelve simplemente exportando una instancia constante de un objeto desde un archivo de módulo ES (e.g., export const service = new Service()). El cargador de módulos de Node garantiza que sea única y global, sin necesidad de constructores privados ni de un método getInstance().\n• Prototype en JavaScript/TypeScript: Se resuelve mediante la herencia por prototipo nativa del lenguaje (Object.create() o clonación con estructuredClone()).'
  },
  structural: {
    id: 'structural',
    name: 'Patrones Estructurales',
    definition: 'Diseños que explican cómo ensamblar objetos y clases dentro de estructuras más grandes, manteniendo estas estructuras flexibles y eficientes.',
    what: 'Se enfocan en cómo las clases y objetos se componen para formar estructuras más grandes. Utilizan la herencia o, preferiblemente, la composición de interfaces para unificar accesos y ocultar complejidades.',
    how: 'Se implementan creando envoltorios (Wrappers) o adaptadores que interceptan llamadas para cambiar interfaces (Adapter), añadir funcionalidades dinámicas (Decorator) o proporcionar un punto de acceso alternativo (Proxy).',
    when: 'Úsalos cuando quieras conectar clases desarrolladas por separado que tienen interfaces incompatibles, cuando necesites una jerarquía uniforme de objetos hoja y compuestos (árboles), o para agregar responsabilidades dinámicamente sin heredar.',
    nativeInsight: 'En lenguajes modernos, el patrón Decorator se resuelve nativamente en Python:\n\n• Python implementa Decoradores directamente mediante la sintaxis de la arroba (@mi_decorador) que puede envolver funciones o clases en tiempo de ejecución de forma nativa, reduciendo drásticamente la verbosidad de heredar y componer clases envoltura manuales.\n• En JavaScript/TypeScript modernos, los decoradores de clase (stage 3) ya forman parte del estándar del lenguaje.'
  },
  behavioral: {
    id: 'behavioral',
    name: 'Patrones de Comportamiento',
    definition: 'Diseños que se encargan de la comunicación e interacción entre objetos, definiendo cómo cooperan y distribuyen las responsabilidades.',
    what: 'Se centran en la comunicación entre objetos. Definen cómo interactúan las clases y cómo se reparte el flujo de control, facilitando el desacoplamiento entre emisores y receptores de mensajes.',
    how: 'Se aplican encapsulando algoritmos en objetos (Strategy), guardando estados previos (Memento), encadenando peticiones (Chain of Responsibility), o permitiendo suscripciones a cambios (Observer).',
    when: 'Úsalos cuando tengas flujos de control complejos con múltiples condicionales dependientes de estados, cuando el cambio de estado de un objeto deba actualizar a otros sin acoplarlos, o cuando un algoritmo deba variar dinámicamente.',
    nativeInsight: 'La mayoría de patrones de comportamiento tienen alternativas de primera clase hoy:\n\n• Strategy: En Python, TypeScript y Go, las funciones son ciudadanos de primera clase. En lugar de crear una interfaz y clases Strategy separadas, puedes pasar una función o lambda directamente como argumento.\n• Iterator: Prácticamente todos los lenguajes modernos traen implementado el protocolo de iterador en sus bucles (for...of, for each, select/range, yield). Rara vez necesitas implementar un iterador manualmente.\n• Observer: Se resuelve nativamente con el soporte de eventos incorporado (EventTarget en JS, interfaces funcionales/Streams en Java, o canales en Go).'
  }
};
