export interface RefactoringExample {
  id: string;
  name: string;
  smell: string;
  description: string;
  solution: string;
  code: {
    java: { before: string; after: string };
    python: { before: string; after: string };
    typescript: { before: string; after: string };
    go: { before: string; after: string };
  };
}

export const refactoringExamples: RefactoringExample[] = [
  {
    id: 'switch-to-polymorphism',
    name: 'Reemplazar condicional con polimorfismo',
    smell: 'Switch Statements (Abusadores de la POO)',
    description: 'Tienes un bloque switch o múltiples if-else gigantescos que realizan acciones distintas según el tipo de objeto o su estado interno. Esto viola el principio Abierto/Cerrado (OCP) porque añadir un nuevo tipo te obliga a buscar y modificar todos los switch del sistema.',
    solution: 'Crea una interfaz común y extrae cada rama del condicional a su propia subclase (aplicando el patrón State o Strategy). El objeto de contexto simplemente delega la ejecución al objeto polimórfico activo.',
    code: {
      java: {
        before: `// ANTES: Condicional acoplado al tipo (Riesgo de bugs al extender)
class Employee {
    String type;
    double baseSalary = 2000;

    double getSalary() {
        switch (type) {
            case "ENGINEER": return baseSalary + 500;
            case "MANAGER":  return baseSalary + 1000;
            case "SALESMAN": return baseSalary + 200;
            default: throw new IllegalArgumentException("Tipo desconocido");
        }
    }
}`,
        after: `// DESPUÉS: Polimorfismo limpio (SOLID / OCP)
interface EmployeeType {
    double getBonus();
}

class Engineer implements EmployeeType {
    public double getBonus() { return 500; }
}

class Manager implements EmployeeType {
    public double getBonus() { return 1000; }
}

class Employee {
    private EmployeeType type;
    private double baseSalary = 2000;

    public void setType(EmployeeType type) { this.type = type; }
    public double getSalary() {
        return baseSalary + type.getBonus();
    }
}`
      },
      python: {
        before: `# ANTES: Condicional manual por tipo
class Employee:
    def __init__(self, emp_type):
        self.emp_type = emp_type
        self.base_salary = 2000

    def get_salary(self):
        if self.emp_type == "ENGINEER":
            return self.base_salary + 500
        elif self.emp_type == "MANAGER":
            return self.base_salary + 1000
        else:
            return self.base_salary`,
        after: `# DESPUÉS: Comportamiento polimórfico (Estrategia/Duck-Typing)
class Engineer:
    def get_bonus(self): return 500

class Manager:
    def get_bonus(self): return 1000

class Employee:
    def __init__(self, role):
        self.role = role
        self.base_salary = 2000

    def get_salary(self):
        # Python resuelve dinámicamente el bonus
        return self.base_salary + self.role.get_bonus()`
      },
      typescript: {
        before: `// ANTES: Switch acoplado a un literal de cadena o enum
type EmpType = "ENGINEER" | "MANAGER";

class Employee {
  constructor(public type: EmpType, public baseSalary = 2000) {}

  getSalary(): number {
    switch (this.type) {
      case "ENGINEER": return this.baseSalary + 500;
      case "MANAGER": return this.baseSalary + 1000;
    }
  }
}`,
        after: `// DESPUÉS: Interfaces y Clases independientes (SRP)
interface Role {
  getBonus(): number;
}

class Engineer implements Role {
  getBonus() { return 500; }
}

class Employee {
  constructor(private role: Role, public baseSalary = 2000) {}

  getSalary(): number {
    return this.baseSalary + this.role.getBonus();
  }
}`
      },
      go: {
        before: `// ANTES: Estructura dependiente de condicionales rígidos
package main

type Employee struct {
	EmpType    string
	BaseSalary float64
}

func (e *Employee) GetSalary() float64 {
	switch e.EmpType {
	case "ENGINEER":
		return e.BaseSalary + 500
	case "MANAGER":
		return e.BaseSalary + 1000
	default:
		return e.BaseSalary
	}
}`,
        after: `// DESPUÉS: Go aprovecha interfaces implícitas para desacoplar
package main

type Role interface {
	GetBonus() float64
}

type Engineer struct{}
func (e *Engineer) GetBonus() float64 { return 500 }

type Employee struct {
	role       Role
	BaseSalary float64
}

func (e *Employee) GetSalary() float64 {
	return e.BaseSalary + e.role.GetBonus()
}`
      }
    }
  },
  {
    id: 'extract-method',
    name: 'Extraer Método',
    smell: 'Long Method (Acumuladores)',
    description: 'Tienes un método extremadamente largo con demasiadas líneas de código y responsabilidades mezcladas, dificultando su comprensión y reusabilidad. A menudo incluye comentarios internos explicando secciones específicas del flujo.',
    solution: 'Agrupa las líneas que tienen una responsabilidad común, extráelas a un nuevo método independiente y colócale un nombre que describa claramente *qué* hace el método, no *cómo* lo hace.',
    code: {
      java: {
        before: `// ANTES: Un solo método largo que calcula e imprime un recibo
void printOwing() {
    // 1. Imprime Banner
    System.out.println("*****************************");
    System.out.println("****** Deudas del Cliente ****");
    System.out.println("*****************************");

    // 2. Calcula Deuda
    double outstanding = 0.0;
    for (Order order : orders) {
        outstanding += order.getAmount();
    }

    // 3. Imprime Detalles
    System.out.println("Cliente: " + name);
    System.out.println("Deuda Total: " + outstanding);
}`,
        after: `// DESPUÉS: Métodos cortos y auto-documentados (Single Responsibility)
void printOwing() {
    printBanner();
    double outstanding = calculateOutstanding();
    printDetails(outstanding);
}

void printBanner() {
    System.out.println("*****************************");
    System.out.println("****** Deudas del Cliente ****");
    System.out.println("*****************************");
}

double calculateOutstanding() {
    double result = 0.0;
    for (Order order : orders) {
        result += order.getAmount();
    }
    return result;
}

void printDetails(double outstanding) {
    System.out.println("Cliente: " + name);
    System.out.println("Deuda Total: " + outstanding);
}`
      },
      python: {
        before: `# ANTES: Método monolítico con lógica mixta
def print_owing(self):
    # Imprime Banner
    print("-------------------------")
    print("----- Estado Deuda ------")
    print("-------------------------")

    # Calcula Deuda
    outstanding = 0.0
    for order in self.orders:
        outstanding += order.amount

    # Imprime Detalles
    print(f"Nombre: {self.name}")
    print(f"Monto: {outstanding}")`,
        after: `# DESPUÉS: Métodos cortos enfocados
def print_owing(self):
    self._print_banner()
    outstanding = self._calculate_outstanding()
    self._print_details(outstanding)

def _print_banner(self):
    print("-------------------------")
    print("----- Estado Deuda ------")
    print("-------------------------")

def _calculate_outstanding(self) -> float:
    return sum(order.amount for order in self.orders)

def _print_details(self, outstanding):
    print(f"Nombre: {self.name}")
    print(f"Monto: {outstanding}")`
      },
      typescript: {
        before: `// ANTES: Una única función con múltiples responsabilidades
printOwing(): void {
  // Imprime Banner
  console.log("=====================");
  console.log("== Recibo de Pago ===");
  console.log("=====================");

  // Calcula Deuda
  let outstanding = 0;
  this.orders.forEach(o => outstanding += o.amount);

  // Imprime Detalles
  console.log(\`Nombre: \${this.name}\`);
  console.log(\`Monto: \${outstanding}\`);
}`,
        after: `// DESPUÉS: Desacoplamiento de pasos de ejecución
printOwing(): void {
  this.printBanner();
  const outstanding = this.calculateOutstanding();
  this.printDetails(outstanding);
}

private printBanner(): void {
  console.log("=====================");
  console.log("== Recibo de Pago ===");
  console.log("=====================");
}

private calculateOutstanding(): number {
  return this.orders.reduce((acc, order) => acc + order.amount, 0);
}

private printDetails(outstanding: number): void {
  console.log(\`Nombre: \${this.name}\`);
  console.log(\`Monto: \${outstanding}\`);
}`
      },
      go: {
        before: `// ANTES: Función monolítica acoplada en Go
package main

import "fmt"

func (e *Editor) PrintOwing() {
	// Imprime Banner
	fmt.Println("--------------------")
	fmt.Println("--- Estado Cuenta ---")
	fmt.Println("--------------------")

	// Calcula deuda
	outstanding := 0.0
	for _, order := range e.Orders {
		outstanding += order.Amount
	}

	// Imprime Detalles
	fmt.Printf("Nombre: %s\\n", e.Name)
	fmt.Printf("Total: %f\\n", outstanding)
}`,
        after: `// DESPUÉS: Descomposición en funciones idiomáticas
package main

import "fmt"

func (e *Editor) PrintOwing() {
	e.printBanner()
	outstanding := e.calculateOutstanding()
	e.printDetails(outstanding)
}

func (e *Editor) printBanner() {
	fmt.Println("--------------------")
	fmt.Println("--- Estado Cuenta ---")
	fmt.Println("--------------------")
}

func (e *Editor) calculateOutstanding() float64 {
	var result float64
	for _, order := range e.Orders {
		result += order.Amount
	}
	return result
}

func (e *Editor) printDetails(outstanding float64) {
	fmt.Printf("Nombre: %s\\n", e.Name)
	fmt.Printf("Total: %f\\n", outstanding)
}`
      }
    }
  },
  {
    id: 'primitive-obsession',
    name: 'Reemplazar tipo primitivo con objeto',
    smell: 'Primitive Obsession (Acumuladores)',
    description: 'Usas tipos primitivos (como cadenas, enteros, dobles) para representar conceptos del dominio de negocio que tienen sus propias reglas y validaciones (ej. números de teléfono, correos electrónicos, rangos de fechas o monedas). Esto provoca duplicación de lógica de validación en múltiples clases.',
    solution: 'Crea una clase o tipo específico (Value Object) que encapsule el valor primitivo junto con sus validaciones y reglas de negocio, garantizando que el objeto siempre nazca en un estado válido.',
    code: {
      java: {
        before: `// ANTES: Email representado como un simple String en la clase User
class User {
    private String email;

    public void setEmail(String email) {
        // Validación duplicada en varios lugares
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Email inválido");
        }
        this.email = email;
    }
}`,
        after: `// DESPUÉS: Encapsulación en un Value Object inmutable (Record)
public record Email(String value) {
    public Email {
        if (!value.contains("@")) {
            throw new IllegalArgumentException("Email inválido");
        }
    }
}

class User {
    private Email email; // Tipo seguro de dominio

    public void setEmail(Email email) {
        this.email = email;
    }
}`
      },
      python: {
        before: `# ANTES: Usar string primitivo para el teléfono
class Customer:
    def __init__(self, phone: str):
        if len(phone) < 10:
            raise ValueError("Teléfono inválido")
        self.phone = phone`,
        after: `# DESPUÉS: Teléfono encapsulado como Value Object
class PhoneNumber:
    def __init__(self, value: str):
        if len(value) < 10:
            raise ValueError("Teléfono inválido")
        self.value = value

class Customer:
    def __init__(self, phone: PhoneNumber):
        self.phone = phone`
      },
      typescript: {
        before: `// ANTES: Tipos primitivos simples para monedas
class Product {
  constructor(public price: number, public currency: string) {}
}`,
        after: `// DESPUÉS: Value Object Money que encapsula lógica de precios
class Money {
  constructor(public readonly amount: number, public readonly currency: string) {
    if (amount < 0) throw new Error("Monto negativo no permitido");
  }
}

class Product {
  constructor(public price: Money) {}
}`
      },
      go: {
        before: `// ANTES: Usar string para representar rangos de fechas
package main

type Booking struct {
	StartDate string
	EndDate   string
}`,
        after: `// DESPUÉS: Encapsular el concepto de dominio en su propio Struct
package main

import "errors"

type DateRange struct {
	Start string
	End   string
}

func NewDateRange(start, end string) (*DateRange, error) {
	if start == "" || end == "" {
		return nil, errors.new("las fechas no pueden estar vacías")
	}
	return &DateRange{Start: start, End: end}, nil
}

type Booking struct {
	period *DateRange
}`
      }
    }
  }
];
