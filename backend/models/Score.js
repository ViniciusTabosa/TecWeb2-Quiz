import {db} from '../db.js';

// funcao para criar um novo registro de pontuação
export const criarScoreJogador = (jogador_id, pontuacao, data_criacao, callback)=>{
    const query = 'INSERT INTO ranking (jogador_id, pontuacao, atualizado_em ) VALUES (?,?,?)'
    db.query(query, [jogador_id, pontuacao, data_criacao], callback)
}

// funcao para buscar o score de um jogador
export const buscarScoresJogador = (jogador_id, callback)=>{
    const query = 'SELECT * FROM ranking WHERE jogador_id = ?';
    db.query(query, [jogador_id], callback);
}

// funcao para listar os scores de todos os jogadores
export const buscarScoresJogadores = (callback)=>{
    const query = 'SELECT r.id AS ranking_id, j.nome AS jogador_nome, r.jogador_id AS jogador_id, r.pontuacao AS pontuacao, r.atualizado_em AS atualizado_em FROM ranking r INNER JOIN jogadores j ON r.jogador_id = j.id ORDER BY r.id ASC;';
    db.query(query, callback);
}

// função para excluir os scores de um jogador
export const deletarScoreJogador = (jogador_id, callback) => {
    const query = 'DELETE FROM ranking WHERE jogador_id = ?';
    db.query(query, [jogador_id], callback);
};

// função para montar o ranking das 10 melhores pontuações
export const rankingPontuacoes = (callback) => {
    const query = 'SELECT ROW_NUMBER() OVER (ORDER BY rs.pontuacao DESC) AS posicao_ranking, j.nome AS jogador_nome, rs.pontuacao AS pontuacao FROM (SELECT r.jogador_id, MAX(r.pontuacao) AS pontuacao FROM ranking r GROUP BY r.jogador_id) rs INNER JOIN jogadores j ON rs.jogador_id = j.id ORDER BY rs.pontuacao DESC LIMIT 10;'
    db.query(query, callback);
}






