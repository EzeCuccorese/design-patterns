import React from 'react';
import { 
  Shield, 
  Activity, 
  Terminal, 
  Layers, 
  Award, 
  ChevronRight,
  Sparkles,
  Cpu
} from 'lucide-react';

interface HomeLandingProps {
  onNavigateView: (view: string) => void;
  onSelectCategory: (category: 'creational' | 'structural' | 'behavioral') => void;
  progressPercentage?: number;
  patternsCount?: number;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  onNavigateView,
  onSelectCategory,
  progressPercentage = 0,
  patternsCount = 23
}) => {
  return (
    <div className="bento-grid" style={{ gap: '20px' }}>
      
      {/* Hero Banner Principal (span 12) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 12', 
          padding: '28px 32px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(15, 23, 42, 0.4) 100%)',
          border: '1px solid var(--accent, #6366f1)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '16px' }}>
            <Sparkles size={14} style={{ color: 'var(--accent-color, #6366f1)' }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-color, #6366f1)', letterSpacing: '0.5px' }}>
              Plataforma de Ingeniería de Software & System Design
            </span>
          </div>

          <h1 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: '800', lineHeight: '1.25', color: 'var(--text-primary)' }}>
            Dominá Patrones de Diseño, SOLID & Observabilidad a Escala
          </h1>

          <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: '1.6' }}>
            Guía interactiva y compendio de ingeniería para desarrollo de software moderno en 4 lenguajes (<strong>TypeScript, Python, Go y Java</strong>). Explorá código de producción, diagnósticos post-mortem, resiliencia SRE y tooling de alto rendimiento.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button 
              onClick={() => onSelectCategory('creational')}
              className="action-button primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13.5px',
                backgroundColor: 'var(--accent-color, #6366f1)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={16} />
              Explorar Patrones GoF
            </button>

            <button 
              onClick={() => onNavigateView('solid-clean')}
              className="action-button secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13.5px',
                backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.06))',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color, #333)',
                cursor: 'pointer'
              }}
            >
              <Shield size={16} />
              SOLID & Code Smells
            </button>

            <button 
              onClick={() => onNavigateView('tooling-dev')}
              className="action-button secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13.5px',
                backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.06))',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color, #333)',
                cursor: 'pointer'
              }}
            >
              <Terminal size={16} />
              Tooling Multi-Lenguaje
            </button>
          </div>
        </div>
      </div>

      {/* Métrica de Progreso & Resumen Estadístico (span 4) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 4', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)'
        }}
      >
        <div>
          <div className="card-header" style={{ marginBottom: '14px' }}>
            <Award size={18} style={{ color: 'var(--accent-color, #6366f1)' }} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Avance de Estudio</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
            Seguimiento en tiempo real de los módulos consultados y quizes completados en tu navegador local.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              <span>Progreso Global</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.1))', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${progressPercentage}%`, 
                  height: '100%', 
                  backgroundColor: 'var(--accent-color, #6366f1)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '6px' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-color, #6366f1)' }}>{patternsCount}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patrones GoF</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '6px' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>14</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Principios</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '6px' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>55+</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Flashcards</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.03))', borderRadius: '6px' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#ec4899' }}>30+</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Preguntas Quiz</div>
          </div>
        </div>
      </div>

      {/* Tarjeta Pilares 1 & 2: Patrones GoF y SOLID (span 8) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 8', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <Layers size={18} style={{ color: '#6366f1' }} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Patrones GoF & Principios de Diseño</span>
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
            Catálogo completo de soluciones arquitectónicas probadas en la industria, desglosadas con código funcional en TypeScript, Java, Python y Go.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <button 
              onClick={() => onSelectCategory('creational')}
              style={{
                textAlign: 'left',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.04))',
                border: '1px solid var(--border-color, #333)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#6366f1', marginBottom: '4px' }}>CREACIONALES</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>6 Patrones (Builder, Factory, Singleton...)</div>
            </button>

            <button 
              onClick={() => onSelectCategory('structural')}
              style={{
                textAlign: 'left',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.04))',
                border: '1px solid var(--border-color, #333)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>ESTRUCTURALES</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>7 Patrones (Adapter, Proxy, Decorator...)</div>
            </button>

            <button 
              onClick={() => onSelectCategory('behavioral')}
              style={{
                textAlign: 'left',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary, rgba(255,255,255,0.04))',
                border: '1px solid var(--border-color, #333)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>COMPORTAMIENTO</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>10 Patrones (Observer, Strategy, State...)</div>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.08))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Incluye resoluciones idiomáticas nativas modernas.</span>
          <button 
            onClick={() => onNavigateView('solid-clean')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--accent-color, #6366f1)', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
          >
            Ver SOLID & Clean Code <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Pilar 3: SRE & Observabilidad (span 4) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 4', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <Activity size={18} style={{ color: '#ef4444' }} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>SRE, Resiliencia & P99</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
            Monitoreo en tiempo real, latencias de cola (P99), OpenTelemetry, Circuit Breaker y estrategias de despliegue Canary sin downtime.
          </p>
        </div>

        <button 
          onClick={() => onNavigateView('sre-devops')}
          className="action-button secondary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', fontSize: '12.5px', borderRadius: '6px' }}
        >
          Explorar SRE e Infraestructura <ChevronRight size={14} />
        </button>
      </div>

      {/* Pilar 4: Tooling Multi-Lenguaje (span 4) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 4', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <Terminal size={18} style={{ color: '#10b981' }} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Tooling Multi-Lenguaje</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
            Herramientas nativas de alta velocidad para <strong>TypeScript (Biome/Oxlint), Python (Ruff/uv), Go (golangci-lint) y Java (Spotless)</strong>.
          </p>
        </div>

        <button 
          onClick={() => onNavigateView('tooling-dev')}
          className="action-button secondary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', fontSize: '12.5px', borderRadius: '6px' }}
        >
          Ver Tooling TS/Py/Go/Java <ChevronRight size={14} />
        </button>
      </div>

      {/* Pilar 5: Algoritmos & Senior Staff (span 4) */}
      <div 
        className="bento-card" 
        style={{ 
          gridColumn: 'span 4', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <Cpu size={18} style={{ color: '#8b5cf6' }} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Algoritmos & Staff Level</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
            Catálogo Big O, Filtros de Bloom, Árboles, ordenamiento y examen de simulación post-mortem de producción nivel Senior / Staff.
          </p>
        </div>

        <button 
          onClick={() => onNavigateView('senior-staff')}
          className="action-button secondary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', fontSize: '12.5px', borderRadius: '6px' }}
        >
          Ver Examen Senior / Staff <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default HomeLanding;
