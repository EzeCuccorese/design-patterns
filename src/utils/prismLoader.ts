import Prism from 'prismjs';

// Garantizar que la referencia global de Prism esté asignada en window antes de cargar los componentes de lenguajes
if (typeof window !== 'undefined') {
  (window as any).Prism = Prism;
}

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';

export default Prism;
