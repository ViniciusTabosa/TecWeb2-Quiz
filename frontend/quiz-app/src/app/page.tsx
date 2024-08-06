import './globals.css'
import React from 'react'; // Ajuste o caminho conforme necessário
import styles from './page.module.css'; // Se necessário, ajuste ou remova esta importação
import { Home } from '@/components/home'
import Logo from '@/app/fotos_do site/Starion_Logo2.png'
import { Cadastro } from '@/components/Cadastro';
import { Login } from '@/components/Login';
import { Resultados } from '@/components/Resultados';
import Character from '@/components/characters';

export default function page() {
  return (
    <>
      {/* <main className={styles.main}> */}
      
    
         <header className='header-bg'>
          <div className="logo">
            <img src={Logo.src} alt="" />
          </div>
          <nav className="nav">
            <ul>
                <li><a href="/" className="btn-Entar">Entrar</a></li>
                <li><a href="/" className="btn-Conta">Criar conta</a></li>
            </ul>
          </nav>
        </header>
        <div className="estrela"></div>
        <div className="estrela2"></div>
        <div className="estrela3"></div>
        <div className="estrela4"></div> 
 
      {/* <Character /> */}
      {/* <Resultados />  */}
      {/* <Login />  */}
       {/* <Cadastro />  */}
        <Home />    
      {/* </main> */}
    </>
  )
}
