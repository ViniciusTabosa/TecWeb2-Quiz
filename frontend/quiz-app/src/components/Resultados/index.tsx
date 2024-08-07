"use client";

import './resultados.css';
import Link from 'next/link';
import React, { useState } from 'react';
import DeletarContaBotao from '../deletarConta';
import CustomAlert from '../CustomAlert';
import '../customAlert.css'



export const Resultados: React.FC = () => {
    // Função para deletar conta
    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteAccount = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    
    return(
      
        <div className="container_login2_bg">

            {showAlert && (
                <CustomAlert 
                    message="Conta deletada com sucesso!" 
                    onClose={handleCloseAlert} 
                />
            )}
    
            <div className="container_login2">
                <div className="result_pessoal">
                    <h2>Pontuação Pessoal</h2>
                    <div className="desc">
                        <span>Nome</span>
                        <span>Pontuação</span>
                    </div>
                </div>

                <div className="result_global">
                    <h2>Ranking Geral</h2>
                    <div className="desc">
                        <span>Jogador</span>
                        <span>Resultado</span>
                    </div>
                </div>

            </div>
            <div className="botaos">
                <Link href='/pages/home' className="btn_voltar">Voltar</Link>
                <Link className="btn_jogar" href='/pages/home'>Jogar</Link>
                <DeletarContaBotao onDelete={handleDeleteAccount} />
            </div>

        </div>
    )
}

