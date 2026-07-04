import React, { useEffect, useState } from 'react';
import { Pattern } from '../data/types';
import { Code } from 'lucide-react';
import Prism from 'prismjs';

// Cargar lenguajes de Prism
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';

interface CodeViewerProps {
  pattern: Pattern;
}

type Language = 'java' | 'python' | 'typescript' | 'go';

export const CodeViewer: React.FC<CodeViewerProps> = ({ pattern }) => {
  const [activeTab, setActiveTab] = useState<Language>('java');

  useEffect(() => {
    // Forzar a Prism a resaltar la sintaxis de los elementos pre y code cargados
    Prism.highlightAll();
  }, [pattern, activeTab]);

  const codeString = pattern.code[activeTab];

  // Obtener nombre formateado del lenguaje de la pestaña
  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'java': return 'Java 21';
      case 'python': return 'Python 3';
      case 'typescript': return 'TypeScript';
      case 'go': return 'Go (Golang)';
    }
  };

  // Obtener clase de clase Prism para el formateo
  const getPrismLangClass = (lang: Language) => {
    switch (lang) {
      case 'java': return 'language-java';
      case 'python': return 'language-python';
      case 'typescript': return 'language-typescript';
      case 'go': return 'language-go';
    }
  };

  return (
    <div className="bento-card card-code">
      <div className="card-header">
        <Code />
        <span>Código Comparativo Multilenguaje</span>
      </div>
      
      <div className="code-tabs">
        {(['java', 'python', 'typescript', 'go'] as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`tab-btn tab-${lang} ${activeTab === lang ? 'active' : ''}`}
          >
            {getLanguageLabel(lang)}
          </button>
        ))}
      </div>

      <div className="code-container">
        <pre className={getPrismLangClass(activeTab)}>
          <code className={getPrismLangClass(activeTab)}>
            {codeString}
          </code>
        </pre>
      </div>
    </div>
  );
};
