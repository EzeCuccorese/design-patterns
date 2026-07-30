import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeniorStaffExam } from '../SeniorStaffExam';

describe('SeniorStaffExam Component', () => {
  it('renders header title and pillar tabs correctly', () => {
    render(<SeniorStaffExam />);
    expect(screen.getByText(/Evaluación & Guía de Estudio Nivel Senior \/ Staff Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Modo Estudio Paso a Paso/i)).toBeInTheDocument();
  });

  it('filters items by pillar when filter buttons are clicked', () => {
    render(<SeniorStaffExam />);
    const liveRefactoringFilter = screen.getByRole('button', { name: 'Live Refactoring' });
    fireEvent.click(liveRefactoringFilter);
    expect(screen.getByText(/Refactorización de Monolito Acoplado a Arquitectura Hexagonal/i)).toBeInTheDocument();
  });

  it('triggers navigation callbacks when DRY reference links are clicked', () => {
    const onNavigatePattern = vi.fn();
    render(<SeniorStaffExam onNavigatePattern={onNavigatePattern} />);
    
    const dryLinkButton = screen.getByText(/Ver Patrón Observer/i);
    expect(dryLinkButton).toBeInTheDocument();
    fireEvent.click(dryLinkButton);

    expect(onNavigatePattern).toHaveBeenCalledWith('observer');
  });
});
