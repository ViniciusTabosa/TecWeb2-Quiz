import axios from 'axios';

export async function cadastrarJogador(){
  let nomeJogador = document.querySelector('#nome')
  let senhaJogador = document.querySelector('#senha')

  axios
  .post('http://localhost:3000/jogador/registrar', {nome: nomeJogador, senha: senhaJogador})
}