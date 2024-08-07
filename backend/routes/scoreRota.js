import express from 'express';
import {
    criarNovoScoreJogador,
    buscarPontuacaoJogador,
    removerScoreJogador,
    buscarScoresExistentes,
    rankingMelhoresPontuacoes
} from '../controllers/scoreController.js';

const router = express.Router();

// Rota para criar um novo score para um jogador
router.post('/registrarscore', criarNovoScoreJogador);

// Rota para buscar o score de um jogador pelo ID
router.get('/score_jogador/:jogador_id', buscarPontuacaoJogador);

// Rota para excluir o score de um jogador pelo ID
router.delete('/deletar_score/:jogador_id', removerScoreJogador);

// Rota para buscar todos os scores
router.get('/scores', buscarScoresExistentes);

// Rota para buscar todos os scores
router.get('/ranking', rankingMelhoresPontuacoes);

export default router;
