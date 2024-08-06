import express from 'express';
import { obterQuizCompleto } from '../controllers/quizController.js';

const router = express.Router();

// Rota para obter todas as perguntas e suas alternativas
router.get('/', obterQuizCompleto);

export default router;
