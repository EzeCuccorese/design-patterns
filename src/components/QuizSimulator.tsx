import React, { useState, useEffect, useRef, useCallback } from 'react';
import { quizModules, QuizModule } from '../data/quiz';
import { Timer, CheckCircle2, XCircle, ChevronRight, RefreshCw, Trophy, Calendar, Eye, EyeOff } from 'lucide-react';

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
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const saved = localStorage.getItem('quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const saveAttempt = useCallback((finalScore: number) => {
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

    setAttempts((prevAttempts) => {
      const updatedAttempts = [newAttempt, ...prevAttempts].slice(0, 10);
      localStorage.setItem('quiz_attempts', JSON.stringify(updatedAttempts));
      return updatedAttempts;
    });
  }, [selectedModule]);

  const handleTimeOut = useCallback(() => {
    setGameState('results');
    saveAttempt(score);
  }, [score, saveAttempt]);

  const handleTimeOutRef = useRef(handleTimeOut);
  useEffect(() => {
    handleTimeOutRef.current = handleTimeOut;
  }, [handleTimeOut]);

  // Iniciar temporizador
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeOutRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleStartQuiz = (module: QuizModule) => {
    setSelectedModule(module);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setUserAnswers([]);
    setShowReview(false);
    setTimeLeft(module.timeLimitMinutes * 60);
    setGameState('playing');
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswerIndex !== null) return; // Evitar doble clic
    setSelectedAnswerIndex(index);
    setUserAnswers((prev) => [...prev, index]);
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
            {(() => {
              const totalTime = selectedModule.timeLimitMinutes * 60;
              const progress = totalTime > 0 ? Math.max(0, Math.min(1, timeLeft / totalTime)) : 0;
              const radius = 16;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference * (1 - progress);
              const isWarning = timeLeft < 60;
              const strokeColor = timeLeft < 30 ? '#f43f5e' : isWarning ? '#f59e0b' : 'var(--accent)';

              return (
                <div className={`game-timer ${isWarning ? 'timer-warning' : ''}`} style={{ gap: '10px' }}>
                  <div style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="36" height="36" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                      <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        fill="transparent"
                        stroke="var(--border-color)"
                        strokeWidth="3.5"
                        style={{ opacity: 0.4 }}
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                          transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease',
                        }}
                      />
                    </svg>
                    <Timer size={13} style={{ position: 'absolute', color: strokeColor }} />
                  </div>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: strokeColor, minWidth: '40px' }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              );
            })()}
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
              <>
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
                {/* Revisión Pregunta por Pregunta */}
                <div style={{ marginTop: '24px', maxWidth: '800px', width: '100%', margin: '24px auto 0 auto' }}>
                  <button
                    onClick={() => setShowReview(!showReview)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {showReview ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showReview ? 'Ocultar Revisión Detallada' : 'Ver Revisión Pregunta por Pregunta'}
                  </button>

                  {showReview && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                      {selectedModule.questions.map((q, qIdx) => {
                        const userAnswer = userAnswers[qIdx];
                        const isCorrect = userAnswer === q.correctIndex;
                        const wasAnswered = userAnswer !== undefined && userAnswer !== null;

                        return (
                          <div
                            key={qIdx}
                            style={{
                              padding: '20px',
                              borderRadius: '12px',
                              border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : wasAnswered ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)'}`,
                              backgroundColor: 'var(--bg-card)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                fontSize: '13px',
                                fontWeight: 700,
                                flexShrink: 0,
                                backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.15)' : wasAnswered ? 'rgba(239, 68, 68, 0.15)' : 'var(--border-color)',
                                color: isCorrect ? '#10b981' : wasAnswered ? '#ef4444' : 'var(--text-muted)',
                              }}>
                                {qIdx + 1}
                              </span>
                              <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.5', margin: 0, color: 'var(--text-primary)' }}>
                                {q.question}
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', paddingLeft: '38px' }}>
                              {q.answers.map((ans, aIdx) => {
                                const isUserChoice = userAnswer === aIdx;
                                const isCorrectAnswer = q.correctIndex === aIdx;
                                let answerStyle: React.CSSProperties = {
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  lineHeight: '1.4',
                                  border: '1px solid transparent',
                                  color: 'var(--text-secondary)',
                                };

                                if (isCorrectAnswer) {
                                  answerStyle = {
                                    ...answerStyle,
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    color: '#10b981',
                                    fontWeight: 600,
                                  };
                                } else if (isUserChoice && !isCorrectAnswer) {
                                  answerStyle = {
                                    ...answerStyle,
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444',
                                    textDecoration: 'line-through',
                                  };
                                }

                                return (
                                  <div key={aIdx} style={answerStyle}>
                                    {isCorrectAnswer && <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                                    {isUserChoice && !isCorrectAnswer && <XCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                                    {ans}
                                  </div>
                                );
                              })}
                            </div>

                            {q.feedback && (
                              <div style={{
                                paddingLeft: '38px',
                                fontSize: '13px',
                                color: 'var(--text-muted)',
                                lineHeight: '1.5',
                                fontStyle: 'italic',
                              }}>
                                💡 {q.feedback}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default QuizSimulator;
