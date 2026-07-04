import { Pattern } from '../../types';

export const flyweight: Pattern = {
  id: 'flyweight',
  name: 'Flyweight',
  category: 'structural',
  description: 'Permite ajustar más objetos en la cantidad disponible de memoria RAM compartiendo partes comunes del estado entre varios objetos en lugar de mantener todos los datos en cada objeto.',
  advantages: [
    'Reduce drásticamente el consumo de memoria RAM cuando se instancian millones de objetos similares.',
    'Disminuye la sobrecarga de la CPU al reutilizar texturas o modelos pesados cargados previamente.',
    'Promueve un diseño centrado en separar el estado intrínseco (invariante) del extrínseco (variante).'
  ],
  analogy: 'Piensa en un Bosque en un videojuego 3D. Hay 100,000 árboles. En lugar de crear 100,000 mallas 3D pesadas (hojas, tronco, textura) en la RAM, creas solo 2 mallas de árboles base: Pino y Roble (Flyweights). Cada árbol del bosque solo almacena su posición x, y, z (Estado Extrínseco) y apunta a su modelo compartido base (Estado Intrínseco).',
  code: {
    java: `// Java 21 - Bosque de Árboles en memoria eficiente
import java.util.HashMap;
import java.util.Map;

// Flyweight: Estado Intrínseco compartido (textura, malla, color)
class TreeType {
    private final String name;
    private final String color;

    public TreeType(String name, String color) { this.name = name; this.color = color; }
    public void draw(int x, int y) {
        System.out.printf("Dibujando %s de color %s en coords (%d, %d)\\n", name, color, x, y);
    }
}

// Flyweight Factory
class TreeFactory {
    private static final Map<String, TreeType> treeTypes = new HashMap<>();

    public static TreeType getTreeType(String name, String color) {
        String key = name + "-" + color;
        if (!treeTypes.containsKey(key)) {
            treeTypes.put(key, new TreeType(name, color));
        }
        return treeTypes.get(key);
    }
}

// Contexto: Almacena el Estado Extrínseco (posición única por árbol)
class Tree {
    private final int x;
    private final int y;
    private final TreeType type;

    public Tree(int x, int y, TreeType type) { this.x = x; this.y = y; this.type = type; }
    public void draw() { type.draw(x, y); }
}`,
    python: `# Python 3 - Flyweight para modelar partículas de juego
class ParticleType:
    def __init__(self, name: str, sprite: str):
        self.name = name
        self.sprite = sprite  # Carga de imagen pesada

    def draw(self, coords: tuple):
        print(f"Dibujando partícula {self.name} en {coords}")

class ParticleFactory:
    _types = {}

    @classmethod
    def get_type(cls, name: str, sprite: str) -> ParticleType:
        key = (name, sprite)
        if key not in cls._types:
            cls._types[key] = ParticleType(name, sprite)
        return cls._types[key]
`,
    typescript: `// TypeScript - Flyweight
class TreeType {
  constructor(private name: string, private texture: string) {}
  draw(x: number, y: number): void {
    console.log(\`Árbol \${this.name} dibujado en \${x},\${y}.\`);
  }
}

export class TreeFactory {
  private static types = new Map<string, TreeType>();

  public static getTreeType(name: string, texture: string): TreeType {
    const key = \`\${name}-\${texture}\`;
    if (!this.types.has(key)) {
      this.types.set(key, new TreeType(name, texture));
    }
    return this.types.get(key)!;
  }
}
`,
    go: `// Go (Golang) - Compartir estructuras flyweight concurrentemente
package main

import "fmt"

type TreeType struct {
	Name  string
	Color string
}

func (tt *TreeType) Draw(x, y int) {
	fmt.Printf("Dibujando %s (%s) en %d,%d\\n", tt.Name, tt.Color, x, y)
}

type TreeFactory struct {
	types map[string]*TreeType
}

func NewTreeFactory() *TreeFactory {
	return &TreeFactory{types: make(map[string]*TreeType)}
}

func (tf *TreeFactory) GetTreeType(name, color string) *TreeType {
	key := name + "-" + color
	if _, exists := tf.types[key]; !exists {
		tf.types[key] = &TreeType{Name: name, Color: color}
	}
	return tf.types[key]
}`
  },
  output: `Dibujando Pino de color Verde en coords (10, 20)
Dibujando Pino de color Verde en coords (50, 80)
[Memoria RAM conservada al compartir Pino de color Verde]`};
