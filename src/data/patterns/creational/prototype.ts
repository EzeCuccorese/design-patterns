import { Pattern } from '../../types';

export const prototype: Pattern = {
  id: 'prototype',
  name: 'Prototype',
  category: 'creational',
  description: 'Permite copiar objetos existentes sin que el código dependa de sus clases concretas. Delega el proceso de clonación a los propios objetos que están siendo clonados.',
  advantages: [
    'Clonación directa de objetos sin acoplamiento a sus clases concretas.',
    'Evita la inicialización costosa repetida de objetos complejos.',
    'Alternativa limpia a la creación de subclases creadoras para inicializaciones específicas.'
  ],
  analogy: 'Piensa en las Células vivas. Para reproducirse, una célula no llama a una fábrica de células para crear un clon. En su lugar, se divide a sí misma (mitosis), copiando todo su material interno para generar una célula idéntica desde su propio estado.',
  code: {
    java: `// Java 21 - Clonación de objetos con interfaz Cloneable
public abstract class Shape implements Cloneable {
    public String type;

    public abstract void draw();

    @Override
    public Object clone() {
        Object clone = null;
        try {
            clone = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}

public class Circle extends Shape {
    public Circle() { type = "Círculo"; }
    public void draw() { System.out.println("Dibujando Círculo."); }
}`,
    python: `# Python 3 - Clonación utilizando la librería nativa copy
import copy

class Prototype:
    def __init__(self):
        self.objects = {}

    def register(self, name, obj):
        self.objects[name] = obj

    def unregister(self, name):
        del self.objects[name]

    def clone(self, name, **attrs):
        obj = copy.deepcopy(self.objects.get(name))
        obj.__dict__.update(attrs)
        return obj
`,
    typescript: `// TypeScript - Implementación de clonación profunda (Deep Copy)
interface Prototype {
  clone(): this;
}

class Circle implements Prototype {
  constructor(public radius: number, public color: string) {}

  clone(): this {
    // Retorna una nueva instancia con las mismas propiedades
    return new Circle(this.radius, this.color) as this;
  }

  show(): void {
    console.log(\`Círculo de radio \${this.radius} y color \${this.color}.\`);
  }
}
`,
    go: `// Go (Golang) - Clonación mediante interfaces y punteros
package main

import "fmt"

type Prototype interface {
	Clone() Prototype
}

type Circle struct {
	Radius int
	Color  string
}

func (c *Circle) Clone() Prototype {
	// Crea una copia del valor y retorna el puntero
	return &Circle{
		Radius: c.Radius,
		Color:  c.Color,
	}
}

func (c *Circle) Show() {
	fmt.Printf("Círculo de radio %d y color %s.\\n", c.Radius, c.Color)
}`
  },
  output: `Círculo de radio 10 y color Rojo.
Círculo de radio 10 y color Azul (Copia modificada).`};
