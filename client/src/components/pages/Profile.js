import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UseCookie from '../ReactCookies';

/**
 * Gera e retorna um bloco de código HTML que define a página de perfil
 * @param {Number} port - A porta da conexão com o servidor backend
 * @returns Uma página HTML com perfil do usuário logado, ou um aviso se nenhum estiver
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function ProfilePage({port}) {

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

    console.log(`ProfilePage/Profile.js -> ID: ${idUsuario}; Login: ${loginUsuario}; Nome: ${nomeUsuario}; CPF: ${cpfUsuario}; Email: ${emailUsuario}`);

    const PATH = `http://localhost:${port}/api/profile`;
    const [data, setData] = useState(null);

    const[formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        senhaNova: '',
        senhaNovaC: '',
        login: '',
        senha: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        try {
            console.log(formData);

            const response = await axios.post((PATH + `/${idUsuario}`), formData);

            console.log(response);

            deleteLoginUsuario();
            deleteNomeUsuario();
            deleteCpfUsuario();
            deleteEmailUsuario();
            deleteIdUsuario();

            window.alert('Atualização feita com sucesso!\nFaça Login Novamente.');
            document.location.href = '/login';
            
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

            window.alert('Erro ao atualizar o perfil!');
            document.location.reload();
        }
    };

    useEffect(() => {
        // Requisição para a API do backend
        if(idUsuario !== '') {
            // window.alert('Usuário logado, redirecionando para o perfil pessoal');
            axios.get(PATH + `/${idUsuario}`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
        }
        else {
            // window.alert('Usuário não logado, carregando a página inicial');
            document.location.href = '/';
        }
        // eslint-disable-next-line
    }, []);
    
    return(
        <> {data && (idUsuario !== '')
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="profile">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Dados do Usuário:</p>
                    <p className="w3-center">ID #{idUsuario} - Login: {loginUsuario}</p>
                    <p className="w3-center">Nome:{nomeUsuario}</p>
                    <p className="w3-center">CPF: {cpfUsuario} - Email: {emailUsuario}</p>
                    <p className="w3-center">Se desejar modificar algum dos seus dados, complete abaixo:</p>
                    <form id='profileForm' className='w3-padding-large' method='POST' autoComplete='off' onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="nome">Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" placeholder={nomeUsuario} value={formData.nome} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="cpf">CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf" placeholder={cpfUsuario} value={formData.cpf} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="email">Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" placeholder={emailUsuario} value={formData.email} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="senhaNova">Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNova" name="senhaNova" placeholder='Sua nova senha' value={formData.senhaNova} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="senhaNovaC">Nova Senha (Confirmação):</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNovaC" name="senhaNovaC" placeholder='Confirme a sua nova senha' value={formData.senhaNovaC} onChange={handleChange} />  
                        </p>
                        <p>
                            <label htmlFor="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" placeholder='Seu login' value={formData.login} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha Atual:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" placeholder='Sua senha atual' value={formData.senha} onChange={handleChange} required/>
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