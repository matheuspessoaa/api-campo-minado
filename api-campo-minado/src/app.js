const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Declaração dos caminhos das rotas da API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);

app.get('/', (req, res) => {
  res.json({ app: "API Campo Minado", status: "online" });
});

// Essa linha é crucial para manter o servidor aberto!
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});