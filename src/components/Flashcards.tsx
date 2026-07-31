import React, { useState, useEffect, useCallback } from 'react';
import { flashcards as originalFlashcards } from '../data/flashcards';
import { ArrowLeft, ArrowRight, RotateCcw, HelpCircle, Shuffle, CheckCircle, RefreshCw } from 'lucide-react';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const Flashcards: React.FC = () => {
  const [deck, setDeck] = useState(originalFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knewCount, setKnewCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentCard = deck[currentIndex];

  const goToNext = useCallback(() => {
    setIsFlipped(false);
    setHasAnswered(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 150);
  }, [deck.length]);

  const goToPrev = useCallback(() => {
    setIsFlipped(false);
    setHasAnswered(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
    }, 150);
  }, [deck.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const handleReset = () => {
    setIsFlipped(false);
    setHasAnswered(false);
    setKnewCount(0);
    setReviewCount(0);
    setTimeout(() => {
      setDeck(originalFlashcards);
      setCurrentIndex(0);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setHasAnswered(false);
    setTimeout(() => {
      setDeck(shuffleArray(originalFlashcards));
      setCurrentIndex(0);
    }, 150);
  };

  const handleKnew = () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    setKnewCount((c) => c + 1);
    setTimeout(goToNext, 600);
  };

  const handleReview = () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    setReviewCount((c) => c + 1);
    setTimeout(goToNext, 600);
  };

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === ' ') {
        e.preventDefault();
        handleFlip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, handleFlip]);

  const totalAnswered = knewCount + reviewCount;

  return (
    <div className="flashcards-wrapper">
      <div className="flashcards-header">
        <span className="flashcard-counter">
          Tarjeta {currentIndex + 1} de {deck.length}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn-reset" onClick={handleShuffle} title="Barajar mazo">
            <Shuffle size={14} />
            <span>Barajar</span>
          </button>
          <button className="btn-reset" onClick={handleReset} title="Reiniciar mazo">
            <RotateCcw size={14} />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Barra de Progreso de Sesión */}
      {totalAnswered > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '10px 16px',
          marginBottom: '12px',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          fontSize: '13px',
          fontWeight: 500,
        }}>
          <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={14} /> Lo sabía: {knewCount}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <RefreshCw size={14} /> A repasar: {reviewCount}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>
            {totalAnswered}/{deck.length} evaluadas
          </span>
        </div>
      )}

      {/* Tarjeta Interactiva 3D */}
      <div 
        className="flashcard-container" 
        onClick={handleFlip}
        title="Haz clic para dar vuelta la tarjeta (o presiona Espacio)"
      >
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Frente de la Tarjeta */}
          <div className="flashcard-front">
            <div className="card-face-type">PREGUNTA / CONCEPTO</div>
            <div className="card-face-icon">
              <HelpCircle size={36} />
            </div>
            <h3 className="card-face-text">{currentCard.front}</h3>
            <div className="card-face-action">Clic o Espacio para revelar</div>
          </div>

          {/* Dorso de la Tarjeta */}
          <div className="flashcard-back">
            <div className="card-face-type back-type">RESPUESTA CONCEPTUAL</div>
            <p className="card-face-text back-text">{currentCard.back}</p>
            {currentCard.hint && (
              <div className="card-face-hint">
                <strong>Pista:</strong> {currentCard.hint}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles de Auto-evaluación (visibles cuando la tarjeta está volteada) */}
      {isFlipped && !hasAnswered && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '12px',
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); handleKnew(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            <CheckCircle size={16} />
            Lo sabía ✅
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleReview(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshCw size={16} />
            A repasar 🔄
          </button>
        </div>
      )}

      {/* Controles de Navegación */}
      <div className="flashcard-controls">
        <button className="control-btn" onClick={goToPrev} aria-label="Tarjeta anterior">
          <ArrowLeft size={16} />
          <span>Anterior</span>
        </button>
        <button className="control-btn btn-primary" onClick={goToNext} aria-label="Siguiente tarjeta">
          <span>Siguiente</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Hint de teclado */}
      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <kbd style={{ background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '11px' }}>←</kbd>
        {' '}Anterior{' '}·{' '}
        <kbd style={{ background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '11px' }}>Espacio</kbd>
        {' '}Voltear{' '}·{' '}
        <kbd style={{ background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '11px' }}>→</kbd>
        {' '}Siguiente
      </div>
    </div>
  );
};

export default Flashcards;
