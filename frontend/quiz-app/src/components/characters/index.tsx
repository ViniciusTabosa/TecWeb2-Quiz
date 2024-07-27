"use client";

import './characters.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import character1 from '../../assets/characters/1.png';
import character2 from '../../assets/characters/2.png';
import character3 from '../../assets/characters/3.png';
import { Navigation, Pagination } from 'swiper/modules';
import { StaticImageData } from 'next/image';
import Quiz from '../Quiz'; // Importe o componente Quiz

type Characters = {
  name: string;
  advantage: string;
  disadvantage: string;
  description: string;
  image: StaticImageData;
  id: number;
};

const characters: Characters[] = [
  {
    name: 'Astro the Navigator',
    advantage: 'Precise Insights',
    disadvantage: 'Slow Recovery',
    description: 'An expert navigator with an uncanny ability to find the best routes through the stars.',
    image: character1,
    id: 1
  },
  {
    name: 'Luna the Dreamer',
    advantage: 'Visionary Thoughts',
    disadvantage: 'Inconsistent Visions',
    description: 'A dreamer who often envisions the future, though her insights can be unpredictable.',
    image: character2,
    id: 2
  },
  {
    name: 'Sol the Explorer',
    advantage: 'Cosmic Knowledge',
    disadvantage: 'Knowledge Gaps',
    description: 'An explorer with vast knowledge of the cosmos, but occasionally misses crucial details.',
    image: character3,
    id: 3
  },
];

const Character = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Characters | null>(null);

  const handleSelectCharacter = (character: Characters) => {
    setSelectedCharacter(character);
    console.log(`Personagem selecionado: ${character.id}`); // Agora você pode acessar o id
  };

  useEffect(() => {
    if (selectedCharacter) {
      console.log(`Personagem selecionado: ${selectedCharacter.name}`);
    }
  }, [selectedCharacter]);

  return (
    <div className='swiper-container'>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.id}>
            <div className="character-card">
              <img src={character.image.src} alt={character.name} className="character-image" />
              <h3>{character.name}</h3>
              <p className="character-description">{character.description}</p>
              <p><strong>Vantagem:</strong> {character.advantage}</p>
              <p><strong>Desvantagem:</strong> {character.disadvantage}</p>
              <button className='select-button' onClick={() => handleSelectCharacter(character)}>Selecionar</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedCharacter && (
        <div className="selected-character">
          <h3>Personagem Selecionado:</h3>
          <p>{selectedCharacter.name}</p>
          <Quiz selectedCharacter={selectedCharacter} /> {/* Passa o personagem selecionado para o Quiz */}
        </div>
      )}
    </div>
  );
};

export default Character;

