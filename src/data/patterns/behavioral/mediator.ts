import { Pattern } from '../../types';

export const mediator: Pattern = {
  id: 'mediator',
  name: 'Mediator',
  category: 'behavioral',
  description: 'Define un objeto que encapsula cómo interactúan un conjunto de objetos. Promueve un acoplamiento débil al evitar que los objetos se refieran entre sí explícitamente y permite variar su interacción de forma independiente.',
  advantages: [
    'Principio de Responsabilidad Única (SRP): centraliza las conexiones de comunicación complejas entre múltiples objetos.',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevos mediadores sin alterar los componentes individuales.',
    'Reduce la red de dependencias caóticas de "muchos a muchos" a un claro "muchos a uno".'
  ],
  analogy: 'Piensa en una Torre de Control de un Aeropuerto. Los aviones no se comunican directamente entre sí para coordinar sus aterrizajes, lo cual causaría caos. Todos hablan únicamente con la torre de control (el Mediador), que decide el turno de cada avión para evitar colisiones.',
  code: {
    java: `// Java 21 - Torre de Control de Vuelo (Mediator)
import java.util.ArrayList;
import java.util.List;

interface Mediator {
    void registerFlight(Flight flight);
    void requestLanding(Flight flight);
}

class ControlTower implements Mediator {
    private final List<Flight> flights = new ArrayList<>();

    public void registerFlight(Flight flight) { flights.add(flight); }
    public void requestLanding(Flight flight) {
        System.out.println("Torre autoriza aterrizaje a: " + flight.getId());
        // Lógica para coordinar a los demás vuelos
    }
}

class Flight {
    private final Mediator mediator;
    private final String id;

    public Flight(Mediator mediator, String id) {
        this.mediator = mediator; this.id = id;
        this.mediator.registerFlight(this);
    }
    public String getId() { return id; }
    public void land() { mediator.requestLanding(this); }
}`,
    python: `# Python 3 - Mediator de Torre de Control
class Mediator:
    def register_flight(self, flight): pass
    def request_landing(self, flight): pass

class ControlTower(Mediator):
    def __init__(self):
        self._flights = []

    def register_flight(self, flight):
        self._flights.append(flight)

    def request_landing(self, flight):
        print(f"Torre autoriza aterrizaje a: {flight.id}")

class Flight:
    def __init__(self, mediator: Mediator, id_flight: str):
        self.mediator = mediator
        self.id = id_flight
        self.mediator.register_flight(self)

    def land(self):
        self.mediator.request_landing(self)
`,
    typescript: `// TypeScript - Mediator
interface Mediator {
  registerFlight(flight: Flight): void;
  requestLanding(flight: Flight): void;
}

export class ControlTower implements Mediator {
  private flights: Flight[] = [];
  registerFlight(flight: Flight) { this.flights.push(flight); }
  requestLanding(flight: Flight) {
    console.log(\`Torre autoriza aterrizaje de \${flight.id}\`);
  }
}

export class Flight {
  constructor(private mediator: Mediator, public id: string) {
    this.mediator.registerFlight(this);
  }
  land(): void { this.mediator.requestLanding(this); }
}
`,
    go: `// Go (Golang) - Mediator utilizando interfaces
package main

import "fmt"

type Mediator interface {
	RegisterFlight(f *Flight)
	RequestLanding(f *Flight)
}

type ControlTower struct {
	flights []*Flight
}

func (c *ControlTower) RegisterFlight(f *Flight) { c.flights = append(c.flights, f) }
func (c *ControlTower) RequestLanding(f *Flight) {
	fmt.Printf("Torre autoriza aterrizaje a: %s\\n", f.ID)
}

type Flight struct {
	mediator Mediator
	ID       string
}

func (f *Flight) Land() {
	f.mediator.RequestLanding(f)
}`
  },
  output: `Vuelo AR123 solicita pista...
Torre autoriza aterrizaje a: AR123`};
