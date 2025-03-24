const express = require('express');
const cors = require('cors');

const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const server = express();

const SERVER_PORT = 5000;
const MYSQL_CREDENTIALS = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moeda-cripto'
};
const SERVER_PATH_PAGES = {
    contact: '/api/contact',
    home: '/api/home',
    login: '/api/login',
    register: '/api/register',
    profile: '/api/profile'
};
const SERVER_PATH_DB_USER = {
    registrar: '/db/user/create',
    login: '/db/user/read',
    atualizar: '/db/user/update',
    excluir: '/db/user/delete'
};

//// Middleware para permitir requisições de diferentes origens (CORS)
server.use(cors());

//// Middleware para parsear JSON
server.use(express.json());

//// Rotas das Páginas

// Home
server.get(SERVER_PATH_PAGES.home, (req, res) => {
    res.json({ message: 'O Que é o Moeda Digital?' });
});

// Cadastro
server.get(SERVER_PATH_PAGES.register, (req, res) => {
    res.json({ message: 'Cadastro de Novo Usuário' });
});

// Login
server.get(SERVER_PATH_PAGES.login, (req, res) => {
    res.json({ message: 'Página de Login' });
});

// Perfil
server.get(SERVER_PATH_PAGES.profile, (req, res) => {
    res.json({ message: 'Seu Perfil' });
});

// Contato
server.get(SERVER_PATH_PAGES.contact, (req, res) => {
    res.json({ message: 'Entre em Contato'});
});

//// Conexão com o banco de dados
const db = mysql.createConnection(MYSQL_CREDENTIALS);
db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }

    console.log('Conectado ao banco de dados MySQL!');
});

//// Comandos MySQL

// Registrar um Usuário Novo
server.post(SERVER_PATH_DB_USER.user, (req, res) => {

    const {login, senha, nome, cpf, email} = req.body;

    if(!login || senha || nome || cpf || email)
        return res.status(400).send('Preencha todos os campos!');

    const QUERY = 'INSERT INTO usuarios (loginUsuario, senhaUsuario, nomeUsuario, cpfUsuario, emailUsuario) VALUES (?, ?, ?, ?, ?)';

    db.query(QUERY, [login, senha, nome, cpf, email], async (err, results) => {
        if(err) {
            return res.status(500).send('Erro ao registrar o usuário no banco de dados.');
        }
            
        else {
            if(results.affectedRows > 0) {
                res.json({ id: results.insertId, login, senha, nome, cpf, email});
            }
            else {
                return res.status(500).send('Erro ao inserir o usuário no banco de dados.');
            }
        }
            
    });
});

// Login
server.post(SERVER_PATH_DB_USER.user, (req, res) => {
    const {login, senha} = req.body;

    if(!login || senha)
        return res.status(400).send('Preencha todos os campos!');

    const QUERY1 = 'SELECT * FROM usuarios WHERE loginUsuario = ?';

    db.query(QUERY1, [login], async (err, results) => {
        if(err) {
            return res.status(500).send('Erro ao pesquisar o login no banco de dados.');
        }
        else if(results.length > 0) {
            const isMatch = await bcrypt.compare(senha, results[0].senhaUsuario);
            if(isMatch) {
                res.json({message: 'Login feito com sucesso.'});
            }
            else {
                return res.status(400).send('Senha incorreta.');
            }
        }
        else {
            return res.status(400).send('Usuário não encontrado.');
        }
    });
});

// Listar Todos os Usuários Existentes
server.get(SERVER_PATH_DB_USER.user, (req, res) => {

    const QUERY = 'SELECT * FROM usuarios';

    db.query(QUERY, (err, results) => {
        if(err)
            res.status(500).send('Erro ao consultar banco de dados');
        else
            res.json(results);
    });
});

//// Iniciar o servidor na porta 8000
server.listen(SERVER_PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${SERVER_PORT}`);
});