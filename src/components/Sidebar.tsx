import React, { useState, useEffect } from 'react';
import { Pattern } from '../data/types';
import { CategoryAccordion } from './CategoryAccordion';
import { Layers, Activity, Settings, Code, ChevronDown, ChevronRight, Hammer, BookOpen, Terminal, HelpCircle, Award, Shield, Cpu } from 'lucide-react';

interface SidebarProps {
  patterns: Pattern[];
  selectedPattern: Pattern | null;
  selectedCategory: 'creational' | 'structural' | 'behavioral' | null;
  activeView: string;
  onSelectPattern: (pattern: Pattern) => void;
  onSelectCategory: (category: 'creational' | 'structural' | 'behavioral') => void;
  onSelectRefactor: () => void;
  onSelectSources: () => void;
  onSelectQuiz: () => void;
  onSelectFlashcards: () => void;
  onSelectTopic: (topicId: string) => void;
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
  onSelectTopic,
}) => {
  // Estados de acordeón colapsables
  const [showPatternsSubmenu, setShowPatternsSubmenu] = useState(true);
  const [showPrinciplesSubmenu, setShowPrinciplesSubmenu] = useState(false);
  const [showArchitectureSubmenu, setShowArchitectureSubmenu] = useState(false);

  // Auto-expande acordeones basándose en la vista activa
  useEffect(() => {
    if (activeView === 'pattern' || activeView === 'category') {
      setShowPatternsSubmenu(true);
    } else if (activeView === 'solid-clean' || activeView === 'grasp') {
      setShowPrinciplesSubmenu(true);
    } else if (activeView === 'testing' || activeView === 'resilience-eda' || activeView === 'sre-devops') {
      setShowArchitectureSubmenu(true);
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
        
        {/* SECCIÓN: PATRONES DE DISEÑO */}
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

        {/* SECCIÓN: PRINCIPIOS DE DISEÑO (SOLID/GRASP) */}
        <button
          onClick={() => {
            setShowPrinciplesSubmenu(!showPrinciplesSubmenu);
            if (activeView !== 'solid-clean' && activeView !== 'grasp') {
              onSelectTopic('solid-clean');
            }
          }}
          className={`pattern-item ${(activeView === 'solid-clean' || activeView === 'grasp') ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} />
            <span>Principios de Diseño</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>
            {showPrinciplesSubmenu ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </button>

        {showPrinciplesSubmenu && (
          <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => onSelectTopic('solid-clean')}
              className={`pattern-item ${activeView === 'solid-clean' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              SOLID & Código Limpio
            </button>
            <button
              onClick={() => onSelectTopic('grasp')}
              className={`pattern-item ${activeView === 'grasp' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Principios GRASP
            </button>
          </div>
        )}

        {/* SECCIÓN: ARQUITECTURA & DEVOPS */}
        <button
          onClick={() => {
            setShowArchitectureSubmenu(!showArchitectureSubmenu);
            if (activeView !== 'testing' && activeView !== 'resilience-eda' && activeView !== 'sre-devops') {
              onSelectTopic('testing');
            }
          }}
          className={`pattern-item ${(activeView === 'testing' || activeView === 'resilience-eda' || activeView === 'sre-devops') ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} />
            <span>Arquitectura & DevOps</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>
            {showArchitectureSubmenu ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </button>

        {showArchitectureSubmenu && (
          <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => onSelectTopic('testing')}
              className={`pattern-item ${activeView === 'testing' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Estrategias de Testing
            </button>
            <button
              onClick={() => onSelectTopic('resilience-eda')}
              className={`pattern-item ${activeView === 'resilience-eda' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Resiliencia Distribuida
            </button>
            <button
              onClick={() => onSelectTopic('sre-devops')}
              className={`pattern-item ${activeView === 'sre-devops' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              SRE & Infraestructura
            </button>
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
