// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import OxygenBar from '../OxygenBar';
// import Quiz from '../Quiz';
// import questions from '../../../public/data.json';
// import './Ability.css';

// interface Character {
//   name: string;
//   advantage: string;
//   disadvantage: string;
// }

// interface QuestionsProps {
//   selectedCharacter: Character | null;
// }

// const Ability: React.FC<QuestionsProps> = ({ selectedCharacter }) => {
//   const [oxygenLevel, setOxygenLevel] = useState(100);
//   const [isQuizOver, setIsQuizOver] = useState(false);
//   const [penalty, setPenalty] = useState(4); // Penalidade padrão para erro
//   const [hasUsedExclude, setHasUsedExclude] = useState(false); // Estado para rastrear se a habilidade "Excluir Alternativas Erradas" foi usada
//   const [hasUsedDouble, setHasUsedDouble] = useState(false); // Estado para rastrear se a habilidade "Dobrar Pontos" foi usada
//   const [hasUsedSkip, setHasUsedSkip] = useState(false); // Estado para rastrear se a habilidade "Pular Pergunta" foi usada
//   const [excludeForCurrentQuestion, setExcludeForCurrentQuestion] = useState(false); // Estado para excluir alternativas para a pergunta atual
//   const [doubleForCurrentQuestion, setDoubleForCurrentQuestion] = useState(false); // Estado para dobrar pontos para a pergunta atual
//   const [infoBox, setInfoBox] = useState<string | null>(null); // Estado para controlar a exibição da caixa de informações
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     startOxygenTimer();
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const startOxygenTimer = () => {
//     timerRef.current = setInterval(() => {
//       setOxygenLevel((prevLevel) => {
//         if (prevLevel <= 0) {
//           clearInterval(timerRef.current!);
//           setIsQuizOver(true);
//           console.log('Quiz terminado: Nível de oxigênio chegou a zero.');
//           return 0;
//         }
//         const decreaseRate = 1;
//         return Math.max(prevLevel - decreaseRate, 0);
//       });
//     }, 1000);
//   };

//   const handleAnswer = (isCorrect: boolean) => {
//     if (isQuizOver) return;

//     if (isCorrect) {
//       setOxygenLevel((prevLevel) => Math.min(prevLevel + 5, 100));
//       console.log(`Resposta correta: Aumentou o nível de oxigênio em 5.`);
//     } else {
//       // Verificar se o personagem é "Sol the Dreamer" e se a habilidade foi usada
//       if (selectedCharacter?.name === 'Sol the Dreamer' && hasUsedDouble) {
//         setOxygenLevel((prevLevel) => Math.max(prevLevel - 5, 0));
//         console.log('Resposta incorreta: Diminuiu o nível de oxigênio em 5 devido à habilidade de Sol the Dreamer.');
//       } else {
//         setOxygenLevel((prevLevel) => Math.max(prevLevel - penalty, 0));
//         console.log(`Resposta incorreta: Diminuiu o nível de oxigênio em ${penalty}.`);
//       }
//     }

//     // Resetar habilidades específicas após cada pergunta
//     setExcludeForCurrentQuestion(false);
//     setDoubleForCurrentQuestion(false);

//     if (timerRef.current) clearInterval(timerRef.current);
//     startOxygenTimer();
//   };

//   const handleSkip = () => {
//     if (isQuizOver || hasUsedSkip) return;

//     setHasUsedSkip(true); // Marca a habilidade como usada
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Avança para a próxima pergunta
//     console.log('Pergunta pulada.');
//   };

//   const handleExcludeWrongAnswers = () => {
//     if (isQuizOver || hasUsedExclude) return;

//     setExcludeForCurrentQuestion(true); // Excluir alternativas para a pergunta atual
//     setHasUsedExclude(true); // Marca a habilidade como usada
//     console.log('Alternativas erradas excluídas.');
//   };

//   const handleDoublePoints = () => {
//     if (isQuizOver || hasUsedDouble) return;

//     setDoubleForCurrentQuestion(true); // Dobrar pontos para a pergunta atual
//     setHasUsedDouble(true); // Marca a habilidade como usada
//     setPenalty(5); // Ajusta a penalidade de oxigênio para -5
//     console.log('Pontuação da pergunta atual dobrada.');
//   };

//   return (
//     <div className='ability-container'>
//       <div className="side-bar">
//         <OxygenBar oxygenLevel={oxygenLevel} />
//       </div>
//       {isQuizOver ? (
//         <div className="quiz-over">
//           <h2>Quiz Terminado</h2>
//           <p>Seu nível de oxigênio chegou a zero.</p>
//         </div>
//       ) : (
//         <div>
//           <Quiz 
//             onAnswer={handleAnswer} 
//             excludeWrongAnswers={selectedCharacter?.name === 'Astro the Navigator' && excludeForCurrentQuestion}
//             doublePoints={selectedCharacter?.name === 'Sol the Explorer' && doubleForCurrentQuestion}
//             currentQuestionIndex={currentQuestionIndex}
//             setCurrentQuestionIndex={setCurrentQuestionIndex}
//           />
//           <div className="button-container">
//             {selectedCharacter && selectedCharacter.name === 'Luna the Dreamer' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleSkip}
//                   disabled={hasUsedSkip}
//                   onMouseEnter={() => setInfoBox('skip')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Pular Pergunta
//                 </button>
//                 {infoBox === 'skip' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             {selectedCharacter && selectedCharacter.name === 'Astro the Navigator' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleExcludeWrongAnswers}
//                   disabled={hasUsedExclude}
//                   onMouseEnter={() => setInfoBox('exclude')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Excluir Alternativas Erradas
//                 </button>
//                 {infoBox === 'exclude' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             {selectedCharacter && selectedCharacter.name === 'Sol the Explorer' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleDoublePoints}
//                   disabled={hasUsedDouble}
//                   onMouseEnter={() => setInfoBox('double')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Dobrar Pontos
//                 </button>
//                 {infoBox === 'double' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ability;

// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import OxygenBar from '../OxygenBar';
// import Quiz from '../Quiz';
// import questions from '../../../public/data.json';
// import './Ability.css';

// interface Character {
//   name: string;
//   advantage: string;
//   disadvantage: string;
// }

// interface QuestionsProps {
//   selectedCharacter: Character | null;
// }

// const Ability: React.FC<QuestionsProps> = ({ selectedCharacter }) => {
//   const [oxygenLevel, setOxygenLevel] = useState(100);
//   const [isQuizOver, setIsQuizOver] = useState(false);
//   const [penalty, setPenalty] = useState(4); // Penalidade padrão para erro
//   const [hasUsedExclude, setHasUsedExclude] = useState(false); // Estado para rastrear se a habilidade "Excluir Alternativas Erradas" foi usada
//   const [hasUsedDouble, setHasUsedDouble] = useState(false); // Estado para rastrear se a habilidade "Dobrar Pontos" foi usada
//   const [hasUsedSkip, setHasUsedSkip] = useState(false); // Estado para rastrear se a habilidade "Pular Pergunta" foi usada
//   const [excludeForCurrentQuestion, setExcludeForCurrentQuestion] = useState(false); // Estado para excluir alternativas para a pergunta atual
//   const [doubleForCurrentQuestion, setDoubleForCurrentQuestion] = useState(false); // Estado para dobrar pontos para a pergunta atual
//   const [infoBox, setInfoBox] = useState<string | null>(null); // Estado para controlar a exibição da caixa de informações
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0); // Adiciona estado para a pontuação
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     startOxygenTimer();
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const startOxygenTimer = () => {
//     timerRef.current = setInterval(() => {
//       setOxygenLevel((prevLevel) => {
//         if (prevLevel <= 0) {
//           clearInterval(timerRef.current!);
//           setIsQuizOver(true);
//           console.log('Quiz terminado: Nível de oxigênio chegou a zero.');
//           saveScore(); // Salva a pontuação quando o quiz termina por oxigênio
//           return 0;
//         }
//         const decreaseRate = 1;
//         return Math.max(prevLevel - decreaseRate, 0);
//       });
//     }, 1000);
//   };

//   const saveScore = async () => {
//     const jogador_id = JSON.parse(localStorage.getItem('usuario') || '{}').id;
//     console.log(jogador_id);
//     console.log(score)
//     if (!jogador_id) return; // Verifica se o id do jogador está disponível

//     try {
//       const response = await axios.post('http://localhost:3000/score/registrarscore', {
//         jogador_id,
//         pontuacao: score // Pontuação obtida no quiz
//       });

//       console.log('Pontuação salva com sucesso:', response.data);
//     } catch (error) {
//       console.error('Erro ao salvar a pontuação:', error);
//     }
//   };

//   const handleAnswer = (isCorrect: boolean) => {
//     if (isQuizOver) return;

//     if (isCorrect) {
//       setOxygenLevel((prevLevel) => Math.min(prevLevel + 5, 100));
//       setScore((prevScore) => prevScore + (doubleForCurrentQuestion ? 2 : 1)); // Atualiza a pontuação
//       console.log('Resposta correta: Aumentou o nível de oxigênio em 5.');
//     } else {
//       if (selectedCharacter?.name === 'Sol the Dreamer' && hasUsedDouble) {
//         setOxygenLevel((prevLevel) => Math.max(prevLevel - 5, 0));
//         console.log('Resposta incorreta: Diminuiu o nível de oxigênio em 5 devido à habilidade de Sol the Dreamer.');
//       } else {
//         setOxygenLevel((prevLevel) => Math.max(prevLevel - penalty, 0));
//         console.log(`Resposta incorreta: Diminuiu o nível de oxigênio em ${penalty}.`);
//       }
//     }

//     // Resetar habilidades específicas após cada pergunta
//     setExcludeForCurrentQuestion(false);
//     setDoubleForCurrentQuestion(false);

//     if (timerRef.current) clearInterval(timerRef.current);
//     startOxygenTimer();

//     // Verifica se todas as perguntas foram respondidas
//     if (currentQuestionIndex === questions.length - 1) {
//       setIsQuizOver(true);
//       console.log('Quiz terminado: Todas as perguntas foram respondidas.');
//       saveScore(); // Salva a pontuação quando o quiz termina por conclusão das perguntas
//     }
//   };

//   const handleSkip = () => {
//     if (isQuizOver || hasUsedSkip) return;

//     setHasUsedSkip(true); // Marca a habilidade como usada
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Avança para a próxima pergunta
//     console.log('Pergunta pulada.');
//   };

//   const handleExcludeWrongAnswers = () => {
//     if (isQuizOver || hasUsedExclude) return;

//     setExcludeForCurrentQuestion(true); // Excluir alternativas para a pergunta atual
//     setHasUsedExclude(true); // Marca a habilidade como usada
//     console.log('Alternativas erradas excluídas.');
//   };

//   const handleDoublePoints = () => {
//     if (isQuizOver || hasUsedDouble) return;

//     setDoubleForCurrentQuestion(true); // Dobrar pontos para a pergunta atual
//     setHasUsedDouble(true); // Marca a habilidade como usada
//     setPenalty(5); // Ajusta a penalidade de oxigênio para -5
//     console.log('Pontuação da pergunta atual dobrada.');
//   };

//   return (
//     <div className='ability-container'>
//       <div className="side-bar">
//         <OxygenBar oxygenLevel={oxygenLevel} />
//       </div>
//       {isQuizOver ? (
//         <div className="quiz-over">
//           <h2>Quiz Terminado</h2>
//           <p>Seu nível de oxigênio chegou a zero.</p>
//         </div>
//       ) : (
//         <div>
//           <Quiz 
//             onAnswer={handleAnswer} 
//             excludeWrongAnswers={selectedCharacter?.name === 'Astro the Navigator' && excludeForCurrentQuestion}
//             doublePoints={selectedCharacter?.name === 'Sol the Explorer' && doubleForCurrentQuestion}
//             currentQuestionIndex={currentQuestionIndex}
//             setCurrentQuestionIndex={setCurrentQuestionIndex}
//           />
//           <div className="button-container">
//             {selectedCharacter && selectedCharacter.name === 'Luna the Dreamer' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleSkip}
//                   disabled={hasUsedSkip}
//                   onMouseEnter={() => setInfoBox('skip')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Pular Pergunta
//                 </button>
//                 {infoBox === 'skip' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             {selectedCharacter && selectedCharacter.name === 'Astro the Navigator' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleExcludeWrongAnswers}
//                   disabled={hasUsedExclude}
//                   onMouseEnter={() => setInfoBox('exclude')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Excluir Alternativas Erradas
//                 </button>
//                 {infoBox === 'exclude' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             {selectedCharacter && selectedCharacter.name === 'Sol the Explorer' && (
//               <div className="button-wrapper">
//                 <button
//                   onClick={handleDoublePoints}
//                   disabled={hasUsedDouble}
//                   onMouseEnter={() => setInfoBox('double')}
//                   onMouseLeave={() => setInfoBox(null)}
//                 >
//                   Dobrar Pontos
//                 </button>
//                 {infoBox === 'double' && (
//                   <div className="info-box">
//                     <span className="info-icon"><i className="fas fa-exclamation-circle"></i></span>
//                     <div>
//                       <p><strong>Vantagem:</strong> {selectedCharacter.advantage}</p>
//                       <p><strong>Desvantagem:</strong> {selectedCharacter.disadvantage}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ability;











"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import OxygenBar from '../OxygenBar';
import Quiz from '../Quiz';
import questions from '../../../public/data.json';
import './Ability.css';

interface Character {
  name: string;
  advantage: string;
  disadvantage: string;
}

interface QuestionsProps {
  selectedCharacter: Character | null;
}

const Ability: React.FC<QuestionsProps> = ({ selectedCharacter }) => {
  const [oxygenLevel, setOxygenLevel] = useState(100);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [penalty, setPenalty] = useState(4); // Penalidade padrão para erro
  const [hasUsedExclude, setHasUsedExclude] = useState(false); // Estado para rastrear se a habilidade "Excluir Alternativas Erradas" foi usada
  const [hasUsedDouble, setHasUsedDouble] = useState(false); // Estado para rastrear se a habilidade "Dobrar Pontos" foi usada
  const [hasUsedSkip, setHasUsedSkip] = useState(false); // Estado para rastrear se a habilidade "Pular Pergunta" foi usada
  const [excludeForCurrentQuestion, setExcludeForCurrentQuestion] = useState(false); // Estado para excluir alternativas para a pergunta atual
  const [doubleForCurrentQuestion, setDoubleForCurrentQuestion] = useState(false); // Estado para dobrar pontos para a pergunta atual
  const [infoBox, setInfoBox] = useState<string | null>(null); // Estado para controlar a exibição da caixa de informações
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Adiciona estado para a pontuação
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
          saveScore(); // Salva a pontuação quando o quiz termina por oxigênio
          return 0;
        }
        const decreaseRate = 1;
        return Math.max(prevLevel - decreaseRate, 0);
      });
    }, 1000);
  };

  const saveScore = async () => {
    const jogador_id = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    console.log(jogador_id);
    console.log(score)
    if (!jogador_id) return; // Verifica se o id do jogador está disponível

    try {
      const response = await axios.post('http://localhost:3000/score/registrarscore', {
        jogador_id,
        pontuacao: score // Pontuação obtida no quiz
      });

      console.log('Pontuação salva com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao salvar a pontuação:', error);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isQuizOver) return;

    if (isCorrect) {
      setOxygenLevel((prevLevel) => Math.min(prevLevel + 5, 100));
      setScore((prevScore) => prevScore + (doubleForCurrentQuestion ? 2 : 1)); // Atualiza a pontuação
      console.log('Resposta correta: Aumentou o nível de oxigênio em 5.');
    } else {
      if (selectedCharacter?.name === 'Sol the Dreamer' && hasUsedDouble) {
        setOxygenLevel((prevLevel) => Math.max(prevLevel - 5, 0));
        console.log('Resposta incorreta: Diminuiu o nível de oxigênio em 5 devido à habilidade de Sol the Dreamer.');
      } else {
        setOxygenLevel((prevLevel) => Math.max(prevLevel - penalty, 0));
        console.log('Resposta incorreta: Diminuiu o nível de oxigênio em ${penalty}.');
      }
    }

    // Resetar habilidades específicas após cada pergunta
    setExcludeForCurrentQuestion(false);
    setDoubleForCurrentQuestion(false);

    if (timerRef.current) clearInterval(timerRef.current);
    startOxygenTimer();

    // Verifica se todas as perguntas foram respondidas
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizOver(true);
      console.log('Quiz terminado: Todas as perguntas foram respondidas.');
      saveScore(); // Salva a pontuação quando o quiz termina por conclusão das perguntas
    }
  };

  const handleSkip = () => {
    if (isQuizOver || hasUsedSkip) return;

    setHasUsedSkip(true); // Marca a habilidade como usada
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Avança para a próxima pergunta
    console.log('Pergunta pulada.');
  };

  const handleExcludeWrongAnswers = () => {
    if (isQuizOver || hasUsedExclude) return;

    setExcludeForCurrentQuestion(true); // Excluir alternativas para a pergunta atual
    setHasUsedExclude(true); // Marca a habilidade como usada
    console.log('Alternativas erradas excluídas.');
  };

  const handleDoublePoints = () => {
    if (isQuizOver || hasUsedDouble) return;

    setDoubleForCurrentQuestion(true); // Dobrar pontos para a pergunta atual
    setHasUsedDouble(true); // Marca a habilidade como usada
    setPenalty(5); // Ajusta a penalidade de oxigênio para -5
    console.log('Pontuação da pergunta atual dobrada.');
  };

  return (
    <div className='ability-container'>
      <div className="side-bar">
        <OxygenBar oxygenLevel={oxygenLevel} />
      </div>
      {isQuizOver ? (
        <div className="quiz-over">
          <h2>Quiz Terminado</h2>
          <p>Seu nível de oxigênio chegou a zero.</p>
        </div>
      ) : (
        <div>
          <Quiz 
            onAnswer={handleAnswer} 
            excludeWrongAnswers={selectedCharacter?.name === 'Astro the Navigator' && excludeForCurrentQuestion}
            doublePoints={selectedCharacter?.name === 'Sol the Explorer' && doubleForCurrentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
          <div className="button-container">
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
        </div>
      )}
    </div>
  );
};

export default Ability;