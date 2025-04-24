require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json({ limit: '5mb', strict: false }));
app.use(express.urlencoded({ extended: true }));

app.post('/conversa', (req, res) => {
  console.log('⛳ Chegou payload em /conversa:', JSON.stringify(req.body, null, 2));

  const p = req.body.payload;
  const user = p?.user || {};
  const attendant = p?.attendant || {};
  const channel = p?.channel || {};
  const message = p?.message || {};

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

  // ⚠️ Mensagem de texto não é mais obrigatória: pode ser áudio, imagem, etc.
  const hasContent =
    message.text || message.audio || message.file || message.image;

  if (!hasContent) {
    missing.push('payload.message.(text|audio|file|image)');
  }

  if (missing.length) {
    console.error(`[Erro] Payload incompleto. Faltando: ${missing.join(', ')}`);
    return res.status(400).json({ error: 'Payload incompleto', faltando: missing });
  }

  // TODO: lógica de análise multimodal

  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
