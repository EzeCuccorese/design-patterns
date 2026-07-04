import React, { useState, useEffect } from 'react';
import { Pattern } from '../data/types';
import { Layers, Activity, Settings, Code, ChevronDown, ChevronRight, Hammer, BookOpen, Terminal, Award, HelpCircle } from 'lucide-react';

interface SidebarProps {
  patterns: Pattern[];
  selectedPattern: Pattern | null;
  selectedCategory: 'creational' | 'structural' | 'behavioral' | null;
  activeView: 'pattern' | 'category' | 'refactor' | 'sources' | 'quiz' | 'flashcards' | 'guide';
  onSelectPattern: (pattern: Pattern) => void;
  onSelectCategory: (category: 'creational' | 'structural' | 'behavioral') => void;
  onSelectRefactor: () => void;
  onSelectSources: () => void;
  onSelectQuiz: () => void;
  onSelectFlashcards: () => void;
  onSelectGuide: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  patterns,
  selectedPattern,
  selectedCategory,
  activeView,
  onSelectPattern,
  onSelectCategory,
  onSelectRefactor,
  onSelectSources,
  onSelectQuiz,
  onSelectFlashcards,
  onSelectGuide,
}) => {
  // Agrupar patrones por categoría
  const creational = patterns.filter(p => p.category === 'creational');
  const structural = patterns.filter(p => p.category === 'structural');
  const behavioral = patterns.filter(p => p.category === 'behavioral');

  // Estados del acordeón por categoría
  const [openCreational, setOpenCreational] = useState(true);
  const [openStructural, setOpenStructural] = useState(false);
  const [openBehavioral, setOpenBehavioral] = useState(false);

  // Estado del menú principal para Patrones de Diseño
  const [showPatternsSubmenu, setShowPatternsSubmenu] = useState(true);

  // Asegura que el submenú de Patrones esté abierto si estamos viendo un patrón o categoría
  useEffect(() => {
    if (activeView === 'pattern' || activeView === 'category') {
      setShowPatternsSubmenu(true);
    }
  }, [activeView]);

  // Asegura que la categoría seleccionada esté abierta en el acordeón
  useEffect(() => {
    if (activeView === 'category' && selectedCategory) {
      if (selectedCategory === 'creational') setOpenCreational(true);
      if (selectedCategory === 'structural') setOpenStructural(true);
      if (selectedCategory === 'behavioral') setOpenBehavioral(true);
    } else if (activeView === 'pattern' && selectedPattern) {
      if (selectedPattern.category === 'creational') setOpenCreational(true);
      if (selectedPattern.category === 'structural') setOpenStructural(true);
      if (selectedPattern.category === 'behavioral') setOpenBehavioral(true);
    }
  }, [selectedPattern, selectedCategory, activeView]);

  const handleCategoryClick = (category: 'creational' | 'structural' | 'behavioral', toggleFn: React.Dispatch<React.SetStateAction<boolean>>, isOpen: boolean) => {
    onSelectCategory(category);
    if (!isOpen) {
      toggleFn(true);
    }
  };

  return (
    <aside className="sidebar">
      {/* Nuevo nombre general para la plataforma */}
      <div className="sidebar-header">
        <div className="logo">
          <Terminal size={22} className="text-indigo-500" />
          <span style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Arquitectura & Código</span>
        </div>
      </div>
      
      <div className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* BOTÓN PRINCIPAL DE PATRONES (Mismo estilo cápsula) */}
        <button
          onClick={() => {
            setShowPatternsSubmenu(!showPatternsSubmenu);
            if (activeView !== 'pattern' && activeView !== 'category') {
              if (selectedPattern) {
                onSelectPattern(selectedPattern);
              } else {
                onSelectPattern(patterns[0]);
              }
            }
          }}
          className={`pattern-item ${(activeView === 'pattern' || activeView === 'category') ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} />
            <span>Patrones de Diseño</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>
            {showPatternsSubmenu ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </button>

        {/* SUBMENÚ COLAPSABLE DE CATEGORÍAS Y PATRONES */}
        {showPatternsSubmenu && (
          <div style={{ paddingLeft: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            
            {/* CATEGORÍA: CREACIONALES */}
            {creational.length > 0 && (
              <div className="category-group" style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    backgroundColor: activeView === 'category' && selectedCategory === 'creational' ? 'var(--accent-light)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick('creational', setOpenCreational, openCreational)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: activeView === 'category' && selectedCategory === 'creational' ? 'var(--accent)' : 'var(--text-primary)',
                      fontWeight: activeView === 'category' && selectedCategory === 'creational' ? '700' : '500',
                    }}
                  >
                    <h3 className="category-title" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'inherit' }}>
                      <Settings size={13} />
                      <span>CREACIONALES</span>
                    </h3>
                  </button>
                  
                  <button
                    onClick={() => setOpenCreational(!openCreational)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {openCreational ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </button>
                </div>
                
                {openCreational && (
                  <div style={{ paddingLeft: '8px', marginTop: '4px' }}>
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      lineHeight: '1.4',
                      marginBottom: '8px',
                      padding: '6px 8px',
                      backgroundColor: 'var(--bg-app)',
                      borderRadius: '6px',
                      borderLeft: '2px solid var(--lang-java)'
                    }}>
                      Relativos al proceso de creación de objetos. Desacoplan al sistema de cómo sus objetos se crean, componen y representan.
                    </p>
                    
                    {creational.map(p => (
                      <button
                        key={p.id}
                        onClick={() => onSelectPattern(p)}
                        className={`pattern-item ${activeView === 'pattern' && selectedPattern?.id === p.id ? 'active' : ''}`}
                        style={{ fontSize: '13px', padding: '8px 10px' }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CATEGORÍA: ESTRUCTURALES */}
            {structural.length > 0 && (
              <div className="category-group" style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    backgroundColor: activeView === 'category' && selectedCategory === 'structural' ? 'var(--accent-light)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick('structural', setOpenStructural, openStructural)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: activeView === 'category' && selectedCategory === 'structural' ? 'var(--accent)' : 'var(--text-primary)',
                      fontWeight: activeView === 'category' && selectedCategory === 'structural' ? '700' : '500',
                    }}
                  >
                    <h3 className="category-title" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'inherit' }}>
                      <Code size={13} />
                      <span>ESTRUCTURALES</span>
                    </h3>
                  </button>
                  
                  <button
                    onClick={() => setOpenStructural(!openStructural)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {openStructural ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </button>
                </div>
                
                {openStructural && (
                  <div style={{ paddingLeft: '8px', marginTop: '4px' }}>
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      lineHeight: '1.4',
                      marginBottom: '8px',
                      padding: '6px 8px',
                      backgroundColor: 'var(--bg-app)',
                      borderRadius: '6px',
                      borderLeft: '2px solid var(--lang-python)'
                    }}>
                      Composición de clases y objetos. Definen cómo ensamblar objetos y clases grandes en estructuras más complejas de forma flexible y eficiente.
                    </p>

                    {structural.map(p => (
                      <button
                        key={p.id}
                        onClick={() => onSelectPattern(p)}
                        className={`pattern-item ${activeView === 'pattern' && selectedPattern?.id === p.id ? 'active' : ''}`}
                        style={{ fontSize: '13px', padding: '8px 10px' }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CATEGORÍA: COMPORTAMIENTO */}
            {behavioral.length > 0 && (
              <div className="category-group" style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    backgroundColor: activeView === 'category' && selectedCategory === 'behavioral' ? 'var(--accent-light)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick('behavioral', setOpenBehavioral, openBehavioral)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: activeView === 'category' && selectedCategory === 'behavioral' ? 'var(--accent)' : 'var(--text-primary)',
                      fontWeight: activeView === 'category' && selectedCategory === 'behavioral' ? '700' : '500',
                    }}
                  >
                    <h3 className="category-title" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'inherit' }}>
                      <Activity size={13} />
                      <span>COMPORTAMIENTO</span>
                    </h3>
                  </button>
                  
                  <button
                    onClick={() => setOpenBehavioral(!openBehavioral)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {openBehavioral ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </button>
                </div>
                
                {openBehavioral && (
                  <div style={{ paddingLeft: '8px', marginTop: '4px' }}>
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      lineHeight: '1.4',
                      marginBottom: '8px',
                      padding: '6px 8px',
                      backgroundColor: 'var(--bg-app)',
                      borderRadius: '6px',
                      borderLeft: '2px solid var(--lang-typescript)'
                    }}>
                      Interacción y distribución de responsabilidades. Se centran en la comunicación entre objetos y en cómo coordinar flujos complejos de control.
                    </p>

                    {behavioral.map(p => (
                      <button
                        key={p.id}
                        onClick={() => onSelectPattern(p)}
                        className={`pattern-item ${activeView === 'pattern' && selectedPattern?.id === p.id ? 'active' : ''}`}
                        style={{ fontSize: '13px', padding: '8px 10px' }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* BOTÓN GLOBAL: REFACTORIZACIÓN */}
        <button
          onClick={onSelectRefactor}
          className={`pattern-item ${activeView === 'refactor' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '8px'
          }}
        >
          <Hammer size={16} />
          <span>Refactorización (Smells)</span>
        </button>

        {/* BOTÓN GLOBAL: FUENTES DE ESTUDIO */}
        <button
          onClick={onSelectSources}
          className={`pattern-item ${activeView === 'sources' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <BookOpen size={16} />
          <span>Fuentes de Estudio</span>
        </button>

        {/* SECCIÓN DE AUTOEVALUACIÓN */}
        <div style={{ 
          fontSize: '11px', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          color: 'var(--text-muted)',
          margin: '16px 0 6px 8px'
        }}>
          Autoevaluación
        </div>

        {/* BOTÓN GLOBAL: GUÍA DE ESTUDIO */}
        <button
          onClick={onSelectGuide}
          className={`pattern-item ${activeView === 'guide' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <BookOpen size={16} />
          <span>Guía de Estudio</span>
        </button>

        {/* BOTÓN GLOBAL: FLASHCARDS */}
        <button
          onClick={onSelectFlashcards}
          className={`pattern-item ${activeView === 'flashcards' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <HelpCircle size={16} />
          <span>Flashcards (25)</span>
        </button>

        {/* BOTÓN GLOBAL: SIMULADOR DE EXAMEN */}
        <button
          onClick={onSelectQuiz}
          className={`pattern-item ${activeView === 'quiz' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Award size={16} />
          <span>Simulador de Examen</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
