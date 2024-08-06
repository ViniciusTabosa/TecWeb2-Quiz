import { listarTodosOsPersonagens } from '../models/Personagem.js';

export const obterTodosOsPersonagens = async (req, res) => {
    try {
        const personagens = await new Promise((resolve, reject) => {
            listarTodosOsPersonagens((err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json(personagens);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter personagens' });
    }
};
