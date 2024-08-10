"use client";


import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import character1 from '../../assets/characters/1.png';
import character2 from '../../assets/characters/2.png';
import character3 from '../../assets/characters/3.png';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { StaticImageData } from 'next/image';
import SoundsComp from '../soundscomp'; 
import './characters.css'

type Characters = {
  name: string;
  phrase: string;
  advantage: string;
  disadvantage: string;
  description: string;
  image: StaticImageData;
  id: number;
};

const characters: Characters[] = [
  {
    name: 'Astro the Navigator',
    phrase: 'Rumo ao infinito e além!',
    advantage: 'Clear Path - Exclui duas alternativas erradas.',
    disadvantage: 'Point Surge - A pergunta passa a valer menos pontos.',
    description: 'Astro é um navegador estelar lendário. Ele pode eliminar alternativas erradas, traçando um caminho claro, mas cada atalho vem com um custo elevado.',
    image: character1,
    id: 1
  },
  {
    name: 'Luna the Dreamer',
    phrase: 'Sonhe grande, descubra mais!',
    advantage: 'Dream Skip - Pode pular uma pergunta sem penalidade.',
    disadvantage: 'No points - Não ganha a pontuação da pergunta pulada.',
    description: 'Luna é uma sonhadora mística que vislumbra o futuro em seus devaneios. Seus olhos brilham com a luz das galáxias, permitindo-lhe evitar obstáculos inesperados, mas nem sempre suas visões trazem recompensas.',
    image: character2,
    id: 2
  },
  {
    name: 'Sol the Explorer',
    phrase: 'Desbrave o desconhecido!',
    advantage: 'Double Discovery - Dobra a pontuação de uma pergunta.',
    disadvantage: 'Severe Penalty - Penalidade maior de oxigênio em erros subsequentes.',
    description: 'Sol é um explorador audacioso que consegue ampliar em dobro suas descobertas. Infelizmente, sua habilidade tem um custo, pois qualquer erro subsequente impõe uma severa penalidade de oxigênio.',
    image: character3,
    id: 3
  },
];

interface CharacterProps {
  onSelectCharacter: (character: Characters) => void;
}

const Character: React.FC<CharacterProps> = ({ onSelectCharacter }) => {
  const swiperRef = useRef<any>(null); 

  const handleSelectCharacter = (character: Characters) => {
    onSelectCharacter(character);
  };

  const getClassNameForCharacter = (character: Characters) => {
    switch (character.id) {
      case 1:
        return 'character-image character-image-astro';
      case 2:
        return 'character-image character-image-luna';
      case 3:
        return 'character-image character-image-sol';
      default:
        return 'character-image';
    }
  };

  return (
    <div className='swiper-container'>
      <SoundsComp swiperRef={swiperRef} />
      <div className="swiper-button-prev-custom"></div> {/* Adicionado botão de seta anterior */}
      <Swiper
        ref={swiperRef} // Adiciona a referência aqui
        effect="cards" // Define o efeito de transição como "cards"
        speed={1000}
        modules={[Navigation, Pagination, EffectCards]} // Inclua o módulo de efeito "Cards"
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }}
        loop={true}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.id}>
            <div className="character-card">
              <div className='character-name-container'>
                <h3 className='character-name'>{character.name}</h3>
                <div className='character-image-container'>
                  <img src={character.image.src} alt={character.name} className={getClassNameForCharacter(character)} />
                </div>
                <div className='character-phrase'>
                  <p><strong>{character.phrase}</strong></p>
                </div>
              </div>
              <div className='character-button-container'>
                <div className='character-description-container'>
                  <p className="character-description">{character.description}</p>
                  <p><strong>Vantagem:</strong> {character.advantage}</p>
                  <p><strong>Desvantagem:</strong> {character.disadvantage}</p>
                </div>
                <button className='select-button' onClick={() => handleSelectCharacter(character)}>Selecionar</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next-custom"></div> {/* Adicionado botão de seta seguinte */}
    </div>
  );
};

export default Character;

