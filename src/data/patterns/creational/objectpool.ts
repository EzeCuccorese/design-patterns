import { Pattern } from '../../types';

export const objectpool: Pattern = {
  id: 'objectpool',
  name: 'Object Pool',
  category: 'creational',
  description: 'Mantiene un conjunto de objetos inicializados y listos para usar (el "pool") en lugar de crearlos y destruirlos bajo demanda. Cuando el cliente necesita un objeto, lo solicita al pool, lo utiliza y luego lo devuelve para que otros clientes puedan reusarlo.',
  advantages: [
    'Mejora significativamente el rendimiento cuando el costo de inicialización es muy alto (ej. conexiones a base de datos).',
    'Limita el número máximo de recursos que se pueden instanciar de forma simultánea.',
    'Reduce la recolección de basura (Garbage Collection) al reusar memoria continuamente.'
  ],
  analogy: 'Piensa en una Tienda de Alquiler de Bicicletas. La tienda compra 10 bicicletas (el pool). Si necesitas una, no la compras nueva, vas a la tienda, la alquilas (adquieres), la usas y la devuelves (liberas) para que el próximo cliente pueda pasear.',
  code: {
    java: `// Java 21 - Pool de Conexiones simplificado (Thread-Safe)
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class ConnectionPool {
    private final BlockingQueue<Connection> availableConnections;

    public ConnectionPool(int size) {
        availableConnections = new LinkedBlockingQueue<>(size);
        for (int i = 0; i < size; i++) {
            availableConnections.add(new Connection("Conn-" + i));
        }
    }

    public Connection acquire() throws InterruptedException {
        return availableConnections.take();
    }

    public void release(Connection conn) {
        if (conn != null) {
            availableConnections.offer(conn);
        }
    }
}

class Connection {
    private final String id;
    public Connection(String id) { this.id = id; }
    public void execute(String query) { System.out.println(id + " ejecutando: " + query); }
}`,
    python: `# Python 3 - Pool de Conexiones básico usando cola concurrente (Queue)
from queue import Queue

class Connection:
    def __init__(self, id_conn):
        self.id = id_conn
    def execute(self, query):
        print(f"{self.id} ejecutando: {query}")

class ConnectionPool:
    def __init__(self, size=5):
        self._pool = Queue(maxsize=size)
        for i in range(size):
            self._pool.put(Connection(f"Conn-{i}"))

    def acquire(self) -> Connection:
        return self._pool.get()

    def release(self, conn: Connection):
        self._pool.put(conn)
`,
    typescript: `// TypeScript - Pool de objetos asíncrono
class Connection {
  constructor(public id: string) {}
  execute(query: string): void {
    console.log(\`\${this.id} ejecutando: \${query}\`);
  }
}

export class ConnectionPool {
  private pool: Connection[] = [];

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.pool.push(new Connection(\`Conn-\${i}\`));
    }
  }

  acquire(): Connection {
    if (this.pool.length === 0) {
      throw new Error("No hay conexiones disponibles en el pool.");
    }
    return this.pool.pop()!;
  }

  release(conn: Connection): void {
    this.pool.push(conn);
  }
}
`,
    go: `// Go (Golang) - Pool de conexiones concurrente implementado con Canales (Channels)
package main

import "fmt"

type Connection struct {
	ID string
}

func (c *Connection) Execute(query string) {
	fmt.Printf("%s ejecutando: %s\\n", c.ID, query)
}

type ConnectionPool struct {
	connections chan *Connection
}

func NewConnectionPool(size int) *ConnectionPool {
	pool := &ConnectionPool{
		connections: make(chan *Connection, size),
	}
	for i := 0; i < size; i++ {
		pool.connections <- &Connection{ID: fmt.Sprintf("Conn-%d", i)}
	}
	return pool
}

func (cp *ConnectionPool) Acquire() *Connection {
	// Lee del canal de conexiones
	return <-cp.connections
}

func (cp *ConnectionPool) Release(conn *Connection) {
	// Devuelve la conexión al canal
	cp.connections <- conn
}`
  },
  output: `Conn-0 ejecutando: SELECT * FROM users;
[Conexión devuelta al pool y reusada por otro hilo]`};
