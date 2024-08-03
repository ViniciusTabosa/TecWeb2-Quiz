"use client";

import './characters.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards'; // Importar o CSS específico para o efeito "Cards"
import character1 from '../../assets/characters/1.png';
import character2 from '../../assets/characters/2.png';
import character3 from '../../assets/characters/3.png';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { StaticImageData } from 'next/image';
import Questions from '../Questions';

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
      <div className="swiper-button-prev-custom"></div> {/* Adicionado botão de seta anterior */}
      <Swiper
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
      {selectedCharacter && (
        <div className="selected-character">
          <h3>Personagem Selecionado:</h3>
          <p>{selectedCharacter.name}</p>
          <Questions selectedCharacter={selectedCharacter} /> {/* Passa o personagem selecionado para o Quiz */}
        </div>
      )}
    </div>
  );
};

export default Character;

