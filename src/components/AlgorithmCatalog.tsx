import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  TrendingUp,
  Cpu,
  Brain,
  Network,
  Search,
  Code,
  Table as TableIcon,
  Copy,
  Check,
  Info,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Prism from '../utils/prismLoader';
import {
  algorithmsCategories,
  AlgorithmCategory,
  AlgorithmItem,
  BigOTableRow,
} from '../data/algorithmsData';

type CodeLang = 'typescript' | 'python';
type TraversalMode = 'inorder' | 'preorder' | 'postorder' | 'bfs';

interface TreeNodeData {
  id: number;
  label: string;
  cx: number;
  cy: number;
  inorderOrder: number;
  preorderOrder: number;
  postorderOrder: number;
  bfsOrder: number;
}

const TREE_NODES: TreeNodeData[] = [
  { id: 50, label: '50', cx: 200, cy: 35, preorderOrder: 1, inorderOrder: 4, postorderOrder: 7, bfsOrder: 1 },
  { id: 30, label: '30', cx: 110, cy: 95, preorderOrder: 2, inorderOrder: 2, postorderOrder: 3, bfsOrder: 2 },
  { id: 70, label: '70', cx: 290, cy: 95, preorderOrder: 5, inorderOrder: 6, postorderOrder: 6, bfsOrder: 3 },
  { id: 20, label: '20', cx: 60, cy: 160, preorderOrder: 3, inorderOrder: 1, postorderOrder: 1, bfsOrder: 4 },
  { id: 40, label: '40', cx: 160, cy: 160, preorderOrder: 4, inorderOrder: 3, postorderOrder: 2, bfsOrder: 5 },
  { id: 60, label: '60', cx: 240, cy: 160, preorderOrder: 6, inorderOrder: 5, postorderOrder: 4, bfsOrder: 6 },
  { id: 80, label: '80', cx: 340, cy: 160, preorderOrder: 7, inorderOrder: 7, postorderOrder: 5, bfsOrder: 7 },
];

const TREE_EDGES = [
  { x1: 200, y1: 35, x2: 110, y2: 95 },
  { x1: 200, y1: 35, x2: 290, y2: 95 },
  { x1: 110, y1: 95, x2: 60, y2: 160 },
  { x1: 110, y1: 95, x2: 160, y2: 160 },
  { x1: 290, y1: 95, x2: 240, y2: 160 },
  { x1: 290, y1: 95, x2: 340, y2: 160 },
];

const BIG_O_CURVES = [
  { id: 'O(1)', label: 'O(1) - Constante', color: '#10b981', strokeDash: '0', path: 'M 40,230 Q 200,230 360,230', desc: 'Excelente. Tiempo independiente del tamaño N.' },
  { id: 'O(log n)', label: 'O(log n) - Logarítmico', color: '#06b6d4', strokeDash: '0', path: 'M 40,230 Q 150,210 360,185', desc: 'Muy bueno. Búsqueda Binaria, árboles balanceados.' },
  { id: 'O(n)', label: 'O(n) - Lineal', color: '#3b82f6', strokeDash: '0', path: 'M 40,230 L 360,120', desc: 'Aceptable. Búsqueda lineal, recorrido completo.' },
  { id: 'O(n log n)', label: 'O(n log n) - Linealítmico', color: '#8b5cf6', strokeDash: '0', path: 'M 40,230 Q 200,180 360,65', desc: 'Buen rendimiento en ordenamiento (MergeSort, QuickSort).' },
  { id: 'O(n²)', label: 'O(n²) - Cuadrático', color: '#f59e0b', strokeDash: '0', path: 'M 40,230 Q 220,210 330,30', desc: 'Ineficiente para N grande. Bucles anidados, BubbleSort.' },
  { id: 'O(2ⁿ)', label: 'O(2ⁿ) - Exponencial', color: '#ef4444', strokeDash: '0', path: 'M 40,230 Q 180,225 240,30', desc: 'Peligroso. Crece exponencialmente. Fuerza bruta.' },
];

export const AlgorithmCatalog: React.FC = () => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('trees-trie');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCodeLang, setActiveCodeLang] = useState<CodeLang>('typescript');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [traversalMode, setTraversalMode] = useState<TraversalMode>('inorder');
  const [selectedCurveId, setSelectedCurveId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'bst-avl': true,
    'big-o-notation': true,
    'sorting-quick-merge': true,
    'kmeans-knn': true,
    'raft-paxos': true,
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedCategoryKey, activeCodeLang, expandedItems, searchQuery]);

  const activeCategory: AlgorithmCategory =
    algorithmsCategories.find((cat) => cat.id === selectedCategoryKey) || algorithmsCategories[0];

  const getCategoryIcon = (iconName: AlgorithmCategory['iconName']) => {
    switch (iconName) {
      case 'TreeStructure':
        return <FolderTree size={18} />;
      case 'TrendingUp':
        return <TrendingUp size={18} />;
      case 'Cpu':
        return <Cpu size={18} />;
      case 'Brain':
        return <Brain size={18} />;
      case 'Network':
        return <Network size={18} />;
    }
  };

  const handleCopyCode = (itemId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedItemId(itemId);
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const getNodeOrder = (node: TreeNodeData, mode: TraversalMode): number => {
    switch (mode) {
      case 'inorder':
        return node.inorderOrder;
      case 'preorder':
        return node.preorderOrder;
      case 'postorder':
        return node.postorderOrder;
      case 'bfs':
        return node.bfsOrder;
    }
  };

  const getTraversalSequence = (mode: TraversalMode): string => {
    const sorted = [...TREE_NODES].sort((a, b) => getNodeOrder(a, mode) - getNodeOrder(b, mode));
    return sorted.map((n) => n.label).join(' → ');
  };

  const getComplexityBadgeClass = (complexityStr: string) => {
    if (complexityStr.includes('O(1)') || complexityStr.includes('O(log n)')) {
      return 'badge-success';
    }
    if (complexityStr.includes('O(n log n)') || complexityStr.includes('O(n)')) {
      return 'badge-info';
    }
    if (complexityStr.includes('O(n²)')) {
      return 'badge-warning';
    }
    if (complexityStr.includes('O(2ⁿ)') || complexityStr.includes('O(n!)')) {
      return 'badge-danger';
    }
    return 'badge-neutral';
  };

  // Filtrado global de algoritmos si se ingresa texto de búsqueda
  const filteredCategories = searchQuery.trim()
    ? algorithmsCategories.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.useCases.some((uc) => uc.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      })).filter((cat) => cat.items.length > 0)
    : [activeCategory];

  return (
    <div className="algorithm-catalog" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* HEADER PRINCIPAL Y BARRA DE NAVEGACIÓN DE PESTAÑAS */}
      <div
        className="bento-card"
        style={{
          background: 'var(--bg-card, #1e1e2e)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border-color, #333)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Sparkles className="text-indigo-400" size={24} />
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Catálogo de Algoritmos & Estructuras de Datos</h1>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted, #aaa)' }}>
              Explora las 5 temáticas fundamentales de las Ciencias de la Computación con ejemplos prácticos en TypeScript y Python.
            </p>
          </div>

          {/* BUSCADOR DENTRO DEL CATÁLOGO */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            <input
              type="text"
              placeholder="Filtrar algoritmos (Dijkstra, Trie, Raft...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #444)',
                backgroundColor: 'var(--bg-app, #121218)',
                color: 'var(--text-primary, #fff)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* SELECTOR DE CATEGORÍAS (TABS BENTO) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
          }}
        >
          {algorithmsCategories.map((cat) => {
            const isActive = selectedCategoryKey === cat.id && !searchQuery.trim();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryKey(cat.id);
                  setSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1.5px solid var(--accent-color, #6366f1)' : '1px solid var(--border-color, #333)',
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-app, #121218)',
                  color: isActive ? '#fff' : 'var(--text-muted, #bbb)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: isActive ? '600' : 'normal',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ color: isActive ? 'var(--accent-color, #6366f1)' : '#888' }}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN DE INFOGRAFÍAS INTERACTIVAS SVG */}
      {!searchQuery.trim() && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
          }}
        >
          {/* INFOGRAFÍA 1: VISUALIZADOR DE RECORRIDOS DE ÁRBOLES */}
          <div
            className="bento-card"
            style={{
              background: 'var(--bg-card, #1e1e2e)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #333)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FolderTree className="text-indigo-400" size={18} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Infografía: Recorridos de Árboles (Traversal)</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted, #aaa)', marginBottom: '14px' }}>
              Selecciona el algoritmo de recorrido para visualizar el orden exacto de visita de los nodos en el árbol binario:
            </p>

            {/* BOTONES DE SELECCIÓN DE RECORRIDO */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {(
                [
                  { id: 'inorder', label: 'Inorden' },
                  { id: 'preorder', label: 'Preorden' },
                  { id: 'postorder', label: 'Postorden' },
                  { id: 'bfs', label: 'Level-Order (BFS)' },
                ] as { id: TraversalMode; label: string }[]
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setTraversalMode(mode.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color, #444)',
                    backgroundColor: traversalMode === mode.id ? 'var(--accent-color, #6366f1)' : 'transparent',
                    color: traversalMode === mode.id ? '#fff' : 'var(--text-secondary, #ccc)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: traversalMode === mode.id ? '600' : 'normal',
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* SECUENCIA RESULTANTE */}
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px dashed var(--accent-color, #6366f1)',
                fontSize: '13px',
                fontFamily: 'monospace',
                marginBottom: '14px',
                color: '#e0e7ff',
                textAlign: 'center',
              }}
            >
              Secuencia: {getTraversalSequence(traversalMode)}
            </div>

            {/* GRÁFICO SVG ÁRBOL */}
            <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
              <svg width="400" height="210" viewBox="0 0 400 210" style={{ background: 'var(--bg-app, #121218)', borderRadius: '8px' }}>
                {/* Aristas */}
                {TREE_EDGES.map((edge, idx) => (
                  <line
                    key={idx}
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                ))}

                {/* Nodos */}
                {TREE_NODES.map((node) => {
                  const order = getNodeOrder(node, traversalMode);
                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="20"
                        fill="#1e293b"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 5}
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {node.label}
                      </text>
                      {/* Badge de orden de visita */}
                      <circle
                        cx={node.cx + 15}
                        cy={node.cy - 14}
                        r="10"
                        fill="#ef4444"
                      />
                      <text
                        x={node.cx + 15}
                        y={node.cy - 10}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {order}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* INFOGRAFÍA 2: CURVAS DE COMPLEJIDAD BIG-O */}
          <div
            className="bento-card"
            style={{
              background: 'var(--bg-card, #1e1e2e)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #333)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <TrendingUp className="text-emerald-400" size={18} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Infografía: Curva Asintótica Big-O</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted, #aaa)', marginBottom: '14px' }}>
              Comparación visual del crecimiento en operaciones f(N) a medida que el tamaño de entrada N aumenta:
            </p>

            {/* GRÁFICO SVG CURVAS BIG-O */}
            <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <svg width="400" height="210" viewBox="0 0 400 250" style={{ background: 'var(--bg-app, #121218)', borderRadius: '8px' }}>
                {/* Ejes X e Y */}
                <line x1="40" y1="230" x2="380" y2="230" stroke="#475569" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="230" stroke="#475569" strokeWidth="2" />

                {/* Etiquetas de ejes */}
                <text x="350" y="246" fill="#94a3b8" fontSize="11">Tamaño (N) →</text>
                <text x="10" y="30" fill="#94a3b8" fontSize="11" transform="rotate(-90 15,30)">Operaciones (O) →</text>

                {/* Curvas */}
                {BIG_O_CURVES.map((curve) => {
                  const isSelected = selectedCurveId === curve.id;
                  return (
                    <path
                      key={curve.id}
                      d={curve.path}
                      fill="none"
                      stroke={curve.color}
                      strokeWidth={isSelected ? '4' : '2.5'}
                      strokeDasharray={curve.strokeDash}
                      style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
                      onClick={() => setSelectedCurveId(isSelected ? null : curve.id)}
                    >
                      <title>{`${curve.label}: ${curve.desc}`}</title>
                    </path>
                  );
                })}

                {/* Leyendas en gráfica */}
                <text x="310" y="222" fill="#10b981" fontSize="10" fontWeight="bold">O(1)</text>
                <text x="310" y="175" fill="#06b6d4" fontSize="10" fontWeight="bold">O(log n)</text>
                <text x="310" y="110" fill="#3b82f6" fontSize="10" fontWeight="bold">O(n)</text>
                <text x="270" y="55" fill="#8b5cf6" fontSize="10" fontWeight="bold">O(n log n)</text>
                <text x="220" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold">O(n²)</text>
                <text x="140" y="25" fill="#ef4444" fontSize="10" fontWeight="bold">O(2ⁿ)</text>
              </svg>
            </div>

            {/* DETALLE DE CURVA SELECCIONADA O LEYENDA */}
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color, #333)',
                fontSize: '12px',
              }}
            >
              {selectedCurveId ? (
                (() => {
                  const c = BIG_O_CURVES.find((item) => item.id === selectedCurveId);
                  return (
                    <div>
                      <strong style={{ color: c?.color }}>{c?.label}:</strong> {c?.desc}
                    </div>
                  );
                })()
              ) : (
                <div style={{ color: 'var(--text-muted, #888)', fontStyle: 'italic' }}>
                  💡 Haz clic en cualquier curva de la infografía para ver su explicación técnica detallada.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN DE CONTENIDO POR CATEGORÍAS */}
      {filteredCategories.map((cat) => (
        <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* DESCRIPCIÓN Y TABLA DE COMPLEJIDAD DE LA CATEGORÍA */}
          <div
            className="bento-card"
            style={{
              background: 'var(--bg-card, #1e1e2e)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #333)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ color: 'var(--accent-color, #6366f1)' }}>{getCategoryIcon(cat.iconName)}</div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{cat.title}</h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary, #ccc)', lineHeight: '1.6', marginBottom: '20px' }}>
              {cat.description}
            </p>

            {/* TABLA GLOBAL DE COMPLEJIDAD BIG-O DE LA CATEGORÍA */}
            {cat.overallBigOTable && cat.overallBigOTable.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TableIcon size={16} className="text-indigo-400" />
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Matriz de Complejidad Temporal & Espacial</h4>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '12.5px',
                      textAlign: 'left',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: '1px solid var(--border-color, #444)',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        }}
                      >
                        <th style={{ padding: '10px 12px' }}>Algoritmo / Estructura</th>
                        <th style={{ padding: '10px 12px' }}>Mejor Caso</th>
                        <th style={{ padding: '10px 12px' }}>Caso Promedio</th>
                        <th style={{ padding: '10px 12px' }}>Peor Caso</th>
                        <th style={{ padding: '10px 12px' }}>Espacio</th>
                        <th style={{ padding: '10px 12px' }}>Notas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.overallBigOTable.map((row: BigOTableRow, rIdx: number) => (
                        <tr
                          key={rIdx}
                          style={{
                            borderBottom: '1px solid var(--border-color, #333)',
                          }}
                        >
                          <td style={{ padding: '10px 12px', fontWeight: 'bold', color: 'var(--text-primary, #fff)' }}>
                            {row.algorithmOrOperation}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className={`badge ${getComplexityBadgeClass(row.bestTime)}`} style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                              {row.bestTime}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className={`badge ${getComplexityBadgeClass(row.averageTime)}`} style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                              {row.averageTime}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className={`badge ${getComplexityBadgeClass(row.worstTime)}`} style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                              {row.worstTime}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#94a3b8' }}>
                            {row.spaceComplexity}
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-muted, #888)', fontSize: '12px' }}>
                            {row.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* LISTA DE ALGORITMOS / ITÉMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cat.items.map((item: AlgorithmItem) => {
              const isExpanded = expandedItems[item.id] ?? false;
              const isCopied = copiedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="bento-card"
                  style={{
                    background: 'var(--bg-card, #1e1e2e)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color, #333)',
                    overflow: 'hidden',
                  }}
                >
                  {/* CABECERA EXPANDIBLE DEL ALGORITMO */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-primary, #fff)',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>{item.name}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted, #aaa)' }}>{item.summary}</p>
                    </div>
                    <div style={{ color: 'var(--text-muted, #888)', marginLeft: '12px' }}>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </button>

                  {/* CUERPO DETALLADO DEL ALGORITMO */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '0 20px 20px 20px',
                        borderTop: '1px solid var(--border-color, #333)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        marginTop: '12px',
                      }}
                    >
                      {/* EXPLICACIÓN TÉCNICA */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: 'bold', fontSize: '13.5px' }}>
                          <Info size={15} className="text-indigo-400" />
                          <span>Explicación Técnica:</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary, #ddd)', lineHeight: '1.6' }}>
                          {item.description}
                        </p>
                      </div>

                      {/* CASOS DE USO PRÁCTICOS */}
                      {item.useCases && item.useCases.length > 0 && (
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--accent-color, #818cf8)' }}>Casos de Uso en la Industria:</strong>
                          <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary, #ccc)' }}>
                            {item.useCases.map((uc, uIdx) => (
                              <li key={uIdx} style={{ marginBottom: '4px' }}>
                                {uc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* VIEWER DE CÓDIGO CON SELECTOR DE LENGUAJE */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code size={16} className="text-emerald-400" />
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Implementación de Referencia:</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* BOTONES DE PESTAÑA DE LENGUAJE */}
                            <div style={{ display: 'flex', backgroundColor: 'var(--bg-app, #121218)', padding: '2px', borderRadius: '6px', border: '1px solid #333' }}>
                              <button
                                onClick={() => setActiveCodeLang('typescript')}
                                style={{
                                  padding: '4px 10px',
                                  fontSize: '11.5px',
                                  borderRadius: '4px',
                                  border: 'none',
                                  backgroundColor: activeCodeLang === 'typescript' ? 'var(--accent-color, #6366f1)' : 'transparent',
                                  color: activeCodeLang === 'typescript' ? '#fff' : '#888',
                                  cursor: 'pointer',
                                  fontWeight: activeCodeLang === 'typescript' ? 'bold' : 'normal',
                                }}
                              >
                                TypeScript
                              </button>
                              <button
                                onClick={() => setActiveCodeLang('python')}
                                style={{
                                  padding: '4px 10px',
                                  fontSize: '11.5px',
                                  borderRadius: '4px',
                                  border: 'none',
                                  backgroundColor: activeCodeLang === 'python' ? '#3572A5' : 'transparent',
                                  color: activeCodeLang === 'python' ? '#fff' : '#888',
                                  cursor: 'pointer',
                                  fontWeight: activeCodeLang === 'python' ? 'bold' : 'normal',
                                }}
                              >
                                Python
                              </button>
                            </div>

                            {/* BOTÓN COPIAR */}
                            <button
                              onClick={() => handleCopyCode(item.id, item.code[activeCodeLang])}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color, #444)',
                                backgroundColor: 'transparent',
                                color: isCopied ? '#10b981' : 'var(--text-muted, #aaa)',
                                fontSize: '11.5px',
                                cursor: 'pointer',
                              }}
                            >
                              {isCopied ? <Check size={13} /> : <Copy size={13} />}
                              <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                        </div>

                        {/* BLOQUE PRE DE CÓDIGO SINTAXIS */}
                        <div
                          style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#0d1117',
                            border: '1px solid #30363d',
                          }}
                        >
                          <pre
                            className={`language-${activeCodeLang}`}
                            style={{
                              margin: 0,
                              padding: '14px',
                              fontSize: '12.5px',
                              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                              overflowX: 'auto',
                              lineHeight: '1.5',
                            }}
                          >
                            <code className={`language-${activeCodeLang}`}>{item.code[activeCodeLang]}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmCatalog;
