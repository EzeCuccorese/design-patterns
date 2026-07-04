import { Pattern } from '../../types';

export const memento: Pattern = {
  id: 'memento',
  name: 'Memento',
  category: 'behavioral',
  description: 'Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación (encapsulación). Útil para implementar funciones de deshacer (Undo/Restaurar).',
  advantages: [
    'Preserva la encapsulación de los datos del objeto originador.',
    'Simplifica el código del originador al delegar el historial al cuidador (Caretaker).',
    'Permite recuperar de forma sencilla estados anteriores del sistema.'
  ],
  analogy: 'Piensa en los Puntos de Guardado en un videojuego (Save points). Cuando salvas la partida, se guarda una captura de tu nivel, vida e inventario (Memento). Si tu personaje muere, el juego restaura ese punto de guardado exacto para que continúes sin perder todo el progreso.',
  code: {
    java: `// Java 21 - Historial de Editor de Texto (Memento)
public class Editor {
    private String content;

    public void setContent(String content) { this.content = content; }
    public String getContent() { return content; }

    // Crea un punto de restauración
    public Memento save() { return new Memento(content); }

    // Restaura desde un punto previo
    public void restore(Memento memento) {
        if (memento != null) { this.content = memento.getState(); }
    }

    // El Memento es una clase inmutable
    public static class Memento {
        private final String state;
        private Memento(String state) { this.state = state; }
        private String getState() { return state; }
    }
}`,
    python: `# Python 3 - Memento para un Editor de texto
class Memento:
    def __init__(self, state: str):
        self._state = state
    def get_state(self) -> str: return self._state

class Editor:
    def __init__(self):
        self.content = ""

    def save(self) -> Memento:
        return Memento(self.content)

    def restore(self, memento: Memento):
        if memento:
            self.content = memento.get_state()
`,
    typescript: `// TypeScript - Memento
class Memento {
  constructor(private state: string) {}
  getState(): string { return this.state; }
}

export class Editor {
  private content = "";

  setContent(text: string): void { this.content = text; }
  getContent(): string { return this.content; }

  save(): Memento { return new Memento(this.content); }
  restore(memento: Memento): void {
    this.content = memento.getState();
  }
}
`,
    go: `// Go (Golang) - Memento con structs encapsulados
package main

type Memento struct {
	state string
}

type Editor struct {
	Content string
}

func (e *Editor) Save() *Memento {
	return &Memento{state: e.Content}
}

func (e *Editor) Restore(m *Memento) {
	if m != nil {
		e.Content = m.state
	}
}`
  },
  output: `Texto original: "Hola Mundo"
[Estado guardado]
Texto modificado: "Hola Mundo Cruel"
[Restauración ejecutada]
Texto actual: "Hola Mundo"`};
