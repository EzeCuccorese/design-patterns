import { Pattern } from '../../types';

export const builder: Pattern = {
  id: 'builder',
  name: 'Builder',
  category: 'creational',
  description: 'Permite construir objetos complejos paso a paso. A diferencia de otros patrones creacionales, Builder no requiere que los productos tengan una interfaz común, y permite producir distintas variaciones de un objeto utilizando el mismo código de construcción.',
  advantages: [
    'Permite construir objetos paso a paso, aplazar pasos de construcción o ejecutarlos recursivamente.',
    'Principio de Responsabilidad Única (SRP): aísla el código de construcción complejo de la lógica de negocio del producto.',
    'Evita los "constructores monstruo" (con decenas de parámetros opcionales difíciles de entender).'
  ],
  analogy: 'Piensa en la compra de un menú de comida rápida. El cajero es el Director que sigue un proceso estructurado para armar el pedido. El cliente puede personalizar el combo paso a paso: elegir la hamburguesa, papas fritas, bebida, o juguetes (Builder) para obtener su combo personalizado (Producto).',
  code: {
    java: `// Java 21 - Builder con interfaz fluida (Fluent API) e inmutabilidad
public class Pizza {
    private final String dough;
    private final String sauce;
    private final String topping;

    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.topping = builder.topping;
    }

    public static class Builder {
        private String dough = "Masa Clásica";
        private String sauce = "Tomate";
        private String topping = "Queso";

        public Builder dough(String dough) { this.dough = dough; return this; }
        public Builder sauce(String sauce) { this.sauce = sauce; return this; }
        public Builder topping(String topping) { this.topping = topping; return this; }

        public Pizza build() { return new Pizza(this); }
    }

    public void show() {
        System.out.printf("Pizza con masa %s, salsa %s y extra de %s.\\n", dough, sauce, topping);
    }
}`,
    python: `# Python 3 - Builder usando parámetros con valores por defecto e interfaz fluida
class Pizza:
    def __init__(self, builder):
        self.dough = builder.dough
        self.sauce = builder.sauce
        self.topping = builder.topping

    class Builder:
        def __init__(self):
            self.dough = "Masa Clásica"
            self.sauce = "Tomate"
            self.topping = "Queso"

        def set_dough(self, dough):
            self.dough = dough
            return self

        def set_sauce(self, sauce):
            self.sauce = sauce
            return self

        def set_topping(self, topping):
            self.topping = topping
            return self

        def build(self):
            return Pizza(self)

    def show(self):
        print(f"Pizza con masa {self.dough}, salsa {self.sauce} y extra de {self.topping}.")
`,
    typescript: `// TypeScript - Builder con tipado estricto e interfaz fluida
class Pizza {
  private dough: string;
  private sauce: string;
  private topping: string;

  constructor(builder: PizzaBuilder) {
    this.dough = builder.dough;
    this.sauce = builder.sauce;
    this.topping = builder.topping;
  }

  show(): void {
    console.log(\`Pizza con masa \${this.dough}, salsa \${this.sauce} y extra de \${this.topping}.\`);
  }
}

export class PizzaBuilder {
  public dough = "Masa Clásica";
  public sauce = "Tomate";
  public topping = "Queso";

  setDough(dough: string): this { this.dough = dough; return this; }
  setSauce(sauce: string): this { this.sauce = sauce; return this; }
  setTopping(topping: string): this { this.topping = topping; return this; }

  build(): Pizza { return new Pizza(this); }
}
`,
    go: `// Go (Golang) - Builder utilizando structs y encadenamiento de métodos
package main

import "fmt"

type Pizza struct {
	dough   string
	sauce   string
	topping string
}

type PizzaBuilder struct {
	pizza Pizza
}

func NewPizzaBuilder() *PizzaBuilder {
	return &PizzaBuilder{pizza: Pizza{dough: "Masa Clásica", sauce: "Tomate", topping: "Queso"}}
}

func (pb *PizzaBuilder) SetDough(dough string) *PizzaBuilder {
	pb.pizza.dough = dough
	return pb
}

func (pb *PizzaBuilder) SetSauce(sauce string) *PizzaBuilder {
	pb.pizza.sauce = sauce
	return pb
}

func (pb *PizzaBuilder) SetTopping(topping string) *PizzaBuilder {
	pb.pizza.topping = topping
	return pb
}

func (pb *PizzaBuilder) Build() Pizza {
	return pb.pizza
}

func (p Pizza) Show() {
	fmt.Printf("Pizza con masa %s, salsa %s y extra de %s.\\n", p.dough, p.sauce, p.topping)
}`
  },
  output: `Pizza con masa Masa Fina, salsa Barbacoa y extra de Pepperoni.`};
