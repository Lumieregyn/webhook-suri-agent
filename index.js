const express = require('express');
const analiseRouter = require('./rotas/analise');
const app = express();

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Servidor webhook ativo para análise de conversas.' });
});

// Analysis endpoint
app.post('/conversa', analiseRouter);

// Start server
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
