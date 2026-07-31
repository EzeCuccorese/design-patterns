import React, { useEffect, useState } from 'react';
import { Pattern } from '../data/types';
import { Code, Copy, Check } from 'lucide-react';
import Prism from '../utils/prismLoader';

interface CodeViewerProps {
  pattern: Pattern;
}

type Language = 'java' | 'python' | 'typescript' | 'go';

export const CodeViewer: React.FC<CodeViewerProps> = ({ pattern }) => {
  const [activeTab, setActiveTab] = useState<Language>('java');
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback para navegadores sin soporte de Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = codeString;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

      <div className="code-container" style={{ position: 'relative' }}>
        <button
          onClick={handleCopy}
          className="copy-code-btn"
          title={copied ? 'Copiado' : 'Copiar código'}
          aria-label={copied ? 'Código copiado' : 'Copiar código al portapapeles'}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
            color: copied ? '#10b981' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600,
            zIndex: 5,
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
        <pre className={getPrismLangClass(activeTab)}>
          <code className={getPrismLangClass(activeTab)}>
            {codeString}
          </code>
        </pre>
      </div>
    </div>
  );
};
