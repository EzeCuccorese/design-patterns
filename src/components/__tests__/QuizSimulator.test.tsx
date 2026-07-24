import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuizSimulator } from '../QuizSimulator';

describe('QuizSimulator Component', () => {
  it('renders module selection view initially', () => {
    render(<QuizSimulator />);
    expect(screen.getByText(/Simulador de Evaluaciones de Arquitectura/i)).toBeInTheDocument();
  });

  it('renders available quiz modules', () => {
    render(<QuizSimulator />);
    expect(screen.getByText('Ingeniería de Software')).toBeInTheDocument();
    expect(screen.getByText('Arquitectura de Software')).toBeInTheDocument();
  });
});
