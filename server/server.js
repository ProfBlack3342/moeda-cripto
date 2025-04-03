const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const server = express();

const PORT = 5000;
const MYSQL_CREDENTIALS = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moeda_cripto'
};
const PATHS_API = {
    home: '/api',
    register: '/api/register',
    login: '/api/login',
    profile: '/api/profile',
    contact: '/api/contact'
};
const PATHS_DB_USER = {
    create: PATHS_API.register + '/create',
    read: PATHS_API.login + '/read',
    update: PATHS_API.profile + '/update',
    delete: PATHS_API.profile + '/delete'
};

//// Middleware para permitir requisições de diferentes origens (CORS)
server.use(cors());

//// Middleware para parsear JSON
server.use(express.json());

//// Rotas das Páginas

// Home
server.get(PATHS_API.home, (req, res) => {
    res.json({ message: 'O Que é o Moeda Cripto?' });
});

// Cadastro
server.get(PATHS_API.register, (req, res) => {
    res.json({ message: 'Cadastro de Novo Usuário' });
});

// Login
server.get(PATHS_API.login, (req, res) => {
    res.json({ message: 'Página de Login' });
});

// Perfil
server.get(PATHS_API.profile, (req, res) => {
    res.json({ message: 'Seu Perfil' });
});

// Contato
server.get(PATHS_API.contact, (req, res) => {
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

//// CRUD MySQL

// Registrar um Usuário Novo
server.post(PATHS_DB_USER.create, (req, res) => {

    const {nome, cpf, email, login, senha, senhaC} = req.body;

    if(!login || !senha || !senhaC || !nome || !cpf || !email)
        return res.status(400).send('Preencha todos os campos!');
    else {
        if(senha != senhaC)
            return res.status(400).send('A senha e a sua confirmação devem ter valores iguais!');
        else {
            const hash = bcrypt.hash(senha, 12);
            const QUERY = 'INSERT INTO usuarios (login, senha, nome, cpf, email) VALUES (?, ?, ?, ?, ?)';
            db.query(QUERY, [login, hash, nome, cpf, email], async (err, results) => {
                if(err)
                    return res.status(500).send('Erro ao registrar o usuário no banco de dados.');
                else {
                    if(results.affectedRows > 0)
                        res.json({ id: results.insertId, login, hash, nome, cpf, email}).redirect('/');
                    else 
                        return res.status(500).send('Erro no banco de dados.');
                }
            });
        }
    }
});

// Login de Usuário Existente
server.post(PATHS_DB_USER.read, (req, res) => {
    const {login, senha} = req.body;

    if(!login || !senha)
        return res.status(400).send('Preencha todos os campos!');
    else {
        const QUERY = 'SELECT * FROM usuarios WHERE login = ?';

        db.query(QUERY, [login], async (err, results) => {
            if(err)
                return res.status(500).send('Erro ao pesquisar o login no banco de dados.');
            else {
                if(results.length > 0) {
                    const isMatch = await bcrypt.compare(senha, results[0].senha);

                    if(isMatch) 
                        res.json({message: 'Login feito com sucesso.'}).redirect('/');
                    else 
                        return res.status(400).send('Senha incorreta.');
                    }
                else
                    return res.status(400).send('Usuário não encontrado.');
            }   
        });
    }
});

// Listar Todos os Usuários Existentes
server.get(PATHS_DB_USER.read, (req, res) => {

    const QUERY = 'SELECT * FROM usuarios';

    db.query(QUERY, (err, results) => {
        if(err)
            res.status(500).send('Erro ao consultar banco de dados');
        else
            res.json(results).redirect('/');
    });
});

// Atualizar um Usuário Existente
// W.I.P.
server.post(PATHS_DB_USER.update, (req, res) => {

    const {nome, cpf, email, senhaNova, senhaNovaC, login, senha} = req.body;
    let queryUpdate = 'UPDATE usuarios SET '

    if(!login || !senha)
        return res.status(400).send('Preencha o login/senha!');
    else {
        let change = false;
        if(Object.hasOwn(req.body, 'chkNome')) {
            if(!nome)
                return res.status(400).send('Preencha todos os campos que você deseja modificar!');
            else {
                queryUpdate += 'nome = ' + nome;
                change = true;
            }
        }
        if(Object.hasOwn(req.body, 'chkCpf')) {
            if(!cpf)
                return res.status(400).send('Preencha todos os campos que você deseja modificar!');
            else {
                if(change)
                    queryUpdate += 'cpf = ' + cpf;
                else {
                    queryUpdate += ', cpf = ' + cpf;
                    change = true;
                }
            }
        }
        if(Object.hasOwn(req.body, 'chkEmail')) {
            if(!email)
                return res.status(400).send('Preencha todos os campos que você deseja modificar!');
            else {
                if(change)
                    queryUpdate += 'email = ' + email;
                else {
                    queryUpdate += ', email = ' + email;
                    change = true;
                }
            }
        }
        if(Object.hasOwn(req.body, 'chkSenhaNova')) {
            if(!senhaNova || !senhaNovaC)
                return res.status(400).send('Preencha todos os campos que você deseja modificar!'); 
            else {
                if(senhaNova != senhaNovaC)
                    return res.status(400).send('A senha nova e a sua confirmação devem ter valores iguais!');
                else {
                    if(change)
                        queryUpdate += 'senha = ' + bcrypt.hash(senhaNova, 12);
                    else {
                        queryUpdate += ', senha = ' + bcrypt.hash(senhaNova, 12);
                        change = true;
                    }
                }
            }
        }

        if(!change) 
            return res.status(400).send('Nenhum dado foi alterado!');
        else {
            const QUERY_LOGIN = 'SELECT * FROM usuarios WHERE login = ?';

            db.query(QUERY_LOGIN, [login], async (err, results) => {
                if(err)
                    return res.status(500).send('Erro ao pesquisar o login no banco de dados.');
                else {
                    if(results.length > 0) {
                        const isMatch = await bcrypt.compare(senha, results[0].senha);
                        if(isMatch) {
                            queryUpdate += ' WHERE id = ' + results[0].id;
                            db.query(QUERY, async (err, results) => {
                                if(err)
                                    return res.status(500).send('Erro ao atualizar o usuário no banco de dados.');
                                else {
                                    if(results.affectedRows > 0)
                                        res.json({id: results.insertId, login, hash, nome, cpf, email}).redirect('/');
                                    else 
                                        return res.status(500).send('Erro no banco de dados.');
                                }
                                    
                            });

                        } 
                        else 
                            return res.status(400).send('Senha atual incorreta.');
                        }
                    else
                        return res.status(400).send('Usuário não encontrado.');
                }   
            });
        }
    }
});

//// Iniciar o servidor na porta 5000
server.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});