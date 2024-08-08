import{criarScoreJogador,
    buscarScoresJogador,
    deletarScoreJogador,
    rankingPontuacoes,
} from '../models/Score.js';

// criar score de um jogador
export const criarNovoScoreJogador = async (req, res) => {
    const { jogador_id, pontuacao} = req.body;

    try {
        const results = await new Promise((resolve, reject) => {
            const now = new Date();
            criarScoreJogador(jogador_id, pontuacao, now, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        res.status(201).json({ message: 'Score do jogador criado com sucesso', id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar o score do jogador' });
    }
};

// buscar score do jogador 
export const buscarPontuacaoJogador = async (req, res) => {
    const { jogador_id } = req.params;
    try {
        const results = await new Promise((resolve, reject) => {
            buscarScoresJogador(jogador_id, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum score foi encontrado para este jogador' });
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar scores' });
    }
};

// Excluir score do jogador
export const removerScoreJogador = async (req, res) => {
    const { jogador_id } = req.params;
    try {
        // Verifica se o jogador possui score
        const scoreExistente = await new Promise((resolve, reject) => {
            buscarScoresJogador(jogador_id, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (scoreExistente.length === 0) {
            return res.status(404).json({ error: 'O jogador não possui scores' });
        }

        await new Promise((resolve, reject) => {
            deletarScoreJogador(jogador_id, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({ message: 'Os scores do jogador foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir os scores do jogador' });
    }
};

// Retornar o ranking das 10 melhores pontuações dentre todas os scores registrados
export const rankingMelhoresPontuacoes = async (req, res) => {
    try {
        rankingPontuacoes((err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar o ranking' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Nenhum score foi encontrado para gerar o ranking' });
                return;
            }

            res.json(results);
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o ranking' });
    }
}