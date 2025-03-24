import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

const PORT = 8000;

/**
 * 
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se não estiver.
 * @param {Function} userState.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML para registrar um usuário novo
 */
function RegisterPage({currentUser, changeCurrentUser}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(`http://localhost:${PORT}/api/register`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data
            ? <>
                <div className="w3-container w3-padding-64" id="register">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Preencha os campos abaixo para se registrar como usuário:</p>
                    <form>
                        <p>
                            <label for="nome">Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" required/>
                        </p>
                        <p>
                            <label for="cpf">CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf" required/>
                        </p>
                        <p>
                            <label for="email">Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" required/>
                        </p>
                        <p>
                            <label for="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" required/>
                        </p>
                        <p>
                            <label for="senha">Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" required/>
                        </p>
                        <p>
                            <label for="senhaC">Confirme a sua Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaC" name="senhaC" required/>  
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit">Fazer Cadastro</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default RegisterPage;