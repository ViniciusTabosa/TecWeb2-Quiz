"use client";

import React, { useState, useEffect, useRef } from 'react';
import OxygenBar from '../OxygenBar'; 

const Quiz = () => {
    const [oxygenLevel, setOxygenLevel] = useState(100);
    const timerRef = useRef<NodeJS.Timeout | null>(null); 
  
    useEffect(() => {
      // Diminui o oxigênio com o tempo
      timerRef.current = setInterval(() => {
        setOxygenLevel((prevLevel) => Math.max(prevLevel - 1, 0));
      }, 1000); // Atualiza a cada segundo
  
      // Limpa o intervalo quando o componente desmonta
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, []);
  
    const handleAnswer = (isCorrect: boolean) => {
      if (isCorrect) {
        setOxygenLevel((prevLevel) => Math.min(prevLevel + 10, 100)); // Aumenta o oxigênio em 10, com um máximo de 100
      } else {
        setOxygenLevel((prevLevel) => Math.max(prevLevel - 20, 0)); // Diminui o oxigênio em 20, com um mínimo de 0
      }
  
      // Reinicia o temporizador de oxigênio se uma nova pergunta for feita
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setOxygenLevel((prevLevel) => Math.max(prevLevel - 1, 0));
      }, 1000);
    };
  
    return (
      <div>
        <OxygenBar oxygenLevel={oxygenLevel} />
        <div>
          {/* Aqui você pode colocar sua lógica de perguntas */}
          <button onClick={() => handleAnswer(true)}>Resposta Correta</button>
          <button onClick={() => handleAnswer(false)}>Resposta Incorreta</button>
        </div>
      </div>
    );
  };
  
  export default Quiz;