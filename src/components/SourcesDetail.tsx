import React from 'react';
import { BookOpen, Globe, FileText, ExternalLink } from 'lucide-react';

export const SourcesDetail: React.FC = () => {
  return (
    <div className="bento-grid">
      
      {/* CARD 1: LIBROS CLÁSICOS */}
      <div className="bento-card" style={{ gridColumn: 'span 7', gridRow: 'span 3' }}>
        <div className="card-header">
          <BookOpen />
          <span>Libros Clásicos de Referencia</span>
        </div>
        <div className="card-body">
          <h2>Bibliografía Esencial</h2>
          <p style={{ marginBottom: '18px' }}>
            Los libros más influyentes en el diseño orientado a objetos y patrones. Son la base teórica de la industria del software.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Design Patterns (El Libro del GoF)</h4>
                <a href="https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={16} /></a>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>La obra fundacional de 1994 que catalogó por primera vez los 23 patrones de diseño clásicos divididos en creacionales, estructurales y de comportamiento.</p>
            </div>

            <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Head First Design Patterns</h4>
                <a href="https://www.amazon.com/Head-First-Design-Patterns-Brain-Friendly/dp/0596007124" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={16} /></a>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Eric Freeman, Elisabeth Robson, Kathy Sierra, Bert Bates</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>El libro más didáctico, visual y accesible. Utiliza un enfoque basado en neurobiología para facilitar el aprendizaje de los patrones con casos reales.</p>
            </div>

            <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Effective Java (3rd Edition)</h4>
                <a href="https://www.amazon.com/Effective-Java-Joshua-Bloch/dp/0134685997" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={16} /></a>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Joshua Bloch</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>La guía definitiva de mejores prácticas en Java. Explica detalladamente cómo optimizar patrones (como crear Singletons seguros usando Enums).</p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Refactoring to Patterns</h4>
                <a href="https://www.amazon.com/Refactoring-Patterns-Joshua-Kerievsky/dp/0321213351" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={16} /></a>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Joshua Kerievsky</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Muestra el camino intermedio: cómo tomar código desordenado con malas prácticas (code smells) y refactorizarlo de forma segura hacia patrones de diseño.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: WEBS Y RECURSOS DIGITALES */}
      <div className="bento-card" style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
        <div className="card-header">
          <Globe />
          <span>Portales Web y Blogs</span>
        </div>
        <div className="card-body">
          <h2>Fuentes Digitales</h2>
          <p style={{ marginBottom: '18px' }}>
            Plataformas interactivas y recursos de libre acceso para repasar teoría, código e ilustraciones.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700 }}>Refactoring.Guru</h4>
                <a href="https://refactoring.guru/es" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={15} /></a>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>La mejor web de patrones y refactoring en español. Contiene diagramas excelentes y explicaciones didácticas.</p>
            </div>

            <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700 }}>SourceMaking</h4>
                <a href="https://sourcemaking.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={15} /></a>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Portal de referencia con guías sólidas sobre antipatrones de diseño, malas prácticas (code smells) y diagramas UML explicativos.</p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700 }}>Mi granito de Java</h4>
                <a href="https://migranitodejava.blogspot.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink size={15} /></a>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>El blog educativo en español de Maximiliano Juárez, con analogías de la vida real para entender los patrones clásicos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: RECURSOS ACADÉMICOS DE ARGENTINA (UBA, UNQ, UTN) y OTROS */}
      <div className="bento-card" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
        <div className="card-header">
          <FileText />
          <span>Cátedras y Recursos Universitarios Argentinos & Internacionales</span>
        </div>
        <div className="card-body">
          <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            🇦🇷 Universidad Argentina (UBA / UNQ / UTN)
          </h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            
            <a href="https://universidad-de-los-objetos.github.io/" target="_blank" rel="noopener noreferrer" style={{ 
              flex: '1 1 300px', 
              padding: '14px', 
              backgroundColor: 'var(--bg-app)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }} className="source-link-hover">
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Universidad de los Objetos (UNQ)</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>Cátedras de Programación con Objetos 2 y 3 - Universidad Nacional de Quilmes</p>
              </div>
              <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
            </a>

            <a href="https://materias.fi.uba.ar/7510/" target="_blank" rel="noopener noreferrer" style={{ 
              flex: '1 1 300px', 
              padding: '14px', 
              backgroundColor: 'var(--bg-app)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }} className="source-link-hover">
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Técnicas de Diseño de Software (UBA)</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>Materiales de estudio y programas - Facultad de Ingeniería (FIUBA)</p>
              </div>
              <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
            </a>

            <a href="https://sistemas.frba.utn.edu.ar/" target="_blank" rel="noopener noreferrer" style={{ 
              flex: '1 1 300px', 
              padding: '14px', 
              backgroundColor: 'var(--bg-app)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }} className="source-link-hover">
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Diseño de Sistemas (UTN FRBA)</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>Cátedras del Departamento de Ingeniería en Sistemas de Información</p>
              </div>
              <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
            </a>

          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
            🌎 Artículos Académicos Internacionales Abiertos
          </h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>

            <a href="https://www.redalyc.org/pdf/1331/133115021008.pdf" target="_blank" rel="noopener noreferrer" style={{ 
              flex: '1 1 300px', 
              padding: '14px', 
              backgroundColor: 'var(--bg-app)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }} className="source-link-hover">
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Uso de Patrones en Casos Prácticos</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>Estudio sobre reusabilidad e impacto de acoplamiento - Redalyc</p>
              </div>
              <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
            </a>

            <a href="https://www.researchgate.net/publication/228711417_Patrones_de_Diseno" target="_blank" rel="noopener noreferrer" style={{ 
              flex: '1 1 300px', 
              padding: '14px', 
              backgroundColor: 'var(--bg-app)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }} className="source-link-hover">
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Guía Teórica de Patrones GoF</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>Análisis de catalogación de patrones clásicos - ResearchGate</p>
              </div>
              <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
            </a>

          </div>
        </div>
      </div>

    </div>
  );
};
export default SourcesDetail;
