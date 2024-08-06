import { db } from '../db.js';

export const obterTodasPerguntas = (callback) => {
    const query = 'SELECT * FROM perguntas';
    db.query(query, callback);
};
