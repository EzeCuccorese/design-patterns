import React, { useState } from 'react';
import { flashcards } from '../data/flashcards';
import { ArrowLeft, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';

export const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    // Esperar a que termine la animación de vuelta antes de cambiar de tarjeta
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(0);
    }, 150);
  };

  return (
    <div className="flashcards-wrapper">
      <div className="flashcards-header">
        <span className="flashcard-counter">
          Tarjeta {currentIndex + 1} de {flashcards.length}
        </span>
        <button className="btn-reset" onClick={handleReset} title="Reiniciar mazo">
          <RotateCcw size={14} />
          <span>Reiniciar mazo</span>
        </button>
      </div>

      {/* Tarjeta Interactiva 3D */}
      <div 
        className="flashcard-container" 
        onClick={() => setIsFlipped(!isFlipped)}
        title="Haz clic para dar vuelta la tarjeta"
      >
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Frente de la Tarjeta */}
          <div className="flashcard-front">
            <div className="card-face-type">PREGUNTA / CONCEPTO</div>
            <div className="card-face-icon">
              <HelpCircle size={36} />
            </div>
            <h3 className="card-face-text">{currentCard.front}</h3>
            <div className="card-face-action">Hacer clic para revelar respuesta</div>
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

      {/* Controles de Navegación */}
      <div className="flashcard-controls">
        <button className="control-btn" onClick={handlePrev} aria-label="Tarjeta anterior">
          <ArrowLeft size={16} />
          <span>Anterior</span>
        </button>
        <button className="control-btn btn-primary" onClick={handleNext} aria-label="Siguiente tarjeta">
          <span>Siguiente</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
