
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/conversa', (req, res) => {
    const data = req.body;

    const vendedor = data?.attendant?.Name || 'Vendedor não identificado';
    const cliente = data?.contact?.Name || data?.message?.from || 'Número não identificado';
    const texto = data?.message?.text || '[Mensagem sem texto]';

    console.log('📩 Mensagem recebida:', texto);
    console.log('👤 Cliente:', cliente);
    console.log('🙋 Vendedor:', vendedor);

    res.status(200).json({
        status: 'ok',
        vendedor,
        cliente,
        textoRecebido: texto
    });
});

app.get('/', (req, res) => {
    res.json({ status: 'ok', mensagem: 'Servidor webhook ativo com tratamento SURI' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
