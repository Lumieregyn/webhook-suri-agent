
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ status: 'ok', mensagem: 'Servidor webhook com retorno de lista ativo.' });
});

app.post('/produtos', (req, res) => {
    const produtos = [
        { nome: "Lustre Dourado", codigo: "LD-001", prazo: "15 dias úteis" },
        { nome: "Arandela Preta", codigo: "AR-045", prazo: "10 dias úteis" },
        { nome: "Pendente Cobre", codigo: "PC-212", prazo: "20 dias úteis" }
    ];
    res.status(200).json(produtos);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
