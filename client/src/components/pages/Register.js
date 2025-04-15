import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UseCookie from '../ReactCookies';

/**
 * Gera e retorna um bloco de código HTML que define a página de registro
 * @param {Number} port - A porta da conexão com o servidor backend
 * @returns Uma página HTML para registrar um usuário novo
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function RegisterPage({port}) {

    const [idUsuario, setIdUsuario, deleteIdUsuario] = UseCookie("user.id");
    const [loginUsuario, setLoginUsuario, deleteLoginUsuario] = UseCookie("user.login");
    const [nomeUsuario, setNomeUsuario, deleteNomeUsuario] = UseCookie("user.nome");
    const [cpfUsuario, setCpfUsuario, deleteCpfUsuario] = UseCookie("user.cpf");
    const [emailUsuario, setEmailUsuario, deleteEmailUsuario] = UseCookie("user.email");

    const PATH = `http://localhost:${port}/api/register`;
    const [data, setData] = useState(null);

    const[formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        login: '',
        senha: '',
        senhaC: ''
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

            window.alert('Cadastro feito com sucesso, redirecionando para o seu perfil!');
            document.location.href = '/profile/?id=${idUsuario}';
            
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

            window.alert('Erro ao fazer o cadastro!');
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
            // window.alert('Usuário não logado, carregando a página de cadastro');
            axios.get(PATH).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
        }
        // eslint-disable-next-line
    }, []);

    return(
        <> {data && (idUsuario === '')
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="register">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Preencha os campos abaixo para se registrar como usuário:</p>
                    <form id='registerForm' className='w3-padding-large' method='POST' autoComplete='off' onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="nome">Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" placeholder='Digite o seu nome aqui' value={formData.nome} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="cpf">CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf" placeholder='Digite o seu CPF aqui' value={formData.cpf} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="email">Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" placeholder='Digite o seu Email aqui' value={formData.email} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" placeholder='Digite o seu login' value={formData.login} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" placeholder='Digite a sua senha aqui' value={formData.senha} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="senhaC">Confirme a sua Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaC" name="senhaC" placeholder='Digite novamente a sua senha aqui' value={formData.senhaC} onChange={handleChange} required/>  
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