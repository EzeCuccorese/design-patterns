import React from 'react';
import { CategoryOverview } from '../data/categories';
import { BookOpen, HelpCircle, Zap } from 'lucide-react';

interface CategoryDetailProps {
  category: CategoryOverview;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
  return (
    <div className="bento-grid">
      {/* CARD 1: ¿QUÉ SON? */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 2' }}>
        <div className="card-header">
          <BookOpen />
          <span>Definición General</span>
        </div>
        <div className="card-body">
          <h2>{category.name}</h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px' }}>
            {category.definition}
          </p>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
            ¿Qué hacen?
          </h4>
          <p>{category.what}</p>
        </div>
      </div>

      {/* CARD 2: ¿CÓMO Y CUÁNDO USARLOS? */}
      <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 2' }}>
        <div className="card-header">
          <HelpCircle />
          <span>Aplicación Práctica</span>
        </div>
        <div className="card-body">
          <h2>Uso y Aplicación</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              ¿Cómo se usan?
            </h4>
            <p>{category.how}</p>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              ¿Cuándo usarlos?
            </h4>
            <p>{category.when}</p>
          </div>
        </div>
      </div>

      {/* CARD 3: COMPARACIÓN NATIVA VS MANUAL (EL GIRO EDUCATIVO) */}
      <div className="bento-card" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
        <div className="card-header">
          <Zap />
          <span>Resolución Nativa en Lenguajes Modernos</span>
        </div>
        <div className="card-body">
          <h2>Patrones Nativos vs Implementaciones Manuales</h2>
          <p style={{ marginBottom: '16px' }}>
            En la ingeniería de software moderna, muchos de los patrones GoF clásicos de 1994 (diseñados para las limitaciones de C++ y Java 1.0) han sido absorbidos directamente por la sintaxis o librerías de los lenguajes contemporáneos.
          </p>
          
          <div style={{ 
            backgroundColor: 'var(--bg-app)', 
            padding: '20px', 
            borderRadius: '12px', 
            borderLeft: '4px solid var(--accent)', 
            whiteSpace: 'pre-line',
            lineHeight: '1.6',
            fontSize: '14.5px',
            color: 'var(--text-secondary)'
          }}>
            {category.nativeInsight}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryDetail;
