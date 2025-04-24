const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.post('/conversa', (req, res) => {
  try {
    const data = req.body;
    const payload = data.payload || {};

    // Extrair mensagem: se payload.message.text ou payload.user.Name
    const mensagem = payload.message?.text || payload.user?.Name || "[Mensagem sem texto]";
    // Extrair cliente a partir de payload.user
    const nomeCliente = payload.user?.Name || "Cliente não identificado";
    const numeroCliente = payload.user?.Phone || payload.user?.PhoneNumber || "Número não identificado";
    // Extrair vendedor a partir de payload.attendant
    const nomeVendedor = payload.attendant?.Name || "Vendedor não identificado";
    const emailVendedor = payload.attendant?.Email || "E-mail não identificado";
    // Extrair canal
    const canal = payload.channel?.Name || "Canal não identificado";

    console.log("📩 Mensagem recebida:", mensagem);
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