import {db} from '../db.js';

// funcao para criar um novo jogador
export const criarJogador = (nome, senha, callback)=>{
    const query = 'INSERT INTO jogadores (nome, senha) VALUES (?,?)'
    db.query(query, [nome,senha], callback)
}

// funcao para encontrar um jogador pelo username
export const buscarJogadorPorNome = (nome, callback)=>{
    const query = 'SELECT * FROM jogadores WHERE nome = ?';
    db.query(query, [nome], callback);
}

// funcao para encontrar um jogador pelo username
export const buscarJogadorPorId = (id, callback)=>{
    const query = 'SELECT * FROM jogadores WHERE id = ?';
    db.query(query, [id], callback);
}

// Função para excluir um jogador pelo ID
export const deletarJogadorPorId = (id, callback) => {
    const query = 'DELETE FROM jogadores WHERE id = ?';
    db.query(query, [id], callback);
};

// Função para verificar as credenciais do jogador
export const verificarCredenciais = (nome, senha, callback) => {
    const query = 'SELECT id, nome FROM jogadores WHERE nome = ? AND senha = ?';
    db.query(query, [nome, senha], callback);
};








