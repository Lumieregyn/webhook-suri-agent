
const express = require('express');
const app = express();
app.use(express.json());

app.post('/conversa', (req, res) => {
  const dados = req.body;

  const nomeCliente = dados.cliente || 'Cliente não identificado';
  const numeroCliente = dados.cliente_numero || 'Número não identificado';
  const nomeVendedor = dados.vendedor || 'Vendedor não identificado';
  const emailVendedor = dados.email_vendedor || 'E-mail não identificado';
  const mensagem = dados.mensagem || '[Mensagem sem texto]';
  const canal = dados.canal || 'Canal não identificado';

  console.log('📩 Mensagem recebida:', mensagem);
  console.log('👤 Cliente:', nomeCliente);
  console.log('📞 Número do Cliente:', numeroCliente);
  console.log('🙋 Vendedor:', nomeVendedor);
  console.log('📧 E-mail do Vendedor:', emailVendedor);
  console.log('📡 Canal:', canal);

  res.status(200).json({
    status: 'ok',
    cliente: nomeCliente,
    cliente_numero: numeroCliente,
    vendedor: nomeVendedor,
    email_vendedor: emailVendedor,
    mensagem: mensagem,
    canal: canal
  });
});
