import React, { useState, useEffect } from 'react';
import { Pattern } from '../data/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categoryOverviews } from '../data/categories';

interface CategoryAccordionProps {
  category: 'creational' | 'structural' | 'behavioral';
  label: string;
  icon: React.ReactNode;
  patterns: Pattern[];
  selectedPattern: Pattern | null;
  selectedCategory: 'creational' | 'structural' | 'behavioral' | null;
  activeView: string;
  onSelectPattern: (pattern: Pattern) => void;
  onSelectCategory: (category: 'creational' | 'structural' | 'behavioral') => void;
}

export const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  category,
  label,
  icon,
  patterns,
  selectedPattern,
  selectedCategory,
  activeView,
  onSelectPattern,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(category === 'creational');

  // Abre el acordeón si la categoría o un patrón de esta categoría es seleccionado
  useEffect(() => {
    if (activeView === 'category' && selectedCategory === category) {
      setIsOpen(true);
    } else if (activeView === 'pattern' && selectedPattern?.category === category) {
      setIsOpen(true);
    }
  }, [selectedPattern, selectedCategory, activeView, category]);

  // Color de borde de la explicación
  const getBorderColor = () => {
    switch (category) {
      case 'creational': return 'var(--lang-java)';
      case 'structural': return 'var(--lang-python)';
      case 'behavioral': return 'var(--lang-typescript)';
    }
  };

  const handleTitleClick = () => {
    onSelectCategory(category);
    setIsOpen(true);
  };

  const isCategoryActive = activeView === 'category' && selectedCategory === category;

  return (
    <div className="category-group" style={{ marginBottom: '8px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 4px',
          borderRadius: '8px',
          backgroundColor: isCategoryActive ? 'var(--accent-light)' : 'transparent',
          transition: 'background-color 0.2s ease',
        }}
      >
        <button
          onClick={handleTitleClick}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: isCategoryActive ? 'var(--accent)' : 'var(--text-primary)',
            fontWeight: isCategoryActive ? '700' : '500',
          }}
        >
          <h3 className="category-title" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'inherit' }}>
            {icon}
            <span style={{ textTransform: 'uppercase' }}>{label}</span>
          </h3>
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)'
          }}
        >
          {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </button>
      </div>
      
      {isOpen && (
        <div style={{ paddingLeft: '8px', marginTop: '4px' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            lineHeight: '1.4',
            marginBottom: '8px',
            padding: '6px 8px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: '6px',
            borderLeft: `2px solid ${getBorderColor()}`
          }}>
            {categoryOverviews[category].shortDescription}
          </p>
          
          {patterns.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectPattern(p)}
              className={`pattern-item ${activeView === 'pattern' && selectedPattern?.id === p.id ? 'active' : ''}`}
              style={{ fontSize: '13px', padding: '8px 10px' }}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoryAccordion;
