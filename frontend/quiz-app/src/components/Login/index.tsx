'use client'

import './login.css'
import Img from '@/app/fotos_do site/galaxybranca.png'
import Link from 'next/link'
import { useState } from 'react';
import LoginJogador from '@/conexao/loginJogador/loginJogador';

export const Login = () => {
    const [nome2, setNome] = useState<string>('');
    const [senha2, setSenha] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        // Aqui você pode chamar uma função para lidar com o submit, se necessário
    };

    return(
        <div className="container-login-bg">
        
            <div className="container_login">
                <img src={Img.src} alt="" /> 
                <div className="form-login">
                    <h1 className="titulo_login">Acesse seu perfil</h1>
                    <form action="" id="form2" onSubmit={handleSubmit}>
                        <div className="input2">
                            <input 
                                required 
                                className="campo_input2" 
                                type="text" 
                                id="nome2" 
                                value={nome2} 
                                onChange={(e) => setNome(e.target.value)} 
                            />
                            <label className="label">Nome</label>
                        </div>
                        <div className="input2">
                            <input 
                                required 
                                className="campo_input2" 
                                type="password" 
                                id="senha2" 
                                value={senha2} 
                                onChange={(e) => setSenha(e.target.value)} 
                            />
                            <label className="label">Senha</label>
                        </div>
                    </form>
                </div>
                <div className="btn2">
                    <LoginJogador nome={nome2} senha={senha2} />
                </div>
            </div>

        </div>
    )
}