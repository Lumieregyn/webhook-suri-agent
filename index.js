require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SURI_API_URL = process.env.SURI_API_URL;
const SURI_API_TOKEN = process.env.SURI_API_TOKEN;
const GESTOR_PHONE = "5562985299728";
const PROMPT_TEMPLATE = fs.readFileSync('./prompt_checklist_gpt4o.txt', 'utf8');

app.use(express.json({ limit: '10mb', strict: false }));
app.use(express.urlencoded({ extended: true }));

function montarConteudoConversacional(message) {
  let conteudo = '';
  if (message.text) conteudo += `Texto: ${message.text}\n`;
  if (Array.isArray(message.attachments)) {
    message.attachments.forEach((att, idx) => {
      const tipo = att.type || 'arquivo';
      const url = att.payload?.url || '(sem URL)';
      conteudo += `Anexo ${idx + 1}: tipo ${tipo}, url: ${url}\n`;
    });
  }
  return conteudo.trim();
}

async function enviarMensagemWhatsApp(destinatario, texto) {
  try {
    const payload = {
      to: destinatario,
      type: "text",
      text: {
        body: texto
      }
    };
    await axios.post(SURI_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${SURI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Alerta enviado para ${destinatario}`);
  } catch (error) {
    console.error(`❌ Erro ao enviar para ${destinatario}:`, error?.response?.data || error.message);
  }
}

app.post('/conversa', async (req, res) => {
  console.log('⛳ Chegou payload em /conversa:', JSON.stringify(req.body, null, 2));

  if (req.body?.type !== 'message-received') {
    console.log(`[Info] Tipo de evento ignorado: ${req.body?.type}`);
    return res.status(200).json({ status: 'ignorado' });
  }

  const p = req.body.payload;
  const user = p?.user || {};
  const attendant = p?.attendant || {};
  const channel = p?.channel || {};
  const message = p?.Message || {};

  const required = [
    ['payload.user.Name', user.Name],
    ['payload.user.Phone', user.Phone],
    ['payload.attendant.Name', attendant.Name],
    ['payload.attendant.Email', attendant.Email],
    ['payload.channel.Name', channel.Name]
  ];

  const missing = required.filter(([_, value]) => !value).map(([field]) => field);

  const hasContent = message.text ||
    message.audio ||
    message.file ||
    message.image ||
    (Array.isArray(message.attachments) && message.attachments.length > 0);

  if (!hasContent) missing.push('payload.message.(text|audio|file|image|attachments)');
  if (missing.length) {
    console.error(`[Erro] Payload incompleto. Faltando: ${missing.join(', ')}`);
    return res.status(400).json({ error: 'Payload incompleto', faltando: missing });
  }

  const conteudo = montarConteudoConversacional(message);
  const prompt = PROMPT_TEMPLATE.replace('<<CONTEÚDO_DA_CONVERSA_AQUI>>', conteudo);

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um assistente comercial que analisa conversas com clientes.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const analise = response.data.choices[0].message.content;
    console.log('📌 Análise do Checklist GPT-4o:', analise);

    if (analise.includes("⚠️")) {
      const alerta = `🚨 *ATENÇÃO*
O cliente *${user.Name}* está prestes a fechar pedido, mas ainda faltam confirmações:

${analise}

Responsável: *${attendant.Name}*
Revisar agora antes de gerar a venda.`;

      await enviarMensagemWhatsApp(GESTOR_PHONE, alerta);
      if (user.Phone) {
        await enviarMensagemWhatsApp(user.Phone, alerta);
      }
    }

    res.status(200).json({ status: 'ok', analise });
  } catch (error) {
    console.error('❌ Erro na análise GPT ou envio SURI:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
