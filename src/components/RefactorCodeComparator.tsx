import React, { useMemo, useRef, useCallback } from 'react';
import { refactoringExamples, RefactoringExample } from '../data/refactoring';
import { Code, AlertTriangle, CheckCircle } from 'lucide-react';
import Prism from '../utils/prismLoader';

interface RefactorCodeComparatorProps {
  selectedExample: RefactoringExample;
  onSelectExample: (example: RefactoringExample) => void;
  selectedLang: 'java' | 'python' | 'typescript' | 'go';
  onSelectLang: (lang: 'java' | 'python' | 'typescript' | 'go') => void;
}

interface LineDiff {
  text: string;
  type: 'normal' | 'removed' | 'added';
  lineNumber: number;
}

function computeDiff(beforeCode: string, afterCode: string) {
  const beforeLines = beforeCode.split('\n');
  const afterLines = afterCode.split('\n');

  const m = beforeLines.length;
  const n = afterLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (beforeLines[i - 1].trim() === afterLines[j - 1].trim()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const matchedBefore = new Set<number>();
  const matchedAfter = new Set<number>();

  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (beforeLines[i - 1].trim() === afterLines[j - 1].trim()) {
      matchedBefore.add(i - 1);
      matchedAfter.add(j - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const resultBefore: LineDiff[] = beforeLines.map((line, idx) => ({
    text: line,
    type: matchedBefore.has(idx) ? 'normal' : 'removed',
    lineNumber: idx + 1,
  }));

  const resultAfter: LineDiff[] = afterLines.map((line, idx) => ({
    text: line,
    type: matchedAfter.has(idx) ? 'normal' : 'added',
    lineNumber: idx + 1,
  }));

  const removedCount = beforeLines.length - matchedBefore.size;
  const addedCount = afterLines.length - matchedAfter.size;

  return {
    beforeLines: resultBefore,
    afterLines: resultAfter,
    removedCount,
    addedCount,
  };
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

  const beforeCode = selectedExample.code[selectedLang].before;
  const afterCode = selectedExample.code[selectedLang].after;

  const diffData = useMemo(() => {
    return computeDiff(beforeCode, afterCode);
  }, [beforeCode, afterCode]);

  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  const handleSyncScroll = useCallback((source: 'before' | 'after') => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const sourceEl = source === 'before' ? beforeRef.current : afterRef.current;
    const targetEl = source === 'before' ? afterRef.current : beforeRef.current;
    if (sourceEl && targetEl) {
      targetEl.scrollTop = sourceEl.scrollTop;
      targetEl.scrollLeft = sourceEl.scrollLeft;
    }
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  }, []);

  const highlightLine = (text: string, lang: typeof selectedLang) => {
    const grammar = Prism.languages[lang];
    if (grammar) {
      return Prism.highlight(text || ' ', grammar, lang);
    }
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

        {/* Comparativa de código de antes y después con diffs visuales animadas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
          
          {/* ANTES: SMELL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12.5px', fontWeight: 'bold' }}>
                <AlertTriangle size={15} />
                <span>CÓDIGO SUCIO (Antes / Smell)</span>
              </div>
              <span className="diff-badge diff-badge-removed">
                -{diffData.removedCount} líneas removidas
              </span>
            </div>
            <div className="diff-container" ref={beforeRef} onScroll={() => handleSyncScroll('before')} key={`before-${selectedExample.id}-${selectedLang}`}>
              {diffData.beforeLines.map((line) => {
                const highlightedHtml = highlightLine(line.text, selectedLang);
                const isRemoved = line.type === 'removed';

                return (
                  <div
                    key={`b-${line.lineNumber}`}
                    className={`diff-line ${isRemoved ? 'diff-line-removed' : ''}`}
                  >
                    <span className="diff-gutter">{line.lineNumber}</span>
                    <span className={`diff-marker ${isRemoved ? 'diff-marker-removed' : ''}`}>
                      {isRemoved ? '-' : ' '}
                    </span>
                    <span
                      className={`diff-code-text language-${selectedLang}`}
                      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* DESPUÉS: REFACTORIZADO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '12.5px', fontWeight: 'bold' }}>
                <CheckCircle size={15} />
                <span>CÓDIGO REFACTORIZADO (Después / Patrón o Limpieza)</span>
              </div>
              <span className="diff-badge diff-badge-added">
                +{diffData.addedCount} líneas añadidas
              </span>
            </div>
            <div className="diff-container" ref={afterRef} onScroll={() => handleSyncScroll('after')} key={`after-${selectedExample.id}-${selectedLang}`}>
              {diffData.afterLines.map((line) => {
                const highlightedHtml = highlightLine(line.text, selectedLang);
                const isAdded = line.type === 'added';

                return (
                  <div
                    key={`a-${line.lineNumber}`}
                    className={`diff-line ${isAdded ? 'diff-line-added' : ''}`}
                  >
                    <span className="diff-gutter">{line.lineNumber}</span>
                    <span className={`diff-marker ${isAdded ? 'diff-marker-added' : ''}`}>
                      {isAdded ? '+' : ' '}
                    </span>
                    <span
                      className={`diff-code-text language-${selectedLang}`}
                      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default RefactorCodeComparator;
