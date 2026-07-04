import { Pattern } from '../../types';

export const iterator: Pattern = {
  id: 'iterator',
  name: 'Iterator',
  category: 'behavioral',
  description: 'Permite recorrer elementos de una colección sin exponer su representación subyacente (ya sea una lista, pila, árbol, etc.). Centraliza la lógica de recorrido en una interfaz unificada.',
  advantages: [
    'Principio de Responsabilidad Única (SRP): aísla la lógica de recorrido de la colección principal.',
    'Soporta el recorrido simultáneo de la misma colección por varios clientes de forma independiente.',
    'Permite cambiar la estructura interna de una colección sin alterar los algoritmos de recorrido.'
  ],
  analogy: 'Piensa en un Guía Turístico. Si visitas una ciudad medieval con un grupo, no te preocupas por dibujar el mapa de calles caóticas para recorrerla. El guía (el Iterator) sabe el camino y te lleva paso a paso: "siguiente atracción", "atracción actual", hasta recorrer el itinerario.',
  code: {
    java: `// Java 21 - Recorrido de Colecciones con Iterator personalizado
import java.util.List;

interface MyIterator<T> {
    boolean hasNext();
    T next();
}

class NotificationIterator implements MyIterator<String> {
    private final List<String> notifications;
    private int position = 0;

    public NotificationIterator(List<String> list) { this.notifications = list; }
    
    public boolean hasNext() { return position < notifications.size(); }
    public String next() { return notifications.get(position++); }
}

interface MyCollection {
    MyIterator<String> createIterator();
}`,
    python: `# Python 3 - Recorrido personalizado usando los métodos mágicos __iter__ y __next__
class NotificationIterator:
    def __init__(self, notifications):
        self._notifications = notifications
        self._index = 0

    def __next__(self):
        if self._index < len(self._notifications):
            result = self._notifications[self._index]
            self._index += 1
            return result
        raise StopIteration

class NotificationCollection:
    def __init__(self):
        self.notifications = []
    def __iter__(self):
        return NotificationIterator(self.notifications)
`,
    typescript: `// TypeScript - Iterator personalizado
interface MyIterator<T> {
  hasNext(): boolean;
  next(): T;
}

export class ArrayIterator<T> implements MyIterator<T> {
  private index = 0;
  constructor(private items: T[]) {}

  hasNext(): boolean { return this.index < this.items.length; }
  next(): T { return this.items[this.index++]; }
}
`,
    go: `// Go (Golang) - Iterator estructural con un contador
package main

type Iterator struct {
	items []string
	index int
}

func (it *Iterator) HasNext() bool { return it.index < len(it.items) }
func (it *Iterator) Next() string {
	item := it.items[it.index]
	it.index++
	return item
}`
  },
  output: `Recorriendo notificaciones:
- Alerta: Batería baja
- Alerta: Actualización pendiente`};
