import { obterTodasPerguntas } from '../models/Pergunta.js'
import { obterAlternativasPorPergunta } from '../models/Alternativa.js';

export const obterQuizCompleto = async (req, res) => {
    try {
        const perguntas = await new Promise((resolve, reject) => {
            obterTodasPerguntas((err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        const perguntasComAlternativas = await Promise.all(perguntas.map(async (pergunta) => {
            const alternativas = await new Promise((resolve, reject) => {
                obterAlternativasPorPergunta(pergunta.id, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
            return { ...pergunta, alternativas };
        }));

        res.json(perguntasComAlternativas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter o quiz completo' });
    }
};
