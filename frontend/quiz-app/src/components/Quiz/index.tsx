"use client"

import questions from '../../../public/data.json';
import { useState, useEffect } from 'react';
import ScorePoints from '../scorepoints';
import './Quiz.css';

interface Alternative {
  id: number;
  texto_opcao: string;
  is_correta: number; // 0 para incorreto e 1 para correto
}

interface Question {
  id: number;
  texto_pergunta: string;
  pontos: number;
  nivel_dificuldade: number;
  alternativas: Alternative[];
}

interface QuizProps {
  onAnswer: (isCorrect: boolean) => void;
  excludeWrongAnswers?: boolean;
  doublePoints?: boolean;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Quiz: React.FC<QuizProps> = ({ onAnswer, excludeWrongAnswers, doublePoints, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const [score, setScore] = useState(0); // Adiciona o estado de pontuação
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // Para mostrar se a resposta foi correta ou não
  const [filteredAlternatives, setFilteredAlternatives] = useState<Alternative[]>([]);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    setFilteredAlternatives(getFilteredAlternatives(currentQuestion));
  }, [currentQuestionIndex, excludeWrongAnswers]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    let points = getPoints(currentQuestion.nivel_dificuldade, isCorrect);

    if (doublePoints) {
      points *= 2; // Dobra a pontuação se a habilidade estiver ativada
    }

    setScore((prevScore) => Math.max(prevScore + points, 0));
    setIsAnswerCorrect(isCorrect); // Armazena se a resposta foi correta ou não
    onAnswer(isCorrect);

    // Avança para a próxima pergunta
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const getPoints = (nivelDificuldade: number, isCorrect: boolean): number => {
    switch (nivelDificuldade) {
      case 1:
        return isCorrect ? 5 : -2;
      case 2:
        return isCorrect ? 10 : -5;
      case 3:
        return isCorrect ? 15 : -7;
      default:
        return 0;
    }
  };

  const getFilteredAlternatives = (currentQuestion: Question) => {
    if (excludeWrongAnswers) {
      const correctAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 1);
      const incorrectAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 0);

      // Garantir que sempre haja uma alternativa incorreta
      const displayedAlternatives = [...correctAlternatives];
      if (incorrectAlternatives.length > 0) {
        const randomIncorrect = incorrectAlternatives[Math.floor(Math.random() * incorrectAlternatives.length)];
        displayedAlternatives.push(randomIncorrect);
      }

      // Ordenar alternativas com base no id para manter a ordem original
      return displayedAlternatives.sort((a, b) => a.id - b.id);
    }
    // Ordenar alternativas com base no id para manter a ordem original
    return currentQuestion.alternativas.sort((a, b) => a.id - b.id);
  };

  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.texto_pergunta}</h2>
      <div className="quiz-buttons">
        {filteredAlternatives.map((alt) => (
          <button
            key={alt.id}
            className="quiz-button"
            onClick={() => handleAnswer(alt.is_correta === 1)}
          >
            {alt.texto_opcao}
          </button>
        ))}
      </div>
      {isAnswerCorrect !== null && (
        <ScorePoints
          nivelDificuldade={currentQuestion.nivel_dificuldade}
          isCorrect={isAnswerCorrect}
        />
      )}
      <div className="score-display">
        <h3>Pontuação Total: {score}</h3>
      </div>
    </div>
  );
};

export default Quiz;