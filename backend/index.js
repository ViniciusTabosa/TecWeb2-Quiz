import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'

import jogadorRotas from './routes/jogadorRota.js';
import selecaoRotas from './routes/jogadorPersonagemRota.js';
import quizRotas from './routes/quizRota.js';
import personagemRotas from './routes/personagemRota.js';
import scoreRotas from './routes/scoreRota.js'

const app = express()
const porta = 3000
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001'
  }));
// rotas
app.use('/jogador', jogadorRotas);
app.use('/selecao', selecaoRotas)
app.use('/quiz', quizRotas)
app.use('/personagens', personagemRotas)
app.use('/score', scoreRotas)

app.listen(porta, ()=>{
    console.log(`servidor rodando na porta ${porta}`)
})