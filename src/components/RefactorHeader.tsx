import React from 'react';
import { BookOpen } from 'lucide-react';

export const RefactorHeader: React.FC = () => {
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
            Refactorizar es el proceso de modificar la estructura interna de un programa (mejorando su legibilidad, reduciendo acoplamiento y aumentando la cohesión) **sin alterar su comportamiento observable**. Su propósito es facilitar la adición de nuevas funciones y prevenir la acumulación de bugs.
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
            Introducida por Ward Cunningham, explica que escribir código rápido y descuidado para entregar antes es como contraer una **deuda financiera**. Los parches y la falta de diseño son los **intereses**: a la larga, ralentizan el desarrollo hasta paralizarlo. Refactorizar es pagar el capital de esa deuda.
          </p>
          <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
            La Regla de Tres (TDD / XP):
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
            1. Hazlo andar. 2. Si repites una solución similar por segunda vez, refunfuña. 3. Si la haces por **tercera vez**, detente y refactoriza aplicando un patrón.
          </p>
        </div>
      </div>
    </div>
  );
};
export default RefactorHeader;
