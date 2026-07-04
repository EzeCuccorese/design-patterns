import { Pattern } from '../../types';

export const strategy: Pattern = {
  id: 'strategy',
  name: 'Strategy',
  category: 'behavioral',
  description: 'Define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.',
  advantages: [
    'Intercambio de algoritmos en tiempo de ejecución de forma dinámica.',
    'Aísla los detalles de implementación de un algoritmo del código que lo usa.',
    'Principio de Abierto/Cerrado (OCP): introduce nuevas estrategias sin alterar el contexto cliente (evita bloques "if-else" gigantes).'
  ],
  analogy: 'Piensa en los Modos de Transporte para ir al aeropuerto. Puedes ir en auto propio, taxi, autobús o metro. Cada modo representa una Estrategia diferente. Dependiendo de tu presupuesto o prisa, seleccionas dinámicamente tu estrategia de viaje.',
  code: {
    java: `// Java 21 - Estrategias de Comportamiento usando Lambdas y Interfaces Funcionales
@FunctionalInterface
interface RouteStrategy {
    void buildRoute(String start, String end);
}

// Contexto
public class Navigator {
    private RouteStrategy strategy;

    public void setStrategy(RouteStrategy strategy) { this.strategy = strategy; }

    public void navigate(String start, String end) {
        if (strategy != null) {
            strategy.buildRoute(start, end);
        }
    }
}

// Uso en Java 21 moderno (lambdas directas sin verbosidad de clases)
public class Main {
    public static void main(String[] args) {
        Navigator nav = new Navigator();
        
        // Estrategia 1: Auto
        nav.setStrategy((s, e) -> System.out.println("Ruta en Auto: Autopista rápida de " + s + " a " + e));
        nav.navigate("Casa", "Aeropuerto");

        // Estrategia 2: Autobús
        nav.setStrategy((s, e) -> System.out.println("Ruta en Bus: Paradas programadas de " + s + " a " + e));
        nav.navigate("Casa", "Aeropuerto");
    }
}`,
    python: `# Python 3 - Strategy usando funciones como objetos de primera clase
from typing import Callable

# El "algoritmo" es una simple función (Callable)
RouteStrategy = Callable[[str, str], None]

class Navigator:
    def __init__(self, strategy: RouteStrategy = None):
        self.strategy = strategy

    def navigate(self, start: str, end: str):
        if self.strategy:
            self.strategy(start, end)

# Estrategias concretas
def drive_route(start, end): print(f"Ruta en Auto: Autopista de {start} a {end}")
def walk_route(start, end): print(f"Ruta Caminando: Senderos peatonales de {start} a {end}")
`,
    typescript: `// TypeScript - Strategy con firmas de tipo funcionales
type RouteStrategy = (start: string, end: string) => void;

export class Navigator {
  private strategy?: RouteStrategy;

  setStrategy(strategy: RouteStrategy) { this.strategy = strategy; }

  navigate(start: string, end: string): void {
    if (this.strategy) {
      this.strategy(start, end);
    }
  }
}

// Uso práctico:
// const nav = new Navigator();
// nav.setStrategy((s, e) => console.log(\`Autobús de \${s} a \${e}\`));
`,
    go: `// Go (Golang) - Strategy con funciones de Go (First-Class Functions)
package main

import "fmt"

type RouteStrategy func(start, end string)

type Navigator struct {
	strategy RouteStrategy
}

func (n *Navigator) SetStrategy(strategy RouteStrategy) {
	n.strategy = strategy
}

func (n *Navigator) Navigate(start, end string) {
	if n.strategy != nil {
		n.strategy(start, end)
	}
}`
  },
  output: `Ruta en Auto: Autopista rápida de Casa a Aeropuerto.
Ruta en Bus: Paradas programadas de Casa a Aeropuerto.`};
