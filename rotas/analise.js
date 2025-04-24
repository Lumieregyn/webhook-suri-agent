const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const payload = req.body;
  const cliente = payload.cliente || 'Cliente não identificado';
  const vendedor = payload.vendedor || 'Vendedor não identificado';
  const mensagem = payload.mensagem || payload.checklist ? 'Checklist recebido' : 'Mensagem não informada';

  console.log(`👤 Cliente: ${cliente}`);
  console.log(`🙋 Vendedor: ${vendedor}`);
  console.log(`📩 Mensagem recebida: ${mensagem}`);

  res.json({ status: 'ok' });
});

module.exports = router;
