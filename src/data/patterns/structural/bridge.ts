import { Pattern } from '../../types';

export const bridge: Pattern = {
  id: 'bridge',
  name: 'Bridge',
  category: 'structural',
  description: 'Desacopla una abstracción de su implementación, permitiendo que ambas varíen de manera independiente. Evita una explosión combinatoria de subclases mediante la composición.',
  advantages: [
    'Permite crear clases independientes de la plataforma y de su implementación.',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevas abstracciones e implementaciones de forma aislada.',
    'Oculta los detalles de implementación del cliente.'
  ],
  analogy: 'Piensa en un Control Remoto (Abstracción) y un Dispositivo (Implementación como una TV o un Radio). El control remoto define los botones genéricos (Encender, Apagar), pero la señal se implementa de manera distinta dependiendo del dispositivo electrónico específico.',
  code: {
    java: `// Java 21 - Control Remoto (Abstracción) y Dispositivos (Implementación)
interface Device {
    void turnOn();
    void turnOff();
}

class TV implements Device {
    public void turnOn() { System.out.println("TV Encendida."); }
    public void turnOff() { System.out.println("TV Apagada."); }
}

abstract class RemoteControl {
    protected final Device device; // El "Puente" o composición
    public RemoteControl(Device device) { this.device = device; }
    
    public abstract void pressPower();
}

class BasicRemote extends RemoteControl {
    private boolean on = false;
    public BasicRemote(Device device) { super(device); }

    public void pressPower() {
        if (on) { device.turnOff(); on = false; }
        else { device.turnOn(); on = true; }
    }
}`,
    python: `# Python 3 - Bridge de dispositivos y controles remotos
from abc import ABC, abstractmethod

class Device(ABC):
    @abstractmethod
    def turn_on(self): pass
    @abstractmethod
    def turn_off(self): pass

class Radio(Device):
    def turn_on(self): print("Radio Encendido.")
    def turn_off(self): print("Radio Apagado.")

class RemoteControl:
    def __init__(self, device: Device):
        self.device = device
    
    def toggle_power(self):
        # Envía la orden a través del puente
        self.device.turn_on()
`,
    typescript: `// TypeScript - Bridge
interface Device {
  turnOn(): void;
  turnOff(): void;
}

export class TV implements Device {
  turnOn(): void { console.log("TV Encendida."); }
  turnOff(): void { console.log("TV Apagada."); }
}

export class AdvancedRemote {
  constructor(protected device: Device) {}
  mute(): void {
    console.log("Silenciando dispositivo...");
    this.device.turnOff();
  }
}
`,
    go: `// Go (Golang) - Bridge con interfaces
package main

import "fmt"

type Device interface {
	TurnOn()
}

type Radio struct{}
func (r *Radio) TurnOn() { fmt.Println("Radio Encendido.") }

type Remote struct {
	device Device // Puente
}

func (r *Remote) Power() {
	r.device.TurnOn()
}`
  },
  output: `Secuencia del control remoto básica:
TV Encendida.
TV Apagada.`};
