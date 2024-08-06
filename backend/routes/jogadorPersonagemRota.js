import express from 'express';

import {
    selecionarPersonagem,
    obterPersonagemPorJogador
} from '../controllers/jogadorPersonagemController.js';

const router = express.Router();

// Rota para selecionar um personagem para um jogador
router.post('/', selecionarPersonagem);

// Rota para obter personagens de um jogador
router.get('/jogador/:jogadorId', obterPersonagemPorJogador);

export default router;
