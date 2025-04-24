
const express = require('express');
const app = express();
app.use(express.json());

app.post('/conversa', (req, res) => {
  const data = req.body;

  // Extrair informações do contato
  const nomeContato = data?.User?.FirstName || 'Nome não identificado';
  const telefoneContato = data?.User?.Phone || 'Telefone não identificado';

  // Extrair informações do canal
  const nomeCanal = data?.Channel?.Name || 'Canal não identificado';
  const usernameCanal = data?.Channel?.Username || 'Username não identificado';

  // Extrair mensagem
  const mensagem = data?.message?.text || '[Mensagem sem texto]';

  console.log('📩 Mensagem recebida:', mensagem);
  console.log('👤 Contato:', nomeContato);
  console.log('📞 Telefone:', telefoneContato);
  console.log('📡 Canal:', nomeCanal);
  console.log('🔗 Username do Canal:', usernameCanal);

  res.status(200).json({
    status: 'ok',
    contato: {
      nome: nomeContato,
      telefone: telefoneContato
    },
    canal: {
      nome: nomeCanal,
      username: usernameCanal
    },
    mensagem: mensagem
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
