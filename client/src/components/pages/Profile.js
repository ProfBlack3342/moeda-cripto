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
function ProfilePage({port, userId, funcChangeId, funcChangeLogin, funcChangeHash, funcChangeNome, funcChangeCpf, funcChangeEmail}) {

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

            const response = await axios.post(PATH, formData);
            
            funcChangeId(response.data.id);
            funcChangeLogin(response.data.login);
            funcChangeHash(response.data.hash);
            funcChangeNome(response.data.nome);
            funcChangeCpf(response.data.cpf);
            funcChangeEmail(response.data.email);

            window.alert('Atualização feita com sucesso!\nFaça login novamente...');
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
        if(userId != '')
            axios.get(PATH + `/${userId}`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
        else
            document.location.href = '/';
    }, []);
    
    return(
        <> {data && userId != ''
            ? <>
                <div className="w3-container w3-padding-64 w3-white w3-border w3-border-gray" id="profile">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Dados do Usuário:</p>
                    <p className="w3-center">ID #{userId} - Login: {loginUsuario}</p>
                    <p className="w3-center">Nome:{nomeUsuario}</p>
                    <p className="w3-center">CPF: {cpfUsuario} - Email: {emailUsuario}</p>
                    <p className="w3-center">Se desejar modificar algum dos seus dados, marque a caixa correspondente e complete abaixo:</p>
                    <form id='profileForm' className='w3-padding-large' method='POST' autoComplete='off' onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="nome"><input type='checkbox' id='chkNome' name='chkNome'/> Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" placeholder='Digite o seu nome aqui' value={formData.nome} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="cpf"><input type='checkbox' id='chkCpf' name='chkCpf'/> CPF:</label>
                            <input className="w3-input w3-padding-16" type="text" id="cpf" name="cpf" placeholder='Digite o seu CPF aqui' value={formData.cpf} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="email"><input type='checkbox' id='chkEmail' name='chkEmail'/> Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" placeholder='Digite o seu Email aqui' value={formData.email} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="senhaNova"><input type='checkbox' id='chkSenhaNova' name='chkSenhaNova'/> Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNova" name="senhaNova" placeholder='Digite uma senha nova aqui' value={formData.senhaNova} onChange={handleChange} />
                        </p>
                        <p>
                            <label htmlFor="senhaNovaC">Confirme a sua Nova Senha:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senhaNovaC" name="senhaNovaC" placeholder='Confirme a sua senha nova aqui' value={formData.senhaNovaC} onChange={handleChange} />  
                        </p>
                        <p>
                            <label htmlFor="login">Login:</label>
                            <input className="w3-input w3-padding-16" type="text" id="login" name="login" placeholder='Digite o seu login aqui' value={formData.login} onChange={handleChange} required/>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha Atual:</label>
                            <input className="w3-input w3-padding-16" type="password" id="senha" name="senha" placeholder='Digite a sua senha atual aqui' value={formData.senha} onChange={handleChange} required/>
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