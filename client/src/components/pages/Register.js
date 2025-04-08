import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

/**
 * Gera e retorna um bloco de código HTML que define a página de registro
 * @param {Object} props - Um objeto contendo:
 * @param {Number} props.port - A porta da conexão com o servidor backend
 * @param {User | null} props.currentUser - O usuário atualmente logado, ou nulo se nenhum estiver.
 * @param {(newUser: User) => void} props.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML para registrar um usuário novo
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function RegisterPage({port, currentUser, changeCurrentUser}) {

    const PATH = `http://localhost:${port}/api/register`;
    const [data, setData] = useState(null);

    const [postForm, setPostForm] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaC, setSenhaC] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = new User();
        axios.post(PATH, {
                nome,
                cpf,
                email,
                login,
                senha,
                senhaC
            }
        ).then(response => {
            user.id = response.data.id;
            user.login = response.data.login;
            user.hash = response.data.hash;
            user.nome = response.data.nome;
            user.cpf = response.data.cpf;
            user.email = response.data.email;
            changeCurrentUser(user);
            console.log(user.toString);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setPostForm(true);
        });
    };

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    useEffect(() => {
        if(postForm) {
            
        }
    }, [postForm]);

    return(
        <> {data && !currentUser
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="register">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Preencha os campos abaixo para se registrar como usuário:</p>
                    <form className='w3-padding-large' method='POST' autoComplete='off'>
                        <p>
                            <label htmlFor="nome">Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" onChange={(evt) => setNome(evt.target.value)} required/>
                        </p>
                        <p>
                            <label htmlFor="cpf">CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf" onChange={(evt) => setCpf(evt.target.value)} required/>
                        </p>
                        <p>
                            <label htmlFor="email">Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" onChange={(evt) => setEmail(evt.target.value)} required/>
                        </p>
                        <p>
                            <label htmlFor="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" onChange={(evt) => setLogin(evt.target.value)} required/>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" onChange={(evt) => setSenha(evt.target.value)} required/>
                        </p>
                        <p>
                            <label htmlFor="senhaC">Confirme a sua Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaC" name="senhaC" onChange={(evt) => setSenhaC(evt.target.value)} required/>  
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit" formAction={PATH} onSubmit={(evt) => handleSubmit(evt)}>Fazer Cadastro</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default RegisterPage;