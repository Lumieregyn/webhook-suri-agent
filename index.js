require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json({ limit: '5mb', strict: false }));
app.use(express.urlencoded({ extended: true }));

app.post('/conversa', (req, res) => {
  console.log('⛳ Chegou payload em /conversa:', JSON.stringify(req.body, null, 2));

  // Ignorar eventos que não são mensagens recebidas
  if (req.body?.type !== 'message-received') {
    console.log(`[Info] Tipo de evento ignorado: ${req.body?.type}`);
    return res.status(200).json({ status: 'ignorado' });
  }

  const p = req.body.payload;
  const user = p?.user || {};
  const attendant = p?.attendant || {};
  const channel = p?.channel || {};
  const message = p?.Message || p?.message || {};

  const required = [
    ['payload.user.Name', user.Name],
    ['payload.user.Phone', user.Phone],
    ['payload.attendant.Name', attendant.Name],
    ['payload.attendant.Email', attendant.Email],
    ['payload.channel.Name', channel.Name]
  ];

  const missing = required
    .filter(([_, value]) => value === undefined || value === null || value === '')
    .map(([field]) => field);

  // Verifica se há conteúdo válido na mensagem (texto, áudio, arquivo, imagem ou attachments)
  const hasContent =
    message.text ||
    message.audio ||
    message.file ||
    message.image ||
    (Array.isArray(message.attachments) && message.attachments.length > 0);

  if (!hasContent) {
    missing.push('payload.message.(text|audio|file|image|attachments)');
  }

  if (missing.length) {
    console.error(`[Erro] Payload incompleto. Faltando: ${missing.join(', ')}`);
    return res.status(400).json({ error: 'Payload incompleto', faltando: missing });
  }

  // Aqui entraria a lógica de análise multimodal e geração de alertas
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
