import React, { useState, useEffect, useCallback } from 'react';
import { Pattern } from '../data/types';
import { Terminal, RotateCcw } from 'lucide-react';

interface ConsoleSimulatorProps {
  pattern: Pattern;
}

export const ConsoleSimulator: React.FC<ConsoleSimulatorProps> = ({ pattern }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullText = pattern.output;

  const runAnimation = useCallback(() => {
    setDisplayedText('');
    setIsAnimating(true);
    const lines = fullText.split('\n');
    let currentLineIndex = 0;
    let accumulated = '';

    const lineTimer = setInterval(() => {
      if (currentLineIndex < lines.length) {
        accumulated += (currentLineIndex > 0 ? '\n' : '') + lines[currentLineIndex];
        setDisplayedText(accumulated);
        currentLineIndex++;
      } else {
        clearInterval(lineTimer);
        setIsAnimating(false);
      }
    }, 250);

    return () => clearInterval(lineTimer);
  }, [fullText]);

  useEffect(() => {
    const cleanup = runAnimation();
    return cleanup;
  }, [runAnimation, animationKey]);

  // Reset animation on pattern change
  useEffect(() => {
    setAnimationKey((k) => k + 1);
  }, [pattern.id]);

  // Cursor blink effect
  useEffect(() => {
    if (!isAnimating) {
      setShowCursor(false);
      return;
    }
    const cursorTimer = setInterval(() => {
      setShowCursor((v) => !v);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, [isAnimating]);

  const handleRerun = () => {
    setAnimationKey((k) => k + 1);
  };

  return (
    <div className="bento-card card-console">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal />
          <span>Consola (Ejecución Simulada)</span>
        </div>
        <button
          onClick={handleRerun}
          disabled={isAnimating}
          title="Re-ejecutar simulación"
          aria-label="Re-ejecutar simulación de consola"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'transparent',
            color: isAnimating ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            fontSize: '11px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
        >
          <RotateCcw size={12} />
          Re-ejecutar
        </button>
      </div>
      
      <div className="console-header">
        <span className="console-dot dot-red"></span>
        <span className="console-dot dot-yellow"></span>
        <span className="console-dot dot-green"></span>
      </div>

      <div className="console-box">
        {displayedText}
        {isAnimating && (
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              backgroundColor: '#10b981',
              marginLeft: '2px',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s',
            }}
          />
        )}
      </div>
    </div>
  );
};
