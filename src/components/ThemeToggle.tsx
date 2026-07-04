import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  // Por defecto inicializa en Light Mode (false) como solicitó el usuario
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="theme-switch"
      aria-label="Alternar tema"
      title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
