import { Pattern } from '../../types';

export const command: Pattern = {
  id: 'command',
  name: 'Command',
  category: 'behavioral',
  description: 'Convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud. Esta transformación permite parametrizar los métodos con diferentes solicitudes, retrasar o cola la ejecución de una solicitud y soportar operaciones que no se pueden realizar (deshacer/undo).',
  advantages: [
    'Principio de Responsabilidad Única (SRP): desacopla las clases que invocan operaciones de las que las realizan.',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevos comandos sin romper el código cliente existente.',
    'Permite implementar operaciones de deshacer (Undo) y rehacer (Redo).'
  ],
  analogy: 'Piensa en una Orden de Restaurante. El mesero escribe tu pedido en una comanda (el Command). Esta nota contiene todos los detalles necesarios para el chef. La comanda se coloca en una cola de pedidos (cola de comandos) para que el cocinero (el Receptor) la prepare en su debido momento.',
  code: {
    java: `// Java 21 - Command para encendido de luces con Undo
interface Command {
    void execute();
    void undo();
}

// Receptor (Receiver)
class Light {
    public void turnOn() { System.out.println("Luz encendida."); }
    public void turnOff() { System.out.println("Luz apagada."); }
}

// Comando Concreto
class TurnOnCommand implements Command {
    private final Light light;
    public TurnOnCommand(Light light) { this.light = light; }

    public void execute() { light.turnOn(); }
    public void undo() { light.turnOff(); }
}

// Invocador (Invoker)
class RemoteControl {
    private Command command;

    public void setCommand(Command command) { this.command = command; }
    public void pressButton() { command.execute(); }
}`,
    python: `# Python 3 - Command con soporte Undo
class Command:
    def execute(self): pass
    def undo(self): pass

class Light:
    def turn_on(self): print("Luz encendida.")
    def turn_off(self): print("Luz apagada.")

class TurnOnCommand(Command):
    def __init__(self, light: Light):
        self._light = light
    def execute(self): self._light.turn_on()
    def undo(self): self._light.turn_off()
`,
    typescript: `// TypeScript - Command pattern
interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  turnOn(): void { console.log("Luz encendida."); }
  turnOff(): void { console.log("Luz apagada."); }
}

export class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void { this.light.turnOn(); }
  undo(): void { this.light.turnOff(); }
}
`,
    go: `// Go (Golang) - Command usando interfaces simples
package main

import "fmt"

type Command interface {
	Execute()
}

type Light struct{}
func (l *Light) TurnOn() { fmt.Println("Luz encendida.") }

type TurnOnCommand struct {
	light *Light
}
func (c *TurnOnCommand) Execute() { c.light.TurnOn() }`
  },
  output: `Luz encendida.
Luz apagada (Acción de deshacer / undo ejecutada).`};
