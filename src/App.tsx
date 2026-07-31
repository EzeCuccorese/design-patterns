import React, { useState, useEffect, Suspense } from 'react';
import { env } from './config/env';
import { patterns } from './data/index';
import { categoryOverviews } from './data/categories';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { BentoGrid } from './components/BentoGrid';
import { CategoryDetail } from './components/CategoryDetail';
import { ThemeToggle } from './components/ThemeToggle';
import { GlobalSearch } from './components/GlobalSearch';
import { useHashRoute } from './hooks/useHashRoute';
import { useStudyProgress } from './hooks/useStudyProgress';

import { HomeLanding } from './components/HomeLanding';

// Lazy loading de vistas secundarias y componentes pesados
const RefactorDetail = React.lazy(() =>
  import('./components/RefactorDetail').then((m) => ({ default: m.RefactorDetail }))
);
const SourcesDetail = React.lazy(() =>
  import('./components/SourcesDetail').then((m) => ({ default: m.SourcesDetail }))
);
const QuizSimulator = React.lazy(() =>
  import('./components/QuizSimulator').then((m) => ({ default: m.QuizSimulator }))
);
const Flashcards = React.lazy(() =>
  import('./components/Flashcards').then((m) => ({ default: m.Flashcards }))
);
const TopicDetail = React.lazy(() =>
  import('./components/TopicDetail').then((m) => ({ default: m.TopicDetail }))
);
const AlgorithmCatalog = React.lazy(() =>
  import('./components/AlgorithmCatalog').then((m) => ({ default: m.AlgorithmCatalog }))
);
const SeniorStaffExam = React.lazy(() =>
  import('./components/SeniorStaffExam').then((m) => ({ default: m.SeniorStaffExam }))
);

const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--text-muted, #888)' }}>
    <div style={{ textAlign: 'center' }}>
      <div className="animate-spin" style={{ width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-color, #6366f1)', borderRadius: '50%', margin: '0 auto 12px auto' }} />
      <p style={{ fontSize: '14px' }}>Cargando módulo...</p>
    </div>
  </div>
);

export const App: React.FC = () => {
  const { routeState, navigatePattern, navigateCategory, navigateView } = useHashRoute();
  const { activeView, selectedPattern, selectedCategory } = routeState;
  const { progressPercentage } = useStudyProgress();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    document.title = env.VITE_APP_TITLE;
  }, []);

  // Determinar título de cabecera
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'home':
        return "Portada & Panel de Control de Ingeniería";
      case 'refactor':
        return "Introducción a la Refactorización";
      case 'sources':
        return "Fuentes de Estudio Consolidadas";
      case 'solid-clean':
        return "SOLID & Código Limpio";
      case 'grasp':
        return "Principios GRASP";
      case 'testing':
        return "Estrategias de Testing & TDD";
      case 'resilience-eda':
        return "Resiliencia & Arquitecturas Distribuidas";
      case 'sre-devops':
        return "SRE, DevOps e Infraestructura";
      case 'tooling-dev':
        return "Tooling de Desarrollo Moderno";
      case 'computer-science':
        return "Ciencias de la Computación & Linux";
      case 'algorithms':
        return "Catálogo de Algoritmos & Estructuras de Datos";
      case 'flashcards':
        return "Mazo de Flashcards de Ingeniería";
      case 'quiz':
        return "Simulador de Evaluaciones Técnicas";
      case 'senior-staff':
        return "Examen & Evaluación Nivel Senior / Staff";
      case 'category':
        return selectedCategory ? categoryOverviews[selectedCategory].name : "Resumen de Categoría";
      case 'pattern':
      default:
        return selectedPattern ? `Patrón: ${selectedPattern.name}` : "Panel de Estudio de Patrones";
    }
  };

  return (
    <div className="app-container">
      {/* Overlay Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-overlay visible" onClick={closeSidebar} />
      )}
      {/* Modal de Búsqueda Global */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPattern={(p) => navigatePattern(p)}
        onSelectTopic={(tId) => navigateView(tId)}
        onNavigateView={(v) => navigateView(v)}
      />

      {/* Barra de Navegación Lateral */}
      <Sidebar
        patterns={patterns}
        selectedPattern={selectedPattern}
        selectedCategory={selectedCategory}
        activeView={activeView}
        onSelectPattern={(p) => navigatePattern(p)}
        onSelectCategory={(c) => navigateCategory(c)}
        onSelectRefactor={() => navigateView('refactor')}
        onSelectSources={() => navigateView('sources')}
        onSelectQuiz={() => navigateView('quiz')}
        onSelectFlashcards={() => navigateView('flashcards')}
        onSelectTopic={(topicId) => navigateView(topicId)}
        onOpenSearch={() => setIsSearchOpen(true)}
        progressPercentage={progressPercentage}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={closeSidebar}
      />

      {/* Panel de Contenido Principal */}
      <main className="dashboard">
        <header className="dashboard-header">
          <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Abrir menú">
            <Menu size={20} />
          </button>
          <div className="dashboard-title">
            <h1>{getHeaderTitle()}</h1>
          </div>
          <div className="dashboard-actions">
            <ThemeToggle />
          </div>
        </header>

        <div className="dashboard-content">
          <Suspense fallback={<LoadingFallback />}>
            {activeView === 'home' && (
              <HomeLanding
                onNavigateView={(v) => navigateView(v)}
                onSelectCategory={(c) => navigateCategory(c)}
                progressPercentage={progressPercentage}
                patternsCount={patterns.length}
              />
            )}

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

            {['solid-clean', 'grasp', 'testing', 'resilience-eda', 'sre-devops', 'tooling-dev', 'computer-science'].includes(activeView) && (
              <TopicDetail topicId={activeView} />
            )}

            {activeView === 'flashcards' && (
              <Flashcards />
            )}

            {activeView === 'quiz' && (
              <QuizSimulator />
            )}

            {activeView === 'algorithms' && (
              <AlgorithmCatalog />
            )}

            {activeView === 'senior-staff' && (
              <SeniorStaffExam
                onNavigatePattern={(patternId) => {
                  const p = patterns.find((item) => item.id === patternId);
                  if (p) navigatePattern(p);
                }}
                onNavigateTopic={(tId) => navigateView(tId)}
                onNavigateView={(v) => navigateView(v)}
              />
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default App;
