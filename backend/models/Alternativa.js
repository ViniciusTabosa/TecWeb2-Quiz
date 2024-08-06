import { db } from '../db.js';

export const obterAlternativasPorPergunta = (perguntaId, callback) => {
    const query = 'SELECT id, texto_opcao, is_correta FROM alternativas WHERE pergunta_id = ?';
    db.query(query, [perguntaId], callback);
};