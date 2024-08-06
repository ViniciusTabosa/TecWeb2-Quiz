import express from 'express';

import{criarNovoJogador,
    obterJogadorPorNome,
    deletarJogador,
    login
} from '../controllers/jogadorController.js';


const router = express.Router();

// Rota para registrar um novo jogador
router.post('/registrar', criarNovoJogador);

// Rota para buscar um jogador pelo nome
router.get('/nome/:nome', obterJogadorPorNome);

// Rota para excluir um jogador pelo ID
router.delete('/deletar/:id', deletarJogador);

// Rota para login
router.post('/login', login);

export default router; // Exportando o roteador como default