'use client';

import React, { useState } from 'react';
import './cadastro.css';
import Img from '@/app/fotos_do site/outer-space.png';
import MeuComponente from '@/conexao/cadastrarJogador/cadastrarJogador';

export const Cadastro: React.FC = () => {
  // Estado para armazenar os valores dos inputs
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    // Aqui você pode chamar uma função para lidar com o submit, se necessário
  };

  return (
    <div className="container-form-bg">
      <div className="container-form">
        <img src={Img.src} alt="" />
        <div className="form">
          <h1 className="titulo_form">Cadastre-se</h1>
          <form action="POST" id="form" onSubmit={handleSubmit}>
            <div className="input">
              <input 
                required 
                className="campo_input" 
                type="text" 
                id="nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
              />
              <label>Nome</label>
            </div>
            <div className="input">
              <input 
                required 
                className="campo_input" 
                type="password" 
                id="senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
              />
              <label>Senha</label>
            </div>
          </form>
        </div>
        <div className="btn">
          <MeuComponente nome={nome} senha={senha} />
        </div>
      </div>
    </div>
  );
};
