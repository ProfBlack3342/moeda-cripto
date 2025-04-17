import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UseCookie from '../ReactCookies';

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

    // eslint-disable-next-line
    const [idUsuario, setIdUsuario, deleteIdUsuario] = UseCookie("user.id");
    // eslint-disable-next-line
    const [loginUsuario, setLoginUsuario, deleteLoginUsuario] = UseCookie("user.login");
    // eslint-disable-next-line
    const [nomeUsuario, setNomeUsuario, deleteNomeUsuario] = UseCookie("user.nome");
    // eslint-disable-next-line
    const [cpfUsuario, setCpfUsuario, deleteCpfUsuario] = UseCookie("user.cpf");
    // eslint-disable-next-line
    const [emailUsuario, setEmailUsuario, deleteEmailUsuario] = UseCookie("user.email");

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

            setLoginUsuario(response.data.login);
            setNomeUsuario(response.data.nome);
            setCpfUsuario(response.data.cpf);
            setEmailUsuario(response.data.email);
            setIdUsuario(response.data.id);

            window.alert('Login feito com sucesso, redirecionando para o seu perfil!');
            document.location.href = `/profile/?id=${idUsuario}`;
            
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
        if(idUsuario !== '') {
            // window.alert('Usuário já logado, redirecionando para o perfil');
            document.location.href = `/profile/?id=${idUsuario}`;
        }
        else {
            // window.alert('Usuário não logado, carregando a página de login');
            axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
        }
        // eslint-disable-next-line
    }, []);

    return(
        <> {data && (idUsuario === '')
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