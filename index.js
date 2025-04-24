const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Nova rota para teste do agente
app.post("/conversa", (req, res) => {
  const payload = req.body;

  if (!payload || !payload.message) {
    console.log("[Erro] Payload inválido.");
    return res.status(400).json({ status: "erro", motivo: "payload inválido" });
  }

  // Se não houver texto, provavelmente é mídia
  if (!payload.message.text) {
    console.log("[Info] Mensagem sem texto (provavelmente mídia). Ignorando.");
    return res.json({ status: "ignorado", motivo: "mensagem sem texto" });
  }

  const texto = payload.message.text;
  const cliente = payload.contact?.Name || "Cliente não identificado";
  const vendedor = payload.attendant?.Name || "Vendedor não identificado";

  // Simples checklist de análise (exemplo didático)
  const checklist = {
    produto: texto.includes("produto") || texto.includes("modelo"),
    cor: texto.includes("cor") || texto.includes("preto") || texto.includes("dourado"),
    medidas: texto.includes("cm") || texto.includes("medida"),
    quantidade: texto.includes("unidade") || texto.includes("quantidade"),
    tensao: texto.includes("bivolt") || texto.includes("voltagem"),
    prazo: texto.includes("prazo") || texto.includes("entrega"),
    resumo: texto.includes("confirma") || texto.includes("resumo")
  };

  const alertas = [];
  for (const campo in checklist) {
    if (!checklist[campo]) {
      alertas.push(`⚠️ Falta confirmar: ${campo}`);
    }
  }

  const status = alertas.length ? "incompleto" : "completo";
  const resposta = {
    status,
    cliente,
    vendedor,
    checklist,
    alertas,
    sugestao: alertas.length
      ? "Recomenda-se validar os pontos pendentes antes de seguir com o pedido."
      : "Todos os pontos foram confirmados. Pedido seguro para emissão."
  };

  console.log("[Agente IA] Resultado da análise:", resposta);
  return res.json(resposta);
});

app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "Servidor webhook ativo para análise de conversas." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
