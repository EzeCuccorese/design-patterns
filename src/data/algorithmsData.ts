export interface CodeSnippet {
  typescript: string;
  python: string;
}

export interface BigOTableRow {
  algorithmOrOperation: string;
  bestTime: string;
  averageTime: string;
  worstTime: string;
  spaceComplexity: string;
  notes?: string;
}

export interface AlgorithmItem {
  id: string;
  name: string;
  summary: string;
  description: string;
  code: CodeSnippet;
  bigOTable?: BigOTableRow[];
  useCases: string[];
}

export interface AlgorithmCategory {
  id: string;
  title: string;
  shortDescription: string;
  iconName: 'TreeStructure' | 'TrendingUp' | 'Cpu' | 'Brain' | 'Network';
  description: string;
  items: AlgorithmItem[];
  overallBigOTable?: BigOTableRow[];
}

export const algorithmsCategories: AlgorithmCategory[] = [
  {
    id: 'trees-trie',
    title: 'Árboles & Trie',
    shortDescription: 'Estructuras jerárquicas, recorridos Inorder/Preorder/Postorder/BFS y prefijos en Trie.',
    iconName: 'TreeStructure',
    description: 'Los árboles son estructuras de datos no lineales compuestas por nodos conectados jerárquicamente. Permiten búsquedas eficientes O(log n), almacenamiento ordenado y operaciones con prefijos de texto mediante Tries.',
    overallBigOTable: [
      { algorithmOrOperation: 'BST (Búsqueda / Inserción)', bestTime: 'O(log n)', averageTime: 'O(log n)', worstTime: 'O(n)', spaceComplexity: 'O(n)' },
      { algorithmOrOperation: 'Árbol Balanceado (AVL / Red-Black)', bestTime: 'O(log n)', averageTime: 'O(log n)', worstTime: 'O(log n)', spaceComplexity: 'O(n)' },
      { algorithmOrOperation: 'Trie (Inserción / Búsqueda de Prefijo)', bestTime: 'O(L)', averageTime: 'O(L)', worstTime: 'O(L)', spaceComplexity: 'O(N × L)', notes: 'L = longitud de la palabra, N = número de palabras' },
      { algorithmOrOperation: 'Recorrido de Árbol (DFS / BFS)', bestTime: 'O(V)', averageTime: 'O(V)', worstTime: 'O(V)', spaceComplexity: 'O(h) a O(V)', notes: 'h = altura del árbol, V = número de vértices' },
    ],
    items: [
      {
        id: 'bst-avl',
        name: 'Árbol Binario de Búsqueda (BST) & Balanceados (AVL / Red-Black)',
        summary: 'Estructura en árbol donde el hijo izquierdo es menor y el derecho es mayor. Los árboles balanceados aplican rotaciones para mantener O(log n).',
        description: 'Un Árbol Binario de Búsqueda mantiene la propiedad de ordenamiento en cada nodo. Cuando el árbol se desbalancea (degenerando en una lista enlazada), la complejidad cae a O(n). Estructuras autobalanceadas como AVL (balance estricto por factor de altura) y Red-Black (balance basado en coloreado y rotaciones) garantizan O(log n) constante.',
        useCases: [
          'Índices primarios y secundarios en motores de Bases de Datos (B-Trees / Red-Black Trees)',
          'Implementación de conjuntos (Set) y mapas ordenados en librerías estándar (std::map en C++, TreeMap en Java)',
          'Búsquedas de rangos y ordenamiento dinámico de colecciones'
        ],
        code: {
          typescript: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;

  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) { current.left = newNode; break; }
        current = current.left;
      } else {
        if (!current.right) { current.right = newNode; break; }
        current = current.right;
      }
    }
  }

  search(value: T): boolean {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}`,
          python: `class TreeNode:
    def __init__(self, val: int):
        self.val = val
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, val: int) -> None:
        if not self.root:
            self.root = TreeNode(val)
            return
        
        curr = self.root
        while True:
            if val < curr.val:
                if not curr.left:
                    curr.left = TreeNode(val)
                    break
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = TreeNode(val)
                    break
                curr = curr.right

    def search(self, val: int) -> bool:
        curr = self.root
        while curr:
            if curr.val == val:
                return True
            curr = curr.left if val < curr.val else curr.right
        return False`
        }
      },
      {
        id: 'trie',
        name: 'Trie (Árbol Prefijo)',
        summary: 'Árbol especializado en almacenar cadenas donde cada nodo representa un carácter o prefijo común.',
        description: 'Un Trie (Prefix Tree) es una estructura de datos en árbol utilizada para almacenar un conjunto dinámico o arreglo asociativo donde las claves son cadenas. A diferencia del BST, los nodos no almacenan su propia clave entera; su posición en el árbol define la clave asociada.',
        useCases: [
          'Motores de autocompletado y sugerencias de búsqueda en tiempo real',
          'Correctores ortográficos y validadores de diccionarios',
          'Enrutamiento IP por prefijo más largo (Longest Prefix Match) en redes'
        ],
        code: {
          typescript: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
  }

  startsWith(prefix: string): boolean {
    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char)!;
    }
    return true;
  }
}`,
          python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end = True

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True`
        }
      },
      {
        id: 'traversals',
        name: 'Recorridos de Árboles (DFS & BFS)',
        summary: 'Algoritmos fundamentales de exploración: Inorder, Preorder, Postorder y Level-Order (BFS).',
        description: 'La exploración de árboles se clasifica en Búsqueda en Profundidad (DFS - Preorder: Nodo-Izq-Der, Inorder: Izq-Nodo-Der, Postorder: Izq-Der-Nodo) y Búsqueda en Anchura (BFS - Level-Order usando una cola). Inorder en BST produce una secuencia ordenada.',
        useCases: [
          'Inorder: Inspección ordenada de elementos en un BST',
          'Preorder: Copia o serialización de estructuras jerárquicas (ASTs, JSON, XML)',
          'Postorder: Liberación de memoria en C/C++ y evaluación de expresiones algebraicas en sintaxis polaca inversa',
          'BFS: Encontrar la menor profundidad o distancia en grafos/árboles sin pesos'
        ],
        code: {
          typescript: `function inorderDFS<T>(node: TreeNode<T> | null, result: T[] = []): T[] {
  if (node) {
    inorderDFS(node.left, result);
    result.push(node.value);
    inorderDFS(node.right, result);
  }
  return result;
}

function levelOrderBFS<T>(root: TreeNode<T> | null): T[] {
  if (!root) return [];
  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
          python: `def inorder_dfs(node, result=None):
    if result is None:
        result = []
    if node:
        inorder_dfs(node.left, result)
        result.append(node.val)
        inorder_dfs(node.right, result)
    return result

from collections import deque

def level_order_bfs(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result`
        }
      }
    ]
  },
  {
    id: 'big-o',
    title: 'Complejidad Big-O',
    shortDescription: 'Crecimiento asintótico, límites superiores O, límites inferiores Ω y análisis amortizado.',
    iconName: 'TrendingUp',
    description: 'La notación Big-O es la herramienta formal de las Ciencias de la Computación para medir la escalabilidad de un algoritmo en término de tiempo de ejecución y uso de memoria conforme el tamaño del conjunto de datos de entrada (n) tiende al infinito.',
    overallBigOTable: [
      { algorithmOrOperation: 'O(1) - Constante', bestTime: 'O(1)', averageTime: 'O(1)', worstTime: 'O(1)', spaceComplexity: 'O(1)', notes: 'Acceso por índice en Array, Pop de Stack' },
      { algorithmOrOperation: 'O(log n) - Logarítmico', bestTime: 'O(1)', averageTime: 'O(log n)', worstTime: 'O(log n)', spaceComplexity: 'O(1)', notes: 'Búsqueda Binaria, Búsqueda en BST balanceado' },
      { algorithmOrOperation: 'O(n) - Lineal', bestTime: 'O(1)', averageTime: 'O(n)', worstTime: 'O(n)', spaceComplexity: 'O(1)', notes: 'Búsqueda Lineal, Recorrido completo de Lista' },
      { algorithmOrOperation: 'O(n log n) - Linealítmico', bestTime: 'O(n log n)', averageTime: 'O(n log n)', worstTime: 'O(n log n)', spaceComplexity: 'O(n)', notes: 'MergeSort, HeapSort, TimSort' },
      { algorithmOrOperation: 'O(n²) - Cuadrático', bestTime: 'O(n)', averageTime: 'O(n²)', worstTime: 'O(n²)', spaceComplexity: 'O(1)', notes: 'BubbleSort, SelectionSort, Bucles anidados' },
      { algorithmOrOperation: 'O(2ⁿ) - Exponencial', bestTime: 'O(1)', averageTime: 'O(2ⁿ)', worstTime: 'O(2ⁿ)', spaceComplexity: 'O(n)', notes: 'Fibonacci recursivo ilimitado, Subconjuntos' },
      { algorithmOrOperation: 'O(n!) - Factorial', bestTime: 'O(1)', averageTime: 'O(n!)', worstTime: 'O(n!)', spaceComplexity: 'O(n)', notes: 'Problema del Viajante (Fuerza bruta), Permutaciones' }
    ],
    items: [
      {
        id: 'big-o-notation',
        name: 'Clasificación de Funciones de Crecimiento Asintótico',
        summary: 'Notación Big-O (O), Omega (Ω) y Theta (Θ) para evaluar comportamiento temporal y espacial.',
        description: 'La notación Big-O describe el límite superior asintótico del tiempo de ejecución o espacio consumido. Es crucial comparar el orden de crecimiento: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).',
        useCases: [
          'Evaluación de requerimientos no funcionales y SLAs de performance',
          'Detección de cuellos de botella en algoritmos batch y procesamientos masivos',
          'Elección de estructuras de datos adecuadas según patrones de lectura vs escritura'
        ],
        code: {
          typescript: `// O(1) Constante - Acceso a arreglo
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

// O(log n) Logarítmico - Búsqueda Binaria
function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n²) Cuadrático - Comparación todos contra todos
function hasDuplicates(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}`,
          python: `# O(1) Constante
def get_first_item(arr):
    return arr[0] if arr else None

# O(log n) Logarítmico - Búsqueda Binaria
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# O(n²) Cuadrático
def has_duplicates(arr):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                return True
    return False`
        }
      },
      {
        id: 'master-theorem',
        name: 'Teorema Maestro & Recurrencias',
        summary: 'Herramienta para calcular la complejidad de algoritmos de tipo Divide y Vencerás T(n) = aT(n/b) + f(n).',
        description: 'El Teorema Maestro proporciona una solución directa en notación Big-O para ecuaciones de recurrencia que surgen en algoritmos recursivos divide-y-vencerás. Dependiendo de la comparación entre n^(log_b a) y f(n), se aplica uno de los 3 casos fundamentales.',
        useCases: [
          'Análisis riguroso de MergeSort: T(n) = 2T(n/2) + O(n) => O(n log n)',
          'Análisis de la Multiplicación de Karatsuba: T(n) = 3T(n/2) + O(n) => O(n^1.58)',
          'Algoritmo de Strassen para multiplicación de matrices'
        ],
        code: {
          typescript: `// Ejemplo de Recurrencia MergeSort T(n) = 2T(n/2) + O(n)
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));  // T(n/2)
  const right = mergeSort(arr.slice(mid));    // T(n/2)

  return merge(left, right);                  // O(n)
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
          python: `# Recurrencia MergeSort: T(n) = 2T(n/2) + O(n) => O(n log n)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # T(n/2)
    right = merge_sort(arr[mid:])  # T(n/2)
    
    return merge(left, right)      # O(n)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`
        }
      },
      {
        id: 'amortized-analysis',
        name: 'Análisis Amortizado',
        summary: 'Cálculo del costo promedio por operación sobre una secuencia de operaciones en el peor caso.',
        description: 'A diferencia del costo en el peor caso de una sola operación, el análisis amortizado garantiza el costo promedio de cada operación dentro de una secuencia completa. Técnicas principales: Método Agregado, Método Contable (Banker) y Método del Potencial (Physicist).',
        useCases: [
          'Redimensionamiento dinámico de arreglos (ArrayList / std::vector) al duplicar capacidad',
          'Rehashing en Tablas Hash cuando el factor de carga supera el umbral',
          'Operaciones en Conjuntos Disjuntos (Union-Find con compresión de caminos)'
        ],
        code: {
          typescript: `class DynamicArray<T> {
  private data: (T | undefined)[];
  private size: number = 0;
  private capacity: number;

  constructor(initialCapacity = 2) {
    this.capacity = initialCapacity;
    this.data = new Array(this.capacity);
  }

  // Costo amortizado O(1). En la mayoría de appends es O(1),
  // y solo en 1 de cada N appends se hace resize O(N).
  push(item: T): void {
    if (this.size === this.capacity) {
      this.resize(this.capacity * 2); // Duplicado de capacidad
    }
    this.data[this.size++] = item;
  }

  private resize(newCapacity: number): void {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
  }
}`,
          python: `class DynamicArray:
    def __init__(self, initial_capacity=2):
        self.capacity = initial_capacity
        self.size = 0
        self.data = [None] * self.capacity

    def push(self, item):
        # Costo amortizado O(1)
        if self.size == self.capacity:
            self._resize(self.capacity * 2)
        self.data[self.size] = item
        self.size += 1

    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self.size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity`
        }
      }
    ]
  },
  {
    id: 'classic-algorithms',
    title: 'Algoritmos Clásicos',
    shortDescription: 'Ordenamiento, Búsqueda Binaria, Two Pointers, Ventana Deslizante, Grafos (Dijkstra, A*, BFS/DFS).',
    iconName: 'Cpu',
    description: 'Los algoritmos clásicos constituyen los cimientos de las Ciencias de la Computación. Abarcan técnicas de Ordenamiento eficiente, Algoritmos Voraces (Greedy), Programación Dinámica y Algoritmos sobre Grafos para encontrar rutas óptimas.',
    overallBigOTable: [
      { algorithmOrOperation: 'QuickSort', bestTime: 'O(n log n)', averageTime: 'O(n log n)', worstTime: 'O(n²)', spaceComplexity: 'O(log n)', notes: 'In-place, no estable' },
      { algorithmOrOperation: 'MergeSort', bestTime: 'O(n log n)', averageTime: 'O(n log n)', worstTime: 'O(n log n)', spaceComplexity: 'O(n)', notes: 'Estable, excelente para listas enlazadas' },
      { algorithmOrOperation: 'Dijkstra (Heap Min-Binary)', bestTime: 'O((V + E) log V)', averageTime: 'O((V + E) log V)', worstTime: 'O((V + E) log V)', spaceComplexity: 'O(V)', notes: 'Solo pesos no negativos' },
      { algorithmOrOperation: 'A* Search', bestTime: 'O(E)', averageTime: 'O(b^d)', worstTime: 'O(V)', spaceComplexity: 'O(V)', notes: 'Usa función heurística h(n)' },
      { algorithmOrOperation: 'Sliding Window / Two Pointers', bestTime: 'O(n)', averageTime: 'O(n)', worstTime: 'O(n)', spaceComplexity: 'O(1)', notes: 'Reducción de bucles anidados' }
    ],
    items: [
      {
        id: 'sorting-quick-merge',
        name: 'Ordenamiento Eficiente (QuickSort & MergeSort)',
        summary: 'Algoritmos divide-y-vencerás O(n log n) fundamentales para el ordenamiento de grandes volúmenes de datos.',
        description: 'QuickSort elige un pivote y particiona los datos en subarreglos menores y mayores. MergeSort divide recursivamente el arreglo por la mitad y combina los arreglos ordenados. TimSort (utilizado en Python y Java) combina InsertionSort y MergeSort para aprovechar secuencias parcialmente ordenadas.',
        useCases: [
          'Ordenamiento de motores de base de datos y sistemas de archivos',
          'Implementación de métodos `Array.prototype.sort()` y `list.sort()`',
          'Preprocesamiento de datos para búsquedas binarias rápidas'
        ],
        code: {
          typescript: `// QuickSort de implementación in-place
function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
          python: `# QuickSort in-place
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
        }
      },
      {
        id: 'two-pointers-sliding-window',
        name: 'Patrones Two Pointers & Sliding Window',
        summary: 'Técnicas de optimización que reducen la complejidad temporal de O(n²) a O(n) en arreglos y cadenas.',
        description: 'El patrón de Dos Punteros (Two Pointers) utiliza dos índices que avanzan convergentemente o en la misma dirección. La Ventana Deslizante (Sliding Window) mantiene un subarreglo de tamaño fijo o variable que se desplaza a lo largo del arreglo para resolver problemas de subsegmentos máximos, mínimos o con condiciones.',
        useCases: [
          'Búsqueda de pares que sumen un valor determinado en arreglos ordenados (2Sum)',
          'Subcadena más larga sin caracteres repetidos',
          'Procesamiento de streams de telemetría y métricas en tiempo real'
        ],
        code: {
          typescript: `// Sliding Window: Suma máxima de subarreglo de tamaño K
function maxSubarraySum(arr: number[], k: number): number {
  if (arr.length < k) return 0;

  let maxSum = 0;
  let currentWindowSum = 0;

  // Primera ventana
  for (let i = 0; i < k; i++) {
    currentWindowSum += arr[i];
  }
  maxSum = currentWindowSum;

  // Deslizar la ventana
  for (let i = k; i < arr.length; i++) {
    currentWindowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, currentWindowSum);
  }

  return maxSum;
}`,
          python: `# Sliding Window: Suma máxima de subarreglo de tamaño K
def max_subarray_sum(arr, k):
    if len(arr) < k:
        return 0
    
    current_window_sum = sum(arr[:k])
    max_sum = current_window_sum
    
    for i in range(k, len(arr)):
        current_window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, current_window_sum)
        
    return max_sum`
        }
      },
      {
        id: 'graph-dijkstra-astar',
        name: 'Algoritmos de Grafos (Dijkstra, A* & DSU)',
        summary: 'Búsqueda de caminos mínimos en grafos con pesos y gestión de componentes conexas.',
        description: 'El algoritmo de Dijkstra calcula la distancia mínima desde un nodo origen a todos los demás nodos en un grafo ponderado no negativo usando una cola de prioridad. A* mejora Dijkstra incorporando una función heurística h(n) para dirigir la búsqueda. Disjoint Set Union (DSU) gestiona particiones de conjuntos disjuntos para Kruskal (Arbol recubridor mínimo).',
        useCases: [
          'Sistemas de navegación GPS y cálculo de rutas de tráfico (Google Maps, OpenStreetMap)',
          'Enrutamiento de paquetes IP en redes mediante protocolos OSPF / BGP',
          'IA de videojuegos para pathfinding de personajes (A*)'
        ],
        code: {
          typescript: `interface Edge {
  node: number;
  weight: number;
}

function dijkstra(graph: Edge[][], start: number): number[] {
  const numNodes = graph.length;
  const distances: number[] = new Array(numNodes).fill(Infinity);
  distances[start] = 0;

  const visited: boolean[] = new Array(numNodes).fill(false);

  for (let i = 0; i < numNodes; i++) {
    let u = -1;
    for (let j = 0; j < numNodes; j++) {
      if (!visited[j] && (u === -1 || distances[j] < distances[u])) {
        u = j;
      }
    }

    if (distances[u] === Infinity) break;
    visited[u] = true;

    for (const edge of graph[u]) {
      if (distances[u] + edge.weight < distances[edge.node]) {
        distances[edge.node] = distances[u] + edge.weight;
      }
    }
  }

  return distances;
}`,
          python: `import heapq

def dijkstra(graph, start):
    # graph: dict of node -> list of (neighbor, weight)
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_dist > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances`
        }
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'IA / Machine Learning',
    shortDescription: 'k-NN, K-Means, Gradient Descent, Perceptrón, Backpropagation y Mecanismo de Atención (Transformers).',
    iconName: 'Brain',
    description: 'Los algoritmos de Inteligencia Artificial y Aprendizaje Automático abarcan métodos estadísticos clásicos, clustering no supervisado, redes neuronales profundas y arquitecturas de Transformers basadas en mecanismos de autoatención.',
    overallBigOTable: [
      { algorithmOrOperation: 'k-NN (Inferencia)', bestTime: 'O(N × d)', averageTime: 'O(N × d)', worstTime: 'O(N × d)', spaceComplexity: 'O(N × d)', notes: 'N = muestras, d = dimensiones (Lazy Learning)' },
      { algorithmOrOperation: 'K-Means (por iteración)', bestTime: 'O(K × N × d)', averageTime: 'O(K × N × d)', worstTime: 'O(K × N × d)', spaceComplexity: 'O((N + K) × d)', notes: 'K = clusters, I = iteraciones' },
      { algorithmOrOperation: 'Gradient Descent (Paso SGD)', bestTime: 'O(d)', averageTime: 'O(d)', worstTime: 'O(d)', spaceComplexity: 'O(d)', notes: 'd = número de parámetros / pesos' },
      { algorithmOrOperation: 'Self-Attention (Transformer)', bestTime: 'O(N² × d)', averageTime: 'O(N² × d)', worstTime: 'O(N² × d)', spaceComplexity: 'O(N² + N × d)', notes: 'N = longitud de secuencia de tokens' }
    ],
    items: [
      {
        id: 'kmeans-knn',
        name: 'Algoritmos Clasificación y Clustering (k-NN & K-Means)',
        summary: 'k-Nearest Neighbors para clasificación supervisada y K-Means para agrupamiento no supervisado.',
        description: 'k-NN es un algoritmo no paramétrico que clasifica un punto según la mayoría de votos de sus k vecinos más cercanos en el espacio de características. K-Means agrupa N observaciones en K clusters minimizando la suma de distancias cuadráticas al centroide de cada cluster.',
        useCases: [
          'Sistemas de recomendación basados en similitud de usuarios o items',
          'Segmentación de clientes en e-commerce y análisis de comportamientos',
          'Compresión de imágenes mediante cuantización de color'
        ],
        code: {
          typescript: `// K-Means basico en 2D
interface Point { x: number; y: number; }

function euclideanDistance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function kMeans(data: Point[], k: number, maxIterations = 10): Point[] {
  // Inicialización de centroides aleatorios
  let centroids: Point[] = data.slice(0, k);

  for (let iter = 0; iter < maxIterations; iter++) {
    const clusters: Point[][] = Array.from({ length: k }, () => []);

    // Asignación de puntos al centroide más cercano
    for (const p of data) {
      let minDistance = Infinity;
      let closestCentroid = 0;
      centroids.forEach((c, idx) => {
        const dist = euclideanDistance(p, c);
        if (dist < minDistance) {
          minDistance = dist;
          closestCentroid = idx;
        }
      });
      clusters[closestCentroid].push(p);
    }

    // Recálculo de centroides
    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return { x: 0, y: 0 };
      const sum = cluster.reduce((acc, curr) => ({ x: acc.x + curr.x, y: acc.y + curr.y }), { x: 0, y: 0 });
      return { x: sum.x / cluster.length, y: sum.y / cluster.length };
    });
  }

  return centroids;
}`,
          python: `import math

def euclidean_distance(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

def k_means(data, k, max_iters=10):
    centroids = data[:k]
    
    for _ in range(max_iters):
        clusters = [[] for _ in range(k)]
        
        for point in data:
            distances = [euclidean_distance(point, c) for c in centroids]
            closest_idx = distances.index(min(distances))
            clusters[closest_idx].append(point)
            
        centroids = []
        for cluster in clusters:
            if not cluster:
                continue
            dim = len(cluster[0])
            centroid = [sum(p[d] for p in cluster) / len(cluster) for d in range(dim)]
            centroids.append(centroid)
            
    return centroids`
        }
      },
      {
        id: 'gradient-descent-backprop',
        name: 'Optimización y Redes Neuronales (Gradient Descent & Backprop)',
        summary: 'Algoritmo de optimización por descenso del gradiente y retropropagación del error en redes neuronales.',
        description: 'Gradient Descent ajusta los parámetros (pesos) de un modelo iterativamente en la dirección opuesta al gradiente de la función de pérdida. Backpropagation calcula de forma eficiente los gradientes de la función de pérdida respecto a cada peso utilizando la regla de la cadena del cálculo multivariable.',
        useCases: [
          'Entrenamiento de modelos de aprendizaje profundo (Convolutional Neural Networks, ResNets)',
          'Ajuste de hiperparámetros en Regresión Logística y Redes Densas',
          'Optimización en tiempo real en sistemas de control y finanzas'
        ],
        code: {
          typescript: `// Gradient Descent para Regresión Lineal y = w*x + b
function gradientDescent(
  x: number[],
  y: number[],
  learningRate = 0.01,
  epochs = 1000
): { w: number; b: number } {
  let w = 0;
  let b = 0;
  const n = x.length;

  for (let epoch = 0; epoch < epochs; epoch++) {
    let dw = 0;
    let db = 0;

    for (let i = 0; i < n; i++) {
      const yPred = w * x[i] + b;
      const error = yPred - y[i];
      dw += (2 / n) * error * x[i];
      db += (2 / n) * error;
    }

    w -= learningRate * dw;
    b -= learningRate * db;
  }

  return { w, b };
}`,
          python: `def gradient_descent(x, y, lr=0.01, epochs=1000):
    w, b = 0.0, 0.0
    n = len(x)
    
    for _ in range(epochs):
        dw, db = 0.0, 0.0
        for i in range(n):
            y_pred = w * x[i] + b
            error = y_pred - y[i]
            dw += (2 / n) * error * x[i]
            db += (2 / n) * error
            
        w -= lr * dw
        b -= lr * db
        
    return w, b`
        }
      },
      {
        id: 'self-attention-transformers',
        name: 'Mecanismo de Autoatención (Self-Attention & Transformers)',
        summary: 'Cálculo de dependencias globales entre tokens mediante matrices Query, Key y Value.',
        description: 'El mecanismo Scaled Dot-Product Attention calcula la relevancia de cada token con respecto a todos los demás en una secuencia: Attention(Q, K, V) = softmax( (Q × Kᵀ) / √d_k ) × V. Permite a los modelos LLM (como GPT-4, BERT, Claude) procesar contextos extensos en paralelo.',
        useCases: [
          'Modelos de Lenguaje de Gran Escala (LLMs) y traducción automática',
          'Procesamiento de imágenes y video (Vision Transformers - ViT)',
          'Genómica y predicción de plegamiento de proteínas (AlphaFold)'
        ],
        code: {
          typescript: `// Scaled Dot-Product Self-Attention simplificado
function scaledDotProductAttention(
  Q: number[][], // Matrix Queries [seqLen x d_k]
  K: number[][], // Matrix Keys [seqLen x d_k]
  V: number[][]  // Matrix Values [seqLen x d_v]
): number[][] {
  const seqLen = Q.length;
  const d_k = Q[0].length;
  const scale = Math.sqrt(d_k);

  // 1. Q * K^T
  const scores: number[][] = Array.from({ length: seqLen }, () => new Array(seqLen).fill(0));
  for (let i = 0; i < seqLen; i++) {
    for (let j = 0; j < seqLen; j++) {
      let dot = 0;
      for (let k = 0; k < d_k; k++) dot += Q[i][k] * K[j][k];
      scores[i][j] = dot / scale;
    }
  }

  // 2. Softmax por fila
  const weights = scores.map(row => {
    const maxVal = Math.max(...row);
    const exps = row.map(v => Math.exp(v - maxVal));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return exps.map(v => v / sumExps);
  });

  // 3. Weights * V
  const d_v = V[0].length;
  const output: number[][] = Array.from({ length: seqLen }, () => new Array(d_v).fill(0));
  for (let i = 0; i < seqLen; i++) {
    for (let j = 0; j < d_v; j++) {
      for (let k = 0; k < seqLen; k++) {
        output[i][j] += weights[i][k] * V[k][j];
      }
    }
  }

  return output;
}`,
          python: `import math

def softmax(vector):
    max_v = max(vector)
    exps = [math.exp(v - max_v) for v in vector]
    sum_exps = sum(exps)
    return [e / sum_exps for e in exps]

def self_attention(Q, K, V):
    seq_len = len(Q)
    d_k = len(Q[0])
    scale = math.sqrt(d_k)
    
    # 1. Scores = Q * K^T / sqrt(d_k)
    scores = []
    for i in range(seq_len):
        row = []
        for j in range(seq_len):
            dot = sum(Q[i][k] * K[j][k] for k in range(d_k))
            row.append(dot / scale)
        scores.append(row)
        
    # 2. Softmax
    weights = [softmax(row) for row in scores]
    
    # 3. Output = Weights * V
    d_v = len(V[0])
    output = [[0.0] * d_v for _ in range(seq_len)]
    for i in range(seq_len):
        for j in range(d_v):
            output[i][j] = sum(weights[i][k] * V[k][j] for k in range(seq_len))
            
    return output`
        }
      }
    ]
  },
  {
    id: 'distributed-crypto',
    title: 'Sistemas Distribuidos & Criptografía',
    shortDescription: 'Consenso (Raft, Paxos), Consistent Hashing, Bloom Filters y Criptografía de Clave Pública / Merkle Trees.',
    iconName: 'Network',
    description: 'Los sistemas distribuidos requieren mecanismos para lograr consenso entre nodos fallidos o no confiables. La criptografía y las estructuras de datos hashing proporcionan privacidad, autenticidad, integridad y tolerancia a fallos.',
    overallBigOTable: [
      { algorithmOrOperation: 'Consenso Raft (Elección de Líder)', bestTime: 'O(N)', averageTime: 'O(N)', worstTime: 'O(N log N)', spaceComplexity: 'O(N)', notes: 'N = número de nodos en el cluster' },
      { algorithmOrOperation: 'Consistent Hashing (Lookup de Clave)', bestTime: 'O(log K)', averageTime: 'O(log K)', worstTime: 'O(log K)', spaceComplexity: 'O(K × V)', notes: 'K = número de nodos en el anillo, V = nodos virtuales' },
      { algorithmOrOperation: 'Bloom Filter (Inserción / Test)', bestTime: 'O(k)', averageTime: 'O(k)', worstTime: 'O(k)', spaceComplexity: 'O(m)', notes: 'k = número de funciones hash, m = bits' },
      { algorithmOrOperation: 'Árbol de Merkle (Verificación de Prueba)', bestTime: 'O(log N)', averageTime: 'O(log N)', worstTime: 'O(log N)', spaceComplexity: 'O(log N)', notes: 'N = número de bloques de datos en la hoja' }
    ],
    items: [
      {
        id: 'raft-paxos',
        name: 'Algoritmos de Consenso Distribuidos (Raft & Paxos)',
        summary: 'Protocolos para garantizar consistencia fuerte en sistemas distribuidos tolerantes a fallos (Crash Fault Tolerance).',
        description: 'Raft descompone el consenso distribuido en tres subproblemas independientes: Elección de Líder, Replicación de Logs y Seguridad. Paxos es el estándar formal equivalente. Garantizan que una mayoría de nodos (quórum N/2 + 1) acuerden un único estado global.',
        useCases: [
          'Almacenes clave-valor distribuidos y coordinadores de cluster (etcd, Consul, ZooKeeper)',
          'Motores de base de datos relacionales distribuidas (CockroachDB, TiDB)',
          'Sistemas de mensajería y almacenamiento de eventos (Apache Kafka controller)'
        ],
        code: {
          typescript: `// Simulación básica de Elección de Líder en Raft
enum NodeState { Follower, Candidate, Leader }

class RaftNode {
  id: string;
  state: NodeState = NodeState.Follower;
  currentTerm: number = 0;
  votedFor: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  startElection(clusterNodes: RaftNode[]): void {
    this.state = NodeState.Candidate;
    this.currentTerm++;
    this.votedFor = this.id;
    let votesReceived = 1; // Voto propio

    for (const node of clusterNodes) {
      if (node.id !== this.id && node.requestVote(this.currentTerm, this.id)) {
        votesReceived++;
      }
    }

    const quorum = Math.floor(clusterNodes.length / 2) + 1;
    if (votesReceived >= quorum) {
      this.state = NodeState.Leader;
    }
  }

  requestVote(term: number, candidateId: string): boolean {
    if (term > this.currentTerm && (this.votedFor === null || this.votedFor === candidateId)) {
      this.currentTerm = term;
      this.votedFor = candidateId;
      return true;
    }
    return false;
  }
}`,
          python: `class NodeState:
    FOLLOWER = "Follower"
    CANDIDATE = "Candidate"
    LEADER = "Leader"

class RaftNode:
    def __init__(self, node_id):
        self.id = node_id
        self.state = NodeState.FOLLOWER
        self.current_term = 0
        self.voted_for = None

    def start_election(self, cluster_nodes):
        self.state = NodeState.CANDIDATE
        self.current_term += 1
        self.voted_for = self.id
        votes = 1
        
        for node in cluster_nodes:
            if node.id != self.id and node.request_vote(self.current_term, self.id):
                votes += 1
                
        quorum = (len(cluster_nodes) // 2) + 1
        if votes >= quorum:
            self.state = NodeState.LEADER

    def request_vote(self, term, candidate_id):
        if term > self.current_term and (self.voted_for is None or self.voted_for == candidate_id):
            self.current_term = term
            self.voted_for = candidate_id
            return True
        return False`
        }
      },
      {
        id: 'consistent-hashing-bloom',
        name: 'Hashing Distribuido & Filtros de Bloom',
        summary: 'Consistent Hashing para distribución uniforme de carga y Bloom Filters para consultas de pertenencia en memoria.',
        description: 'Consistent Hashing asigna claves y servidores a un anillo hash circular de 0 a 2³²-1, minimizando la redistribución de claves cuando se agregan o remueven nodos. Un Filtro de Bloom es una estructura probabilística extremadamente eficiente en espacio que indica con certeza si un elemento NO está en un conjunto, o si PROBABLEMENTE está (con un porcentaje de falsos positivos ajustable).',
        useCases: [
          'Balanceo de carga y sharding dinámico en CDN / Caching (Memcached, Redis Cluster, Amazon DynamoDB)',
          'Evitar lecturas de disco innecesarias en bases de datos NoSQL (Apache Cassandra, RocksDB)',
          'Detección de URLs maliciosas en navegadores (Google Chrome Safe Browsing)'
        ],
        code: {
          typescript: `// Bloom Filter probabilístico en TypeScript
class BloomFilter {
  private size: number;
  private bitArray: boolean[];
  private hashCount: number;

  constructor(size = 1024, hashCount = 3) {
    this.size = size;
    this.bitArray = new Array(size).fill(false);
    this.hashCount = hashCount;
  }

  private getHashes(item: string): number[] {
    const hashes: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      let hash = 0;
      for (let j = 0; j < item.length; j++) {
        hash = (hash * 31 + item.charCodeAt(j) + i * 17) % this.size;
      }
      hashes.push(Math.abs(hash));
    }
    return hashes;
  }

  add(item: string): void {
    for (const h of this.getHashes(item)) {
      this.bitArray[h] = true;
    }
  }

  mightContain(item: string): boolean {
    for (const h of this.getHashes(item)) {
      if (!this.bitArray[h]) return false; // Seguro NO está
    }
    return true; // Probablemente está
  }
}`,
          python: `class BloomFilter:
    def __init__(self, size=1024, hash_count=3):
        self.size = size
        self.bit_array = [False] * size
        self.hash_count = hash_count

    def _get_hashes(self, item):
        hashes = []
        for i in range(self.hash_count):
            h = 0
            for char in item:
                h = (h * 31 + ord(char) + i * 17) % self.size
            hashes.append(abs(h))
        return hashes

    def add(self, item):
        for h in self._get_hashes(item):
            self.bit_array[h] = True

    def might_contain(self, item):
        for h in self._get_hashes(item):
            if not self.bit_array[h]:
                return False
        return True`
        }
      },
      {
        id: 'merkle-trees-crypto',
        name: 'Criptografía & Árboles de Merkle',
        summary: 'Árboles de Hash (Merkle Trees) para validación eficiente e inmutable de datos en sistemas descentralizados.',
        description: 'Un Árbol de Merkle es una estructura en la que cada nodo hoja contiene el hash de un bloque de datos, y cada nodo padre contiene el hash de la concatenación de los hashes de sus hijos. Permite la verificación segura y rápida de contenidos mediante pruebas de Merkle en O(log N).',
        useCases: [
          'Verificación de bloques e transacciones en Blockchain (Bitcoin, Ethereum)',
          'Sincronización y detección de diferencias en repositorios Git y bases de datos P2P (IPFS, BitTorrent)',
          'Auditoría de logs inmutables (Certificate Transparency)'
        ],
        code: {
          typescript: `// Estructura simplificada de Árbol de Merkle
function simpleHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

class MerkleTree {
  leaves: string[];
  root: string;

  constructor(dataBlocks: string[]) {
    this.leaves = dataBlocks.map(simpleHash);
    this.root = this.buildRoot(this.leaves);
  }

  private buildRoot(nodes: string[]): string {
    if (nodes.length === 0) return '';
    if (nodes.length === 1) return nodes[0];

    const nextLevel: string[] = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = i + 1 < nodes.length ? nodes[i + 1] : left;
      nextLevel.push(simpleHash(left + right));
    }

    return this.buildRoot(nextLevel);
  }
}`,
          python: `import hashlib

def hash_str(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()[:16]

class MerkleTree:
    def __init__(self, data_blocks):
        self.leaves = [hash_str(block) for block in data_blocks]
        self.root = self._build_root(self.leaves)

    def _build_root(self, nodes):
        if not nodes:
            return ""
        if len(nodes) == 1:
            return nodes[0]
            
        next_level = []
        for i in range(0, len(nodes), 2):
            left = nodes[i]
            right = nodes[i + 1] if i + 1 < len(nodes) else left
            next_level.push(hash_str(left + right)) if hasattr(next_level, 'push') else next_level.append(hash_str(left + right))
            
        return self._build_root(next_level)`
        }
      }
    ]
  }
];
