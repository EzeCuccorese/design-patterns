import { Pattern } from '../../types';

export const factory: Pattern = {
  id: 'factory',
  name: 'Factory Method',
  category: 'creational',
  description: 'Define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase instanciar en tiempo de ejecución. Evita el acoplamiento directo al operador "new" y delega la responsabilidad de creación a clases especializadas.',
  advantages: [
    'Evita el acoplamiento fuerte entre el creador y los productos concretos.',
    'Principio de Responsabilidad Única (SRP): encapsula el código de creación en un solo lugar.',
    'Principio de Abierto/Cerrado (OCP): se pueden añadir nuevos productos sin romper el código cliente existente.'
  ],
  analogy: 'Piensa en una Fábrica de Autos. El cliente solicita un auto genérico sin saber los detalles internos de ensamblaje. La fábrica delega la creación al departamento correspondiente (Línea de Sedanes o Línea de SUVs) para devolver el producto adecuado.',
  code: {
    java: `// Java 21 - Factory Method usando Expresiones Switch modernas
public interface Vehicle {
    void drive();
}

public class Car implements Vehicle {
    public void drive() { System.out.println("Conduciendo un Sedan familiar."); }
}

public class Truck implements Vehicle {
    public void drive() { System.out.println("Conduciendo un Camión de carga."); }
}

// Creador Abstracto
public abstract class VehicleFactory {
    public abstract Vehicle createVehicle();
    
    public void deliverVehicle() {
        Vehicle vehicle = createVehicle();
        vehicle.drive();
    }
}

// Fábricas Concretas
public class CarFactory extends VehicleFactory {
    public Vehicle createVehicle() { return new Car(); }
}

public class TruckFactory extends VehicleFactory {
    public Vehicle createVehicle() { return new Truck(); }
}
`,
    python: `# Python 3 - Factory Method con clases abstractas y métodos de clase
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def drive(self):
        pass

class Car(Vehicle):
    def drive(self):
        print("Conduciendo un Sedan familiar.")

class Truck(Vehicle):
    def drive(self):
        print("Conduciendo un Camión de carga.")

# Fábrica base
class VehicleFactory(ABC):
    @abstractmethod
    def create_vehicle(self) -> Vehicle:
        pass

    def deliver_vehicle(self):
        vehicle = self.create_vehicle()
        vehicle.drive()

class CarFactory(VehicleFactory):
    def create_vehicle(self) -> Vehicle:
        return Car()

class TruckFactory(VehicleFactory):
    def create_vehicle(self) -> Vehicle:
        return Truck()
`,
    typescript: `// TypeScript - Factory Method usando interfaces
interface Vehicle {
  drive(): void;
}

class Car implements Vehicle {
  drive(): void { console.log("Conduciendo un Sedan familiar."); }
}

class Truck implements Vehicle {
  drive(): void { console.log("Conduciendo un Camión de carga."); }
}

abstract class VehicleFactory {
  abstract createVehicle(): Vehicle;

  deliverVehicle(): void {
    const vehicle = this.createVehicle();
    vehicle.drive();
  }
}

export class CarFactory extends VehicleFactory {
  createVehicle(): Vehicle { return new Car(); }
}

export class TruckFactory extends VehicleFactory {
  createVehicle(): Vehicle { return new Truck(); }
}
`,
    go: `// Go (Golang) - Creación mediante Factory estructural con structs e interfaces
package main

import "fmt"

type Vehicle interface {
	Drive()
}

type Car struct{}
func (c *Car) Drive() { fmt.Println("Conduciendo un Sedan familiar.") }

type Truck struct{}
func (t *Truck) Drive() { fmt.Println("Conduciendo un Camión de carga.") }

// En Go es común simplificar con una función factory que retorna la interfaz
func VehicleFactory(vehicleType string) (Vehicle, error) {
	switch vehicleType {
	case "car":
		return &Car{}, nil
	case "truck":
		return &Truck{}, nil
	default:
		return nil, fmt.Errorf("tipo de vehículo desconocido")
	}
}`
  },
  output: `Conduciendo un Sedan familiar.
Conduciendo un Camión de carga.`};
