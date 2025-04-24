
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/conversa', (req, res) => {
    try {
        const body = req.body;

        const vendedor = body.attendant?.Name || "Vendedor não identificado";
        const cliente = body.channel?.Username || "Número não identificado";
        const texto = body.message?.text || "[Mensagem sem texto]";

        console.log("📩 Mensagem recebida:", texto);
        console.log("👤 Cliente:", cliente);
        console.log("🙋 Vendedor:", vendedor);

        return res.json({
            status: "ok",
            recebido: true,
            cliente,
            vendedor,
            mensagem: texto
        });
    } catch (erro) {
        console.error("[Erro] Payload inválido:", erro.message);
        return res.status(400).json({ status: "erro", mensagem: "Payload inválido" });
    }
});

app.get('/', (req, res) => {
    res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

const porta = process.env.PORT || 10000;
app.listen(porta, () => {
    console.log(`🚀 Servidor rodando na porta ${porta}`);
});
