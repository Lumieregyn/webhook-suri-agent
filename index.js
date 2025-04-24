import express from 'express';
import cors from 'cors';
import analiseRouter from './rotas/analise.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => res.json({ status: 'ok', mensagem: 'Servidor webhook ativo para análise de conversas.' }));
app.use('/conversa', analiseRouter);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
