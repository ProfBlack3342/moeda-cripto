import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User as CurrentUser } from '../Classes'; 

/**
 * Gera e retorna um bloco de código HTML que define a página de login
 * @param {Number} port - A porta da conexão com o servidor backend
 * @returns Uma página HTML para fazer login em um usuário existente
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function LoginPage({port}) {

    const PATH = `http://localhost:${port}/api/login`;
    const [data, setData] = useState(null);

    const[formData, setFormData] = useState({
        login: '',
        senha: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        try {

            const response = await axios.post(PATH, formData);

            CurrentUser.id = response.data.id;
            CurrentUser.login = response.data.login;
            CurrentUser.hash = response.data.hash;
            CurrentUser.nome = response.data.nome;
            CurrentUser.cpf = response.data.cpf;
            CurrentUser.email = response.data.email;

            window.alert('Login feito com sucesso!');
            document.location.href = '/';
            
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request)
                console.log(error.request);
            else 
                console.log('Error', error.message);
            
            console.log(error.config);

            window.alert('Erro ao fazer login!');
            document.location.reload();
        }
    };

    useEffect(() => {
        // Requisição para a API do backend
        if(CurrentUser.id)
            document.location.href = '/';
        else
            axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    useEffect(() => {
        console.log('Carregando Login.js -> Usuário Atual: ' + (CurrentUser.id ? CurrentUser.toString() : 'Vazio'));
        window.alert('Carregando Login.js');
        return () => {
            console.log('Fechando Login.js -> Usuário Atual: ' + (CurrentUser.id ? CurrentUser.toString() : 'Vazio'));
            window.alert('Fechando Login.js');
        }
        
    }, [CurrentUser.login, CurrentUser.senha]);

    return(
        <> {data && !CurrentUser.id
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="login">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Preencha os dados abaixo para se realizar o seu login:</p>
                    <form id='loginForm' className='w3-padding-large' method='POST' autoComplete='off' onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" placeholder='Digite o seu login aqui' value={formData.login} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" placeholder='Digite a sua senha aqui' value={formData.senha} onChange={handleChange} required/>
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