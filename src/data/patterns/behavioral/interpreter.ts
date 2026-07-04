import { Pattern } from '../../types';

export const interpreter: Pattern = {
  id: 'interpreter',
  name: 'Interpreter',
  category: 'behavioral',
  description: 'Define una representación de la gramática de un lenguaje junto con un intérprete que utiliza la representación para interpretar sentencias en el lenguaje. Se utiliza comúnmente para evaluar expresiones matemáticas, parsear consultas SQL o procesar archivos de configuración.',
  advantages: [
    'Facilidad para cambiar y extender la gramática de un lenguaje (las reglas de la gramática se definen en clases).',
    'Permite implementar pequeños lenguajes específicos de dominio (DSLs) de forma estructurada.',
    'Separación de la lógica de evaluación (interpretar) de la lógica de parseo sintáctico.'
  ],
  analogy: 'Piensa en las Partituras Musicales. Las notas y símbolos dibujados en el papel siguen una gramática específica. El músico (el Intérprete) lee estos símbolos en la partitura y los traduce en sonidos y ritmo tocando su instrumento.',
  code: {
    java: `// Java 21 - Intérprete para evaluar Expresiones Matemáticas Simples (Suma)
interface Expression {
    int interpret(java.util.Map<String, Integer> context);
}

// Expresión Terminal (Número constante)
class NumberExpression implements Expression {
    private final int number;
    public NumberExpression(int number) { this.number = number; }
    public int interpret(java.util.Map<String, Integer> context) { return number; }
}

// Expresión No Terminal (Suma de dos expresiones)
class AddExpression implements Expression {
    private final Expression left;
    private final Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left; this.right = right;
    }

    public int interpret(java.util.Map<String, Integer> context) {
        return left.interpret(context) + right.interpret(context);
    }
}`,
    python: `# Python 3 - Interpreter para expresiones matemáticas
class Expression:
    def interpret(self, context: dict) -> int: pass

class NumberExpression(Expression):
    def __init__(self, value: int):
        self.value = value
    def interpret(self, context: dict) -> int:
        return self.value

class AddExpression(Expression):
    def __init__(self, left: Expression, right: Expression):
        self.left = left
        self.right = right
    def interpret(self, context: dict) -> int:
        return self.left.interpret(context) + self.right.interpret(context)
`,
    typescript: `// TypeScript - Interpreter
interface Expression {
  interpret(context: Map<string, number>): number;
}

class NumberExpression implements Expression {
  constructor(private val: number) {}
  interpret(context: Map<string, number>): number { return this.val; }
}

export class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Map<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}
`,
    go: `// Go (Golang) - Interpreter
package main

type Expression interface {
	Interpret(context map[string]int) int
}

type NumberExpression struct {
	val int
}
func (ne *NumberExpression) Interpret(context map[string]int) int { return ne.val }

type AddExpression struct {
	left  Expression
	right Expression
}

func (ae *AddExpression) Interpret(context map[string]int) int {
	return ae.left.Interpret(context) + ae.right.Interpret(context)
}`
  },
  output: `Expresión: 10 + 5
Resultado interpretado: 15`};
