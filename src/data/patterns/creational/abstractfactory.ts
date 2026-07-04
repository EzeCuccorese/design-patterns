import { Pattern } from '../../types';

export const abstractfactory: Pattern = {
  id: 'abstractfactory',
  name: 'Abstract Factory',
  category: 'creational',
  description: 'Permite producir familias de objetos relacionados sin especificar sus clases concretas. Garantiza que los productos que obtienes de una fábrica sean compatibles entre sí.',
  advantages: [
    'Compatibilidad garantizada entre los productos creados.',
    'Evita el acoplamiento fuerte entre productos concretos y el código cliente.',
    'Principio de Responsabilidad Única (SRP): extrae el código de creación de productos a un solo lugar.'
  ],
  analogy: 'Piensa en una Tienda de Muebles. Hay fábricas de distintos estilos: Moderno, Victoriano y Art Deco. Cada una produce sillas y sofás a juego. Si pides un juego de sala moderno, la fábrica moderna te garantiza que tanto la silla como el sofá combinarán perfectamente.',
  code: {
    java: `// Java 21 - Familias de Componentes UI (Windows vs Mac)
interface Button { void render(); }
interface Checkbox { void render(); }

class WinButton implements Button {
    public void render() { System.out.println("Botón estilo Windows."); }
}
class MacButton implements Button {
    public void render() { System.out.println("Botón estilo MacOS."); }
}

// Fábrica Abstracta
interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Fábricas Concretas
class WinFactory implements UIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new Checkbox() {
        public void render() { System.out.println("Checkbox estilo Windows."); }
    }; }
}

class MacFactory implements UIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new Checkbox() {
        public void render() { System.out.println("Checkbox estilo MacOS."); }
    }; }
}`,
    python: `# Python 3 - Fábrica Abstracta para widgets de interfaz
from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self): pass

class Checkbox(ABC):
    @abstractmethod
    def render(self): pass

class WinButton(Button):
    def render(self): print("Botón estilo Windows.")

class MacButton(Button):
    def render(self): print("Botón estilo MacOS.")

class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

class WinFactory(UIFactory):
    def create_button(self): return WinButton()
    def create_checkbox(self): 
        class WinCheckbox(Checkbox):
            def render(self): print("Checkbox estilo Windows.")
        return WinCheckbox()
`,
    typescript: `// TypeScript - UIFactory para componentes web responsivos
interface Button { render(): void; }
interface Checkbox { render(): void; }

class MacButton implements Button {
  render(): void { console.log("Botón estilo MacOS."); }
}

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

export class MacFactory implements UIFactory {
  createButton(): Button { return new MacButton(); }
  createCheckbox(): Checkbox {
    return {
      render: () => console.log("Checkbox estilo MacOS.")
    };
  }
}
`,
    go: `// Go (Golang) - Abstract Factory con composición de interfaces
package main

import "fmt"

type Button interface { Render() }
type Checkbox interface { Render() }

type WinButton struct{}
func (wb *WinButton) Render() { fmt.Println("Botón estilo Windows.") }

type WinCheckbox struct{}
func (wc *WinCheckbox) Render() { fmt.Println("Checkbox estilo Windows.") }

type UIFactory interface {
	CreateButton() Button
	CreateCheckbox() Checkbox
}

type WinFactory struct{}
func (wf *WinFactory) CreateButton() Button { return &WinButton{} }
func (wf *WinFactory) CreateCheckbox() Checkbox { return &WinCheckbox{} }`
  },
  output: `Botón estilo Windows.
Checkbox estilo Windows.`};
