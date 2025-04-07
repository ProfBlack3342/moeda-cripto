const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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

// Instanciando uma aplicação Express e atribuindo os Middlewares
const server = express();
server.use(cors());
server.use(express.json());

// Criando uma conexão com o banco de dados
const db = mysql.createConnection(MYSQL_CREDENTIALS);
db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Definindo rotas
// Home
server.get(PATHS_API.home, (req, res) => {
    res.json({ message: 'O Que é o Moeda Cripto?' });
});

// Cadastro
server.get(PATHS_API.register, (req, res) => {
    res.json({ message: 'Cadastro de Novo Usuário' });
});
server.post(PATHS_API.register, (req, res) => {

    const {nome, cpf, email, login, senha, senhaC} = req.body;

    if(!login || !senha || !senhaC || !nome || !cpf || !email)
        return res.status(400).send('Preencha todos os campos!');
    else {
        if(senha != senhaC)
            return res.status(400).send('A senha e a sua confirmação devem ter valores iguais!');
        else {
            const hash = bcrypt.hash(senha, 12);

            db.execute(
                'INSERT INTO usuarios (login, senha, nome, cpf, email) VALUES (?, ?, ?, ?, ?)', [login, hash, nome, cpf, email],
                (err, results) => {
                    if(err)
                        return res.status(500).send('Erro ao registrar o usuário no banco de dados.');
                    else {
                        if(results.affectedRows > 0)
                            res.status(200).json({ id: results.insertId, login, hash, nome, cpf, email});
                        else 
                            return res.status(500).send('Erro no banco de dados.');
                    }
                }
            );
        }
    }
});

// Login
server.get(PATHS_API.login, (req, res) => {
    res.json({ message: 'Página de Login' });
});
server.post(PATHS_API.login, (req, res) => {

    const {login, senha} = req.body;

    if(!login || !senha)
        return res.status(400).send('Preencha todos os campos!');
    else {
        const QUERY = 'SELECT * FROM usuarios WHERE login = ?';

        db.execute(
            'SELECT * FROM usuarios WHERE login = ?', [login],
            async (err, rows) => {
                if(err)
                    return res.status(500).send('Erro ao pesquisar o usuário no banco de dados.');
                else {
                    if(results.length > 0) {
                        const hash = results[0].senha;
                        const isMatch = await bcrypt.compare(senha, hash);

                        if(isMatch) 
                            res.status(200).json({id: results[0].id, login: results[0].login, senha: hash, nome: results[0].nome, cpf: results[0].cpf, email: results[0].email});
                        else 
                            return res.status(400).send('Senha incorreta.');
                    }
                    else 
                        return res.status(500).send('Erro no banco de dados.');
                }
            }
        );
    }
});

// Perfil
server.get(PATHS_API.profile, (req, res) => {
    res.redirect(PATHS_API.home);
});
server.get(PATHS_API.profile + '/:id', (req, res) => {
    const id = req.params.id;
    
    res.json({ message: 'Seu Perfil' });
});
server.post(PATHS_API.profile + '/:id', (req, res) => {
    const id = req.params.id;
    const {nome, cpf, email, senhaNova, senhaNovaC, login, senha} = req.body;

    if(!login || !senha)
        return res.status(400).send('Preencha o login/senha!');
    else {
        const QUERY_UPDATE = 'UPDATE usuarios SET ';
        let change = false;
        if(Object.hasOwn(req.body, 'chkSenhaNova')) {
            if(!senhaNova || !senhaNovaC)
                return res.status(400).send('Preencha ou desmarque o campo "Nova Senha"!');
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
        if(Object.hasOwn(req.body, 'chkNome')) {
            if(!nome)
                return res.status(400).send('Preencha ou desmarque o campo "Nome"!');
            else {
                queryUpdate += 'nome = ' + nome;
                change = true;
            }
        }
        if(Object.hasOwn(req.body, 'chkCpf')) {
            if(!cpf)
                return res.status(400).send('Preencha ou desmarque o campo "CPF"!');
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
                return res.status(400).send('Preencha ou desmarque o campo "Email"!');
            else {
                if(change)
                    queryUpdate += 'email = ' + email;
                else {
                    queryUpdate += ', email = ' + email;
                    change = true;
                }
            }
        }
        

        if(!change) 
            return res.status(400).send('Nenhum dado foi alterado!');
        else {
            db.execute(
                'SELECT * FROM usuarios WHERE login = ?', [login],
                async (err, rows) => {
                    if(err)
                        return res.status(500).send('Erro ao pesquisar o usuário no banco de dados.');
                    else {
                        if(results.length > 0) {
                            const hash = results[0].senha;
                            const isMatch = await bcrypt.compare(senha, hash);
    
                            if(isMatch) {
                                const hashN = bcrypt.hash(senhaNova, 12);
                                db.execute(
                                    'UPDATE usuarios SET senha = ?, nome = ?, cpf = ?, email = ? WHERE id = ?', [hashN, nome, cpf, email, id],
                                    (err, results) => {
                                        if(err)
                                            return res.status(500).send('Erro ao registrar o usuário no banco de dados.');
                                        else {
                                            if(results.affectedRows > 0)
                                                res.status(200).json({ id: results.insertId, login, hash, nome, cpf, email});
                                            else 
                                                return res.status(500).send('Erro no banco de dados.');
                                        }
                                    }
                                );
                            } 
                            else 
                                return res.status(400).send('Senha incorreta.');
                        }
                        else 
                            return res.status(500).send('Erro no banco de dados.');
                    }
                }
            );
        }
    }
});

// Contato
server.get(PATHS_API.contact, (req, res) => {
    res.json({ message: 'Entre em Contato'});
});
server.post(PATHS_API.contact, (req, res) => {
    res.json({ message: 'Entre em Contato'});
});

server.get(PATHS_DB_USER.read, (req, res) => {

    const QUERY = 'SELECT * FROM usuarios';

    db.query(QUERY, (err, results) => {
        if(err)
            res.status(500).send('Erro ao consultar banco de dados');
        else
            res.json(results).redirect('/');
    });
});

// Iniciando o servidor
server.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});