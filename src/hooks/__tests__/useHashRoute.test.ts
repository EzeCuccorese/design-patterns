import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useHashRoute, parseHash } from '../useHashRoute';
import { patterns } from '../../data/index';

describe('useHashRoute Hook', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('parses empty hash as default pattern', () => {
    const route = parseHash();
    expect(route.activeView).toBe('pattern');
    expect(route.selectedPattern?.id).toBe(patterns[0].id);
  });

  it('parses pattern hash correctly', () => {
    window.location.hash = 'pattern/factory';
    const route = parseHash();
    expect(route.activeView).toBe('pattern');
    expect(route.selectedPattern?.id).toBe('factory');
  });

  it('updates state on navigateView', () => {
    const { result } = renderHook(() => useHashRoute());
    act(() => {
      result.current.navigateView('quiz');
    });
    expect(window.location.hash).toBe('#quiz');
    expect(result.current.routeState.activeView).toBe('quiz');
  });
});
