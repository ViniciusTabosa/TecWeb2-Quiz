// "use client"

// import questions from '../../../public/data.json';
// import { useState, useEffect } from 'react';
// import ScorePoints from '../scorepoints';
// import './Quiz.css';

// interface Alternative {
//   id: number;
//   texto_opcao: string;
//   is_correta: number; // 0 para incorreto e 1 para correto
// }

// interface Question {
//   id: number;
//   texto_pergunta: string;
//   pontos: number;
//   nivel_dificuldade: number;
//   alternativas: Alternative[];
// }

// interface QuizProps {
//   onAnswer: (isCorrect: boolean) => void;
//   excludeWrongAnswers?: boolean;
//   doublePoints?: boolean;
//   currentQuestionIndex: number;
//   setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// const Quiz: React.FC<QuizProps> = ({ onAnswer, excludeWrongAnswers, doublePoints, currentQuestionIndex, setCurrentQuestionIndex }) => {
//   const [score, setScore] = useState(0); // Adiciona o estado de pontuação
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // Para mostrar se a resposta foi correta ou não
//   const [filteredAlternatives, setFilteredAlternatives] = useState<Alternative[]>([]);

//   useEffect(() => {
//     const currentQuestion = questions[currentQuestionIndex];
//     setFilteredAlternatives(getFilteredAlternatives(currentQuestion));
//   }, [currentQuestionIndex, excludeWrongAnswers]);

//   const handleAnswer = (isCorrect: boolean) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     let points = getPoints(currentQuestion.nivel_dificuldade, isCorrect);

//     if (doublePoints) {
//       points *= 2; // Dobra a pontuação se a habilidade estiver ativada
//     }

//     setScore((prevScore) => Math.max(prevScore + points, 0));
//     setIsAnswerCorrect(isCorrect); // Armazena se a resposta foi correta ou não
//     onAnswer(isCorrect);

//     // Avança para a próxima pergunta
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
//   };

//   const getPoints = (nivelDificuldade: number, isCorrect: boolean): number => {
//     if (excludeWrongAnswers) {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 2 : -1;
//         case 2:
//           return isCorrect ? -5 : -10;
//         case 3:
//           return isCorrect ? -5 : -15;
//         default:
//           return 0;
//       }
//     } else {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 5 : -2;
//         case 2:
//           return isCorrect ? 10 : -5;
//         case 3:
//           return isCorrect ? 15 : -7;
//         default:
//           return 0;
//       }
//     }
//   };

//   const getFilteredAlternatives = (currentQuestion: Question) => {
//     if (excludeWrongAnswers) {
//       const correctAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 1);
//       const incorrectAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 0);

//       // Garantir que sempre haja uma alternativa incorreta
//       const displayedAlternatives = [...correctAlternatives];
//       if (incorrectAlternatives.length > 0) {
//         const randomIncorrect = incorrectAlternatives[Math.floor(Math.random() * incorrectAlternatives.length)];
//         displayedAlternatives.push(randomIncorrect);
//       }

//       // Ordenar alternativas com base no id para manter a ordem original
//       return displayedAlternatives.sort((a, b) => a.id - b.id);
//     }
//     // Ordenar alternativas com base no id para manter a ordem original
//     return currentQuestion.alternativas.sort((a, b) => a.id - b.id);
//   };

//   const currentQuestion: Question = questions[currentQuestionIndex];

//   return (
//     <div className="quiz-container">
//       <h2>{currentQuestion.texto_pergunta}</h2>
//       <div className="quiz-buttons">
//         {filteredAlternatives.map((alt) => (
//           <button
//             key={alt.id}
//             className="quiz-button"
//             onClick={() => handleAnswer(alt.is_correta === 1)}
//           >
//             {alt.texto_opcao}
//           </button>
//         ))}
//       </div>
//       {isAnswerCorrect !== null && (
//         <ScorePoints
//           nivelDificuldade={currentQuestion.nivel_dificuldade}
//           isCorrect={isAnswerCorrect}
//         />
//       )}
//       <div className="score-display">
//         <h3>Pontuação Total: {score}</h3>
//       </div>
//     </div>
//   );
// };

// export default Quiz;









"use client";

import questions from '../../../public/data.json';
import { useState, useEffect } from 'react';
import ScorePoints from '../scorepoints';
import './Quiz.css';
import axios from 'axios'; // Importar axios para fazer requisições HTTP

interface Alternative {
  id: number;
  texto_opcao: string;
  is_correta: number;
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
  const [score, setScore] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [filteredAlternatives, setFilteredAlternatives] = useState<Alternative[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    setFilteredAlternatives(getFilteredAlternatives(currentQuestion));
  }, [currentQuestionIndex, excludeWrongAnswers]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    let points = getPoints(currentQuestion.nivel_dificuldade, isCorrect);

    if (doublePoints) {
      points *= 2;
    }

    setScore((prevScore) => Math.max(prevScore + points, 0));
    setIsAnswerCorrect(isCorrect);
    onAnswer(isCorrect);

    // Avança para a próxima pergunta ou termina o quiz
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    if (nextIndex === 0) {
      // Assumindo que o quiz termina após a última pergunta
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const getPoints = (nivelDificuldade: number, isCorrect: boolean): number => {
    if (excludeWrongAnswers) {
      switch (nivelDificuldade) {
        case 1:
          return isCorrect ? 2 : -1;
        case 2:
          return isCorrect ? -5 : -10;
        case 3:
          return isCorrect ? -5 : -15;
        default:
          return 0;
      }
    } else {
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
    }
  };

  const getFilteredAlternatives = (currentQuestion: Question) => {
    if (excludeWrongAnswers) {
      const correctAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 1);
      const incorrectAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 0);

      const displayedAlternatives = [...correctAlternatives];
      if (incorrectAlternatives.length > 0) {
        const randomIncorrect = incorrectAlternatives[Math.floor(Math.random() * incorrectAlternatives.length)];
        displayedAlternatives.push(randomIncorrect);
      }

      return displayedAlternatives.sort((a, b) => a.id - b.id);
    }
    return currentQuestion.alternativas.sort((a, b) => a.id - b.id);
  };

  const saveScore = async () => {
    const jogador_id = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    if (!jogador_id) return; // Verifica se o id do jogador está disponível

    try {
      await axios.post('http://localhost:3000/score/registrarscore', {
        jogador_id,
        pontuacao: score
      });
      console.log('Pontuação salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a pontuação:', error);
    }
  };

  useEffect(() => {
    if (quizFinished) {
      saveScore();
    }
  }, [quizFinished]);

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











































// 'use client'

// import axiosInstance from '../../config/axiosInstance'
// import questions from '../../../public/data.json';
// import { useState, useEffect } from 'react';
// import ScorePoints from '../scorepoints';
// import './Quiz.css';

// interface Alternative {
//   id: number;
//   texto_opcao: string;
//   is_correta: number; // 0 para incorreto e 1 para correto
// }

// interface Question {
//   id: number;
//   texto_pergunta: string;
//   pontos: number;
//   nivel_dificuldade: number;
//   alternativas: Alternative[];
// }

// interface QuizProps {
//   onAnswer: (isCorrect: boolean) => void;
//   excludeWrongAnswers?: boolean;
//   doublePoints?: boolean;
//   currentQuestionIndex: number;
//   setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// const Quiz: React.FC<QuizProps> = ({ onAnswer, excludeWrongAnswers, doublePoints, currentQuestionIndex, setCurrentQuestionIndex }) => {
//   const [score, setScore] = useState(0);
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
//   const [filteredAlternatives, setFilteredAlternatives] = useState<Alternative[]>([]);
//   const [isQuizFinished, setIsQuizFinished] = useState(false);

//   // Supondo que você tenha o ID do jogador disponível
//   const jogadorId = 8; // Substitua pelo ID do jogador real

//   useEffect(() => {
//     if (currentQuestionIndex < questions.length) {
//       const currentQuestion = questions[currentQuestionIndex];
//       setFilteredAlternatives(getFilteredAlternatives(currentQuestion));
//     }
//   }, [currentQuestionIndex, excludeWrongAnswers]);

//   useEffect(() => {
//     return () => {
//       if (!isQuizFinished) {
//         saveScore(score);
//       }
//     };
//   }, [score, isQuizFinished]);

//   const handleAnswer = (isCorrect: boolean) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     let points = getPoints(currentQuestion.nivel_dificuldade, isCorrect);

//     if (doublePoints) {
//       points *= 2;
//     }

//     setScore((prevScore) => Math.max(prevScore + points, 0));
//     setIsAnswerCorrect(isCorrect);
//     onAnswer(isCorrect);

//     if (currentQuestionIndex + 1 === questions.length) {
//       saveScore(score + points);
//       setIsQuizFinished(true);
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const getPoints = (nivelDificuldade: number, isCorrect: boolean): number => {
//     if (excludeWrongAnswers) {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 2 : -1;
//         case 2:
//           return isCorrect ? -5 : -10;
//         case 3:
//           return isCorrect ? -5 : -15;
//         default:
//           return 0;
//       }
//     } else {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 5 : -2;
//         case 2:
//           return isCorrect ? 10 : -5;
//         case 3:
//           return isCorrect ? 15 : -7;
//         default:
//           return 0;
//       }
//     }
//   };

//   const getFilteredAlternatives = (currentQuestion: Question) => {
//     if (excludeWrongAnswers) {
//       const correctAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 1);
//       const incorrectAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 0);

//       const displayedAlternatives = [...correctAlternatives];
//       if (incorrectAlternatives.length > 0) {
//         const randomIncorrect = incorrectAlternatives[Math.floor(Math.random() * incorrectAlternatives.length)];
//         displayedAlternatives.push(randomIncorrect);
//       }

//       return displayedAlternatives.sort((a, b) => a.id - b.id);
//     }
//     return currentQuestion.alternativas.sort((a, b) => a.id - b.id);
//   };

//   const saveScore = async (finalScore: number) => {
//     try {
//       await axiosInstance.post('/registrarscore', { jogador_id: jogadorId, pontuacao: finalScore });
//     } catch (error) {
//       console.error('Erro ao salvar a pontuação:', error);
//     }
//   };

//   const handleExit = () => {
//     saveScore(score);
//     // Aqui você pode redirecionar ou fazer qualquer outra ação necessária
//   };

//   const currentQuestion: Question = questions[currentQuestionIndex];

//   if (isQuizFinished) {
//     return (
//       <div className="quiz-container">
//         <h2>Quiz Concluído!</h2>
//         <div className="score-display">
//           <h3>Pontuação Final: {score}</h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-container">
//       <h2>{currentQuestion.texto_pergunta}</h2>
//       <div className="quiz-buttons">
//         {filteredAlternatives.map((alt) => (
//           <button
//             key={alt.id}
//             className="quiz-button"
//             onClick={() => handleAnswer(alt.is_correta === 1)}
//           >
//             {alt.texto_opcao}
//           </button>
//         ))}
//       </div>
//       {isAnswerCorrect !== null && (
//         <ScorePoints
//           nivelDificuldade={currentQuestion.nivel_dificuldade}
//           isCorrect={isAnswerCorrect}
//         />
//       )}
//       <div className="score-display">
//         <h3>Pontuação Total: {score}</h3>
//       </div>
//       <button onClick={handleExit}>Sair</button> {/* Botão para sair do quiz */}
//     </div>
//   );
// };

// export default Quiz;

// import { useState, useEffect } from 'react';
// import { registrarScore, buscarPontuacao } from '../../config/axiosInstance'; // Ajuste o caminho conforme necessário
// import questions from '../../../public/data.json';
// import ScorePoints from '../scorepoints';
// import './Quiz.css';

// interface Alternative {
//   id: number;
//   texto_opcao: string;
//   is_correta: number; // 0 para incorreto e 1 para correto
// }

// interface Question {
//   id: number;
//   texto_pergunta: string;
//   pontos: number;
//   nivel_dificuldade: number;
//   alternativas: Alternative[];
// }

// interface QuizProps {
//   onAnswer: (isCorrect: boolean) => void;
//   excludeWrongAnswers?: boolean;
//   doublePoints?: boolean;
//   currentQuestionIndex: number;
//   setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// const Quiz: React.FC<QuizProps> = ({ onAnswer, excludeWrongAnswers, doublePoints, currentQuestionIndex, setCurrentQuestionIndex }) => {
//   const [score, setScore] = useState(0);
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
//   const [filteredAlternatives, setFilteredAlternatives] = useState<Alternative[]>([]);
//   const [isQuizFinished, setIsQuizFinished] = useState(false);
//   const [jogadorPontuacao, setJogadorPontuacao] = useState<number | null>(null);

//   // Supondo que você tenha o ID do jogador disponível
//   const jogadorId = 1; // Substitua pelo ID do jogador real

//   useEffect(() => {
//     if (currentQuestionIndex < questions.length) {
//       const currentQuestion = questions[currentQuestionIndex];
//       setFilteredAlternatives(getFilteredAlternatives(currentQuestion));
//     }
//   }, [currentQuestionIndex, excludeWrongAnswers]);

//   useEffect(() => {
//     if (!isQuizFinished) {
//       saveScore(score);
//     }
//   }, [score, isQuizFinished]);

//   useEffect(() => {
//     // Buscar pontuação inicial do jogador, se necessário
//     const fetchPontuacao = async () => {
//       const pontuacao = await buscarPontuacao(jogadorId);
//       setJogadorPontuacao(pontuacao ? pontuacao.pontuacao : 0);
//     };

//     fetchPontuacao();
//   }, [jogadorId]);

//   const handleAnswer = (isCorrect: boolean) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     let points = getPoints(currentQuestion.nivel_dificuldade, isCorrect);

//     if (doublePoints) {
//       points *= 2;
//     }

//     setScore((prevScore) => Math.max(prevScore + points, 0));
//     setIsAnswerCorrect(isCorrect);
//     onAnswer(isCorrect);

//     if (currentQuestionIndex + 1 === questions.length) {
//       saveScore(score + points);
//       setIsQuizFinished(true);
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const getPoints = (nivelDificuldade: number, isCorrect: boolean): number => {
//     if (excludeWrongAnswers) {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 2 : -1;
//         case 2:
//           return isCorrect ? -5 : -10;
//         case 3:
//           return isCorrect ? -5 : -15;
//         default:
//           return 0;
//       }
//     } else {
//       switch (nivelDificuldade) {
//         case 1:
//           return isCorrect ? 5 : -2;
//         case 2:
//           return isCorrect ? 10 : -5;
//         case 3:
//           return isCorrect ? 15 : -7;
//         default:
//           return 0;
//       }
//     }
//   };

//   const getFilteredAlternatives = (currentQuestion: Question) => {
//     if (excludeWrongAnswers) {
//       const correctAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 1);
//       const incorrectAlternatives = currentQuestion.alternativas.filter(alt => alt.is_correta === 0);

//       const displayedAlternatives = [...correctAlternatives];
//       if (incorrectAlternatives.length > 0) {
//         const randomIncorrect = incorrectAlternatives[Math.floor(Math.random() * incorrectAlternatives.length)];
//         displayedAlternatives.push(randomIncorrect);
//       }

//       return displayedAlternatives.sort((a, b) => a.id - b.id);
//     }
//     return currentQuestion.alternativas.sort((a, b) => a.id - b.id);
//   };

//   const saveScore = async (finalScore: number) => {
//     try {
//       await registrarScore(jogadorId, finalScore);
//     } catch (error) {
//       console.error('Erro ao salvar a pontuação:', error);
//     }
//   };

//   const handleExit = () => {
//     saveScore(score);
//     // Aqui você pode redirecionar ou fazer qualquer outra ação necessária
//   };

//   const currentQuestion: Question = questions[currentQuestionIndex];

//   if (isQuizFinished) {
//     return (
//       <div className="quiz-container">
//         <h2>Quiz Concluído!</h2>
//         <div className="score-display">
//           <h3>Pontuação Final: {score}</h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-container">
//       <h2>{currentQuestion.texto_pergunta}</h2>
//       <div className="quiz-buttons">
//         {filteredAlternatives.map((alt) => (
//           <button
//             key={alt.id}
//             className="quiz-button"
//             onClick={() => handleAnswer(alt.is_correta === 1)}
//           >
//             {alt.texto_opcao}
//           </button>
//         ))}
//       </div>
//       {isAnswerCorrect !== null && (
//         <ScorePoints
//           nivelDificuldade={currentQuestion.nivel_dificuldade}
//           isCorrect={isAnswerCorrect}
//         />
//       )}
//       <div className="score-display">
//         <h3>Pontuação Total: {score}</h3>
//       </div>
//       <button onClick={handleExit}>Sair</button> {/* Botão para sair do quiz */}
//     </div>
//   );
// };

// export default Quiz;