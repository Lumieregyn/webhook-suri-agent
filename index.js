const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

function gerarMensagemAlerta(dados) {
    const { vendedor, cliente, alertas } = dados;
    const corpoAlerta = alertas.map(item => `⚠️ ${item}`).join("\n");

    return `🚨 ALERTA COMERCIAL – LUMIÉREGYN

Vendedor(a): ${vendedor}
Cliente: ${cliente}

${corpoAlerta}

👉 Por favor, valide essas informações com o cliente antes de finalizar o pedido.

Sugestão: “Só confirmando, o prazo estimado de entrega é de X dias úteis. Está ok para você?”`;
}

app.post('/conversa', async (req, res) => {
    const { cliente, vendedor, checklist } = req.body;

    const camposObrigatorios = ["produto", "cor", "medidas", "quantidade", "tensao", "prazo", "resumo"];
    const alertas = [];

    camposObrigatorios.forEach(campo => {
        if (!checklist[campo]) {
            alertas.push(`Falta confirmar: ${campo}`);
        }
    });

    const status = alertas.length > 0 ? "incompleto" : "completo";
    const mensagem = gerarMensagemAlerta({ vendedor, cliente, alertas });

    // Envio para o WhatsApp via SURI
    try {
        await axios.post("https://api.suri.ai/send-message", {
            number: "554731703288",
            message: mensagem
        }, {
            headers: {
                Authorization: "Bearer c3b5eca4-707f-46df-852c-7ad6790d61f9"
            }
        });

        res.json({
            status,
            cliente,
            vendedor,
            checklist,
            alertas,
            enviado: true,
            mensagem
        });
    } catch (erro) {
        res.json({
            status: "erro",
            enviado: false,
            erro: erro.message
        });
    }
});

app.get('/', (req, res) => {
    res.json({
        status: "ok",
        mensagem: "Servidor webhook ativo para análise de conversas."
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
