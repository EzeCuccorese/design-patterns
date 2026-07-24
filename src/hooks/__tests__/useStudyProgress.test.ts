import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useStudyProgress } from '../useStudyProgress';

describe('useStudyProgress Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty progress', () => {
    const { result } = renderHook(() => useStudyProgress());
    expect(result.current.completedPatterns).toEqual([]);
    expect(result.current.favoritePatterns).toEqual([]);
    expect(result.current.progressPercentage).toBe(0);
  });

  it('toggles completed state correctly', () => {
    const { result } = renderHook(() => useStudyProgress());
    act(() => {
      result.current.toggleCompleted('singleton');
    });
    expect(result.current.isCompleted('singleton')).toBe(true);

    act(() => {
      result.current.toggleCompleted('singleton');
    });
    expect(result.current.isCompleted('singleton')).toBe(false);
  });

  it('toggles favorite state correctly', () => {
    const { result } = renderHook(() => useStudyProgress());
    act(() => {
      result.current.toggleFavorite('factory-method');
    });
    expect(result.current.isFavorite('factory-method')).toBe(true);
  });
});
