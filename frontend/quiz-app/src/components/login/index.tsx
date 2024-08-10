'use client';

import './login.css';
import Img from '@/app/fotos_do site/galaxybranca.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const Login = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/jogador/login';
      const data = {
        nome,
        senha,
      };

      const response = await axios.post(url, data);

      if (response.status === 200) {
        // Sucesso no login
        console.log('Login bem-sucedido:', response.data);

        // Armazenar informações no localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.jogador));
        
        // Redirecionar para a página de perfil
        router.push('/pages/perfil');
      } else {
        // Tratar erro de login
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="container-login-bg">
      <div className="container_login">
        <img src={Img.src} alt="" />
        <div className="form-login">
          <h1 className="titulo_login">Acesse seu perfil</h1>
          <form onSubmit={handleLogin} id="form2">
            <div className="input2">
              <input
                required
                className="campo_input2"
                type="text"
                id="nome2"
                value={nome}
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className="label">Senha</label>
            </div>
            <button type="submit" className="btn-entrar">Entrar</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};