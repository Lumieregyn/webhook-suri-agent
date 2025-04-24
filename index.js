const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.post('/conversa', (req, res) => {
    try {
        const message = req.body.message?.text || "[Mensagem sem texto]";
        const nomeVendedor = req.body.attendant?.Name || "Vendedor não identificado";
        const emailVendedor = req.body.attendant?.Email || "E-mail não identificado";
        const canal = req.body.channel?.Name || "Canal não identificado";
        const nomeCliente = req.body.visitor?.Name || "Cliente não identificado";
        const numeroCliente = req.body.visitor?.PhoneNumber || "Número não identificado";

        console.log("📩 Mensagem recebida:", message);
        console.log("👤 Cliente:", nomeCliente);
        console.log("📞 Número do Cliente:", numeroCliente);
        console.log("🙋 Vendedor:", nomeVendedor);
        console.log("📧 E-mail do Vendedor:", emailVendedor);
        console.log("📡 Canal:", canal);

        res.json({ status: "ok", recebido: true });
    } catch (err) {
        console.error("Erro no processamento da conversa:", err);
        res.status(500).json({ status: "erro", erro: err.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});