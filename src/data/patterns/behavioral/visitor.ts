import { Pattern } from '../../types';

export const visitor: Pattern = {
  id: 'visitor',
  name: 'Visitor',
  category: 'behavioral',
  description: 'Permite separar algoritmos y operaciones de la estructura de objetos sobre la que operan. Posibilita añadir nuevas operaciones a una jerarquía de clases existente sin modificar las clases originales.',
  advantages: [
    'Principio de Responsabilidad Única (SRP): agrupa múltiples versiones del mismo comportamiento en una sola clase.',
    'Principio de Abierto/Cerrado (OCP): puedes añadir nuevas operaciones que funcionen con objetos de clases distintas sin modificarlas.',
    'Añade operaciones a estructuras de objetos complejas sin ensuciar sus responsabilidades principales.'
  ],
  analogy: 'Piensa en un Agente de Seguros de viaje que visita casas. Cuando visita a un residente (Elemento), este le permite entrar. El agente de seguros evalúa y calcula la póliza de salud basándose en el estilo de vida del residente (método visit), sin que la persona tenga que cambiar su casa o rutina diaria.',
  code: {
    java: `// Java 21 - Exportador de Formas Geométricas (Visitor)
interface Shape {
    void accept(Visitor visitor);
}

class Circle implements Shape {
    public void accept(Visitor visitor) { visitor.visitCircle(this); }
}

class Rectangle implements Shape {
    public void accept(Visitor visitor) { visitor.visitRectangle(this); }
}

// Interfaz del Visitante (Operaciones externas)
interface Visitor {
    void visitCircle(Circle circle);
    void visitRectangle(Rectangle rectangle);
}

class XMLExportVisitor implements Visitor {
    public void visitCircle(Circle c) { System.out.println("<circle></circle>"); }
    public void visitRectangle(Rectangle r) { System.out.println("<rectangle></rectangle>"); }
}`,
    python: `# Python 3 - Visitor para exportación de datos
class Visitor:
    def visit_circle(self, circle): pass
    def visit_rectangle(self, rectangle): pass

class Shape:
    def accept(self, visitor: Visitor): pass

class Circle(Shape):
    def accept(self, visitor): visitor.visit_circle(self)

class Rectangle(Shape):
    def accept(self, visitor): visitor.visit_rectangle(self)

class JSONExportVisitor(Visitor):
    def visit_circle(self, circle): print('{"type": "circle"}')
    def visit_rectangle(self, rectangle): print('{"type": "rectangle"}')
`,
    typescript: `// TypeScript - Visitor pattern
interface Visitor {
  visitCircle(c: Circle): void;
}

interface Shape {
  accept(v: Visitor): void;
}

export class Circle implements Shape {
  accept(v: Visitor): void { v.visitCircle(this); }
}

export class ConsoleExportVisitor implements Visitor {
  visitCircle(c: Circle): void {
    console.log("Exportando Círculo a consola.");
  }
}
`,
    go: `// Go (Golang) - Visitor estructural
package main

import "fmt"

type Visitor interface {
	VisitCircle(c *Circle)
}

type Shape interface {
	Accept(v Visitor)
}

type Circle struct{}
func (c *Circle) Accept(v Visitor) { v.VisitCircle(c) }

type ExportVisitor struct{}
func (ev *ExportVisitor) VisitCircle(c *Circle) {
	fmt.Println("Exportando círculo...")
}`
  },
  output: `Exportando figuras:
<circle></circle>
<rectangle></rectangle>`};
