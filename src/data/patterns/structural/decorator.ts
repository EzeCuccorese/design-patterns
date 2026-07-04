import { Pattern } from '../../types';

export const decorator: Pattern = {
  id: 'decorator',
  name: 'Decorator',
  category: 'structural',
  description: 'Permite añadir responsabilidades a objetos dinámicamente sin modificar su estructura original ni crear subclases. Envuelve el objeto original en un "decorador" que implementa su misma interfaz.',
  advantages: [
    'Mayor flexibilidad que la herencia clásica para extender comportamiento.',
    'Principio de Responsabilidad Única (SRP): divide una clase que implementa muchas variaciones en clases más pequeñas.',
    'Se pueden añadir o quitar comportamientos en tiempo de ejecución combinando múltiples decoradores.'
  ],
  analogy: 'Rescatado de *Mi granito de Java*, piensa en preparar un Café. Tienes un café base (Café Solo). Puedes decorarlo (envolverlo) dinámicamente añadiendo ingredientes: Leche, Azúcar, Chocolate, Crema. Cada ingrediente es un Decorador que añade un costo y cambia la descripción, pero sigue siendo un Café.',
  code: {
    java: `// Java 21 - Decoración de bebidas con envoltorios (Wrappers)
interface Coffee {
    double getCost();
    String getDescription();
}

class SimpleCoffee implements Coffee {
    public double getCost() { return 2.0; }
    public String getDescription() { return "Café Solo"; }
}

// Decorador Base
abstract class CoffeeDecorator implements Coffee {
    protected final Coffee decoratedCoffee;
    public CoffeeDecorator(Coffee coffee) { this.decoratedCoffee = coffee; }

    public double getCost() { return decoratedCoffee.getCost(); }
    public String getDescription() { return decoratedCoffee.getDescription(); }
}

// Decoradores Concretos
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }
    public double getCost() { return super.getCost() + 0.5; }
    public String getDescription() { return super.getDescription() + ", Leche"; }
}

class ChocolateDecorator extends CoffeeDecorator {
    public ChocolateDecorator(Coffee coffee) { super(coffee); }
    public double getCost() { return super.getCost() + 0.8; }
    public String getDescription() { return super.getDescription() + ", Chocolate"; }
}`,
    python: `# Python 3 - Decorator dinámico envolviendo clases
class Coffee:
    def get_cost(self) -> float: return 2.0
    def get_description(self) -> str: return "Café Solo"

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._decorated_coffee = coffee
    def get_cost(self) -> float:
        return self._decorated_coffee.get_cost()
    def get_description(self) -> str:
        return self._decorated_coffee.get_description()

class Milk(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.5
    def get_description(self) -> str:
        return super().get_description() + ", Leche"
`,
    typescript: `// TypeScript - Decorator pattern
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number { return 2.0; }
  getDescription(): string { return "Café Solo"; }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  getCost(): number { return this.coffee.getCost(); }
  getDescription(): string { return this.coffee.getDescription(); }
}

export class Milk extends CoffeeDecorator {
  getCost(): number { return this.coffee.getCost() + 0.5; }
  getDescription(): string { return this.coffee.getDescription() + ", Leche"; }
}
`,
    go: `// Go (Golang) - Composición de Structs para Decoración
package main

import "fmt"

type Coffee interface {
	GetCost() float64
	GetDescription() string
}

type SimpleCoffee struct{}
func (sc *SimpleCoffee) GetCost() float64 { return 2.0 }
func (sc *SimpleCoffee) GetDescription() string { return "Café Solo" }

// Decorador Leche
type MilkDecorator struct {
	decoratedCoffee Coffee
}
func (m *MilkDecorator) GetCost() float64 { return m.decoratedCoffee.GetCost() + 0.5 }
func (m *MilkDecorator) GetDescription() string { return m.decoratedCoffee.GetDescription() + ", Leche" }`
  },
  output: `Bebida: Café Solo, Leche, Chocolate
Costo total: $3.30`,
  graphicAsset: "/images/decorator.jpg"};
