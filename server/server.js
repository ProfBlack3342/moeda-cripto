// Importando o Express
const express = require('express');
const cors = require('cors');

// Criando a aplicação Express
const app = express();

// Permitir requisições do frontend (React)
app.use(cors());

// Configurar o middleware para responder com JSON
app.use(express.json());

// Rota de exemplo da API (GET)
app.get('/api/home', (req, res) => {
    res.json({ message: "Bem-vindo à página inicial da API!" });
});

// Rota da API para "Sobre"
app.get('/api/sobre', (req, res) => {
    res.json({ message: "Informações sobre a nossa empresa." });
});

// Rota da API para "Contato"
app.get('/api/contato', (req, res) => {
    res.json({ message: "Entre em contato conosco!" });
});

// Iniciando o servidor na porta 5000
app.listen(5000, () => {
    console.log('Servidor backend rodando na porta 5000');
});