const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/conversa', (req, res) => {
  console.log('[DEBUG] Body completo recebido:', JSON.stringify(req.body, null, 2));


  if (!payload || !payload.user || !payload.attendant || !payload.channel || !payload.message) {
    console.log("[Erro] Payload incompleto.");
    return res.status(400).json({ status: "erro", erro: "Payload incompleto." });
  }

  const nomeCliente = payload.user.Name || "Cliente não identificado";
  const telefoneCliente = payload.user.Phone || "Número não identificado";
  const nomeVendedor = payload.attendant.Name || "Vendedor não identificado";
  const emailVendedor = payload.attendant.Email || "E-mail não identificado";
  const canal = payload.channel.Name || "Canal não identificado";
  const mensagem = payload.message.text || "[Mensagem sem texto]";

  console.log("📩 Mensagem recebida:", mensagem);
  console.log("👤 Cliente:", nomeCliente);
  console.log("📞 Número do Cliente:", telefoneCliente);
  console.log("🙋 Vendedor:", nomeVendedor);
  console.log("📧 E-mail do Vendedor:", emailVendedor);
  console.log("📡 Canal:", canal);

  res.json({ status: "ok", mensagem: "Análise registrada com sucesso." });
});

app.get('/', (req, res) => {
  res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
