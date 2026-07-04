import { Pattern } from '../../types';

export const facade: Pattern = {
  id: 'facade',
  name: 'Facade',
  category: 'structural',
  description: 'Proporciona una interfaz unificada y simplificada para un conjunto de interfaces en un subsistema complejo. Facade define una interfaz de nivel superior que hace que el subsistema sea más fácil de usar para el cliente.',
  advantages: [
    'Aísla a los clientes de los componentes complejos de un subsistema.',
    'Promueve un acoplamiento débil entre el subsistema y sus clientes.',
    'Simplifica el aprendizaje y uso del subsistema mediante un único punto de entrada.'
  ],
  analogy: 'Piensa en hacer un Pedido por Teléfono a una tienda. En lugar de llamar directamente al almacén para verificar stock, a finanzas para pagar, y a envíos para agendar la entrega, hablas con un único operador (el Facade) que coordina todos estos subsistemas internos por ti.',
  code: {
    java: `// Java 21 - Facade para iniciar una computadora
class CPU { void start() { System.out.println("CPU iniciada."); } }
class Memory { void load() { System.out.println("Memoria cargada."); } }
class HardDrive { void readData() { System.out.println("Disco leyendo datos."); } }

public class ComputerFacade {
    private final CPU cpu = new CPU();
    private final Memory memory = new Memory();
    private final HardDrive hardDrive = new HardDrive();

    public void startComputer() {
        System.out.println("Iniciando secuencia de arranque...");
        cpu.start();
        memory.load();
        hardDrive.readData();
        System.out.println("Sistema operativo listo.");
    }
}`,
    python: `# Python 3 - Facade de Computadora
class CPU:
    def start(self): print("CPU iniciada.")
class Memory:
    def load(self): print("Memoria cargada.")
class HardDrive:
    def read_data(self): print("Disco leyendo datos.")

class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()

    def start_computer(self):
        print("Iniciando secuencia de arranque...")
        self.cpu.start()
        self.memory.load()
        self.hard_drive.read_data()
        print("Sistema listo.")
`,
    typescript: `// TypeScript - Facade
class CPU { start() { console.log("CPU iniciada."); } }
class Memory { load() { console.log("Memoria cargada."); } }
class HardDrive { readData() { console.log("Disco leyendo datos."); } }

export class ComputerFacade {
  private cpu = new CPU();
  private memory = new Memory();
  private hardDrive = new HardDrive();

  startComputer(): void {
    console.log("Iniciando secuencia de arranque...");
    this.cpu.start();
    this.memory.load();
    this.hardDrive.readData();
    console.log("Sistema listo.");
  }
}
`,
    go: `// Go (Golang) - Facade usando composición simple
package main

import "fmt"

type CPU struct{}
func (c *CPU) Start() { fmt.Println("CPU iniciada.") }

type Memory struct{}
func (m *Memory) Load() { fmt.Println("Memoria cargada.") }

type ComputerFacade struct {
	cpu    *CPU
	memory *Memory
}

func NewComputerFacade() *ComputerFacade {
	return &ComputerFacade{cpu: &CPU{}, memory: &Memory{}}
}

func (cf *ComputerFacade) StartComputer() {
	fmt.Println("Secuencia de arranque...")
	cf.cpu.Start()
	cf.memory.Load()
}`
  },
  output: `Iniciando secuencia de arranque...
CPU iniciada.
Memoria cargada.
Disco leyendo datos.
Sistema listo.`};
