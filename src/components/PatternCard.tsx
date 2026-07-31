import React from 'react';
import { Pattern } from '../data/types';
import { BookOpen, Gauge, TrendingUp } from 'lucide-react';
import { getPatternMetadata } from '../data/patternMetadata';

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const metadata = getPatternMetadata(pattern);

  const getComplexityClass = (complexity: string) => {
    switch (complexity) {
      case 'Baja': return 'chip-complexity-low';
      case 'Media': return 'chip-complexity-medium';
      case 'Alta': return 'chip-complexity-high';
      default: return 'chip-complexity-medium';
    }
  };

  const getFrequencyClass = (frequency: string) => {
    switch (frequency) {
      case 'Muy Alta':
      case 'Alta': return 'chip-frequency-high';
      case 'Media': return 'chip-frequency-medium';
      case 'Baja': return 'chip-frequency-low';
      default: return 'chip-frequency-medium';
    }
  };

  return (
    <div className="bento-card card-concept">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen />
          <span>Concepto y Definición</span>
        </div>
        
        {/* Chips Visuales de Complejidad y Frecuencia */}
        <div className="pattern-chips-wrapper">
          <span className={`pattern-chip ${getComplexityClass(metadata.complexity)}`}>
            <Gauge size={13} />
            <span>Complejidad: <strong>{metadata.complexity}</strong></span>
          </span>
          <span className={`pattern-chip ${getFrequencyClass(metadata.frequency)}`}>
            <TrendingUp size={13} />
            <span>Uso Industrial: <strong>{metadata.frequency}</strong></span>
          </span>
        </div>
      </div>
      <div className="card-body">
        <h2>{pattern.name}</h2>
        <p>{pattern.description}</p>
        
        {pattern.advantages && pattern.advantages.length > 0 && (
          <ul className="advantages-list">
            {pattern.advantages.map((adv, idx) => (
              <li key={idx}>{adv}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default PatternCard;
