import React, { useState } from 'react';
import { patterns } from './data/index';
import { categoryOverviews } from './data/categories';
import { Sidebar } from './components/Sidebar';
import { BentoGrid } from './components/BentoGrid';
import { CategoryDetail } from './components/CategoryDetail';
import { RefactorDetail } from './components/RefactorDetail';
import { SourcesDetail } from './components/SourcesDetail';
import { ThemeToggle } from './components/ThemeToggle';
import { Pattern } from './data/types';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'pattern' | 'category' | 'refactor' | 'sources'>('pattern');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(patterns[0]);
  const [selectedCategory, setSelectedCategory] = useState<'creational' | 'structural' | 'behavioral' | null>(null);

  const handleSelectPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    setSelectedCategory(null);
    setActiveView('pattern');
  };

  const handleSelectCategory = (category: 'creational' | 'structural' | 'behavioral') => {
    setSelectedCategory(category);
    setSelectedPattern(null);
    setActiveView('category');
  };

  const handleSelectRefactor = () => {
    setSelectedCategory(null);
    setSelectedPattern(null);
    setActiveView('refactor');
  };

  const handleSelectSources = () => {
    setSelectedCategory(null);
    setSelectedPattern(null);
    setActiveView('sources');
  };

  // Determinar título de cabecera
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'refactor':
        return "Introducción a la Refactorización";
      case 'sources':
        return "Fuentes de Estudio Consolidadas";
      case 'category':
        return selectedCategory ? categoryOverviews[selectedCategory].name : "Resumen de Categoría";
      case 'pattern':
      default:
        return "Panel de Estudio de Patrones";
    }
  };

  return (
    <div className="app-container">
      {/* Barra de Navegación Lateral */}
      <Sidebar
        patterns={patterns}
        selectedPattern={selectedPattern}
        selectedCategory={selectedCategory}
        activeView={activeView}
        onSelectPattern={handleSelectPattern}
        onSelectCategory={handleSelectCategory}
        onSelectRefactor={handleSelectRefactor}
        onSelectSources={handleSelectSources}
      />

      {/* Panel de Contenido Principal */}
      <main className="dashboard">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>{getHeaderTitle()}</h1>
          </div>
          <div className="dashboard-actions">
            <ThemeToggle />
          </div>
        </header>

        <div className="dashboard-content">
          {activeView === 'category' && selectedCategory && (
            <CategoryDetail category={categoryOverviews[selectedCategory]} />
          )}
          
          {activeView === 'pattern' && selectedPattern && (
            <BentoGrid pattern={selectedPattern} />
          )}

          {activeView === 'refactor' && (
            <RefactorDetail />
          )}

          {activeView === 'sources' && (
            <SourcesDetail />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
