import React from 'react';
import { Pattern } from '../data/types';
import { BookOpen } from 'lucide-react';

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  return (
    <div className="bento-card card-concept">
      <div className="card-header">
        <BookOpen />
        <span>Concepto y Definición</span>
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
