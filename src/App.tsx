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
import { QuizSimulator } from './components/QuizSimulator';
import { Flashcards } from './components/Flashcards';
import { StudyGuide } from './components/StudyGuide';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'pattern' | 'category' | 'refactor' | 'sources' | 'quiz' | 'flashcards' | 'guide'>('pattern');
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

  const handleSelectQuiz = () => {
    setSelectedCategory(null);
    setSelectedPattern(null);
    setActiveView('quiz');
  };

  const handleSelectFlashcards = () => {
    setSelectedCategory(null);
    setSelectedPattern(null);
    setActiveView('flashcards');
  };

  const handleSelectGuide = () => {
    setSelectedCategory(null);
    setSelectedPattern(null);
    setActiveView('guide');
  };

  // Determinar título de cabecera
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'refactor':
        return "Introducción a la Refactorización";
      case 'sources':
        return "Fuentes de Estudio Consolidadas";
      case 'guide':
        return "Guía de Estudio Técnica y SRE";
      case 'flashcards':
        return "Mazo de Flashcards de Ingeniería";
      case 'quiz':
        return "Simulador de Evaluaciones Técnicas";
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
        onSelectQuiz={handleSelectQuiz}
        onSelectFlashcards={handleSelectFlashcards}
        onSelectGuide={handleSelectGuide}
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

          {activeView === 'guide' && (
            <StudyGuide />
          )}

          {activeView === 'flashcards' && (
            <Flashcards />
          )}

          {activeView === 'quiz' && (
            <QuizSimulator />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
