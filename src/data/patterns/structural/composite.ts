import { Pattern } from '../../types';

export const composite: Pattern = {
  id: 'composite',
  name: 'Composite',
  category: 'structural',
  description: 'Permite componer objetos en estructuras de árbol y trabajar con esas estructuras como si fueran objetos individuales. Trata a los componentes simples y a las colecciones complejas de manera uniforme.',
  advantages: [
    'Facilita la creación de estructuras recursivas complejas (árboles).',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevos tipos de elementos sin romper el código cliente existente.',
    'Simplifica el código cliente al evitar distinguir entre un objeto hoja y un contenedor.'
  ],
  analogy: 'Rescatado de *Mi granito de Java*, piensa en el Sistema de Archivos de tu computadora. Tienes un elemento base (Componente) que puede ser un archivo individual (Hoja/SimpleFile) o una carpeta (Composite/Folder) que a su vez contiene archivos y otras carpetas. Al calcular el tamaño total, ejecutas la misma acción "getSize()" recursivamente sin importar la ramificación.',
  code: {
    java: `// Java 21 - Estructura de Directorios y Archivos
import java.util.ArrayList;
import java.util.List;

interface FileSystemNode {
    void printName(String indent);
}

class SimpleFile implements FileSystemNode {
    private final String name;
    public SimpleFile(String name) { this.name = name; }
    public void printName(String indent) { System.out.println(indent + "📄 " + name); }
}

class Directory implements FileSystemNode {
    private final String name;
    private final List<FileSystemNode> children = new ArrayList<>();

    public Directory(String name) { this.name = name; }
    public void add(FileSystemNode node) { children.add(node); }

    public void printName(String indent) {
        System.out.println(indent + "📁 " + name);
        for (FileSystemNode child : children) {
            child.printName(indent + "  ");
        }
    }
}`,
    python: `# Python 3 - Composite en Sistema de Archivos
from abc import ABC, abstractmethod

class FileSystemNode(ABC):
    @abstractmethod
    def print_name(self, indent=""): pass

class SimpleFile(FileSystemNode):
    def __init__(self, name):
        self.name = name
    def print_name(self, indent=""):
        print(f"{indent}📄 {self.name}")

class Directory(FileSystemNode):
    def __init__(self, name):
        self.name = name
        self.children = []

    def add(self, node: FileSystemNode):
        self.children.append(node)

    def print_name(self, indent=""):
        print(f"{indent}📁 {self.name}")
        for child in self.children:
            child.print_name(indent + "  ")
`,
    typescript: `// TypeScript - Composite con recursión
interface FileSystemNode {
  printName(indent: string): void;
}

class SimpleFile implements FileSystemNode {
  constructor(private name: string) {}
  printName(indent: string): void {
    console.log(\`\${indent}📄 \${this.name}\`);
  }
}

export class Directory implements FileSystemNode {
  private children: FileSystemNode[] = [];
  constructor(private name: string) {}

  add(node: FileSystemNode): void {
    this.children.push(node);
  }

  printName(indent: string): void {
    console.log(\`\${indent}📁 \${this.name}\`);
    this.children.forEach(child => child.printName(indent + "  "));
  }
}
`,
    go: `// Go (Golang) - Composite usando structs e interfaces recursivas
package main

import "fmt"

type FileSystemNode interface {
	PrintName(indent string)
}

type SimpleFile struct {
	Name string
}
func (sf *SimpleFile) PrintName(indent string) {
	fmt.Printf("%s📄 %s\\n", indent, sf.Name)
}

type Directory struct {
	Name     string
	Children []FileSystemNode
}

func (d *Directory) Add(node FileSystemNode) {
	d.Children = append(d.Children, node)
}

func (d *Directory) PrintName(indent string) {
	fmt.Printf("%s📁 %s\\n", indent, d.Name)
	for _, child := range d.Children {
		child.PrintName(indent + "  ")
	}
}`
  },
  output: `📁 Root
  📁 Documents
    📄 cv.pdf
  📄 logo.png`};
