import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Terminal, Award } from 'lucide-react';
import { patterns } from '../data/index';
import { studyGuide } from '../data/studyGuide';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: 'pattern' | 'topic' | 'tool';
  targetView: string;
  patternObject?: typeof patterns[0];
  topicId?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPattern: (pattern: typeof patterns[0]) => void;
  onSelectTopic: (topicId: string) => void;
  onNavigateView: (view: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  onSelectPattern,
  onSelectTopic,
  onNavigateView,
}) => {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  useEffect(() => {
    if (highlightedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll('[data-search-result]');
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal by event dispatch or state
          const btn = document.getElementById('global-search-trigger');
          btn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const results: SearchResult[] = [];

  if (normalizedQuery.length > 0) {
    // 1. Filter patterns
    patterns.forEach((pattern) => {
      if (
        pattern.name.toLowerCase().includes(normalizedQuery) ||
        pattern.description.toLowerCase().includes(normalizedQuery) ||
        pattern.category.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `pattern-${pattern.id}`,
          title: pattern.name,
          category: pattern.category === 'creational' ? 'Creacional' : pattern.category === 'structural' ? 'Estructural' : 'Comportamiento',
          type: 'pattern',
          targetView: 'pattern',
          patternObject: pattern,
        });
      }
    });

    // 2. Filter study topics
    studyGuide.forEach((topic) => {
      if (
        topic.title.toLowerCase().includes(normalizedQuery) ||
        topic.introduction.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `topic-${topic.id}`,
          title: topic.title,
          category: 'Guía de Estudio',
          type: 'topic',
          targetView: topic.id,
          topicId: topic.id,
        });
      }
    });

    // 3. Filter tools
    const tools = [
      { id: 'algorithms', title: 'Catálogo de Algoritmos & Estructuras de Datos', category: 'Herramientas', targetView: 'algorithms' },
      { id: 'quiz', title: 'Simulador de Quiz & Evaluaciones', category: 'Herramientas', targetView: 'quiz' },
      { id: 'flashcards', title: 'Mazo de Flashcards de Ingeniería', category: 'Herramientas', targetView: 'flashcards' },
      { id: 'refactor', title: 'Catálogo e Introducción a Refactorización', category: 'Herramientas', targetView: 'refactor' },
      { id: 'sources', title: 'Fuentes de Estudio Consolidadas', category: 'Herramientas', targetView: 'sources' },
    ];

    tools.forEach((t) => {
      if (t.title.toLowerCase().includes(normalizedQuery)) {
        results.push({
          id: t.id,
          title: t.title,
          category: t.category,
          type: 'tool',
          targetView: t.targetView,
        });
      }
    });
  }

  const handleSelectResult = (result: SearchResult) => {
    if (result.type === 'pattern' && result.patternObject) {
      onSelectPattern(result.patternObject);
    } else if (result.type === 'topic' && result.topicId) {
      onSelectTopic(result.topicId);
    } else {
      onNavigateView(result.targetView);
    }
    onClose();
  };

  return (
    <div
      className="global-search-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda Global"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
    >
      <div
        className="global-search-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-card, #1e1e2e)',
          color: 'var(--text-color, #e0e0e0)',
          borderRadius: '12px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          border: '1px solid var(--border-color, #333)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Input Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color, #333)',
            gap: '12px',
          }}
        >
          <Search size={20} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar patrón, principio (SOLID, GRASP), quiz, flashcard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex((prev) => (prev + 1 >= results.length ? 0 : prev + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex((prev) => (prev - 1 < 0 ? results.length - 1 : prev - 1));
              } else if (e.key === 'Enter' && highlightedIndex >= 0 && highlightedIndex < results.length) {
                e.preventDefault();
                handleSelectResult(results[highlightedIndex]);
              }
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary, #fff)',
              fontSize: '16px',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888' }}
            >
              <X size={18} />
            </button>
          )}
          <span
            style={{
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-secondary, #2a2a3c)',
              color: '#888',
              border: '1px solid #444',
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div ref={resultsRef} style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px' }}>
          {normalizedQuery.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#888' }}>
              <Terminal size={32} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Escribe para buscar entre 23+ patrones, guías de estudio y herramientas.</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>Tip: Presiona <kbd style={{ background: '#333', padding: '2px 4px', borderRadius: '3px' }}>Cmd + K</kbd> en cualquier lugar.</p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#888' }}>
              <p style={{ margin: 0 }}>No se encontraron resultados para &quot;{query}&quot;</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {results.map((item, index) => (
                <button
                  key={item.id}
                  data-search-result
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: highlightedIndex === index ? 'var(--bg-hover, rgba(255,255,255,0.05))' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'inherit',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.type === 'pattern' && <Layers size={18} className="text-indigo-400" />}
                    {item.type === 'topic' && <BookOpen size={18} className="text-emerald-400" />}
                    {item.type === 'tool' && <Award size={18} className="text-amber-400" />}
                    <div>
                      <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{item.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
