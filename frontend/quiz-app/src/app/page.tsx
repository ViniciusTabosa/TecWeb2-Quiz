import React from 'react'; // Ajuste o caminho conforme necessário
import styles from './page.module.css'; // Se necessário, ajuste ou remova esta importação
import { BrowserRouter } from 'react-router-dom';

export default function Home() {
  return (
    <main className={styles.main}>
      <BrowserRouter>
      </BrowserRouter>
    </main>
  );
}
