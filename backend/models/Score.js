import {db} from '../db.js';

// funcao para criar um novo registro de pontuação
export const criarScoreJogador = (jogador_id, pontuacao, tempo_conclusao, callback)=>{
    const query = 'INSERT INTO ranking (jogador_id, pontuacao, tempo_conclusao ) VALUES (?,?,?);'
    db.query(query, [jogador_id, pontuacao, tempo_conclusao], callback)
}

// funcao para buscar o score de um jogador
export const buscarScoresJogador = (jogador_id, callback)=>{
    const query = 'SELECT * FROM ranking WHERE jogador_id = ?';
    db.query(query, [jogador_id], callback);
}

// função para excluir os scores de um jogador
export const deletarScoreJogador = (jogador_id, callback) => {
    const query = 'DELETE FROM ranking WHERE jogador_id = ?';
    db.query(query, [jogador_id], callback);
};

// função para montar o ranking das 10 melhores pontuações
export const rankingPontuacoes = (callback) => {
    const query = 'SELECT ROW_NUMBER() OVER (ORDER BY rs.pontuacao DESC, rs.tempo_conclusao ASC) AS posicao_ranking, j.nome AS jogador_nome, rs.pontuacao AS pontuacao, rs.tempo_conclusao AS tempo_conclusao FROM (SELECT r.jogador_id, MAX(r.pontuacao) AS pontuacao, MIN(r.tempo_conclusao) AS tempo_conclusao FROM ranking r GROUP BY r.jogador_id) rs INNER JOIN jogadores j ON rs.jogador_id = j.id ORDER BY rs.pontuacao DESC, rs.tempo_conclusao ASC LIMIT 10;'
    db.query(query, callback);
}