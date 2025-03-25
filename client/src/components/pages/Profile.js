import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

const SERVER_PORT = 5000;

/**
 * Gera e retorna um bloco de código HTML que define a página de perfil
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se não estiver.
 * @param {Function} userState.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML com perfil do usuário logado, ou um aviso se nenhum estiver
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.1
 */
function ProfilePage({currentUser, changeCurrentUser}) {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(`http://localhost:${SERVER_PORT}/api/profile`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="profile">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Dados do Usuário:</p>
                    <p className="w3-center">ID #{currentUser.id} - Nome:{currentUser.nome}</p>
                    <p className="w3-center">Login: {currentUser.login} - Senha (Hash): {currentUser.senha}</p>
                    <p className="w3-center">CPF: {currentUser.cpf} - Email: {currentUser.email}</p>
                    <p className="w3-center">Se desejar modificar algum dos seus dados, marque a caixa correspondente e complete abaixo:</p>
                    <form className='w3-padding-large'>
                        <p>
                            <label for="nome"><input type='checkbox'/> Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome"/>
                        </p>
                        <p>
                            <label for="cpf"><input type='checkbox'/> CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf"/>
                        </p>
                        <p>
                            <label for="email"><input type='checkbox'/> Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email"/>
                        </p>
                        <p>
                            <label for="login"><input type='checkbox'/> Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login"/>
                        </p>
                        <p>
                            <label for="senha"><input type='checkbox'/> Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senhaNova1"/>
                        </p>
                        <p>
                            <label for="senhaC">Confirme a sua Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaC" name="senhaC"/>  
                        </p>
                        <p>
                            <label for="senhaA">Senha Atual:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaA" name="senhaA" required/>
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit">Atualizar seu Cadastro</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default ProfilePage;