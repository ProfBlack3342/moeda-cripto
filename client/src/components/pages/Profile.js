import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

/**
 * Gera e retorna um bloco de código HTML que define a página de perfil
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se não estiver.
 * @param {Function} userState.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML com perfil do usuário logado, ou um aviso se nenhum estiver
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function ProfilePage({port, currentUser, changeCurrentUser}) {

    const PATH = `http://localhost:${port}/api/profile`;
    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);
    
    return(
        <> {data && currentUser
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="profile">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Dados do Usuário:</p>
                    <p className="w3-center">ID #{currentUser.id} - Nome:{currentUser.nome}</p>
                    <p className="w3-center">Login: {currentUser.login} - Senha (Hash): {currentUser.senha}</p>
                    <p className="w3-center">CPF: {currentUser.cpf} - Email: {currentUser.email}</p>
                    <p className="w3-center">Se desejar modificar algum dos seus dados, marque a caixa correspondente e complete abaixo:</p>
                    <form className='w3-padding-large' method='POST' autoComplete='off'>
                        <p>
                            <label for="nome"><input type='checkbox' id='chkNome' name='chkNome'/> Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome"/>
                        </p>
                        <p>
                            <label for="cpf"><input type='checkbox' id='chkCpf' name='chkCpf'/> CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf"/>
                        </p>
                        <p>
                            <label for="email"><input type='checkbox' id='chkEmail' name='chkEmail'/> Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email"/>
                        </p>
                        <p>
                            <label for="senhaNova"><input type='checkbox' id='chkSenhaNova' name='chkSenhaNova'/> Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNova" name="senhaNova"/>
                        </p>
                        <p>
                            <label for="senhaNovaC">Confirme a sua Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNovaC" name="senhaNovaC"/>  
                        </p>
                        <p>
                            <label for="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login"/>
                        </p>
                        <p>
                            <label for="senha">Senha Atual:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" required/>
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit" >Atualizar seu Cadastro</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default ProfilePage;