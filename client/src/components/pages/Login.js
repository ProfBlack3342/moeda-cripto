import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../Classes.js';

/**
 * Gera e retorna um bloco de código HTML que define a página de login
 * @param {Object} props - Um objeto contendo:
 *      @param {Number} props.port - A porta da conexão com o servidor backend
 *      @param {User | null} props.currentUser - O usuário atualmente logado, ou nulo se nenhum estiver.
 *      @param {(newUser: User) => void} props.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns Uma página HTML para fazer login em um usuário existente
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function LoginPage({port, currentUser, changeCurrentUser}) {

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
            
            const user = new User();
            user.id = response.data.id;
            user.login = response.data.login;
            user.hash = response.data.hash;
            user.nome = response.data.nome;
            user.cpf = response.data.cpf;
            user.email = response.data.email;
            changeCurrentUser(user);

            console.log(user.toString());

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
        if(currentUser)
            document.location.href = '/';
        else
            axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data && !currentUser
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