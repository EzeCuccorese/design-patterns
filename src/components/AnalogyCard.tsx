import React from 'react';
import { Pattern } from '../data/types';
import { Lightbulb } from 'lucide-react';

interface AnalogyCardProps {
  pattern: Pattern;
}

export const AnalogyCard: React.FC<AnalogyCardProps> = ({ pattern }) => {
  return (
    <div className="bento-card card-analogy">
      <div className="card-header">
        <Lightbulb />
        <span>Mi Granito de Java (Analogía)</span>
      </div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <h2>¿Cómo entenderlo en la vida real?</h2>
          <p style={{ fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '16px', color: 'var(--text-secondary)' }}>
            {pattern.analogy}
          </p>
        </div>
        
        {pattern.graphicAsset && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img 
              src={pattern.graphicAsset} 
              alt={`Ilustración del patrón ${pattern.name}`}
              style={{
                maxWidth: '100%',
                maxHeight: '280px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                objectFit: 'contain'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default AnalogyCard;
