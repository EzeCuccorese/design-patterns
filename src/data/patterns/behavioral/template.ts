import { Pattern } from '../../types';

export const template: Pattern = {
  id: 'template',
  name: 'Template Method',
  category: 'behavioral',
  description: 'Define el esqueleto de un algoritmo en la superclase, delegando ciertos pasos a las subclases. Permite que las subclases redefinan ciertos pasos de un algoritmo sin cambiar su estructura general.',
  advantages: [
    'Reutilización de código: evita duplicar el esqueleto general del algoritmo.',
    'Permite a las subclases extender puntos específicos del algoritmo de manera controlada.',
    'Centraliza la lógica común en una superclase, facilitando cambios futuros.'
  ],
  analogy: 'Piensa en una Receta para hacer pan. El esqueleto general es siempre el mismo: Mezclar ingredientes, Amasar, Hornear. La receta del Pan de Trigo y la del Pan Integral redefinen los ingredientes específicos (harina común vs harina integral) y el tiempo de cocción, pero siguen exactamente los mismos pasos ordenados.',
  code: {
    java: `// Java 21 - Proceso de Carga y Minería de Datos (Data Miner)
public abstract class DataMiner {
    
    // Método Plantilla (Template Method) final: define el esqueleto
    public final void mineData(String path) {
        openFile(path);
        extractData();
        parseData();
        closeFile();
    }

    protected void openFile(String path) { System.out.println("Abriendo archivo: " + path); }
    protected void closeFile() { System.out.println("Cerrando archivo."); }

    // Pasos abstractos a ser definidos por las subclases
    protected abstract void extractData();
    protected abstract void parseData();
}

class PDFDataMiner extends DataMiner {
    protected void extractData() { System.out.println("Extrayendo texto de archivo PDF..."); }
    protected void parseData() { System.out.println("Analizando la estructura del PDF..."); }
}`,
    python: `# Python 3 - Template Method en minería de datos
from abc import ABC, abstractmethod

class DataMiner(ABC):
    def mine_data(self, path: str):
        # Esqueleto común del proceso
        self.open_file(path)
        self.extract_data()
        self.parse_data()
        self.close_file()

    def open_file(self, path): print(f"Abriendo: {path}")
    def close_file(self): print("Cerrando archivo.")

    @abstractmethod
    def extract_data(self): pass

    @abstractmethod
    def parse_data(self): pass

class CSVDataMiner(DataMiner):
    def extract_data(self): print("Extrayendo columnas CSV...")
    def parse_data(self): print("Mapeando filas CSV a objetos...")
`,
    typescript: `// TypeScript - Template Method
abstract class DataMiner {
  public mineData(path: string): void {
    this.openFile(path);
    this.extractData();
    this.parseData();
    this.closeFile();
  }

  protected openFile(path: string): void { console.log(\`Abriendo: \${path}\`); }
  protected closeFile(): void { console.log("Cerrando archivo."); }

  protected abstract extractData(): void;
  protected abstract parseData(): void;
}

export class PDFMiner extends DataMiner {
  protected extractData(): void { console.log("Extrayendo texto PDF..."); }
  protected parseData(): void { console.log("Analizando PDF..."); }
}
`,
    go: `// Go (Golang) - Template Method mediante Composición y delegación
package main

import "fmt"

type MinerInterface interface {
	ExtractData()
	ParseData()
}

type DataMiner struct {
	miner MinerInterface
}

func (dm *DataMiner) MineData(path string) {
	fmt.Println("Abriendo archivo:", path)
	dm.miner.ExtractData()
	dm.miner.ParseData()
	fmt.Println("Cerrando archivo.")
}

type CSVMiner struct{}
func (c *CSVMiner) ExtractData() { fmt.Println("Extrayendo columnas CSV...") }
func (c *CSVMiner) ParseData()   { fmt.Println("Analizando CSV...") }`
  },
  output: `Abriendo archivo: report.pdf
Extrayendo texto de archivo PDF...
Analizando la estructura del PDF...
Cerrando archivo.`};
