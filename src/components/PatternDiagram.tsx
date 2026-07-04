import React from 'react';

interface PatternDiagramProps {
  patternId: string;
}

export const PatternDiagram: React.FC<PatternDiagramProps> = ({ patternId }) => {
  // Función para devolver el SVG según el ID del patrón
  const renderSvg = () => {
    const strokeColor = 'var(--accent)';
    const textColor = 'var(--text-primary)';
    const textMuted = 'var(--text-secondary)';
    const boxBg = 'var(--bg-app)';
    const gridColor = 'var(--border-color)';

    // Dimensiones estándar del SVG
    const width = 500;
    const height = 240;

    // Retorno de cuadrícula base para estilo "blueprint"
    const renderGrid = () => (
      <>
        <rect width={width} height={height} fill="var(--bg-card)" rx="8" />
        <defs>
          <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#blueprint-grid)" rx="8" />
      </>
    );

    switch (patternId) {
      case 'singleton':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="40" y="90" width="100" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="90" y="115" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Cliente</text>
            <text x="90" y="135" textAnchor="middle" fill={textMuted} fontSize="10">pide instancia</text>

            {/* Flecha a Singleton */}
            <path d="M 140 120 L 250 120" fill="none" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrow)" />
            
            {/* Singleton */}
            <rect x="260" y="60" width="180" height="120" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="350" y="85" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="13">Singleton</text>
            <line x1="260" y1="95" x2="440" y2="95" stroke={gridColor} strokeWidth="1" />
            <text x="275" y="115" fill={textColor} fontSize="11">- instance: Singleton</text>
            <line x1="260" y1="125" x2="440" y2="125" stroke={gridColor} strokeWidth="1" />
            <text x="275" y="145" fill={textColor} fontSize="11">+ getInstance(): Singleton</text>
            <text x="275" y="165" fill={textMuted} fontSize="10">🔒 Constructor Privado</text>

            {/* Auto-asociación (retorno de instancia) */}
            <path d="M 380 60 C 420 20, 460 60, 440 90" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'factory-method':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Creador */}
            <rect x="30" y="40" width="180" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="120" y="65" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Creator (Fábrica)</text>
            <line x1="30" y1="75" x2="210" y2="75" stroke={gridColor} strokeWidth="1" />
            <text x="40" y="95" fill={textColor} fontSize="11">+ factoryMethod(): Product</text>

            {/* Herencia Creador Concreto */}
            <path d="M 120 110 L 120 150" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#hollow-arrow)" />
            <rect x="30" y="160" width="180" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="120" y="190" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">ConcreteCreator</text>

            {/* Interfaces de Producto */}
            <rect x="290" y="40" width="160" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="370" y="65" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">«interface» Product</text>
            <line x1="290" y1="75" x2="450" y2="75" stroke={gridColor} strokeWidth="1" />
            <text x="305" y="90" fill={textMuted} fontSize="10">+ performAction()</text>

            {/* Conexión de creación */}
            <path d="M 210 185 L 290 185" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrow)" />

            {/* Producto Concreto */}
            <path d="M 370 100 L 370 150" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#hollow-arrow)" />
            <rect x="290" y="160" width="160" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="370" y="190" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">ConcreteProduct</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'abstract-factory':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Abstract Factory */}
            <rect x="20" y="30" width="150" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="95" y="55" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» AbstractFactory</text>
            <text x="30" y="80" fill={textMuted} fontSize="9">+ createChair(), + createSofa()</text>

            {/* Concrete Factories */}
            <rect x="10" y="140" width="75" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="47" y="170" textAnchor="middle" fill={textColor} fontSize="9" fontWeight="bold">VictorianFactory</text>
            <path d="M 47 140 L 47 100" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />

            <rect x="105" y="140" width="75" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="142" y="170" textAnchor="middle" fill={textColor} fontSize="9" fontWeight="bold">ModernFactory</text>
            <path d="M 142 140 L 142 100" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />

            {/* Families of Products */}
            <rect x="250" y="30" width="90" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="295" y="50" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">VictorianChair</text>
            <text x="295" y="68" textAnchor="middle" fill={textMuted} fontSize="9">Estilo Clásico</text>

            <rect x="375" y="30" width="90" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="420" y="50" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">ModernChair</text>
            <text x="420" y="68" textAnchor="middle" fill={textMuted} fontSize="9">Estilo Nórdico</text>

            <line x1="210" y1="40" x2="210" y2="200" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
            <text x="220" y="120" fill={strokeColor} fontSize="10" transform="rotate(-90 220 120)">Eje de Familia (Estilo)</text>

            <rect x="250" y="140" width="90" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="295" y="160" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">VictorianSofa</text>
            <text x="295" y="178" textAnchor="middle" fill={textMuted} fontSize="9">Sofá Clásico</text>

            <rect x="375" y="140" width="90" height="50" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="420" y="160" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">ModernSofa</text>
            <text x="420" y="178" textAnchor="middle" fill={textMuted} fontSize="9">Sofá Moderno</text>

            <defs>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'builder':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Director */}
            <rect x="30" y="80" width="100" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="80" y="110" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Director</text>
            <text x="80" y="130" textAnchor="middle" fill={textMuted} fontSize="9">ordena pasos</text>

            {/* Asocia a Builder */}
            <path d="M 130 115 L 205 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="167" y="105" textAnchor="middle" fill={textColor} fontSize="9">builder.build()</text>

            {/* Builder Interface */}
            <rect x="215" y="50" width="120" height="110" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="275" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Builder</text>
            <line x1="215" y1="80" x2="335" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="225" y="98" fill={textColor} fontSize="9">+ buildParedes()</text>
            <text x="225" y="118" fill={textColor} fontSize="9">+ buildTecho()</text>
            <text x="225" y="138" fill={textColor} fontSize="9">+ getResultado(): Casa</text>

            {/* Producto Casa */}
            <path d="M 335 115 L 390 115" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrow)" />
            <rect x="400" y="85" width="80" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="440" y="115" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Casa</text>
            <text x="440" y="130" textAnchor="middle" fill={textMuted} fontSize="9">(Producto)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'prototype':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Prototipo Original */}
            <rect x="50" y="60" width="130" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="115" y="90" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Prototipo Original</text>
            <text x="115" y="110" textAnchor="middle" fill={textMuted} fontSize="10">Estado: [A, B, C]</text>
            <text x="115" y="130" textAnchor="middle" fill={textColor} fontSize="9" fontStyle="italic">+ clone(): Prototype</text>

            {/* Operación de clonado */}
            <path d="M 180 105 L 310 105" fill="none" stroke={strokeColor} strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="245" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Duplicación (clone())</text>

            {/* Clon */}
            <rect x="320" y="60" width="130" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" style={{ strokeDasharray: '3' }} />
            <text x="385" y="90" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Clon Duplicado</text>
            <text x="385" y="110" textAnchor="middle" fill={textMuted} fontSize="10">Estado: [A, B, C]</text>
            <text x="385" y="135" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Independiente en RAM</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'object-pool':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="20" y="90" width="90" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="65" y="125" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Cliente</text>

            {/* Solicita */}
            <path d="M 110 105 L 200 105" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="155" y="95" textAnchor="middle" fill={textColor} fontSize="9">1. pedirObjeto()</text>

            {/* Devuelve */}
            <path d="M 200 135 L 110 135" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrow)" />
            <text x="155" y="152" textAnchor="middle" fill={textColor} fontSize="9">4. devolver()</text>

            {/* Object Pool */}
            <rect x="210" y="50" width="130" height="130" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="275" y="72" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">ObjectPool</text>
            <line x1="210" y1="80" x2="340" y2="80" stroke={gridColor} strokeWidth="1" />
            
            {/* Objetos en pool */}
            <rect x="225" y="95" width="40" height="25" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
            <text x="245" y="112" textAnchor="middle" fill={textColor} fontSize="9">Libre</text>

            <rect x="275" y="95" width="40" height="25" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
            <text x="295" y="112" textAnchor="middle" fill={textColor} fontSize="9">Libre</text>

            <rect x="245" y="135" width="55" height="25" rx="3" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
            <text x="272" y="152" textAnchor="middle" fill={textColor} fontSize="9">En Uso (2)</text>

            {/* Objeto entregado */}
            <path d="M 340 115 L 390 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="365" y="105" textAnchor="middle" fill={textColor} fontSize="9">2. usar</text>

            <rect x="400" y="90" width="80" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="440" y="120" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">HeavyObject</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'bridge':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Abstracción */}
            <rect x="30" y="40" width="130" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="95" y="65" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Abstraction (Control)</text>
            <text x="95" y="85" textAnchor="middle" fill={textMuted} fontSize="9">- impl: Implementor</text>

            {/* Puente */}
            <path d="M 160 70 L 270 70" fill="none" stroke={strokeColor} strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="215" y="58" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Puente / Asociación</text>

            {/* Implementor */}
            <rect x="280" y="40" width="160" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="360" y="65" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Implementor</text>
            <text x="360" y="85" textAnchor="middle" fill={textMuted} fontSize="9">+ deviceSpecificAction()</text>

            {/* Herencia Abstracción */}
            <path d="M 95 100 L 95 130" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="20" y="140" width="150" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="95" y="170" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">RefinedAbstraction (ControlRemoto)</text>

            {/* Herencia Implementador */}
            <path d="M 360 100 L 360 130" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="285" y="140" width="150" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="360" y="170" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">ConcreteImplementor (TV / Radio)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'composite':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Componente base */}
            <rect x="180" y="20" width="140" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="250" y="45" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Componente Base</text>
            <text x="250" y="65" textAnchor="middle" fill={textMuted} fontSize="10">+ ejecutar()</text>

            {/* Ramas de herencia */}
            <path d="M 180 50 L 80 50 L 80 110" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <path d="M 320 50 L 410 50 L 410 110" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />

            {/* Leaf (Hoja) */}
            <rect x="30" y="120" width="100" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="80" y="145" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Hoja (Leaf)</text>
            <text x="80" y="165" textAnchor="middle" fill={textMuted} fontSize="9">Lógica de fin (ej. Archivo)</text>

            {/* Composite (Contenedor) */}
            <rect x="350" y="120" width="120" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="410" y="145" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Compuesto (Composite)</text>
            <text x="410" y="162" textAnchor="middle" fill={textMuted} fontSize="9">Guarda lista de componentes</text>
            <text x="410" y="178" textAnchor="middle" fill={textColor} fontSize="9" fontStyle="italic">+ add() / + remove()</text>

            {/* Relación de agregación (el compuesto contiene componentes) */}
            <path d="M 470 155 C 500 155, 500 40, 330 40" fill="none" stroke={strokeColor} strokeWidth="1.2" markerStart="url(#diamond)" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
              <marker id="diamond" viewBox="0 0 12 12" refX="0" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 6 0 L 12 6 L 6 12 L 0 6 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'facade':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="25" y="90" width="80" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="65" y="120" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Cliente</text>

            {/* Llama a Facade */}
            <path d="M 105 115 L 175 115" fill="none" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="140" y="105" textAnchor="middle" fill={textColor} fontSize="9">Llamada simple</text>

            {/* Facade */}
            <rect x="185" y="55" width="110" height="120" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="240" y="105" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="13">Fachada (Facade)</text>
            <text x="240" y="125" textAnchor="middle" fill={textMuted} fontSize="9">Simplifica acceso</text>

            {/* Subsystem Lines */}
            <path d="M 295 85 L 365 70" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />
            <path d="M 295 115 L 365 115" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />
            <path d="M 295 145 L 365 160" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />

            {/* Subsystems */}
            <rect x="375" y="50" width="100" height="35" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1" />
            <text x="425" y="72" textAnchor="middle" fill={textColor} fontSize="9">Subsistema A</text>

            <rect x="375" y="98" width="100" height="35" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1" />
            <text x="425" y="120" textAnchor="middle" fill={textColor} fontSize="9">Subsistema B</text>

            <rect x="375" y="145" width="100" height="35" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1" />
            <text x="425" y="167" textAnchor="middle" fill={textColor} fontSize="9">Subsistema C</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'flyweight':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="20" y="80" width="80" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="60" y="110" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Cliente</text>
            
            {/* Pide flyweight */}
            <path d="M 100 105 L 180 105" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="140" y="95" textAnchor="middle" fill={textColor} fontSize="9">getFlyweight()</text>

            {/* Flyweight Factory */}
            <rect x="190" y="50" width="120" height="110" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="250" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">FlyweightFactory</text>
            <line x1="190" y1="80" x2="310" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="200" y="100" fill={textColor} fontSize="9">- pool: Map</text>
            <text x="200" y="130" fill={textMuted} fontSize="9">Reutiliza compartidos</text>

            {/* Flyweight Compartido */}
            <path d="M 310 105 L 370 105" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <rect x="380" y="40" width="105" height="130" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="432" y="60" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Flyweight</text>
            <line x1="380" y1="70" x2="485" y2="70" stroke={gridColor} strokeWidth="1" />
            
            <text x="390" y="90" fill="#10b981" fontWeight="bold" fontSize="9">Estado Intrínseco</text>
            <text x="390" y="105" fill={textMuted} fontSize="9">(Compartido en RAM)</text>

            <line x1="380" y1="120" x2="485" y2="120" stroke={gridColor} strokeWidth="1" />
            <text x="390" y="140" fill="#ef4444" fontWeight="bold" fontSize="9">Estado Extrínseco</text>
            <text x="390" y="155" fill={textMuted} fontSize="9">(Enviado por cliente)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'proxy':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="20" y="90" width="80" height="55" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="60" y="122" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Cliente</text>

            {/* Arrow a Proxy */}
            <path d="M 100 117 L 180 117" fill="none" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="140" y="107" textAnchor="middle" fill={textColor} fontSize="9">solicitar()</text>

            {/* Proxy */}
            <rect x="190" y="55" width="110" height="120" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="245" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Proxy</text>
            <line x1="190" y1="95" x2="300" y2="95" stroke={gridColor} strokeWidth="1" />
            <text x="195" y="115" fill={textMuted} fontSize="9">🔒 Control de Acceso</text>
            <text x="195" y="135" fill={textMuted} fontSize="9">⚡ Carga Perezosa</text>
            <text x="195" y="155" fill={textColor} fontSize="9">+ solicitar()</text>

            {/* Arrow a RealSubject */}
            <path d="M 300 117 L 370 117" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrow)" />
            
            {/* Objeto Real */}
            <rect x="380" y="70" width="105" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="432" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Objeto Real</text>
            <text x="432" y="115" textAnchor="middle" fill={textMuted} fontSize="9">(Servicio Pesado)</text>
            <text x="432" y="140" textAnchor="middle" fill={textColor} fontSize="10">+ solicitar()</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'chain-of-responsibility':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Cliente */}
            <rect x="15" y="90" width="80" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="55" y="120" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Petición</text>

            {/* Envia a Manejador A */}
            <path d="M 95 115 L 140 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Manejador A */}
            <rect x="150" y="75" width="95" height="80" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="197" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Manejador A</text>
            <text x="197" y="115" textAnchor="middle" fill={textMuted} fontSize="9">¿Puedo resolver?</text>
            <text x="197" y="135" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">No ➔ Pasa</text>

            {/* Envia a Manejador B */}
            <path d="M 245 115 L 260 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Manejador B */}
            <rect x="270" y="75" width="95" height="80" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="317" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Manejador B</text>
            <text x="317" y="115" textAnchor="middle" fill={textMuted} fontSize="9">¿Puedo resolver?</text>
            <text x="317" y="135" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">SÍ ➔ Resuelve</text>

            {/* Envia a Manejador C (no alcanzado) */}
            <path d="M 365 115 L 380 115" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" opacity="0.4" markerEnd="url(#arrow)" />

            {/* Manejador C */}
            <rect x="390" y="75" width="95" height="80" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1" opacity="0.4" />
            <text x="437" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Manejador C</text>
            <text x="437" y="115" textAnchor="middle" fill={textMuted} fontSize="9">¿Puedo resolver?</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'command':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Invocador */}
            <rect x="15" y="85" width="90" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="60" y="115" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Invoker (Botón)</text>
            <text x="60" y="130" textAnchor="middle" fill={textMuted} fontSize="9">+ setCommand()</text>

            {/* Flecha a interface Command */}
            <path d="M 105 115 L 180 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="142" y="105" textAnchor="middle" fill={textColor} fontSize="9">execute()</text>

            {/* Command Interface */}
            <rect x="190" y="55" width="120" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Command</text>
            <line x1="190" y1="90" x2="310" y2="90" stroke={gridColor} strokeWidth="1" />
            <text x="200" y="115" fill={textColor} fontSize="10" fontWeight="bold">+ execute()</text>
            <text x="200" y="132" fill={textMuted} fontSize="9">+ undo()</text>

            {/* Command Concreto */}
            <path d="M 250 145 L 250 170" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="190" y="180" width="120" height="40" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="250" y="205" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">ConcreteCommand</text>

            {/* Receptor */}
            <path d="M 310 200 L 380 200 L 380 145" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2" markerEnd="url(#arrow)" />
            <text x="350" y="190" textAnchor="middle" fill={textColor} fontSize="9">action()</text>

            <rect x="340" y="75" width="130" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="405" y="105" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Receiver (Receptor)</text>
            <text x="405" y="125" textAnchor="middle" fill={textMuted} fontSize="10">(ej. Light, Document)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'interpreter':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Context */}
            <rect x="20" y="80" width="80" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="60" y="110" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Contexto</text>
            <text x="60" y="125" textAnchor="middle" fill={textMuted} fontSize="9">(Datos / Estado)</text>

            {/* Expresion */}
            <rect x="180" y="40" width="140" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="250" y="65" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">AbstractExpression</text>
            <line x1="180" y1="75" x2="320" y2="75" stroke={gridColor} strokeWidth="1" />
            <text x="190" y="90" fill={textColor} fontSize="9">+ interpret(c: Context)</text>

            {/* Expresión Terminal */}
            <path d="M 210 100 L 130 100 L 130 140" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="75" y="150" width="110" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="130" y="180" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">TerminalExpr</text>

            {/* Expresión No Terminal */}
            <path d="M 290 100 L 370 100 L 370 140" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="315" y="150" width="110" height="50" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="370" y="180" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">NonTerminalExpr</text>

            {/* Agregacion recursiva */}
            <path d="M 425 175 C 470 175, 470 50, 320 50" fill="none" stroke={strokeColor} strokeWidth="1" markerStart="url(#diamond)" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
              <marker id="diamond" viewBox="0 0 12 12" refX="0" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 6 0 L 12 6 L 6 12 L 0 6 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'iterator':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Colección */}
            <rect x="25" y="55" width="130" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="90" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Colección</text>
            <text x="90" y="100" textAnchor="middle" fill={textMuted} fontSize="9">+ getIterator(): Iterator</text>

            {/* Crea Iterator */}
            <path d="M 90 115 L 90 150 L 210 150" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)" />

            {/* Iterator Interface */}
            <rect x="220" y="55" width="130" height="110" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="285" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Iterator</text>
            <line x1="220" y1="90" x2="350" y2="90" stroke={gridColor} strokeWidth="1" />
            <text x="230" y="110" fill={textColor} fontSize="10">+ hasNext(): boolean</text>
            <text x="230" y="130" fill={textColor} fontSize="10">+ next(): Element</text>

            {/* Cliente */}
            <rect x="390" y="80" width="85" height="55" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="432" y="112" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Cliente</text>

            {/* Recorre */}
            <path d="M 390 100 L 350 100" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'mediator':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Colleague A */}
            <rect x="25" y="85" width="90" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="70" y="110" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Componente A</text>
            <text x="70" y="130" textAnchor="middle" fill={textMuted} fontSize="9">send("evento")</text>

            {/* Envia exclusivamente a Mediador */}
            <path d="M 115 115 L 210 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Mediador */}
            <circle cx="250" cy="115" r="40" fill={boxBg} stroke={strokeColor} strokeWidth="3" />
            <text x="250" y="112" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Mediador</text>
            <text x="250" y="128" textAnchor="middle" fill={strokeColor} fontWeight="bold" fontSize="9">Central</text>

            {/* Envia a Colleague B */}
            <path d="M 290 115 L 375 115" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Colleague B */}
            <rect x="385" y="85" width="90" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="430" y="110" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">Componente B</text>
            <text x="430" y="130" textAnchor="middle" fill={textMuted} fontSize="9">react()</text>

            {/* Sin conexiones directas entre A y B */}
            <line x1="115" y1="180" x2="385" y2="180" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3" />
            <text x="250" y="200" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="10">🚫 NO HAY ACOPLAMIENTO DIRECTO</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'memento':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Originador */}
            <rect x="25" y="55" width="130" height="120" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="90" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Originator</text>
            <line x1="25" y1="90" x2="155" y2="90" stroke={gridColor} strokeWidth="1" />
            <text x="35" y="110" fill={textColor} fontSize="9">- state: string</text>
            <line x1="25" y1="120" x2="155" y2="120" stroke={gridColor} strokeWidth="1" />
            <text x="35" y="138" fill={textColor} fontSize="9">+ save(): Memento</text>
            <text x="35" y="158" fill={textColor} fontSize="9">+ restore(m)</text>

            {/* Memento (Caja de Estado Inmutable) */}
            <rect x="230" y="55" width="100" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="280" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Memento</text>
            <line x1="230" y1="90" x2="330" y2="90" stroke={gridColor} strokeWidth="1" />
            <text x="240" y="110" fill={textMuted} fontSize="9">🔒 State inmutable</text>

            {/* Guarda estado */}
            <path d="M 155 80 L 220 80" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Caretaker */}
            <rect x="360" y="55" width="115" height="120" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="417" y="80" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Caretaker</text>
            <line x1="360" y1="90" x2="475" y2="90" stroke={gridColor} strokeWidth="1" />
            <text x="370" y="110" fill={textMuted} fontSize="9">Guarda el historial</text>
            <text x="370" y="130" fill={textColor} fontSize="9">- history: List</text>

            {/* Relación de asociación */}
            <path d="M 360 110 L 330 110" fill="none" stroke={strokeColor} strokeWidth="1" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
            </defs>
          </svg>
        );

      case 'state':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Contexto */}
            <rect x="20" y="70" width="130" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="85" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Contexto (Celular)</text>
            <line x1="20" y1="105" x2="150" y2="105" stroke={gridColor} strokeWidth="1" />
            <text x="30" y="125" fill={textColor} fontSize="10">- state: State</text>
            <text x="30" y="145" fill={textColor} fontSize="9">+ request() {`{ state.handle() }`}</text>

            {/* Apunta a State */}
            <path d="M 150 115 L 210 115" fill="none" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrow)" />

            {/* State Interface */}
            <rect x="220" y="45" width="115" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="277" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» State</text>
            <line x1="220" y1="80" x2="335" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="230" y="95" fill={textColor} fontSize="9">+ handle()</text>

            {/* Concrete States */}
            <path d="M 277 105 L 230 145" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="180" y="155" width="70" height="40" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="215" y="178" textAnchor="middle" fill={textColor} fontSize="9" fontWeight="bold">SilentState</text>

            <path d="M 277 105 L 320 145" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="290" y="155" width="70" height="40" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="325" y="178" textAnchor="middle" fill={textColor} fontSize="9" fontWeight="bold">VibrantState</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'strategy':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Contexto */}
            <rect x="25" y="70" width="130" height="90" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="90" y="95" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">Contexto (Orden)</text>
            <line x1="25" y1="105" x2="155" y2="105" stroke={gridColor} strokeWidth="1" />
            <text x="35" y="125" fill={textColor} fontSize="10">- strategy: Strategy</text>
            <text x="35" y="145" fill={textColor} fontSize="9">+ procesarPago()</text>

            {/* Apunta a Strategy */}
            <path d="M 155 115 L 215 115" fill="none" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Strategy Interface */}
            <rect x="225" y="50" width="125" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="287" y="72" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">«interface» Strategy</text>
            <line x1="225" y1="80" x2="350" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="235" y="95" fill={textColor} fontSize="9">+ pagar(monto)</text>

            {/* Concrete Strategies */}
            <path d="M 287 110 L 220 150" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="180" y="160" width="70" height="40" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="215" y="183" textAnchor="middle" fill={textColor} fontSize="8" fontWeight="bold">PayPalStrategy</text>

            <path d="M 287 110 L 350 150" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="320" y="160" width="70" height="40" rx="4" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="355" y="183" textAnchor="middle" fill={textColor} fontSize="8" fontWeight="bold">CreditCardStrategy</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'template-method':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Clase Abstracta */}
            <rect x="40" y="45" width="200" height="110" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="140" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="12">AbstractClass (OrderManager)</text>
            <line x1="40" y1="80" x2="240" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="50" y="98" fill={textColor} fontSize="10" fontWeight="bold">+ templateMethod() {`{ step1(); step2(); }`}</text>
            <text x="50" y="118" fill={textColor} fontSize="10" fontStyle="italic"># step1()</text>
            <text x="50" y="138" fill={textColor} fontSize="10" fontStyle="italic"># step2()</text>

            {/* Herencia */}
            <path d="M 140 155 L 140 175" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />

            {/* Clase Concreta */}
            <rect x="40" y="185" width="200" height="45" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="140" y="202" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">ConcreteClass (NetOrder)</text>
            <text x="50" y="222" fill={textColor} fontSize="9">+ step1() / + step2() (Implementación)</text>

            {/* Explicación didáctica */}
            <rect x="290" y="80" width="180" height="80" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1" style={{ strokeDasharray: '2' }} />
            <text x="380" y="105" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">Principio de Hollywood</text>
            <text x="380" y="125" textAnchor="middle" fill={textMuted} fontSize="9">"No nos llames, nosotros te llamamos"</text>
            <text x="380" y="145" textAnchor="middle" fill={textMuted} fontSize="9">El padre controla, el hijo implementa</text>

            <defs>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      case 'visitor':
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            {/* Elemento Interface */}
            <rect x="25" y="45" width="130" height="60" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="90" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Element</text>
            <line x1="25" y1="80" x2="155" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="35" y="95" fill={textColor} fontSize="9">+ accept(v: Visitor)</text>

            {/* Elemento Concreto */}
            <path d="M 90 105 L 90 135" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="25" y="145" width="130" height="45" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="90" y="172" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">ConcreteElement</text>

            {/* Doble Despacho Arrow */}
            <path d="M 155 170 L 305 170" fill="none" stroke={strokeColor} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="230" y="160" textAnchor="middle" fill={textColor} fontSize="9">v.visitConcrete(this)</text>

            {/* Visitor Interface */}
            <rect x="315" y="45" width="160" height="70" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="395" y="70" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="11">«interface» Visitor</text>
            <line x1="315" y1="80" x2="475" y2="80" stroke={gridColor} strokeWidth="1" />
            <text x="325" y="95" fill={textColor} fontSize="9">+ visitConcrete(e: Element)</text>

            {/* Visitor Concreto */}
            <path d="M 395 115 L 395 135" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3" markerEnd="url(#hollow-arrow)" />
            <rect x="315" y="145" width="160" height="45" rx="6" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
            <text x="395" y="172" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="10">ConcreteVisitor (Export / Audit)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
              </marker>
              <marker id="hollow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--bg-card)" stroke={strokeColor} strokeWidth="1.5" />
              </marker>
            </defs>
          </svg>
        );

      default:
        // Diagrama genérico por si no coincide el ID
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {renderGrid()}
            <circle cx="250" cy="120" r="40" fill={boxBg} stroke={strokeColor} strokeWidth="2" />
            <text x="250" y="125" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize="13">Concepto</text>
          </svg>
        );
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      {renderSvg()}
    </div>
  );
};
export default PatternDiagram;
