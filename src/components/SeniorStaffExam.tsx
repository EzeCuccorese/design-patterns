import React, { useState } from 'react';
import { seniorStaffExamData } from '../data/seniorStaffExamData';
import { patterns } from '../data/index';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award,
  Zap
} from 'lucide-react';

interface SeniorStaffExamProps {
  onNavigatePattern?: (patternId: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateView?: (view: string) => void;
}

export const SeniorStaffExam: React.FC<SeniorStaffExamProps> = ({
  onNavigatePattern,
  onNavigateTopic,
  onNavigateView,
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'simulation'>('study');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(seniorStaffExamData[0].id);

  const filteredItems = selectedPillar === 'all'
    ? seniorStaffExamData
    : seniorStaffExamData.filter(item => item.pillar === selectedPillar);

  const handleLinkClick = (link: { targetView?: string; targetPatternId?: string; targetTopicId?: string }) => {
    if (link.targetPatternId && onNavigatePattern) {
      const found = patterns.find(p => p.id === link.targetPatternId);
      if (found) {
        onNavigatePattern(found.id);
        return;
      }
    }
    if (link.targetTopicId && onNavigateTopic) {
      onNavigateTopic(link.targetTopicId);
      return;
    }
    if (link.targetView && onNavigateView) {
      onNavigateView(link.targetView);
      return;
    }
  };

  const getPillarBadge = (pillar: string) => {
    switch (pillar) {
      case 'system-design':
        return { label: 'System Design', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' };
      case 'live-refactoring':
        return { label: 'Live Refactoring', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'troubleshooting':
        return { label: 'Incident Post-Mortem', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'tradeoffs':
        return { label: 'Tradeoff Analysis', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' };
      default:
        return { label: 'Sr/Staff', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    }
  };

  return (
    <div className="senior-staff-exam-container" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid var(--accent-color, #6366f1)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            background: 'var(--accent-color, #6366f1)',
            padding: '12px',
            borderRadius: '12px',
            color: '#fff',
            display: 'flex'
          }}>
            <Shield size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: 'var(--text-primary, #fff)' }}>
              Evaluación & Guía de Estudio Nivel Senior / Staff Engineer
            </h1>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary, #aaa)', fontSize: '14px' }}>
              Resolución paso a paso, análisis de tradeoffs y arquitectura distribuida sin duplicación (Principio DRY con referencias navegables).
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => setActiveTab('study')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'study' ? 'var(--accent-color, #6366f1)' : 'var(--bg-secondary, rgba(255,255,255,0.08))',
              color: activeTab === 'study' ? '#fff' : 'var(--text-secondary, #ccc)',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={16} />
            <span>Modo Estudio Paso a Paso</span>
          </button>

          <button
            onClick={() => setActiveTab('simulation')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'simulation' ? 'var(--accent-color, #6366f1)' : 'var(--bg-secondary, rgba(255,255,255,0.08))',
              color: activeTab === 'simulation' ? '#fff' : 'var(--text-secondary, #ccc)',
              transition: 'all 0.2s ease'
            }}
          >
            <Award size={16} />
            <span>Simulador de Examen Cronometrado</span>
          </button>
        </div>
      </div>

      {/* MODO ESTUDIO */}
      {activeTab === 'study' && (
        <div>
          {/* Filtros por Pilar */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { id: 'all', label: 'Todos los Pilares' },
              { id: 'system-design', label: 'System Design' },
              { id: 'live-refactoring', label: 'Live Refactoring' },
              { id: 'troubleshooting', label: 'Incident Post-Mortem' },
              { id: 'tradeoffs', label: 'Tradeoff Analysis' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedPillar(filter.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color, #333)',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: selectedPillar === filter.id ? 'var(--accent-color, #6366f1)' : 'transparent',
                  color: selectedPillar === filter.id ? '#fff' : 'var(--text-secondary, #aaa)'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Lista de Escenarios */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredItems.map((item) => {
              const badge = getPillarBadge(item.pillar);
              const isExpanded = expandedItemId === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--bg-secondary, #1a1a2e)',
                    border: isExpanded ? `1px solid ${badge.color}` : '1px solid var(--border-color, #333)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Encabezado del caso */}
                  <div
                    onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.color}`
                        }}>
                          {badge.label}
                        </span>
                        {item.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '11px', color: 'var(--text-muted, #888)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary, #fff)' }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary, #aaa)' }}>
                        {item.subtitle}
                      </p>
                    </div>

                    <div style={{ marginLeft: '16px', color: 'var(--text-muted, #888)' }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Cuerpo Expandible con Resolución Paso a Paso */}
                  {isExpanded && (
                    <div style={{ padding: '0 20px 24px 20px', borderTop: '1px solid var(--border-color, #2a2a3c)' }}>
                      
                      {/* Contexto del Escenario */}
                      <div style={{
                        margin: '20px 0',
                        padding: '16px',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--accent-color, #6366f1)'
                      }}>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--text-primary, #fff)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertTriangle size={16} className="text-amber-400" />
                          <span>Escenario de Producción</span>
                        </h4>
                        <p style={{ margin: '0 0 12px 0', fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary, #ccc)' }}>
                          {item.scenario}
                        </p>
                        <h4 style={{ margin: '12px 0 6px 0', fontSize: '14px', color: 'var(--text-primary, #fff)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={16} className="text-indigo-400" />
                          <span>El Desafío Técnico</span>
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary, #ccc)', fontWeight: '500' }}>
                          {item.challenge}
                        </p>
                      </div>

                      {/* Enlaces DRY a la aplicación */}
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted, #888)', margin: '0 0 10px 0' }}>
                          Referencias Teóricas en la App (DRY)
                        </h4>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {item.dryLinks.map((link, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLinkClick(link)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid var(--accent-color, #6366f1)',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                color: 'var(--accent-color, #818cf8)',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <ExternalLink size={12} />
                              <span>{link.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Paso a Paso */}
                      <h4 style={{ fontSize: '16px', color: 'var(--text-primary, #fff)', margin: '24px 0 16px 0', borderBottom: '1px solid var(--border-color, #333)', paddingBottom: '8px' }}>
                        Resolución Arquitectónica Paso a Paso
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {item.stepByStepResolution.map((step) => (
                          <div
                            key={step.stepNumber}
                            style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.2)',
                              borderRadius: '8px',
                              padding: '16px',
                              border: '1px solid var(--border-color, #2a2a3a)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                              <span style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent-color, #6366f1)',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}>
                                {step.stepNumber}
                              </span>
                              <h5 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary, #fff)' }}>
                                {step.title}
                              </h5>
                            </div>
                            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'var(--text-secondary, #aaa)', lineHeight: '1.4' }}>
                              {step.description}
                            </p>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary, #ccc)', fontSize: '13px', lineHeight: '1.5' }}>
                              {step.details.map((dt, i) => (
                                <li key={i} style={{ marginBottom: '4px' }}>{dt}</li>
                              ))}
                            </ul>

                            {step.codeSnippet && (
                              <div style={{ marginTop: '12px', backgroundColor: '#0d1117', padding: '12px', borderRadius: '6px', overflowX: 'auto', border: '1px solid #30363d' }}>
                                <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px', textTransform: 'uppercase' }}>
                                  Código Explicativo ({step.codeSnippet.language})
                                </div>
                                <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', color: '#e6edf3' }}>
                                  <code>{step.codeSnippet.code}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Análisis de Tradeoffs */}
                      {item.tradeoffAnalysis.length > 0 && (
                        <div style={{ marginTop: '28px' }}>
                          <h4 style={{ fontSize: '16px', color: 'var(--text-primary, #fff)', margin: '0 0 14px 0' }}>
                            Análisis de Tradeoffs de Ingeniería
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {item.tradeoffAnalysis.map((to, i) => (
                              <div
                                key={i}
                                style={{
                                  padding: '14px',
                                  borderRadius: '8px',
                                  border: to.isRecommended ? '1px solid #10b981' : '1px solid #ef4444',
                                  backgroundColor: to.isRecommended ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                  {to.isRecommended ? <CheckCircle size={18} className="text-emerald-400" /> : <AlertTriangle size={18} className="text-red-400" />}
                                  <span style={{ fontWeight: '700', fontSize: '14px', color: to.isRecommended ? '#10b981' : '#ef4444' }}>
                                    {to.option}
                                  </span>
                                </div>
                                <p style={{ fontSize: '13px', margin: '4px 0 8px 0', color: 'var(--text-secondary, #ccc)' }}>
                                  <strong>Veredicto:</strong> {to.verdict}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODO SIMULADOR CRONOMETRADO */}
      {activeTab === 'simulation' && (
        <div style={{
          backgroundColor: 'var(--bg-secondary, #1a1a2e)',
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid var(--border-color, #333)',
          textAlign: 'center'
        }}>
          <Award size={48} className="text-indigo-400" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '22px', margin: '0 0 8px 0', color: 'var(--text-primary, #fff)' }}>
            Simulador de Evaluación de Nivel Senior / Staff
          </h2>
          <p style={{ color: 'var(--text-secondary, #aaa)', fontSize: '14px', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
            Pone a prueba tus habilidades de toma de decisiones bajo tiempo limitado (15 minutos). Recibirás un desglose con enlaces directos para repasar tus puntos débiles.
          </p>

          <button
            onClick={() => setActiveTab('study')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'var(--accent-color, #6366f1)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BookOpen size={16} />
            <span>Explorar Casos en Modo Estudio Paso a Paso</span>
          </button>
        </div>
      )}

    </div>
  );
};
