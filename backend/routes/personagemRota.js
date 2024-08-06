import express from 'express';
import { obterTodosOsPersonagens } from '../controllers/personagemController.js';

const router = express.Router();

// Rota para listar todos os personagens
router.get('/', obterTodosOsPersonagens);

export default router;
