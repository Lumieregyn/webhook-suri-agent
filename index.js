const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.post('/conversa', (req, res) => {
    try {
        const { cliente, vendedor, checklist } = req.body;

        if (!checklist || typeof checklist !== 'object') {
            return res.status(400).json({ status: "erro", mensagem: "Corpo da requisição incompleto ou inválido." });
        }

        const pendencias = [];
        Object.entries(checklist).forEach(([key, value]) => {
            if (value === false) pendencias.push(`⚠️ Falta confirmar: ${key}`);
        });

        const status = pendencias.length ? "incompleto" : "completo";
        const resposta = {
            status,
            cliente,
            vendedor,
            checklist,
            alertas: pendencias,
            sugestao: pendencias.length ? "Recomenda-se validar os pontos pendentes antes de seguir com o pedido." : "Checklist completo, pronto para prosseguir."
        };

        console.log("🔎 Conversa analisada:", resposta);
        res.json(resposta);
    } catch (erro) {
        console.error("Erro interno:", erro);
        res.status(500).json({ status: "erro", mensagem: "Erro ao processar a conversa.", erro: erro.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});