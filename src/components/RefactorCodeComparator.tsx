import React from 'react';
import { refactoringExamples, RefactoringExample } from '../data/refactoring';
import { Code, AlertTriangle, CheckCircle } from 'lucide-react';

interface RefactorCodeComparatorProps {
  selectedExample: RefactoringExample;
  onSelectExample: (example: RefactoringExample) => void;
  selectedLang: 'java' | 'python' | 'typescript' | 'go';
  onSelectLang: (lang: 'java' | 'python' | 'typescript' | 'go') => void;
}

export const RefactorCodeComparator: React.FC<RefactorCodeComparatorProps> = ({
  selectedExample,
  onSelectExample,
  selectedLang,
  onSelectLang,
}) => {
  // Obtener nombre formateado del lenguaje de la pestaña
  const getLanguageLabel = (lang: typeof selectedLang) => {
    switch (lang) {
      case 'java': return 'Java 21';
      case 'python': return 'Python 3';
      case 'typescript': return 'TypeScript';
      case 'go': return 'Go (Golang)';
    }
  };

  // Obtener clase de clase Prism para el formateo
  const getPrismLangClass = (lang: typeof selectedLang) => {
    switch (lang) {
      case 'java': return 'language-java';
      case 'python': return 'language-python';
      case 'typescript': return 'language-typescript';
      case 'go': return 'language-go';
    }
  };

  return (
    <div className="bento-card card-code" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
      <div className="card-header">
        <Code />
        <span>Comparador de Código Interactivo</span>
      </div>
      <div className="card-body">
        {/* Menú Desplegable de Selección */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center', 
          marginBottom: '20px', 
          flexWrap: 'wrap',
          backgroundColor: 'var(--bg-app)',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid var(--border-color)'
        }}>
          <label htmlFor="refactor-select" style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Técnica a estudiar:
          </label>
          <select
            id="refactor-select"
            value={selectedExample.id}
            onChange={(e) => {
              const found = refactoringExamples.find(ex => ex.id === e.target.value);
              if (found) onSelectExample(found);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)',
              minWidth: '320px'
            }}
          >
            {refactoringExamples.map(ex => (
              <option key={ex.id} value={ex.id}>
                {ex.name} ({ex.smell})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--accent)' }}>{selectedExample.name}</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.5' }}>
            <strong>Problema a resolver:</strong> {selectedExample.description}
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            <strong>Solución limpia:</strong> {selectedExample.solution}
          </p>
        </div>

        {/* Selector de Lenguajes */}
        <div className="code-tabs" style={{ marginBottom: '16px' }}>
          {(['java', 'python', 'typescript', 'go'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => onSelectLang(lang)}
              className={`tab-btn tab-${lang} ${selectedLang === lang ? 'active' : ''}`}
            >
              {getLanguageLabel(lang)}
            </button>
          ))}
        </div>

        {/* Comparativa de código de antes y después */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
          
          {/* ANTES: SMELL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#ef4444', fontSize: '12.5px', fontWeight: 'bold' }}>
              <AlertTriangle size={15} />
              <span>CÓDIGO SUCIO (Antes / Smell)</span>
            </div>
            <div className="code-container" style={{ margin: 0 }}>
              <pre className={getPrismLangClass(selectedLang)} style={{ maxHeight: '380px', overflowY: 'auto' }}>
                <code className={getPrismLangClass(selectedLang)}>
                  {selectedExample.code[selectedLang].before}
                </code>
              </pre>
            </div>
          </div>

          {/* DESPUÉS: REFACTORIZADO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#10b981', fontSize: '12.5px', fontWeight: 'bold' }}>
              <CheckCircle size={15} />
              <span>CÓDIGO REFACTORIZADO (Después / Patrón o Limpieza)</span>
            </div>
            <div className="code-container" style={{ margin: 0 }}>
              <pre className={getPrismLangClass(selectedLang)} style={{ maxHeight: '380px', overflowY: 'auto' }}>
                <code className={getPrismLangClass(selectedLang)}>
                  {selectedExample.code[selectedLang].after}
                </code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default RefactorCodeComparator;
