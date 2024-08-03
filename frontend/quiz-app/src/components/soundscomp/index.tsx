import { useEffect, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import 'swiper/swiper-bundle.css';

type SoundsCompProps = {
  swiperRef: React.RefObject<SwiperRef>;
};

const SoundsComp: React.FC<SoundsCompProps> = ({ swiperRef }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Estado para verificar o carregamento inicial

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reseta o áudio para o início
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    if (!swiperInstance) {
      return;
    }

    const handleSlideChange = () => {
      if (!isInitialLoad) {
        playAudio();
      } else {
        setIsInitialLoad(false); // Atualiza o estado para indicar que a página foi carregada
      }
    };

    swiperInstance.on('slideChange', handleSlideChange);

    return () => {
      swiperInstance.off('slideChange', handleSlideChange);
    };
  }, [swiperRef, isInitialLoad]);

  return (
    <div>
      <audio 
        src='/sounds/flipcard.mp3' 
        ref={audioRef}
      />
    </div>
  );
};

export default SoundsComp;