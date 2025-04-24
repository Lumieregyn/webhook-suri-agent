const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.post("/conversa", (req, res) => {
  const { cliente, vendedor, mensagem } = req.body;

  if (!cliente || !vendedor || !mensagem) {
    console.log("[Erro] Payload incompleto.");
    return res.status(400).json({ status: "erro", mensagem: "Campos obrigatórios ausentes." });
  }

  console.log("📩 Mensagem recebida:", mensagem);
  console.log("👤 Cliente:", cliente);
  console.log("🙋 Vendedor:", vendedor);

  res.status(200).json({ status: "ok", mensagem: "Análise recebida com sucesso." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});