import React from 'react';
import { studyGuide } from '../data/studyGuide';
import { Shield, Layout, CheckCircle, Activity, Terminal, Info, BookOpen, Binary } from 'lucide-react';

interface TopicDetailProps {
  topicId: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield,
  Layout,
  CheckCircle,
  Activity,
  Terminal,
  Binary
};

export const TopicDetail: React.FC<TopicDetailProps> = ({ topicId }) => {
  const topic = studyGuide.find((s) => s.id === topicId);

  if (!topic) {
    return (
      <div className="bento-card" style={{ gridColumn: 'span 12' }}>
        <p>Tópico no encontrado.</p>
      </div>
    );
  }

  const TopicIcon = iconMap[topic.icon] || BookOpen;

  return (
    <div className="bento-grid" style={{ gap: '20px' }}>
      
      {/* Cabecera del Tópico */}
      <div className="bento-card" style={{ gridColumn: 'span 12', gridRow: 'span 1' }}>
        <div className="card-header">
          <TopicIcon />
          <span>{topic.title}</span>
        </div>
        <div className="card-body">
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', color: 'var(--accent)' }}>
            {topic.title}
          </h2>
          <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            {topic.introduction}
          </p>
        </div>
      </div>

      {/* Listado de Subsecciones (Bento Cards) */}
      {topic.subsections.map((sub, idx) => {
        // Asignación de tamaño dinámico de bento para que no sea plano
        const gridSpan = topic.subsections.length === 1 ? 'span 12' : (idx === 0 ? 'span 12' : 'span 6');
        
        return (
          <div 
            key={idx} 
            className="bento-card" 
            style={{ 
              gridColumn: gridSpan,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
              <Info size={16} />
              <span>{sub.title}</span>
            </div>
            
            <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' }}>{sub.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: '1.5', marginBottom: '12px' }}>
                  {sub.description}
                </p>

                {sub.details && sub.details.length > 0 && (
                  <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {sub.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ lineHeight: '1.4' }}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>

              {sub.table && (
                <div className="table-container" style={{ overflowX: 'auto', margin: '12px 0 16px 0' }}>
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        {sub.table.headers.map((header, hIdx) => (
                          <th key={hIdx} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sub.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} style={{ padding: '10px 12px', fontSize: '12.5px', lineHeight: '1.4' }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sub.code && (
                <div className="code-container" style={{ margin: '8px 0 12px 0', padding: '10px' }}>
                  <pre style={{ margin: 0, overflowX: 'auto' }}>
                    <code style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      {sub.code}
                    </code>
                  </pre>
                </div>
              )}

              {sub.alert && (
                <div 
                  className={`guide-alert alert-${sub.alert.type}`}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    backgroundColor: 'var(--bg-app)',
                    borderLeft: `3px solid var(--accent)`
                  }}
                >
                  <strong>
                    {sub.alert.type === 'important' ? 'Importante: ' : sub.alert.type === 'warning' ? 'Advertencia: ' : 'Nota: '}
                  </strong>
                  {sub.alert.text}
                </div>
              )}
            </div>
          </div>
        );
      })}

    </div>
  );
};
export default TopicDetail;
