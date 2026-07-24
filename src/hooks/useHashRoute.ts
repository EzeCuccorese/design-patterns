import { useState, useEffect, useCallback } from 'react';
import { patterns } from '../data/index';
import { Pattern } from '../data/types';

export interface RouteState {
  activeView: string;
  selectedPattern: Pattern | null;
  selectedCategory: 'creational' | 'structural' | 'behavioral' | null;
}

export const parseHash = (): RouteState => {
  const hash = window.location.hash.replace('#', '');
  if (!hash) {
    return {
      activeView: 'pattern',
      selectedPattern: patterns[0],
      selectedCategory: null,
    };
  }

  const [prefix, param] = hash.split('/');

  if (prefix === 'pattern' && param) {
    const foundPattern = patterns.find((p) => p.id === param);
    if (foundPattern) {
      return {
        activeView: 'pattern',
        selectedPattern: foundPattern,
        selectedCategory: null,
      };
    }
  }

  if (prefix === 'category' && (param === 'creational' || param === 'structural' || param === 'behavioral')) {
    return {
      activeView: 'category',
      selectedPattern: null,
      selectedCategory: param,
    };
  }

  if (['solid-clean', 'grasp', 'testing', 'resilience-eda', 'sre-devops', 'tooling-dev', 'computer-science'].includes(prefix)) {
    return {
      activeView: prefix,
      selectedPattern: null,
      selectedCategory: null,
    };
  }

  if (['refactor', 'sources', 'quiz', 'flashcards'].includes(prefix)) {
    return {
      activeView: prefix,
      selectedPattern: null,
      selectedCategory: null,
    };
  }

  return {
    activeView: 'pattern',
    selectedPattern: patterns[0],
    selectedCategory: null,
  };
};

export const useHashRoute = () => {
  const [routeState, setRouteState] = useState<RouteState>(parseHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(parseHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigatePattern = useCallback((pattern: Pattern) => {
    window.location.hash = `pattern/${pattern.id}`;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  const navigateCategory = useCallback((category: 'creational' | 'structural' | 'behavioral') => {
    window.location.hash = `category/${category}`;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  const navigateView = useCallback((view: string) => {
    window.location.hash = view;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  return {
    routeState,
    navigatePattern,
    navigateCategory,
    navigateView,
  };
};
