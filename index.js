const express = require('express');
const app = express();
app.use(express.json());

app.post('/conversa', (req, res) => {
    const dados = req.body;

    console.log('[Nova análise recebida]');
    console.log(dados);

    // Aqui pode entrar a lógica de checklist/validação/alerta
    res.json({
        status: 'ok',
        mensagem: 'Conversa recebida e processada.',
        recebido: dados
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
