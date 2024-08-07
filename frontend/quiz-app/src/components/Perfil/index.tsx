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
        </div>
    )
}