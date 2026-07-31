import { Pattern } from '../../types';

export const singleton: Pattern = {
  id: 'singleton',
  name: 'Singleton',
  category: 'creational',
  description: 'Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella. Útil para coordinar acciones en todo el sistema (ej. gestores de configuración, pools de conexiones, hilos de ejecución).',
  advantages: [
    'Control estricto sobre el acceso a una instancia única.',
    'Evita la creación innecesaria de objetos cargados en memoria.',
    'Soporta inicialización perezosa (lazy initialization), cargando recursos solo al requerirse.'
  ],
  analogy: 'Piensa en el Gobierno de un país. Solo puede haber un gobierno oficial a la vez. No importa la identidad de los individuos que lo forman, el punto de acceso "Gobierno de la Nación" es único y global para todos los ciudadanos.',
  code: {
    java: `// Java 21 - Singleton Seguro con "Initialization-on-demand holder idiom"
public class ConfigManager {
    
    // El constructor privado evita la instanciación externa
    private ConfigManager() {
        System.out.println("Cargando configuraciones del sistema...");
    }

    // Clase estática interna y perezosa que garantiza seguridad de hilos
    private static class Holder {
        private static final ConfigManager INSTANCE = new ConfigManager();
    }

    public static ConfigManager getInstance() {
        return Holder.INSTANCE;
    }

    public void showSetting() {
        System.out.println("Config: db_host = localhost");
    }
}`,
    python: `# Python 3 - Singleton usando una Metaclase (Metaclass)
# ¿Cómo funciona internamente?
# 1. En Python, las clases son objetos creados por una "metaclase" (por defecto, 'type').
# 2. Cuando ejecutas 'ConfigManager()', Python llama al método __call__() de su metaclase (SingletonMeta).
# 3. La metaclase intercepta la creación de objetos ANTES de que se ejecute ConfigManager.__init__().

class SingletonMeta(type):
    # Diccionario estático para almacenar la instancia única de cada clase
    _instances = {}

    def __call__(cls, *args, **kwargs):
        """
        'cls' hace referencia a la clase que se intenta instanciar (ej: ConfigManager).
        Este método intercepta el operador de llamada 'ConfigManager()'.
        """
        if cls not in cls._instances:
            # 1. Si la clase NO ha sido instanciada antes, llamamos a super().__call__()
            #    que ejecuta internamente ConfigManager.__new__() y ConfigManager.__init__().
            instance = super().__call__(*args, **kwargs)
            # 2. Guardamos la instancia en el diccionario centralizado.
            cls._instances[cls] = instance
        
        # 3. Si ya existía, retornamos la misma instancia almacenada (evitando re-ejecutar __init__).
        return cls._instances[cls]

class ConfigManager(metaclass=SingletonMeta):
    def __init__(self):
        # Este método SOLO se ejecutará 1 sola vez en todo el ciclo de vida de la app
        print("Cargando configuraciones del sistema...")

    def show_setting(self):
        print("Config: db_host = localhost")
`,
    typescript: `// TypeScript - Singleton Clásico con campo estático privado
export class ConfigManager {
    private static instance: ConfigManager | null = null;

    private constructor() {
        console.log("Cargando configuraciones del sistema...");
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public showSetting(): void {
        console.log("Config: db_host = localhost");
    }
}`,
    go: `// Go (Golang) - Singleton Seguro con sync.Once (Goroutine-safe)
package main

import (
	"fmt"
	"sync"
)

type configManager struct {
	dbHost string
}

var (
	instance *configManager
	once     sync.Once
)

func GetInstance() *configManager {
	// sync.Once garantiza ejecución única en entornos concurrentes
	once.Do(func() {
		fmt.Println("Cargando configuraciones del sistema...")
		instance = &configManager{
			dbHost: "localhost",
		}
	})
	return instance
}

func (c *configManager) ShowSetting() {
	fmt.Printf("Config: db_host = %s\\n", c.dbHost)
}`
  },
  output: `Cargando configuraciones del sistema...
Config: db_host = localhost
[Misma instancia comprobada en memoria]`};
