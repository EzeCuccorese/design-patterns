import { Pattern, ComplexityLevel, FrequencyLevel } from './types';

export interface PatternMetadata {
  complexity: ComplexityLevel;
  frequency: FrequencyLevel;
}

export const defaultPatternMetadata: Record<string, PatternMetadata> = {
  // Creacionales
  singleton: { complexity: 'Baja', frequency: 'Alta' },
  builder: { complexity: 'Media', frequency: 'Alta' },
  factory: { complexity: 'Baja', frequency: 'Alta' },
  abstractfactory: { complexity: 'Alta', frequency: 'Media' },
  prototype: { complexity: 'Media', frequency: 'Baja' },
  objectpool: { complexity: 'Media', frequency: 'Media' },

  // Estructurales
  adapter: { complexity: 'Baja', frequency: 'Alta' },
  composite: { complexity: 'Media', frequency: 'Alta' },
  decorator: { complexity: 'Media', frequency: 'Alta' },
  facade: { complexity: 'Baja', frequency: 'Alta' },
  proxy: { complexity: 'Media', frequency: 'Alta' },
  bridge: { complexity: 'Alta', frequency: 'Media' },
  flyweight: { complexity: 'Alta', frequency: 'Baja' },

  // Comportamiento
  chain: { complexity: 'Media', frequency: 'Media' },
  command: { complexity: 'Media', frequency: 'Alta' },
  interpreter: { complexity: 'Alta', frequency: 'Baja' },
  iterator: { complexity: 'Baja', frequency: 'Alta' },
  mediator: { complexity: 'Media', frequency: 'Media' },
  memento: { complexity: 'Media', frequency: 'Baja' },
  observer: { complexity: 'Media', frequency: 'Alta' },
  state: { complexity: 'Media', frequency: 'Alta' },
  strategy: { complexity: 'Baja', frequency: 'Alta' },
  template: { complexity: 'Baja', frequency: 'Alta' },
  visitor: { complexity: 'Alta', frequency: 'Baja' },
};

export function getPatternMetadata(pattern: Pattern): PatternMetadata {
  return {
    complexity: pattern.complexity || defaultPatternMetadata[pattern.id]?.complexity || 'Media',
    frequency: pattern.frequency || defaultPatternMetadata[pattern.id]?.frequency || 'Media',
  };
}
