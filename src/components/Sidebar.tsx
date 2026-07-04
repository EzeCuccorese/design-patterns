import React, { useState, useEffect } from 'react';
import { Pattern } from '../data/types';
import { CategoryAccordion } from './CategoryAccordion';
import { Layers, Activity, Settings, Code, ChevronDown, ChevronRight, Hammer, BookOpen, Terminal, HelpCircle, Award } from 'lucide-react';

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
  // Estados de acordeón global para submenú de patrones
  const [showPatternsSubmenu, setShowPatternsSubmenu] = useState(true);

  // Asegura que el submenú de Patrones esté abierto si estamos viendo un patrón o categoría
  useEffect(() => {
    if (activeView === 'pattern' || activeView === 'category') {
      setShowPatternsSubmenu(true);
    }
  }, [activeView]);

  return (
    <aside className="sidebar">
      {/* Nombre general de la plataforma */}
      <div className="sidebar-header">
        <div className="logo">
          <Terminal size={22} className="text-indigo-500" />
          <span style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Arquitectura & Código</span>
        </div>
      </div>
      
      <div className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* BOTÓN PRINCIPAL DE PATRONES */}
        <button
          onClick={() => {
            setShowPatternsSubmenu(!showPatternsSubmenu);
            if (activeView !== 'pattern' && activeView !== 'category') {
              onSelectPattern(selectedPattern || patterns[0]);
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

        {/* SUBMENÚ COLAPSABLE DE CATEGORÍAS */}
        {showPatternsSubmenu && (
          <div style={{ paddingLeft: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            
            <CategoryAccordion
              category="creational"
              label="Creacionales"
              icon={<Settings size={13} />}
              patterns={patterns.filter(p => p.category === 'creational')}
              selectedPattern={selectedPattern}
              selectedCategory={selectedCategory}
              activeView={activeView}
              onSelectPattern={onSelectPattern}
              onSelectCategory={onSelectCategory}
            />

            <CategoryAccordion
              category="structural"
              label="Estructurales"
              icon={<Code size={13} />}
              patterns={patterns.filter(p => p.category === 'structural')}
              selectedPattern={selectedPattern}
              selectedCategory={selectedCategory}
              activeView={activeView}
              onSelectPattern={onSelectPattern}
              onSelectCategory={onSelectCategory}
            />

            <CategoryAccordion
              category="behavioral"
              label="Comportamiento"
              icon={<Activity size={13} />}
              patterns={patterns.filter(p => p.category === 'behavioral')}
              selectedPattern={selectedPattern}
              selectedCategory={selectedCategory}
              activeView={activeView}
              onSelectPattern={onSelectPattern}
              onSelectCategory={onSelectCategory}
            />

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
