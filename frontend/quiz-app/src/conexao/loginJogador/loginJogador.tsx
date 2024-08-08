'use client';

import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';

interface LoginJogadorProps {
  nome: string;
  senha: string;
}

const LoginJogador: React.FC<LoginJogadorProps> = ({ nome, senha }) => {
  // Função para cadastrar o jogador

  const loginJogador = async () => {
    try {
      // URL do endpoint
      const url = 'http://localhost:3000/jogador/login';
  
      // Dados que serão enviados no corpo da requisição
      const data = {
        nome,
        senha
      };
  
      // Fazendo a requisição POST
      const response = await axios.post(url, data);
      
      if (response.status === 200) {
        console.log('Login bem-sucedido');
        router.push('/pages/perfil'); // Navega para a página de perfil após o login
      } else {
        console.log('Resposta inesperada:', response.status);
        console.log('Login falhou');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          console.log('Usuário ou senha inválidos');
        } else {
          console.log('Erro ao fazer login');
        }
      } else {
        console.error('Erro desconhecido:', error);
        console.log('Erro desconhecido');
      }
    }
  };


  return (
    
      <Link href='/pages/perfil' className="btn-entrar" onClick={loginJogador}>Entrar</Link>
  );
};

export default LoginJogador;

