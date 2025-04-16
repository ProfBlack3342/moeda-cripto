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
const BCRYPT_SALTROUNDS = 12;

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
        return res.status(400).send(`<p>Preencha todos os campos!</p>`);
    else {
        if(senha !== senhaC)
            return res.status(400).send('A senha e a sua confirmação devem ter valores iguais!');
        else {

            if((new Blob([senha]).size) > 72)
                return res.status(400).send('A senha é muito grande!');
            else {

                bcrypt.hash(senha, BCRYPT_SALTROUNDS, (hashingErr, hash) => {
                    if(hashingErr instanceof Error)
                        return res.status(500).send('Erro criando hash da senha: \n' + hashingErr.message);
                    else {
                        db.execute('INSERT INTO `usuarios` (`login`, `senha`, `nome`, `cpf`, `email`) VALUES (?, ?, ?, ?, ?)', [login, hash, nome, cpf, email],
                            (insertErr, insertResults) => {

                                if(insertErr instanceof Error)
                                    return res.status(500).send('Erro ao registrar o usuário no banco de dados: \n' + insertErr.message);
                                else {

                                    if(insertResults.affectedRows > 0)
                                        res.status(200).json({
                                            id: insertResults.insertId,
                                            login,
                                            nome,
                                            cpf,
                                            email
                                        });
                                    else 
                                        return res.status(500).send('Erro no banco de dados.');
                                }
                            }
                        );
                    }
                });
            }
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

        db.execute('SELECT * FROM `usuarios` WHERE `login` = ?', [login],
            async (selectErr, selectResults) => {

                if(selectErr instanceof Error)
                    return res.status(500).send('Erro ao pesquisar o usuário no banco de dados: \n' + selectErr.message);
                else {

                    if(selectResults.length > 0) {

                        const hashBanco = selectResults[0].senha;

                        bcrypt.compare(senha, hashBanco, (hashCompareErr, isMatch) => {
                            if(hashCompareErr instanceof Error) {
                                return res.status(500).send('Erro durante a comparação de senha com hash: \n' + hashCompareErr.message);
                            }
                            else {
                                if(isMatch){
                                    res.status(200).json({
                                        id: selectResults[0].id,
                                        login: selectResults[0].login,
                                        nome: selectResults[0].nome,
                                        cpf: selectResults[0].cpf,
                                        email: selectResults[0].email
                                    });
                                }
                                else 
                                    return res.status(400).send('Senha incorreta.');
                            }
                        });                        
                    }
                    else 
                        return res.status(500).send('Erro no banco de dados.');
                }
            }
        );
    }
});

// Perfil
server.get(PATHS_API.profile, (req, res, next) => {
    console.log('Rota GET Incompleta de Perfil');
    next();
});
server.get(PATHS_API.profile + '/:id', (req, res) => {

    const id = req.params.id;

    if(!id)
        return res.status(400).send('Informe o id na requisição e/ou preencha o login/senha!');
    else
        res.status(200).json({ message: 'Seu Perfil' });
});
server.post(PATHS_API.profile, (req, res, next) => {
    console.log('Rota POST Incompleta de Perfil');
    next();
});
server.post(PATHS_API.profile + '/:id', (req, res) => {

    const id = req.params.id;
    const {nome, cpf, email, senhaNova, senhaNovaC, login, senha} = req.body;

    if(!id || !login || !senha)
        return res.status(400).send('Informe o id na requisição e/ou preencha o login/senha!');
    else {
        // Verificar o login antes de tentar a atualização
        db.execute('SELECT * FROM `usuarios` WHERE `login` = ?', [login],
            async (selectErr, selectResults) => {

                if(selectErr)
                    return res.status(500).send('Erro ao pesquisar o usuário no banco de dados.');
                else {

                    if(selectResults.length > 0) {

                        const hashBanco = selectResults[0].senha;

                        bcrypt.compare(senha, hashBanco, (hashCompareErr, isMatch) => {
                            if(hashCompareErr instanceof Error) {
                                return res.status(500).send('Erro durante a comparação de senha com hash: \n' + hashCompareErr.message);
                            }
                            else {
                                if(isMatch){
                                    // Se o login e senha estiverem corretos, montar a query e array de dados para o Update
                                    let statementQuery = 'UPDATE `usuarios` SET ';
                                    let statementArray = [];
                                    let change = false;

                                    if(senhaNova) {
                                        if(senhaNova !== senhaNovaC)
                                            return res.status(400).send('A senha nova e a sua confirmação devem ter valores iguais!');
                                        else {
                                            change = true;
                                            const hash = bcrypt.hashSync(senhaNova, BCRYPT_SALTROUNDS);
                                            if(hash instanceof Error)
                                                 return res.status(500).send('Erro criando hash da senha: \n' + hashingErr.message);
                                            else {
                                                statementArray.push(hash);
                                                statementQuery += '`senha` = ?';
                                            }
                                        }
                                    }

                                    if(nome) {
                                        statementArray.push(nome);

                                        if(change)
                                            statementQuery += ', `nome` = ?';
                                        else {
                                            statementQuery += '`nome` = ?';
                                            change = true;
                                        }
                                    }

                                    if(cpf) {

                                        statementArray.push(cpf);

                                        if(change)
                                            statementQuery += ', `cpf` = ?';
                                        else {
                                            statementQuery += '`cpf` = ?';
                                            change = true;
                                        }
                                    }

                                    if(email) {

                                        statementArray.push(email);

                                        if(change)
                                            statementQuery += ', `email` = ?';
                                        else {
                                            statementQuery += '`email` = ?';
                                            change = true;
                                        }
                                    }
                                    
                                    // Se nenhuma mudança foi marcada, encerrar aqui.
                                    // Se foram (e dados correspondentes foram informados), continuar para a execução.
                                    if(!change) 
                                        return res.status(400).send('Nenhum dado foi alterado!');
                                    else {

                                        statementArray.push(id);
                                        statementQuery += ' WHERE `id` = ?';

                                        console.log('statementQuery: ' + statementQuery);
                                        console.log('statementArray: ' + statementArray);

                                        db.execute(statementQuery, statementArray,
                                            (updateErr, updateResults) => {

                                                if(updateErr instanceof Error)
                                                    return res.status(500).send('Erro ao registrar o usuário no banco de dados: \n' + updateErr.message);
                                                else {

                                                    if(updateResults.affectedRows > 0)
                                                        res.status(200).json('Usuário atualizado');
                                                    else 
                                                        return res.status(500).send('Erro no banco de dados.');
                                                }
                                            }
                                        );
                                    }
                                }
                                else 
                                    return res.status(400).send('Senha incorreta.');
                            }
                        });
                    }
                    else 
                        return res.status(500).send('Erro no banco de dados.');
                }
            }
        );
    }
});

// Contato
server.get(PATHS_API.contact, (req, res) => {
    res.json({ message: 'Entre em Contato'});
});
server.post(PATHS_API.contact, (req, res) => {
    const {nome, email, assunto, mensagem} = req.body;

    if(!nome || !email || !assunto || !mensagem)
        return res.status(400).send(`<p>Preencha todos os campos!</p>`);
    else {
        db.execute('INSERT INTO `mensagens` (`nome`, `email`, `assunto`, `mensagem`) VALUES (?, ?, ?, ?)', [nome, email, assunto, mensagem],
            (insertErr, insertResults) => {

                if(insertErr instanceof Error)
                    return res.status(500).send('Erro ao registrar a mensagem no banco de dados.');
                else {

                    if(insertResults.affectedRows > 0)
                        res.status(200).json({
                            nome,
                            email,
                            assunto,
                            mensagem
                        });
                    else 
                        return res.status(500).send('Erro no banco de dados.');
                }
            }
        );
    }
});

// Iniciando o servidor
server.listen(PORT, () => {

    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});