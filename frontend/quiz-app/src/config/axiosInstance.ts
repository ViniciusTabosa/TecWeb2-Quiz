// import axios from 'axios';

// const AxiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/score/registrarscore', // Ajuste a URL base para o seu endpoint
// });

// export const registrarScore = (jogador_id: number, pontuacao: number) => 
//   AxiosInstance.post('/registrarscore', { jogador_id, pontuacao });

// export const buscarPontuacao = (jogador_id: number) => 
//   AxiosInstance.get(/score_jogador/${jogador_id})
//     .then(response => response.data.pontuacao) // Ajuste conforme a estrutura de resposta
//     .catch(() => null);

// export const deletarScore = (jogador_id: number) => 
//   AxiosInstance.delete(/deletar_score/${jogador_id});

// export const rankingPontuacoes = () => 
//   AxiosInstance.get('/ranking')
//     .then(response => response.data);