import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useHashRoute, parseHash } from '../useHashRoute';

describe('useHashRoute Hook', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('parses empty hash as default home view', () => {
    const route = parseHash();
    expect(route.activeView).toBe('home');
    expect(route.selectedPattern).toBeNull();
  });

  it('parses pattern hash correctly', () => {
    window.location.hash = 'pattern/factory';
    const route = parseHash();
    expect(route.activeView).toBe('pattern');
    expect(route.selectedPattern?.id).toBe('factory');
  });

  it('parses algorithms hash correctly', () => {
    window.location.hash = 'algorithms';
    const route = parseHash();
    expect(route.activeView).toBe('algorithms');
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
