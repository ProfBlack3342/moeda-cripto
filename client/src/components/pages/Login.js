import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

const SERVER_PORT = 5000;

/**
 * Gera e retorna um bloco de código HTML que define a página de login
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se não estiver.
 * @param {Function} userState.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML para fazer login em um usuário existente
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.1
 */
function LoginPage({currentUser, changeCurrentUser}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(`http://localhost:${SERVER_PORT}/api/login`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data && !currentUser
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="login">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Preencha os dados abaixo para se realizar o seu login:</p>
                    <form className='w3-padding-large' method='POST' autoComplete='off'>
                        <p>
                            <label for="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" required/>
                        </p>
                        <p>
                            <label for="senha">Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" required/>
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit">Fazer Login</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default LoginPage;