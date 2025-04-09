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
            
            const user = new User();
            user.id = response.data.id;
            user.login = response.data.login;
            user.hash = response.data.hash;
            user.nome = response.data.nome;
            user.cpf = response.data.cpf;
            user.email = response.data.email;
            changeCurrentUser(user);

            console.log(user.toString());
            window.alert('Cadastro feito com sucesso!');
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

            window.alert('Erro ao fazer o cadastro!');
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

    useEffect(() => {
        return() => {
            document.location.href = '/';
        };
    }, [currentUser]);

    return(
        <> {data && !currentUser
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