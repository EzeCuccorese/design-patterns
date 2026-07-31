import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AlgorithmCatalog } from '../AlgorithmCatalog';
import { algorithmsCategories } from '../../data/algorithmsData';

describe('AlgorithmCatalog Component', () => {
  it('renders all 5 algorithm categories in the data file', () => {
    expect(algorithmsCategories).toHaveLength(5);
    const categoryIds = algorithmsCategories.map((c) => c.id);
    expect(categoryIds).toEqual([
      'trees-trie',
      'big-o',
      'classic-algorithms',
      'ai-ml',
      'distributed-crypto',
    ]);
  });

  it('renders catalog header and default category view', () => {
    render(<AlgorithmCatalog />);
    expect(
      screen.getByText(/Catálogo de Algoritmos & Estructuras de Datos/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Infografía: Recorridos de Árboles/i)).toBeInTheDocument();
    expect(screen.getByText(/Infografía: Curva Asintótica Big-O/i)).toBeInTheDocument();
  });

  it('allows switching categories when clicking tabs', () => {
    render(<AlgorithmCatalog />);
    const bigOTab = screen.getByRole('button', { name: /Complejidad Big-O/i });
    fireEvent.click(bigOTab);
    expect(screen.getByRole('heading', { level: 2, name: /Complejidad Big-O/i })).toBeInTheDocument();
  });

  it('filters algorithms when typing in search input', () => {
    render(<AlgorithmCatalog />);
    const searchInput = screen.getByPlaceholderText(/Filtrar algoritmos/i);
    fireEvent.change(searchInput, { target: { value: 'Dijkstra' } });
    expect(screen.getByText(/Algoritmos de Grafos \(Dijkstra, A\* & DSU\)/i)).toBeInTheDocument();
  });
});
