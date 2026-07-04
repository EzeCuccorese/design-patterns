import React from 'react';
import { AlertTriangle, Wrench, ChevronDown, ChevronRight } from 'lucide-react';

interface RefactorCatalogProps {
  expandedSmell: string | null;
  onToggleSmell: (smell: string | null) => void;
  expandedTech: string | null;
  onToggleTech: (tech: string | null) => void;
}

export const RefactorCatalog: React.FC<RefactorCatalogProps> = ({
  expandedSmell,
  onToggleSmell,
  expandedTech,
  onToggleTech,
}) => {
  return (
    <>
      {/* CARD 2: CATÁLOGO DE MALOS OLORES (SMELLS - SOURCEMAKING) */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
        <div className="card-header">
          <AlertTriangle />
          <span>Malos Olores del Código (Code Smells)</span>
        </div>
        <div className="card-body">
          <h2>Catálogo de Síntomas de Diseño</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Los malos olores son señales de alerta en el código que sugieren problemas profundos. Haz clic en cada grupo clásico de *SourceMaking* para expandir:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* 1. ACUMULADORES */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleSmell(expandedSmell === 'bloaters' ? null : 'bloaters')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                  Acumuladores (Bloaters)
                </span>
                {expandedSmell === 'bloaters' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSmell === 'bloaters' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Clases y métodos que han crecido tanto que son casi inmanejables. Se acumulan lentamente con el tiempo.
                  </p>
                  <div>
                    <strong>• Método Largo (Long Method):</strong> Funciones gigantescas con demasiada lógica interna. Son difíciles de leer y depurar.
                  </div>
                  <div>
                    <strong>• Clase Gigante (Large Class):</strong> Clases con demasiados campos, métodos y responsabilidades (violan SRP).
                  </div>
                  <div>
                    <strong>• Obsesión Primitiva (Primitive Obsession):</strong> Usar tipos primitivos simples (como strings o números) para conceptos ricos del dominio (ej. teléfonos, emails, dinero) en lugar de crear pequeños objetos de valor (Value Objects).
                  </div>
                  <div>
                    <strong>• Lista de Parámetros Larga:</strong> Pasar más de 3 o 4 parámetros en la firma de un método.
                  </div>
                  <div>
                    <strong>• Grupitos de Datos (Data Clumps):</strong> Variables que siempre viajan juntas a través de múltiples partes del código (ej. coordenadas x/y/z o campos de dirección), indicando que deberían encapsularse en una clase.
                  </div>
                </div>
              )}
            </div>

            {/* 2. ABUSADORES DE POO */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleSmell(expandedSmell === 'abusers' ? null : 'abusers')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                  Abusadores de la POO (OO Abusers)
                </span>
                {expandedSmell === 'abusers' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSmell === 'abusers' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Aplicación incorrecta o incompleta de los principios de Programación Orientada a Objetos.
                  </p>
                  <div>
                    <strong>• Sentencias Switch (Switch Statements):</strong> Condicionales `switch` o `if-else` encadenados repetitivos y dependientes del tipo de objeto. Deben reemplazarse por interfaces y polimorfismo.
                  </div>
                  <div>
                    <strong>• Campos Temporales (Temporary Field):</strong> Variables de instancia que solo se inicializan o usan bajo ciertas condiciones especiales, confundiendo la lectura de la clase.
                  </div>
                  <div>
                    <strong>• Legado Rechazado (Refused Bequest):</strong> Subclases que heredan métodos de un padre pero que deciden no usarlos o lanzar excepciones del tipo "No Implementado", lo que rompe el principio de sustitución de Liskov (LSP).
                  </div>
                  <div>
                    <strong>• Clases Alternativas con Interfaces Diferentes:</strong> Clases que hacen el mismo trabajo pero tienen firmas o nombres de métodos distintos.
                  </div>
                </div>
              )}
            </div>

            {/* 3. OBSTRUCTORES DE CAMBIO */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleSmell(expandedSmell === 'change' ? null : 'change')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
                  Obstructores de Cambio (Change Preventers)
                </span>
                {expandedSmell === 'change' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSmell === 'change' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Malas prácticas que hacen extremadamente complejo y costoso añadir o modificar código.
                  </p>
                  <div>
                    <strong>• Cambio Divergente (Divergent Change):</strong> Modificar una sola clase por muchos motivos de negocio distintos (ej. cambiar cómo se calcula el IVA y cómo se renderiza el PDF dentro de la misma clase Factura). Viola SRP.
                  </div>
                  <div>
                    <strong>• Cirugía de Escopeta (Shotgun Surgery):</strong> Un cambio menor de requerimientos te obliga a modificar docenas de archivos o clases en cascada.
                  </div>
                  <div>
                    <strong>• Jerarquías de Herencia Paralelas:</strong> Cada vez que creas una subclase para una entidad A, te ves obligado a crear otra subclase en la jerarquía B para que el sistema funcione.
                  </div>
                </div>
              )}
            </div>

            {/* 4. PRESCINDIBLES */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleSmell(expandedSmell === 'dispensables' ? null : 'dispensables')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6b7280' }}></span>
                  Prescindibles (Dispensables)
                </span>
                {expandedSmell === 'dispensables' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSmell === 'dispensables' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Código innecesario y redundante cuya ausencia mejoraría drásticamente la mantenibilidad.
                  </p>
                  <div>
                    <strong>• Código Duplicado (Duplicate Code):</strong> El mismo algoritmo o bloque copiado y pegado en múltiples clases. Debe extraerse a un ancestro común o clase de servicio.
                  </div>
                  <div>
                    <strong>• Comentarios Redundantes (Comments):</strong> Comentarios que explican *cómo* funciona un código confuso. Si necesitas comentar un bloque largo, es una señal de que debes refactorizarlo en un método autodescriptivo.
                  </div>
                  <div>
                    <strong>• Clase Perezosa (Lazy Class):</strong> Una clase de poco uso o reducida a casi nada que no justifica el costo de mantenerla en el sistema.
                  </div>
                  <div>
                    <strong>• Clase de Datos (Data Class):</strong> Clases reducidas puramente a contenedores de atributos públicos o con getters/setters simples, carentes de cualquier comportamiento lógico de negocio.
                  </div>
                  <div>
                    <strong>• Código Muerto (Dead Code):</strong> Métodos, clases o variables importadas que nunca se invocan en el sistema y solo acumulan polvo digital.
                  </div>
                  <div>
                    <strong>• Generalización Especulativa:</strong> Crear interfaces abstractas y clases "por si acaso" en el futuro. Viola el principio YAGNI (You Aren't Gonna Need It).
                  </div>
                </div>
              )}
            </div>

            {/* 5. ACOPLADORES */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleSmell(expandedSmell === 'couplers' ? null : 'couplers')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
                  Acopladores (Couplers)
                </span>
                {expandedSmell === 'couplers' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSmell === 'couplers' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Indican un acoplamiento excesivo y dañino entre componentes del sistema.
                  </p>
                  <div>
                    <strong>• Envidia de Características (Feature Envy):</strong> Un método de la clase A que accede constantemente a los campos e invoca los métodos de la clase B para hacer su trabajo. Debería moverse a la clase B.
                  </div>
                  <div>
                    <strong>• Intimidad Inapropiada (Inappropriate Intimacy):</strong> Clases que dependen íntimamente de las partes internas o privadas de otras.
                  </div>
                  <div>
                    <strong>• Cadenas de Mensajes:</strong> Código estructurado como `cliente.getFactura().getDetalle().getItem().getPrecio()`. Genera un alto acoplamiento en cascada.
                  </div>
                  <div>
                    <strong>• Intermediario (Middle Man):</strong> Una clase cuya única misión y métodos son delegar el trabajo a otra clase. Debería eliminarse para que el cliente acceda directamente al final.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* CARD 3: CATÁLOGO DE TÉCNICAS DE REFACTORIZACIÓN */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
        <div className="card-header">
          <Wrench />
          <span>Técnicas de Refactorización</span>
        </div>
        <div className="card-body">
          <h2>Catálogo de Soluciones y Recetas</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Las técnicas de refactorización son recetas ordenadas paso a paso para limpiar el código de forma segura. Haz clic para expandir las categorías de *SourceMaking*:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* 1. COMPOSICIÓN DE MÉTODOS */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'composing' ? null : 'composing')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Composición de Métodos</span>
                {expandedTech === 'composing' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'composing' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Extraer Método (Extract Method):</strong> Mover fragmentos de código cohesivo de un método gigante a un método privado independiente y autodescriptivo.</div>
                  <div><strong>• Método Inline (Inline Method):</strong> Fusionar el cuerpo de un método simple y obvio directamente en la llamada si la indirección no aporta valor.</div>
                  <div><strong>• Extraer Variable (Extract Variable):</strong> Guardar los pasos intermedios de expresiones condicionales complejas en variables claras.</div>
                  <div><strong>• Reemplazar Temp con Consulta:</strong> Mover un cálculo intermedio asignado a una variable local hacia un método de consulta específico.</div>
                </div>
              )}
            </div>

            {/* 2. MOVER CARACTERÍSTICAS */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'moving' ? null : 'moving')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Mover Características entre Objetos</span>
                {expandedTech === 'moving' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'moving' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Mover Método / Campo (Move Method/Field):</strong> Trasladar comportamiento o atributos a la clase que realmente los usa con mayor frecuencia para reducir acoplamiento.</div>
                  <div><strong>• Extraer Clase (Extract Class):</strong> Tomar una clase con demasiadas responsabilidades y dividirla en dos clases cohesivas y enfocadas.</div>
                  <div><strong>• Ocultar Delegado (Hide Delegate):</strong> Agregar métodos de puente para evitar que el cliente tenga que conocer la estructura interna de los objetos dependientes de su proveedor.</div>
                </div>
              )}
            </div>

            {/* 3. ORGANIZACIÓN DE DATOS */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'data' ? null : 'data')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Organización de Datos</span>
                {expandedTech === 'data' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'data' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Reemplazar Valor con Objeto:</strong> Convertir campos primitivos simples en pequeños objetos de valor inmutables que encapsulan reglas de negocio.</div>
                  <div><strong>• Reemplazar Número Mágico con Constante:</strong> Mover números o cadenas directos dispersos por el código a constantes semánticas globales.</div>
                  <div><strong>• Encapsular Colección:</strong> Impedir que los clientes editen directamente listas internas agregando copias inmutables o retornos de solo lectura.</div>
                  <div><strong>• Reemplazar Código de Tipo con Subclases/Estrategia:</strong> Cambiar variables tipo bandera numérica por jerarquías polimórficas.</div>
                </div>
              )}
            </div>

            {/* 4. SIMPLIFICACIÓN DE CONDICIONALES */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'conditionals' ? null : 'conditionals')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Simplificación de Expresiones Condicionales</span>
                {expandedTech === 'conditionals' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'conditionals' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Descomponer Condicional:</strong> Mover expresiones complejas de los `if` y las ejecuciones de sus ramas a métodos autodescriptivos.</div>
                  <div><strong>• Reemplazar Anificados con Cláusulas de Guarda:</strong> Retornar temprano (`return` / cláusulas de guarda) para aplanar la indentación y evitar anidamientos infinitos de `if-else`.</div>
                  <div><strong>• Reemplazar Condicional con Polimorfismo:</strong> Resolver ramas switch encadenadas utilizando llamadas de métodos polimórficos de una interfaz compartida.</div>
                  <div><strong>• Introducir Objeto Nulo (Null Object):</strong> Retornar objetos inofensivos de comportamiento por defecto en lugar de valores `null`.</div>
                </div>
              )}
            </div>

            {/* 5. SIMPLIFICACIÓN DE LLAMADAS */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'calls' ? null : 'calls')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Simplificación de Llamadas a Métodos</span>
                {expandedTech === 'calls' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'calls' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Renombrar Método:</strong> Cambiar nombres vagos por nombres auto-documentados que dejen en claro el propósito exacto de la función.</div>
                  <div><strong>• Separar Consulta de Modificador:</strong> Estructurar métodos para que retornen datos (Query) o alteren estado (Command), pero nunca hagan ambas cosas a la vez (CQS).</div>
                  <div><strong>• Preservar Objeto Completo:</strong> Pasar un objeto de datos entero a un método en lugar de desarmarlo y pasar 6 parámetros sueltos.</div>
                  <div><strong>• Introducir Parámetro Objeto:</strong> Agrupar un grupo repetitivo de parámetros sueltos en su propio tipo/struct.</div>
                </div>
              )}
            </div>

            {/* 6. GENERALIZACIÓN */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => onToggleTech(expandedTech === 'generalization' ? null : 'generalization')}
                style={{
                  width: '100%', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--bg-app)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '13px'
                }}
              >
                <span>Manejo de Generalización (Herencia y Abstracción)</span>
                {expandedTech === 'generalization' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedTech === 'generalization' && (
                <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                  <div><strong>• Subir / Bajar Método o Campo (Pull Up / Push Down):</strong> Trasladar campos o comportamientos comunes hacia la clase padre o clases hijas según corresponda.</div>
                  <div><strong>• Extraer Interfaz (Extract Interface):</strong> Declarar interfaces para exponer comportamientos compartidos entre clases no relacionadas de forma segura.</div>
                  <div><strong>• Reemplazar Herencia con Delegación:</strong> Cambiar un enlace rígido de subclase por composición si la clase hija no aprueba la herencia "es un" (is-a).</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default RefactorCatalog;
