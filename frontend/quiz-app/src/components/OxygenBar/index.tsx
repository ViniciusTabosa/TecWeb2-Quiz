import React from 'react';
import './OxygenBar.css'; // Certifique-se de que o caminho para o CSS está correto

interface OxygenBarProps {
  oxygenLevel: number;
}

const OxygenBar: React.FC<OxygenBarProps> = ({ oxygenLevel }) => {
  // Determina a classe da barra com base no nível de oxigênio
  const getClassName = (level: number) => {
    if (level < 20) return 'oxygen-bar-red'; // Vermelho
    if (level < 60) return 'oxygen-bar-yellow'; // Amarelo
    return 'oxygen-bar-green'; // Verde
  };

  return (
    <div className="oxygen-bar-container">
      <div 
        className={`oxygen-bar ${getClassName(oxygenLevel)}`} 
        style={{ width: `${oxygenLevel}%` }}
      />
    </div>
  );
};

export default OxygenBar;