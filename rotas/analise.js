const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { cliente, vendedor, checklist } = req.body;

  const pendencias = Object.entries(checklist)
    .filter(([_, valor]) => !valor)
    .map(([chave]) => `- ${chave}`);

  const status = pendencias.length > 0 ? "incompleto" : "completo";

  const mensagem = status === "completo"
    ? `✅ Tudo certo na conversa com ${cliente}.`
    : `⚠️ Atenção ${vendedor}!
A conversa com ${cliente} está incompleta.

Pendências:
${pendencias.join("\n")}

Sugestão: Validar os itens antes de seguir com o pedido.`;

  try {
    await axios.post(
      "https://cbm-wap-babysuri-cb39727892-lumie.azurewebsites.net/api/messages",
      {
        number: "554731703288",
        message: mensagem
      },
      {
        headers: {
          Authorization: "Bearer c3b5eca4-707f-46df-852c-7ad6790d61f9"
        }
      }
    );

    res.json({ status, enviado: true, mensagem });
  } catch (erro) {
    res.status(500).json({ status: "erro", enviado: false, erro: erro.message });
  }
});

module.exports = router;
