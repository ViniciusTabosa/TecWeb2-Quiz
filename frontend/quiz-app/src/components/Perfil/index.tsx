"use client";


import './perfil.css'
import Img from '@/app/fotos_do site/moon.png'
import React, { useState } from 'react';
import DeletarContaBotao from '../deletarConta';
import CustomAlert from '../CustomAlert';
import '../customAlert.css'

import Link from 'next/link'

export const Perfil: React.FC = () => {

    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteAccount = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return(
        <div className="container-perfil-bg">

            {showAlert && (
                <CustomAlert 
                    message="Conta deletada com sucesso!" 
                    onClose={handleCloseAlert} 
                />
            )}

            <div className="container-perfil"> 
                <div className="desc">
                    <h2 className="titulo-perfil">Perfil</h2>
                    <h3 className="subtitulo-nome">Nome do usuário</h3>
                    <img src={Img.src} alt=""/>
                </div>
                <div className="desc2">
                    <Link href="/pages/home" className="btn-voltar">Voltar</Link>
                    <Link href="/" className="btn-jogar">Jogar</Link>
                    <Link href="/pages/resultados" className="btn-podio">Pódio</Link>
                    <DeletarContaBotao onDelete={handleDeleteAccount} />
                </div>
            </div>
            <div className='regras'>
                <h2 className='titulo-regras'>Funcionamento do jogo</h2>
                <div className='container-explicacao'>
                    <p>Após clicar em jogar, o jogador será redirecionado para uma página para escolher seu personagem, em que cada um possui uma habilidade diferente. </p>
                    <p>O quiz é dividido em 3 níveis e cada um com uma pontuação diferente de ganho e perda.  </p>
                    <div className="niveis">
                        <div className="acertos">
                           <h3 className='subtitulo-niveis'>Ganhos de ponto</h3>
                           <p className='nivel'>Fácil: 5 pontos</p>
                           <p className='nivel'>Médio: 10 pontos</p>
                           <p className='nivel'>Difícil: 15 pontos</p>
                        </div>
                        <div className="erros">
                           <h3 className='subtitulo-niveis'>Perda de pontos</h3>
                           <p className='nivel'>Fácil: 2 pontos</p>
                           <p className='nivel'>Médio: 5 pontos</p>
                           <p className='nivel'>Difícil: 7 pontos</p>
                        </div>
                    </div>
                    <p>Durante o jogo, vai ser exibido na tela uma barra de oxigênio que vai simbolizar o tempo que o jogador terá para responder todas as perguntas, 1 minuto no total. O jogador irá perder ou ganhar oxigênio na medida que acerta ou erra a questão.</p>
                    <div className='oxigenio'>
                        <div className='oxiacertos'>
                            <h3 className='subtitulo-oxi'>Ganho de oxigênio</h3>
                            <p className='oxi'>5 ganhos</p>
                        </div>
                        <div className='oxierros'>
                            <h3 className='subtitulo-oxi'>Perda de oxigênio</h3>
                            <p className='oxi'>4 perdas</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}