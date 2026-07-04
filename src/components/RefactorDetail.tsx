import React, { useState } from 'react';
import { refactoringExamples, RefactoringExample } from '../data/refactoring';
import { RefactorHeader } from './RefactorHeader';
import { RefactorCatalog } from './RefactorCatalog';
import { RefactorCodeComparator } from './RefactorCodeComparator';

export const RefactorDetail: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<RefactoringExample>(refactoringExamples[0]);
  const [selectedLang, setSelectedLang] = useState<'java' | 'python' | 'typescript' | 'go'>('typescript');

  // Estados para controlar los acordeones
  const [expandedSmell, setExpandedSmell] = useState<string | null>('bloaters');
  const [expandedTech, setExpandedTech] = useState<string | null>('composing');

  return (
    <div className="bento-grid" style={{ gap: '20px' }}>
      {/* 1. Teoría y Deuda Técnica */}
      <RefactorHeader />

      {/* 2. Catálogos de Smells y Técnicas */}
      <RefactorCatalog
        expandedSmell={expandedSmell}
        onToggleSmell={setExpandedSmell}
        expandedTech={expandedTech}
        onToggleTech={setExpandedTech}
      />

      {/* 3. Comparador de Código Multilenguaje */}
      <RefactorCodeComparator
        selectedExample={selectedExample}
        onSelectExample={setSelectedExample}
        selectedLang={selectedLang}
        onSelectLang={setSelectedLang}
      />
    </div>
  );
};
export default RefactorDetail;
