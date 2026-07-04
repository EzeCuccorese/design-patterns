export interface PatternCode {
  java: string;
  python: string;
  typescript: string;
  go: string;
}

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
}
