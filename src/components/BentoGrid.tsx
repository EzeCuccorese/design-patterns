import React from 'react';
import { Pattern } from '../data/types';
import { PatternCard } from './PatternCard';
import { AnalogyCard } from './AnalogyCard';
import { CodeViewer } from './CodeViewer';
import { ConsoleSimulator } from './ConsoleSimulator';

interface BentoGridProps {
  pattern: Pattern;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ pattern }) => {
  return (
    <div className="bento-grid">
      <PatternCard pattern={pattern} />
      <AnalogyCard pattern={pattern} />
      <CodeViewer pattern={pattern} />
      <ConsoleSimulator pattern={pattern} />
    </div>
  );
};
