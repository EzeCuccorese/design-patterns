import { Pattern } from '../../types';

export const proxy: Pattern = {
  id: 'proxy',
  name: 'Proxy',
  category: 'structural',
  description: 'Proporciona un sustituto o marcador de posición para otro objeto con el fin de controlar el acceso a él. Permite realizar operaciones adicionales antes o después de que la solicitud llegue al objeto original (ej. seguridad, caching, inicialización perezosa).',
  advantages: [
    'Permite controlar el ciclo de vida del objeto real sin acoplar al cliente.',
    'Funciona incluso si el objeto de servicio real no está listo o disponible.',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevos proxies sin cambiar los clientes.'
  ],
  analogy: 'Piensa en una Tarjeta de Débito. Es un proxy de tu cuenta bancaria real (dinero en efectivo). En lugar de cargar fajos de billetes en tu billetera, usas la tarjeta de débito que procesa los cobros autorizados en tu cuenta de forma segura cuando lo necesitas.',
  code: {
    java: `// Java 21 - Proxy de Protección de Internet
interface Internet {
    void connectTo(String host) throws Exception;
}

class RealInternet implements Internet {
    public void connectTo(String host) { System.out.println("Conectando a: " + host); }
}

public class ProxyInternet implements Internet {
    private final Internet internet = new RealInternet();
    private static final java.util.List<String> bannedSites = java.util.List.of("banned.com", "malware.net");

    public void connectTo(String host) throws Exception {
        if (bannedSites.contains(host.toLowerCase())) {
            throw new Exception("Acceso denegado a sitio restringido: " + host);
        }
        internet.connectTo(host);
    }
}`,
    python: `# Python 3 - Proxy de Protección
class Internet:
    def connect_to(self, host: str): pass

class RealInternet(Internet):
    def connect_to(self, host: str):
        print(f"Conectando a: {host}")

class ProxyInternet(Internet):
    def __init__(self):
        self._real_internet = RealInternet()
        self._banned_sites = ["banned.com", "malware.net"]

    def connect_to(self, host: str):
        if host.lower() in self._banned_sites:
            raise PermissionError(f"Acceso denegado a: {host}")
        self._real_internet.connect_to(host)
`,
    typescript: `// TypeScript - Proxy de Caché
interface DataService {
  getData(id: string): string;
}

class RealDataService implements DataService {
  getData(id: string): string {
    console.log("Cargando desde base de datos...");
    return \`Datos de ID: \${id}\`;
  }
}

export class CachedDataProxy implements DataService {
  private service = new RealDataService();
  private cache = new Map<string, string>();

  getData(id: string): string {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.service.getData(id));
    } else {
      console.log("Retornando desde caché...");
    }
    return this.cache.get(id)!;
  }
}
`,
    go: `// Go (Golang) - Proxy de acceso seguro
package main

import "fmt"

type Server interface {
	HandleRequest(url, method string)
}

type RealServer struct{}
func (rs *RealServer) HandleRequest(url, method string) {
	fmt.Printf("Procesando request: %s %s\\n", method, url)
}

type NginxProxy struct {
	realServer *RealServer
	rateLimit  int
}

func (p *NginxProxy) HandleRequest(url, method string) {
	if url == "/admin" {
		fmt.Println("Error 403: Forbidden access")
		return
	}
	if p.realServer == nil {
		p.realServer = &RealServer{}
	}
	p.realServer.HandleRequest(url, method)
}`
  },
  output: `Conectando a: google.com
Acceso denegado a sitio restringido: banned.com`};
