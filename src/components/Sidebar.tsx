import React, { useState, useEffect } from 'react';
import { Pattern } from '../data/types';
import { CategoryAccordion } from './CategoryAccordion';
import { Layers, Activity, Settings, Code, ChevronDown, ChevronRight, BookOpen, Terminal, HelpCircle, Award, Shield, Cpu, Binary, Search, FolderTree, Home, X } from 'lucide-react';
import { flashcards } from '../data/flashcards';

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
  onOpenSearch?: () => void;
  progressPercentage?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
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
  onOpenSearch,
  progressPercentage,
  isMobileOpen,
  onCloseMobile,
}) => {
  // Cierra el drawer mobile al navegar
  const handleMobileNav = (callback: () => void) => {
    callback();
    onCloseMobile?.();
  };

  // Estados de acordeón colapsables (colapsados por defecto en la portada)
  const [showPatternsSubmenu, setShowPatternsSubmenu] = useState(activeView === 'pattern' || activeView === 'category');
  const [showPrinciplesSubmenu, setShowPrinciplesSubmenu] = useState(false);
  const [showArchitectureSubmenu, setShowArchitectureSubmenu] = useState(false);

  // Auto-expande acordeones basándose en la vista activa
  useEffect(() => {
    if (activeView === 'pattern' || activeView === 'category') {
      setShowPatternsSubmenu(true);
    } else if (activeView === 'solid-clean' || activeView === 'grasp' || activeView === 'refactor' || activeView === 'testing') {
      setShowPrinciplesSubmenu(true);
    } else if (activeView === 'resilience-eda' || activeView === 'sre-devops' || activeView === 'tooling-dev') {
      setShowArchitectureSubmenu(true);
    }
  }, [activeView]);

  return (
    <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`} role="navigation" aria-label="Menú principal">
      {/* Botón cerrar mobile */}
      <button className="sidebar-close-btn" onClick={onCloseMobile} aria-label="Cerrar menú">
        <X size={18} />
      </button>

      {/* Nombre general de la plataforma */}
      <div className="sidebar-header">
        <div className="logo">
          <Terminal size={22} className="text-indigo-500" />
          <span style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Arquitectura & Código</span>
        </div>
      </div>

      {/* Botón de Búsqueda Global */}
      <div style={{ padding: '0 8px' }}>
        <button
          id="global-search-trigger"
          onClick={onOpenSearch}
          className="sidebar-search-button"
          aria-label="Buscar en la plataforma (Cmd + K)"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            margin: '0 0 8px 0',
            backgroundColor: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
            border: '1px solid var(--border-color, #333)',
            borderRadius: '8px',
            color: 'var(--text-secondary, #aaa)',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={14} />
            <span>Buscar...</span>
          </div>
          <kbd style={{ background: 'var(--bg-primary, #111)', padding: '2px 5px', borderRadius: '4px', fontSize: '11px', border: '1px solid #444' }}>
            ⌘K
          </kbd>
        </button>

        {/* Indicador de Progreso */}
        {progressPercentage !== undefined && (
          <div className="sidebar-progress-box" style={{ padding: '8px 12px', margin: '4px 0 12px 0', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '8px', border: '1px solid var(--border-color, #333)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontWeight: '500' }}>
              <span>Progreso de Estudio</span>
              <span>{progressPercentage}%</span>
            </div>
            <div style={{ height: '5px', width: '100%', backgroundColor: 'var(--border-color, #333)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercentage}%`, backgroundColor: 'var(--accent-color, #6366f1)', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* BOTÓN: INICIO / PORTADA */}
        <button
          onClick={() => handleMobileNav(() => onSelectTopic('home'))}
          className={`pattern-item ${activeView === 'home' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Home size={16} />
          <span>Inicio / Portada</span>
        </button>

        {/* SECCIÓN: PATRONES DE DISEÑO */}
        <button
          onClick={() => {
            setShowPatternsSubmenu(!showPatternsSubmenu);
            if (activeView !== 'pattern' && activeView !== 'category') {
              handleMobileNav(() => onSelectPattern(selectedPattern || patterns[0]));
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
              onSelectPattern={(p) => handleMobileNav(() => onSelectPattern(p))}
              onSelectCategory={(c) => handleMobileNav(() => onSelectCategory(c))}
            />

            <CategoryAccordion
              category="structural"
              label="Estructurales"
              icon={<Code size={13} />}
              patterns={patterns.filter(p => p.category === 'structural')}
              selectedPattern={selectedPattern}
              selectedCategory={selectedCategory}
              activeView={activeView}
              onSelectPattern={(p) => handleMobileNav(() => onSelectPattern(p))}
              onSelectCategory={(c) => handleMobileNav(() => onSelectCategory(c))}
            />

            <CategoryAccordion
              category="behavioral"
              label="Comportamiento"
              icon={<Activity size={13} />}
              patterns={patterns.filter(p => p.category === 'behavioral')}
              selectedPattern={selectedPattern}
              selectedCategory={selectedCategory}
              activeView={activeView}
              onSelectPattern={(p) => handleMobileNav(() => onSelectPattern(p))}
              onSelectCategory={(c) => handleMobileNav(() => onSelectCategory(c))}
            />
          </div>
        )}

        {/* SECCIÓN: PRINCIPIOS DE DISEÑO (SOLID/GRASP/REFACTOR/TESTING) */}
        <button
          onClick={() => {
            setShowPrinciplesSubmenu(!showPrinciplesSubmenu);
            if (activeView !== 'solid-clean' && activeView !== 'grasp' && activeView !== 'refactor' && activeView !== 'testing') {
              onSelectTopic('solid-clean');
            }
          }}
          className={`pattern-item ${(activeView === 'solid-clean' || activeView === 'grasp' || activeView === 'refactor' || activeView === 'testing') ? 'active' : ''}`}
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
              onClick={() => handleMobileNav(() => onSelectTopic('solid-clean'))}
              className={`pattern-item ${activeView === 'solid-clean' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              SOLID & Código Limpio
            </button>
            <button
              onClick={() => handleMobileNav(() => onSelectTopic('grasp'))}
              className={`pattern-item ${activeView === 'grasp' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Principios GRASP
            </button>
            <button
              onClick={() => handleMobileNav(() => onSelectTopic('testing'))}
              className={`pattern-item ${activeView === 'testing' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Estrategias de Testing
            </button>
            <button
              onClick={() => handleMobileNav(onSelectRefactor)}
              className={`pattern-item ${activeView === 'refactor' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Refactorización & Smells
            </button>
          </div>
        )}

        {/* SECCIÓN: ARQUITECTURA & DEVOPS */}
        <button
          onClick={() => {
            setShowArchitectureSubmenu(!showArchitectureSubmenu);
            if (activeView !== 'resilience-eda' && activeView !== 'sre-devops' && activeView !== 'tooling-dev') {
              onSelectTopic('resilience-eda');
            }
          }}
          className={`pattern-item ${(activeView === 'resilience-eda' || activeView === 'sre-devops' || activeView === 'tooling-dev') ? 'active' : ''}`}
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
              onClick={() => handleMobileNav(() => onSelectTopic('resilience-eda'))}
              className={`pattern-item ${activeView === 'resilience-eda' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Resiliencia Distribuida
            </button>
            <button
              onClick={() => handleMobileNav(() => onSelectTopic('sre-devops'))}
              className={`pattern-item ${activeView === 'sre-devops' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              SRE & Infraestructura
            </button>
            <button
              onClick={() => handleMobileNav(() => onSelectTopic('tooling-dev'))}
              className={`pattern-item ${activeView === 'tooling-dev' ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 10px' }}
            >
              Tooling de Desarrollo
            </button>
          </div>
        )}

        {/* BOTÓN GLOBAL: CIENCIAS DE LA COMPUTACIÓN */}
        <button
          onClick={() => handleMobileNav(() => onSelectTopic('computer-science'))}
          className={`pattern-item ${activeView === 'computer-science' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '4px'
          }}
        >
          <Binary size={16} />
          <span>Ciencias de la Computación</span>
        </button>

        {/* BOTÓN GLOBAL: ALGORITMOS & ESTRUCTURAS */}
        <button
          onClick={() => handleMobileNav(() => onSelectTopic('algorithms'))}
          className={`pattern-item ${activeView === 'algorithms' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '4px'
          }}
        >
          <FolderTree size={16} />
          <span>Algoritmos & Estructuras</span>
        </button>

        {/* BOTÓN GLOBAL: FUENTES DE ESTUDIO */}
        <button
          onClick={() => handleMobileNav(onSelectSources)}
          className={`pattern-item ${activeView === 'sources' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '8px'
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
          onClick={() => handleMobileNav(onSelectFlashcards)}
          className={`pattern-item ${activeView === 'flashcards' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <HelpCircle size={16} />
          <span>Flashcards ({flashcards.length})</span>
        </button>

        {/* BOTÓN GLOBAL: SIMULADOR DE EXAMEN */}
        <button
          onClick={() => handleMobileNav(onSelectQuiz)}
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

        {/* BOTÓN GLOBAL: EXAMEN SR / STAFF */}
        <button
          onClick={() => handleMobileNav(() => onSelectTopic('senior-staff'))}
          className={`pattern-item ${activeView === 'senior-staff' ? 'active' : ''}`}
          style={{ 
            fontWeight: '600', 
            border: '1px solid var(--accent-color, #6366f1)',
            boxShadow: 'var(--shadow-sm)',
            background: activeView === 'senior-staff' ? 'rgba(99, 102, 241, 0.15)' : 'transparent'
          }}
        >
          <Shield size={16} className="text-indigo-400" />
          <span>Examen Sr / Staff</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
