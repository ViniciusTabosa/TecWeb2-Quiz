"use client";

import React, { useState } from 'react';
import Ability from '@/components/Ability';
import { StaticImageData } from 'next/image';
import Character from '@/components/characters';
import { Fundo } from '@/app/Fundo';


type Characters = {
  name: string;
  phrase: string;
  advantage: string;
  disadvantage: string;
  description: string;
  image: StaticImageData;
  id: number;
};

const CharacterPage: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Characters | null>(null);

  const handleCharacterSelection = (character: Characters) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <Fundo />
      {!selectedCharacter ? (
        <Character onSelectCharacter={handleCharacterSelection} />
      ) : (
        <Ability selectedCharacter={selectedCharacter} />
      )}
    </div>
  );
};

export default CharacterPage;