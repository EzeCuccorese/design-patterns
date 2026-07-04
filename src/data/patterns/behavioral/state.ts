import { Pattern } from '../../types';

export const state: Pattern = {
  id: 'state',
  name: 'State',
  category: 'behavioral',
  description: 'Permite a un objeto alterar su comportamiento cuando su estado interno cambia. El objeto parecerá haber cambiado de clase en tiempo de ejecución, encapsulando los estados en clases separadas.',
  advantages: [
    'Principio de Responsabilidad Única (SRP): organiza el código relacionado con estados particulares en clases independientes.',
    'Principio de Abierto/Cerrado (OCP): introduce nuevos estados sin cambiar las clases de estado existentes o el contexto.',
    'Elimina condicionales switch/if gigantes en el objeto de contexto.'
  ],
  analogy: 'Piensa en un Semáforo. El semáforo (Contexto) recibe una orden genérica "siguiente()". El comportamiento resultante (cambiar a rojo, amarillo o verde) y la lógica de espera dependen del estado interno en el que se encuentre en ese momento.',
  code: {
    java: `// Java 21 - Estado de Alerta de Celular (Vibración, Sonido, Silencio)
interface MobileAlertState {
    void alert(AlertContext ctx);
}

// Estados Concretos
class RingState implements MobileAlertState {
    public void alert(AlertContext ctx) { System.out.println("Celular suena: RING!"); }
}

class VibrationState implements MobileAlertState {
    public void alert(AlertContext ctx) { System.out.println("Celular vibra: BZZZ..."); }
}

// Contexto
public class AlertContext {
    private MobileAlertState currentState = new RingState();

    public void setState(MobileAlertState state) { this.currentState = state; }
    public void alert() { currentState.alert(this); }
}`,
    python: `# Python 3 - State Pattern para un interruptor
class State:
    def alert(self, context): pass

class Ring(State):
    def alert(self, context): print("Celular suena: RING!")

class Vibration(State):
    def alert(self, context): print("Celular vibra: BZZZ...")

class AlertContext:
    def __init__(self):
        self.state = Ring()

    def set_state(self, state: State):
        self.state = state

    def alert(self):
        self.state.alert(self)
`,
    typescript: `// TypeScript - State
interface AlertState {
  alert(context: AlertContext): void;
}

export class Ring implements AlertState {
  alert(context: AlertContext): void { console.log("Celular suena: RING!"); }
}

export class AlertContext {
  private state: AlertState = new Ring();

  setState(state: AlertState): void { this.state = state; }
  alert(): void { this.state.alert(this); }
}
`,
    go: `// Go (Golang) - State Pattern usando structs y delegación
package main

import "fmt"

type State interface {
	Alert()
}

type Ring struct{}
func (r *Ring) Alert() { fmt.Println("Celular suena: RING!") }

type AlertContext struct {
	currentState State
}

func (ac *AlertContext) SetState(s State) { ac.currentState = s }
func (ac *AlertContext) Alert()            { ac.currentState.Alert() }`
  },
  output: `Celular suena: RING!
[Estado cambiado a Vibración]
Celular vibra: BZZZ...`};
