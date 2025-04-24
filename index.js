const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post("/conversa", (req, res) => {
  console.log("[DEBUG] Body completo recebido:", JSON.stringify(req.body, null, 2));

  const payload = req.body.payload || req.body;

  if (!payload || !payload.user || !payload.attendant || !payload.channel || !payload.message) {
    console.log("[Erro] Payload incompleto.");
    return res.status(400).json({ status: "erro", mensagem: "Payload incompleto." });
  }

  const cliente = payload.user.Name || "Cliente não identificado";
  const telefone = payload.user.Phone || "Número não identificado";
  const vendedor = payload.attendant.Name || "Vendedor não identificado";
  const emailVendedor = payload.attendant.Email || "E-mail não identificado";
  const canal = payload.channel.Name || "Canal não identificado";
  const mensagem = payload.message.text || "[Mensagem sem texto]";

  console.log("👤 Cliente:", cliente);
  console.log("📞 Número do Cliente:", telefone);
  console.log("🙋 Vendedor:", vendedor);
  console.log("📧 E-mail do Vendedor:", emailVendedor);
  console.log("📡 Canal:", canal);
  console.log("📩 Mensagem recebida:", mensagem);

  res.json({ status: "ok", mensagem: "Mensagem recebida e processada com sucesso." });
});

app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});