import React from 'react';
import { BookOpen } from 'lucide-react';
import { refactoringData } from '../data/refactoringData';

export const RefactorHeader: React.FC = () => {
  const { core } = refactoringData;
  return (
    <div className="bento-card" style={{ gridColumn: 'span 12', gridRow: 'span 1' }}>
      <div className="card-header">
        <BookOpen />
        <span>Teoría de la Refactorización y Deuda Técnica</span>
      </div>
      <div className="card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <h2>¿Qué es la Refactorización?</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
            {core.what}
          </p>
          <div style={{ padding: '10px 14px', backgroundColor: 'var(--bg-app)', borderLeft: '3px solid var(--accent)', borderRadius: '6px' }}>
            <p style={{ fontSize: '12.5px', fontStyle: 'italic', margin: 0, color: 'var(--text-primary)' }}>
              "Cualquier tonto puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender." — Martin Fowler
            </p>
          </div>
        </div>
        <div>
          <h2>La Metáfora de la Deuda Técnica</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
            {core.debt}
          </p>
          <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
            La Regla de Tres (TDD / XP):
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
            {core.ruleOfThree}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RefactorHeader;
