export interface PatternCode {
  java: string;
  python: string;
  typescript: string;
  go: string;
}

export type ComplexityLevel = 'Baja' | 'Media' | 'Alta';
export type FrequencyLevel = 'Baja' | 'Media' | 'Alta' | 'Muy Alta';

export interface Pattern {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral';
  description: string;
  advantages: string[];
  analogy: string;
  code: PatternCode;
  output: string;
  graphicAsset?: string;
  complexity?: ComplexityLevel;
  frequency?: FrequencyLevel;
}
