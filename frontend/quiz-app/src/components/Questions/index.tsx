"use client";

import React, { useState, useEffect, useRef } from 'react';
import OxygenBar from '../OxygenBar';
import './Questions.css';

interface Character {
  name: string;
  advantage: string;
  disadvantage: string;
}

interface QuestionsProps {
  selectedCharacter: Character | null;
}

const Questions: React.FC<QuestionsProps> = ({ selectedCharacter }) => {
  const [oxygenLevel, setOxygenLevel] = useState(100);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [questionPoints, setQuestionPoints] = useState(5); // Pontuação da pergunta atual
  const [penalty, setPenalty] = useState(4); // Penalidade padrão para erro
  const [hasUsedExclude, setHasUsedExclude] = useState(false); // Estado para rastrear se a habilidade "Excluir Alternativas Erradas" foi usada
  const [hasUsedDouble, setHasUsedDouble] = useState(false); // Estado para rastrear se a habilidade "Dobrar Pontos" foi usada
  const [hasUsedSkip, setHasUsedSkip] = useState(false); // Estado para rastrear se a habilidade "Pular Pergunta" foi usada
  const [infoBox, setInfoBox] = useState<string | null>(null); // Estado para controlar a exibição da caixa de informações
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startOxygenTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startOxygenTimer = () => {
    timerRef.current = setInterval(() => {
      setOxygenLevel((prevLevel) => {
        if (prevLevel <= 0) {
          clearInterval(timerRef.current!);
          setIsQuizOver(true);
          console.log('Quiz terminado: Nível de oxigênio chegou a zero.');
          return 0;
        }
        const decreaseRate = 1;
        return Math.max(prevLevel - decreaseRate, 0);
      });
    }, 1000);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isQuizOver) return;

    if (isCorrect) {
      setOxygenLevel((prevLevel) => Math.min(prevLevel + questionPoints, 100));
      console.log(`Resposta correta: Aumentou o nível de oxigênio em ${questionPoints}.`);
    } else {
      setOxygenLevel((prevLevel) => Math.max(prevLevel - penalty, 0));
      console.log(`Resposta incorreta: Diminuiu o nível de oxigênio em ${penalty}.`);
    }

    if (timerRef.current) clearInterval(timerRef.current);
    startOxygenTimer();
  };

  const handleSkip = () => {
    if (isQuizOver || hasUsedSkip) return;

    setHasUsedSkip(true); // Marca a habilidade como usada
    console.log('Pergunta pulada.');
  };

  const handleExcludeWrongAnswers = () => {
    if (isQuizOver || hasUsedExclude) return;

    setQuestionPoints(2); // Pontuação da pergunta ajustada
    setPenalty(5); // Penalidade ajustada
    setHasUsedExclude(true); // Marca a habilidade como usada
    console.log('Alternativas erradas excluídas. Pontuação da pergunta ajustada para 2 pontos.');
  };

  const handleDoublePoints = () => {
    if (isQuizOver || hasUsedDouble) return;

    setQuestionPoints((prevPoints) => prevPoints * 2);
    setPenalty(5); // Penalidade ajustada
    setHasUsedDouble(true); // Marca a habilidade como usada
    console.log('Pontuação da pergunta atual dobrada.');
  };

  return (
    <div>
      <OxygenBar oxygenLevel={oxygenLevel} />
      {isQuizOver ? (
        <div className="quiz-over">
          <h2>Quiz Terminado</h2>
          <p>Seu nível de oxigênio chegou a zero.</p>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={() => handleAnswer(true)}>Resposta Correta</button>
          <button onClick={() => handleAnswer(false)}>Resposta Incorreta</button>
          {selectedCharacter && selectedCharacter.name === 'Luna the Dreamer' && (
            <div className="button-wrapper">
              <button
                onClick={handleSkip}
                disabled={hasUsedSkip}
                onMouseEnter={() => setInfoBox('skip')}
                onMouseLeave={() => setInfoBox(null)}
              >
                Pular Pergunta
              </button>
              {infoBox === 'skip' && (
                <div className="info-box">
                  <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
                  <div>
                    <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
                    <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedCharacter && selectedCharacter.name === 'Astro the Navigator' && (
            <div className="button-wrapper">
              <button
                onClick={handleExcludeWrongAnswers}
                disabled={hasUsedExclude}
                onMouseEnter={() => setInfoBox('exclude')}
                onMouseLeave={() => setInfoBox(null)}
              >
                Excluir Alternativas Erradas
              </button>
              {infoBox === 'exclude' && (
                <div className="info-box">
                  <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
                  <div>
                    <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
                    <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedCharacter && selectedCharacter.name === 'Sol the Explorer' && (
            <div className="button-wrapper">
              <button
                onClick={handleDoublePoints}
                disabled={hasUsedDouble}
                onMouseEnter={() => setInfoBox('double')}
                onMouseLeave={() => setInfoBox(null)}
              >
                Dobrar Pontos
              </button>
              {infoBox === 'double' && (
                <div className="info-box">
                  <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
                  <div>
                    <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
                    <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;