const express = require('express');
const cors = require('cors');
const fornecedorRoutes = require('./routes/fornecedor');
const veiculoRoutes = require('./routes/veiculo');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/veiculos', veiculoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
