// MeuComponente.tsx (Client Component)
'use client';

import axios from 'axios';
import Link from 'next/link';
import React from 'react';

interface MeuComponenteProps {
  nome: string;
  senha: string;
}

const MeuComponente: React.FC<MeuComponenteProps> = ({ nome, senha }) => {
  // Função para cadastrar o jogador

  const cadastrarJogador = async () => {
    try {
      // URL do endpoint
      const url = 'http://localhost:3000/jogador/registrar';
  
      // Dados que serão enviados no corpo da requisição
      const data = {
        nome,
        senha
      };
      
  
      // Fazendo a requisição POST
      const response = await axios.post(url, data);
  
      // Exibindo o resultado no console
      console.log('Resposta:', response.data);
    } catch (error) {
      // Tratando possíveis erros
      console.error('Erro ao registrar jogador:', error);
    }
    console.log('entrando na função de cadastrar')
  };


  return (
    
      <Link href='/pages/perfil' className="btn-cadastrar" onClick={cadastrarJogador}>Cadastrar</Link>
  );
};

export default MeuComponente;
