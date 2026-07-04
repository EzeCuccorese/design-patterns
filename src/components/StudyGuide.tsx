import React, { useState } from 'react';
import { studyGuide } from '../data/studyGuide';
import { Shield, Layout, Code, CheckCircle, Activity, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield,
  Layout,
  Code,
  CheckCircle,
  Activity,
  Terminal
};

export const StudyGuide: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(studyGuide[0].id);
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});

  const activeSection = studyGuide.find((s) => s.id === activeSectionId) || studyGuide[0];
  const ActiveIcon = iconMap[activeSection.icon] || BookOpenIconDummy;

  const toggleSubsection = (title: string) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="study-guide-container">
      {/* Navegación por Secciones (Tops de Pestañas) */}
      <div className="study-guide-nav">
        {studyGuide.map((section) => {
          const SectionIcon = iconMap[section.icon] || BookOpenIconDummy;
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              className={`guide-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveSectionId(section.id)}
            >
              <SectionIcon size={16} />
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Sección Activa */}
      <div className="study-guide-content">
        <div className="section-header-card">
          <div className="section-header-title">
            <ActiveIcon size={24} className="text-indigo-500" />
            <h2>{activeSection.title}</h2>
          </div>
          <p className="section-intro">{activeSection.introduction}</p>
        </div>

        {/* Subsecciones */}
        <div className="subsections-list">
          {activeSection.subsections.map((sub, idx) => {
            const isExpanded = expandedSubsections[sub.title] !== false; // Abierto por defecto para facilitar lectura
            return (
              <div key={idx} className="subsection-card">
                <button 
                  className="subsection-header"
                  onClick={() => toggleSubsection(sub.title)}
                >
                  <h3>{sub.title}</h3>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div className="subsection-body">
                    <p className="subsection-desc">{sub.description}</p>
                    
                    {sub.details && sub.details.length > 0 && (
                      <ul className="subsection-details-list">
                        {sub.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    )}

                    {sub.code && (
                      <div className="subsection-code-block">
                        <pre>
                          <code className="font-mono">{sub.code}</code>
                        </pre>
                      </div>
                    )}

                    {sub.alert && (
                      <div className={`guide-alert alert-${sub.alert.type}`}>
                        <strong>
                          {sub.alert.type === 'important' ? 'Importante: ' : sub.alert.type === 'warning' ? 'Advertencia: ' : 'Nota: '}
                        </strong>
                        {sub.alert.text}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Componente dummy por si falta el mapeo de icono
const BookOpenIconDummy: React.FC<any> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export default StudyGuide;
