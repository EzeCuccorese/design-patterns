import React from 'react';
import { AlertTriangle, Wrench, ChevronDown, ChevronRight } from 'lucide-react';
import { refactoringData } from '../data/refactoringData';

interface RefactorCatalogProps {
  expandedSmell: string | null;
  onToggleSmell: (smell: string | null) => void;
  expandedTech: string | null;
  onToggleTech: (tech: string | null) => void;
}

export const RefactorCatalog: React.FC<RefactorCatalogProps> = ({
  expandedSmell,
  onToggleSmell,
  expandedTech,
  onToggleTech,
}) => {
  const { smells, techniques } = refactoringData;

  return (
    <>
      {/* CARD 2: CATÁLOGO DE MALOS OLORES (SMELLS - SOURCEMAKING) */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
        <div className="card-header">
          <AlertTriangle />
          <span>Malos Olores del Código (Code Smells)</span>
        </div>
        <div className="card-body">
          <h2>Catálogo de Síntomas de Diseño</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Los malos olores son señales de alerta en el código que sugieren problemas profundos. Haz clic en cada grupo clásico de *SourceMaking* para expandir:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {smells.map((group) => {
              const isExpanded = expandedSmell === group.id;
              return (
                <div key={group.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => onToggleSmell(isExpanded ? null : group.id)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--bg-app)',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontWeight: 'bold',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: group.color }}></span>
                      {group.name}
                    </span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {isExpanded && (
                    <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        {group.summary}
                      </p>
                      {group.smells.map((smell, sIdx) => (
                        <div key={sIdx}>
                          <strong>• {smell.name}:</strong> {smell.description}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CARD 3: CATÁLOGO DE TÉCNICAS DE REFACTORIZACIÓN */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
        <div className="card-header">
          <Wrench />
          <span>Técnicas de Refactorización</span>
        </div>
        <div className="card-body">
          <h2>Catálogo de Soluciones y Recetas</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Las técnicas de refactorización son recetas ordenadas paso a paso para limpiar el código de forma segura. Haz clic para expandir las categorías de *SourceMaking*:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {techniques.map((group) => {
              const isExpanded = expandedTech === group.id;
              return (
                <div key={group.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => onToggleTech(isExpanded ? null : group.id)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--bg-app)',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontWeight: 'bold',
                      fontSize: '13px',
                    }}
                  >
                    <span>{group.name}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {isExpanded && (
                    <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', backgroundColor: 'var(--bg-card)' }}>
                      {group.techniques.map((tech, tIdx) => (
                        <div key={tIdx}>
                          <strong>• {tech.name}:</strong> {tech.description}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default RefactorCatalog;
