
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.post('/conversa', (req, res) => {
    const payload = req.body;

    try {
        const nomeVendedor = payload.attendant?.Name || "Vendedor não identificado";
        const numeroCliente = payload.channel?.Username || "Número não identificado";
        const mensagemRecebida = payload.message?.text || "[Mensagem sem texto]";

        console.log("📩 Mensagem recebida:", mensagemRecebida);
        console.log("👤 Cliente:", numeroCliente);
        console.log("🙋 Vendedor:", nomeVendedor);

        // Simular retorno de análise
        res.json({
            status: "ok",
            cliente: numeroCliente,
            vendedor: nomeVendedor,
            mensagem: mensagemRecebida,
            checklist: {
                produto: true,
                cor: true,
                medidas: true,
                quantidade: true,
                tensao: false,
                prazo: false,
                resumo: false
            },
            alertas: [
                "⚠️ Falta confirmar: tensão",
                "⚠️ Falta confirmar: prazo",
                "⚠️ Falta confirmar: resumo"
            ],
            sugestao: "Recomenda-se validar os pontos pendentes antes de seguir com o pedido."
        });
    } catch (error) {
        console.error("Erro ao processar o payload:", error);
        res.status(400).json({
            status: "erro",
            erro: "Payload inválido ou malformado",
            detalhes: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
