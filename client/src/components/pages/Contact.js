import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PORT = 8000;

function ContactPage() {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(`http://localhost:${PORT}/api/contact`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data
            ? <>
                <div className="w3-container w3-padding-64" id="contact">
                    <h1 className="w3-center">{data.message}</h1>
                    <p className="w3-center">Deixe aqui os seus dados se desejar entrar em contato conosco:</p>
                    <form>
                        <p>
                        
                            <label for="nome">Nome:</label>
                            <input className="w3-input w3-padding-16" type="text" id="nome" name="nome" required/>
                        </p>
                        <p>
                            <label for="email">Email:</label>
                            <input className="w3-input w3-padding-16" type="email" id="email" name="email" required/>
                        </p>
                        <p>
                            <label for="assunto">Assunto:</label>
                            <input className="w3-input w3-padding-16" type="text" id="assunto" name="assunto" required/>
                        </p>
                        <p>
                            <label for="msg">Mensagem:</label>
                            <textarea className="w3-input w3-padding-16" type="text" id="msg" name="msg" rows={10} cols={50} required/>
                        </p>
                        <p>
                            <button className="w3-button w3-light-grey w3-section" type="submit">Enviar</button>
                        </p>
                    </form>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default ContactPage;