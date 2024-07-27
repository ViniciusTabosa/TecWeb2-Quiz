import React from 'react'; // Ajuste o caminho conforme necessário
import styles from './page.module.css'; // Se necessário, ajuste ou remova esta importação
import Character from '@/components/characters';
import Quiz from '@/components/Quiz/incex';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Escolha Seu Personagem</h1>

      <Quiz />
    </main>
  );
}
