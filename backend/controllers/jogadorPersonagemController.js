import {
    associarPersonagemAoJogador,
    verificarPersonagemDoJogador,
    atualizarPersonagemDoJogador,
    buscarPersonagemPorJogador
} from '../models/JogadorPersonagem.js';

// Associar um personagem a um jogador
export const selecionarPersonagem = async (req, res) => {
    const { jogadorId, personagemId } = req.body;

    try {
        // Verifica se o jogador ja tem personagem selecionado
        const personagemExistente = await new Promise((resolve, reject) => {
            verificarPersonagemDoJogador(jogadorId, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (personagemExistente.length > 0) {
            // Atualizar personagem existente
            await new Promise((resolve, reject) => {
                atualizarPersonagemDoJogador(jogadorId, personagemId, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
            res.status(200).json({ message: 'Personagem atualizado com sucesso'});
        } else {
            // Associar novo personagem
            const results = await new Promise((resolve, reject) => {
                associarPersonagemAoJogador(jogadorId, personagemId, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
            res.status(201).json({ message: 'Personagem associado com sucesso' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao associar ou atualizar personagem' });
    }
};

// Buscar personagem por jogador
export const obterPersonagemPorJogador = async (req, res) => {
    const { jogadorId } = req.params;

    try {
        const results = await new Promise((resolve, reject) => {
            buscarPersonagemPorJogador(jogadorId, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum personagem encontrado para este jogador' });
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar personagem' });
    }
};









