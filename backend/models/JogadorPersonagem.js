import  {db} from '../db.js'


export const associarPersonagemAoJogador = (jogadorId, personagemId, callback) => {
    const query = 'INSERT INTO jogador_personagem (jogador_id, personagem_id) VALUES (?, ?)';
    db.query(query, [jogadorId, personagemId], callback);
};

export const atualizarPersonagemDoJogador = (jogadorId, personagemId, callback) => {
    const query = 'UPDATE jogador_personagem SET personagem_id = ? WHERE jogador_id = ?';
    db.query(query, [personagemId, jogadorId], callback);
};

export const buscarPersonagemPorJogador = (jogadorId, callback) => {
    const query = 'SELECT p.* FROM personagens p JOIN jogador_personagem jp ON p.id = jp.personagem_id WHERE jp.jogador_id = ?';
    db.query(query, [jogadorId], callback);
};

export const verificarPersonagemDoJogador = (jogadorId, callback) => {
    const query = 'SELECT * FROM jogador_personagem WHERE jogador_id = ?';
    db.query(query, [jogadorId], callback);
};

// Função para deletar a associação de um personagem ao jogador
export const deletarPersonagemDoJogador = (jogadorId, callback) => {
    const query = 'DELETE FROM jogador_personagem WHERE jogador_id = ?';
    db.query(query, [jogadorId], callback);
};







