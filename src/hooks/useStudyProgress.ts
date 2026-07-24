import { useState, useEffect, useCallback } from 'react';
import { patterns } from '../data/index';

export interface StudyProgress {
  completedPatterns: string[];
  favoritePatterns: string[];
  toggleCompleted: (patternId: string) => void;
  toggleFavorite: (patternId: string) => void;
  isCompleted: (patternId: string) => boolean;
  isFavorite: (patternId: string) => boolean;
  progressPercentage: number;
}

const COMPLETED_STORAGE_KEY = 'study_completed_patterns';
const FAVORITES_STORAGE_KEY = 'study_favorite_patterns';

export const useStudyProgress = (): StudyProgress => {
  const [completedPatterns, setCompletedPatterns] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoritePatterns, setFavoritePatterns] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedPatterns));
  }, [completedPatterns]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritePatterns));
  }, [favoritePatterns]);

  const toggleCompleted = useCallback((patternId: string) => {
    setCompletedPatterns((prev) =>
      prev.includes(patternId) ? prev.filter((id) => id !== patternId) : [...prev, patternId]
    );
  }, []);

  const toggleFavorite = useCallback((patternId: string) => {
    setFavoritePatterns((prev) =>
      prev.includes(patternId) ? prev.filter((id) => id !== patternId) : [...prev, patternId]
    );
  }, []);

  const isCompleted = useCallback(
    (patternId: string) => completedPatterns.includes(patternId),
    [completedPatterns]
  );

  const isFavorite = useCallback(
    (patternId: string) => favoritePatterns.includes(patternId),
    [favoritePatterns]
  );

  const totalPatterns = patterns.length;
  const progressPercentage = totalPatterns > 0 ? Math.round((completedPatterns.length / totalPatterns) * 100) : 0;

  return {
    completedPatterns,
    favoritePatterns,
    toggleCompleted,
    toggleFavorite,
    isCompleted,
    isFavorite,
    progressPercentage,
  };
};
