import express from "express"
import bodyParser from 'body-parser'

import jogadorRotas from './routes/jogadorRota.js';
import selecaoRotas from './routes/jogadorPersonagemRota.js';
import quizRotas from './routes/quizRota.js';
import personagemRotas from './routes/personagemRota.js';

const app = express()
const porta = 3000
app.use(bodyParser.json());

// rotas
app.use('/jogador', jogadorRotas);
app.use('/selecao', selecaoRotas)
app.use('/quiz', quizRotas)
app.use('/personagens', personagemRotas)

app.listen(porta, ()=>{
    console.log(`servidor rodando na porta ${porta}`)
})