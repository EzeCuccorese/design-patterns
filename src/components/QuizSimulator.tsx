import React, { useState, useEffect, useRef } from 'react';
import { quizModules, QuizModule } from '../data/quiz';
import { Timer, CheckCircle2, XCircle, ChevronRight, RefreshCw, Trophy, Calendar } from 'lucide-react';

interface Attempt {
  moduleId: string;
  moduleTitle: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export const QuizSimulator: React.FC = () => {
  const [gameState, setGameState] = useState<'select' | 'playing' | 'results'>('select');
  const [selectedModule, setSelectedModule] = useState<QuizModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const saved = localStorage.getItem('quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Iniciar temporizador
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  const handleTimeOut = () => {
    setGameState('results');
    saveAttempt(score);
  };

  const handleStartQuiz = (module: QuizModule) => {
    setSelectedModule(module);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setTimeLeft(module.timeLimitMinutes * 60);
    setGameState('playing');
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswerIndex !== null) return; // Evitar doble clic
    setSelectedAnswerIndex(index);
    if (index === selectedModule!.questions[currentQuestionIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex + 1 < selectedModule!.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('results');
      saveAttempt(score + (selectedAnswerIndex === selectedModule!.questions[currentQuestionIndex].correctIndex ? 0 : 0)); // El score ya está actualizado en handleSelectAnswer
    }
  };

  const saveAttempt = (finalScore: number) => {
    if (!selectedModule) return;
    const pct = Math.round((finalScore / selectedModule.questions.length) * 100);
    const newAttempt: Attempt = {
      moduleId: selectedModule.id,
      moduleTitle: selectedModule.title,
      score: finalScore,
      total: selectedModule.questions.length,
      percentage: pct,
      date: new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' hs'
    };

    const updatedAttempts = [newAttempt, ...attempts].slice(0, 10); // Guardar los últimos 10 intentos
    setAttempts(updatedAttempts);
    localStorage.setItem('quiz_attempts', JSON.stringify(updatedAttempts));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getResultsFeedback = (pct: number) => {
    if (pct >= 80) {
      return {
        icon: "🏆",
        colorClass: "result-excellent",
        title: "¡Puntaje excepcional!",
        desc: `Lograste un ${pct}%. Tus conocimientos de arquitectura, ingeniería y buenas prácticas están a nivel de un desarrollador senior. Estás listo para afrontar cualquier evaluación técnica.`
      };
    } else if (pct >= 50) {
      return {
        icon: "👍",
        colorClass: "result-good",
        title: "Buen desempeño",
        desc: `Lograste un ${pct}%. Tienes los conceptos generales claros, pero te sugerimos revisar las explicaciones y las flashcards teóricas para pulir detalles y ganar velocidad.`
      };
    } else {
      return {
        icon: "📚",
        colorClass: "result-review",
        title: "Requiere revisión",
        desc: `Lograste un ${pct}%. Te recomendamos leer en detalle la guía teórica y simular el cuestionario nuevamente para consolidar los conceptos clave.`
      };
    }
  };

  return (
    <div className="quiz-simulator-container">
      {gameState === 'select' && (
        <div className="quiz-select-view">
          <div className="quiz-intro-card">
            <Trophy size={48} className="text-amber-500" style={{ margin: '0 auto 16px auto', display: 'block' }} />
            <h2>Simulador de Evaluaciones de Arquitectura</h2>
            <p>
              Mide tus conocimientos bajo el formato cronometrado de opciones múltiples. Selecciona uno de los módulos técnicos para comenzar la simulación.
            </p>
          </div>

          {/* Grid de Módulos */}
          <div className="quiz-modules-grid">
            {quizModules.map((module) => {
              const bestAttempt = attempts
                .filter((a) => a.moduleId === module.id)
                .reduce((max, current) => (current.percentage > max ? current.percentage : max), 0);

              return (
                <div key={module.id} className="quiz-module-card">
                  <div className="module-card-header">
                    <span className={`module-badge badge-${module.id}`}>
                      {module.id === 'modulo1' ? 'Módulo 1' : module.id === 'modulo2' ? 'Módulo 2' : 'Módulo 3'}
                    </span>
                    {bestAttempt > 0 && (
                      <span className="best-score-badge">Mejor: {bestAttempt}%</span>
                    )}
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className="module-card-footer">
                    <span className="module-time-limit">
                      <Timer size={14} />
                      {module.timeLimitMinutes} min
                    </span>
                    <button 
                      className="btn-start-quiz" 
                      onClick={() => handleStartQuiz(module)}
                    >
                      Comenzar
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Historial de Intentos */}
          {attempts.length > 0 && (
            <div className="quiz-history-section">
              <h3>Historial de Simulaciones Recientes</h3>
              <div className="quiz-history-list">
                {attempts.map((attempt, index) => (
                  <div key={index} className="quiz-history-item">
                    <div className="history-item-left">
                      <strong className="history-module-title">{attempt.moduleTitle}</strong>
                      <span className="history-date">
                        <Calendar size={11} />
                        {attempt.date}
                      </span>
                    </div>
                    <div className="history-item-right">
                      <span className="history-score font-mono">{attempt.score}/{attempt.total} aciertos</span>
                      <span className={`history-pct-badge ${attempt.percentage >= 80 ? 'pct-excellent' : attempt.percentage >= 50 ? 'pct-good' : 'pct-review'}`}>
                        {attempt.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'playing' && selectedModule && (
        <div className="quiz-game-view">
          {/* Cabecera del juego */}
          <div className="game-view-header">
            <span className={`module-badge badge-${selectedModule.id}`}>
              {selectedModule.title.toUpperCase()}
            </span>
            <span className="game-progress-text">
              Pregunta {currentQuestionIndex + 1} de {selectedModule.questions.length}
            </span>
            <span className={`game-timer ${timeLeft < 60 ? 'timer-warning animate-pulse' : ''}`}>
              <Timer size={16} />
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Pregunta */}
          <div className="quiz-question-box">
            <h2>{selectedModule.questions[currentQuestionIndex].question}</h2>
          </div>

          {/* Opciones de Respuesta */}
          <div className="quiz-options-list">
            {selectedModule.questions[currentQuestionIndex].answers.map((answer, index) => {
              const isSelected = selectedAnswerIndex === index;
              const isCorrect = index === selectedModule.questions[currentQuestionIndex].correctIndex;
              const showFeedback = selectedAnswerIndex !== null;

              let optionClass = "";
              if (showFeedback) {
                if (isCorrect) {
                  optionClass = "option-correct";
                } else if (isSelected) {
                  optionClass = "option-incorrect";
                } else {
                  optionClass = "option-disabled";
                }
              } else {
                optionClass = "option-interactive";
              }

              return (
                <button
                  key={index}
                  className={`quiz-option-button ${optionClass}`}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                >
                  <span className="option-text">{answer}</span>
                  {showFeedback && isCorrect && <CheckCircle2 size={18} className="icon-state text-emerald-500" />}
                  {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="icon-state text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Panel de Retroalimentación */}
          {selectedAnswerIndex !== null && (
            <div className={`quiz-feedback-box ${selectedAnswerIndex === selectedModule.questions[currentQuestionIndex].correctIndex ? 'feedback-correct' : 'feedback-incorrect'}`}>
              <h4>
                {selectedAnswerIndex === selectedModule.questions[currentQuestionIndex].correctIndex ? (
                  <><CheckCircle2 size={16} /> ¡Respuesta Correcta!</>
                ) : (
                  <><XCircle size={16} /> Respuesta Incorrecta</>
                )}
              </h4>
              <p>{selectedModule.questions[currentQuestionIndex].feedback}</p>
            </div>
          )}

          {/* Controles de juego */}
          {selectedAnswerIndex !== null && (
            <div className="game-view-footer">
              <button className="btn-next-question btn-primary" onClick={handleNextQuestion}>
                {currentQuestionIndex + 1 < selectedModule.questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {gameState === 'results' && selectedModule && (
        <div className="quiz-results-view">
          {(() => {
            const result = getResultsFeedback(Math.round((score / selectedModule.questions.length) * 100));
            return (
              <div className="results-card">
                <span className="results-icon" role="img" aria-label="resultado">{result.icon}</span>
                <h2 className="results-title">{result.title}</h2>
                <div className="results-score-display">
                  <span className="score-num font-mono">{score}</span>
                  <span className="score-slash">/</span>
                  <span className="score-total font-mono">{selectedModule.questions.length}</span>
                </div>
                <span className={`results-percentage ${result.colorClass}`}>
                  {Math.round((score / selectedModule.questions.length) * 100)}% de efectividad
                </span>
                <p className="results-desc">{result.desc}</p>
                <div className="results-actions">
                  <button className="control-btn btn-primary" onClick={() => setGameState('select')}>
                    <RefreshCw size={16} />
                    <span>Volver al Inicio</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default QuizSimulator;
