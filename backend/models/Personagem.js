import { db } from '../db.js';

export const listarTodosOsPersonagens = (callback) => {
    const query = 'SELECT * FROM personagens';
    db.query(query, callback);
};
