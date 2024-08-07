import React from 'react';

interface ScorePointsProps {
  nivelDificuldade: number;
  isCorrect: boolean;
}

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

const ScorePoints: React.FC<ScorePointsProps> = ({ nivelDificuldade, isCorrect }) => {
  const points = getPoints(nivelDificuldade, isCorrect);

  return (
    <div className="score-points">
      {isCorrect ? (
        <p>Parabéns, você acertou!</p>
      ) : (
        <p>Infelizmente você errou.</p>
      )}
    </div>
  );
};

export default ScorePoints;