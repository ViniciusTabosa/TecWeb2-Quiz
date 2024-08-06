import{criarJogador,
    buscarJogadorPorNome,
    deletarJogadorPorId,
    verificarCredenciais,
    buscarJogadorPorId
} from '../models/Jogador.js';

import{deletarPersonagemDoJogador} from '../models/JogadorPersonagem.js'

// criar um novo jogador
export const criarNovoJogador = async (req, res) => {
    const { nome, senha } = req.body;

    try {

         // Verificar se o nome do jogador já existe
         const jogadorExistente = await new Promise((resolve, reject) => {
            buscarJogadorPorNome(nome, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (jogadorExistente.length > 0) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso' });
        }

        const results = await new Promise((resolve, reject) => {
            criarJogador(nome, senha, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        res.status(201).json({ message: 'Jogador criado com sucesso', id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar jogador' });
    }
};

// obter jogador via nome
export const obterJogadorPorNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const results = await new Promise((resolve, reject) => {
            buscarJogadorPorNome(nome, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Jogador não encontrado' });
        }

        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao encontrar jogador' });
    }
};

// Excluir um jogador pelo ID
export const deletarJogador = async (req, res) => {
    const { id } = req.params;
    try {
        // Verifica se o jogador existe
        const jogadorExistente = await new Promise((resolve, reject) => {
            buscarJogadorPorId(id, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (jogadorExistente.length === 0) {
            return res.status(404).json({ error: 'Jogador não encontrado' });
        }

       /* await new Promise((resolve, reject) => {
            deleteRankingByPlayerId(id, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
*/
        await new Promise((resolve, reject) => {
            deletarPersonagemDoJogador(id, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            deletarJogadorPorId(id, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({ message: 'Jogador excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir jogador' });
    }
};

// Função para login
export const login = async (req, res) => {
    const { nome, senha } = req.body;

    try {
        const jogador = await new Promise((resolve, reject) => {
            verificarCredenciais(nome, senha, (err, jogador) => {
                if (err) reject(err);
                else {
                    // verifica se ha resultado retornado
                    if(jogador.length > 0){
                        resolve(jogador[0]);
                    }else{
                        resolve(null);
                    }
                }
            });
        });

        if (!jogador) {
            return res.status(401).json({ error: 'Credenciais incorretas' });
        }

        res.json({ message: 'Login bem-sucedido', jogador });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao verificar credenciais' });
    }
};













