"use client";

import React, { useState, useEffect, useRef } from 'react';
import OxygenBar from '../OxygenBar';

interface Character {
  name: string;
  advantage: string;
  disadvantage: string;
}

interface QuizProps {
  selectedCharacter: Character | null; // Adiciona a prop selectedCharacter
}

const Quiz: React.FC<QuizProps> = ({ selectedCharacter }) => {
  const [oxygenLevel, setOxygenLevel] = useState(100);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState(0); // Contador de perguntas puladas
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inicia o temporizador de oxigênio
    startOxygenTimer();

    // Limpa o intervalo quando o componente desmonta
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const getOxygenEffects = () => {
    if (!selectedCharacter) return { correct: 0, incorrect: 0, skip: 0 };

    switch (selectedCharacter.name) {
      case 'Luna the Dreamer':
        return { correct: 10, incorrect: 10, skip: 5 };
      case 'Astro the Navigator':
        return { correct: 20, incorrect: 15, skip: 10 };
      case 'Sol the Explorer':
        return { correct: 15, incorrect: 5, skip: 10 };
      default:
        return { correct: 0, incorrect: 0, skip: 0 };
    }
  };

  const startOxygenTimer = () => {
    timerRef.current = setInterval(() => {
      setOxygenLevel((prevLevel) => {
        if (prevLevel <= 0) {
          clearInterval(timerRef.current!);
          setIsQuizOver(true);
          console.log('Quiz terminado: Nível de oxigênio chegou a zero.');
          return 0;
        }
        // Aumenta a taxa de diminuição com base no personagem selecionado
        const decreaseRate = selectedCharacter?.name === 'Astro the Navigator' ? 2 : 1;
        return Math.max(prevLevel - decreaseRate, 0);
      });
    }, 1000); // Atualiza a cada segundo
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isQuizOver) return; // Não faz nada se o quiz estiver terminado

    const { correct, incorrect } = getOxygenEffects();

    if (isCorrect) {
      setOxygenLevel((prevLevel) => Math.min(prevLevel + correct, 100)); // Ajusta o nível de oxigênio para acerto
      console.log(`Resposta correta: Aumentou o nível de oxigênio em ${correct}.`);
    } else {
      setOxygenLevel((prevLevel) => Math.max(prevLevel - incorrect, 0)); // Ajusta o nível de oxigênio para erro
      console.log(`Resposta incorreta: Diminuiu o nível de oxigênio em ${incorrect}.`);
    }

    // Reinicia o temporizador de oxigênio se uma nova pergunta for feita
    if (timerRef.current) clearInterval(timerRef.current);
    startOxygenTimer();
  };

  const handleSkip = () => {
    if (isQuizOver) return; // Não faz nada se o quiz estiver terminado

    const { skip } = getOxygenEffects();

    // Perda de oxigênio ao pular a pergunta com base no personagem selecionado
    setOxygenLevel((prevLevel) => Math.max(prevLevel - skip, 0));
    console.log(`Pergunta pulada: Perda de oxigênio ajustada para ${skip}.`);

    // Incrementa o contador de perguntas puladas
    setSkippedQuestions((prevCount) => prevCount + 1);

    // Reinicia o temporizador de oxigênio
    if (timerRef.current) clearInterval(timerRef.current);
    startOxygenTimer();
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
        <div>
          {/* Aqui você pode colocar sua lógica de perguntas */}
          <button onClick={() => handleAnswer(true)}>Resposta Correta</button>
          <button onClick={() => handleAnswer(false)}>Resposta Incorreta</button>
          <button onClick={handleSkip}>Pular Pergunta</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;