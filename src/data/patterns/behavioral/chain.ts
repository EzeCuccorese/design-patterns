import { Pattern } from '../../types';

export const chain: Pattern = {
  id: 'chain',
  name: 'Chain of Responsibility',
  category: 'behavioral',
  description: 'Permite pasar solicitudes a lo largo de una cadena de manejadores. Al recibir una solicitud, cada manejador decide si la procesa o si la pasa al siguiente manejador de la cadena.',
  advantages: [
    'Control del orden de manejo de solicitudes.',
    'Principio de Responsabilidad Única (SRP): desacopla las clases que invocan operaciones de las que las realizan.',
    'Principio de Abierto/Cerrado (OCP): introduce nuevos manejadores sin romper el código cliente existente.'
  ],
  analogy: 'Rescatado de *Mi granito de Java*, piensa en el Ejército. Un soldado raso (Soldado) recibe una orden. Si no tiene autoridad para manejarla, la delega a su superior inmediato (Oficial). La solicitud escala por la cadena de mando hasta llegar a un oficial (Smith o Truman) con la autoridad para firmar el comando.',
  code: {
    java: `// Java 21 - Cadena de Mando del Ejército
public abstract class Unit {
    private Unit superior;
    private final String name;

    public Unit(String name) { this.name = name; }
    public void setSuperior(Unit superior) { this.superior = superior; }

    public void processOrder(String order, int priority) {
        if (canHandle(priority)) {
            execute(order);
        } else if (superior != null) {
            System.out.printf("%s delega orden a %s.\\n", name, superior.name);
            superior.processOrder(order, priority);
        } else {
            System.out.println("La orden no pudo ser procesada en la cadena.");
        }
    }

    protected abstract boolean canHandle(int priority);
    protected abstract void execute(String order);
}

class Soldier extends Unit {
    public Soldier(String name) { super(name); }
    protected boolean canHandle(int priority) { return priority <= 1; }
    protected void execute(String order) { System.out.println("Soldado ejecutando orden simple: " + order); }
}

class Officer extends Unit {
    public Officer(String name) { super(name); }
    protected boolean canHandle(int priority) { return priority > 1; }
    protected void execute(String order) { System.out.println("Oficial ejecutando orden compleja: " + order); }
}`,
    python: `# Python 3 - Chain of Responsibility del Ejército
class Unit:
    def __init__(self, name: str):
        self.name = name
        self.superior = None

    def set_superior(self, superior):
        self.superior = superior

    def process_order(self, order: str, priority: int):
        if self._can_handle(priority):
            self._execute(order)
        elif self.superior:
            print(f"{self.name} delega orden a {self.superior.name}.")
            self.superior.process_order(order, priority)
        else:
            print("Orden no procesada.")

    def _can_handle(self, priority: int) -> bool: pass
    def _execute(self, order: str): pass

class Soldier(Unit):
    def _can_handle(self, priority) -> bool: return priority <= 1
    def _execute(self, order): print(f"Soldado ejecutando: {order}")

class Officer(Unit):
    def _can_handle(self, priority) -> bool: return priority > 1
    def _execute(self, order): print(f"Oficial ejecutando: {order}")
`,
    typescript: `// TypeScript - Chain of Responsibility
abstract class Unit {
  private superior: Unit | null = null;
  constructor(protected name: string) {}

  setSuperior(superior: Unit): void { this.superior = superior; }

  processOrder(order: string, priority: number): void {
    if (this.canHandle(priority)) {
      this.execute(order);
    } else if (this.superior) {
      console.log(\`\${this.name} delega a \${this.superior.name}.\`);
      this.superior.processOrder(order, priority);
    } else {
      console.log("Fin de la cadena sin procesamiento.");
    }
  }

  protected abstract canHandle(priority: number): boolean;
  protected abstract execute(order: string): void;
}

export class Soldier extends Unit {
  protected canHandle(priority: number) { return priority <= 1; }
  protected execute(order: string) { console.log(\`Soldado procesó: \${order}\`); }
}
`,
    go: `// Go (Golang) - Chain of Responsibility usando interfaces estructuradas
package main

import "fmt"

type Handler interface {
	SetSuperior(superior Handler)
	ProcessOrder(order string, priority int)
}

type BaseUnit struct {
	name     string
	superior Handler
}
func (b *BaseUnit) SetSuperior(superior Handler) { b.superior = superior }

type Soldier struct {
	BaseUnit
}

func (s *Soldier) ProcessOrder(order string, priority int) {
	if priority <= 1 {
		fmt.Printf("Soldado %s ejecutando: %s\\n", s.name, order)
	} else if s.superior != nil {
		fmt.Printf("Soldado %s delega orden.\\n", s.name)
		s.superior.ProcessOrder(order, priority)
	}
}`
  },
  output: `Soldado Ryan delega orden a Oficial Smith.
Oficial Smith ejecutando orden compleja: Tomar posición enemiga`};
