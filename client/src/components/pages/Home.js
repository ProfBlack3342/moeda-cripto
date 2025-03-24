import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_PORT = 5000;

function HomePage() {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Requisição para a API do backend
        axios.get(`http://localhost:${SERVER_PORT}/api`).then(response => setData(response.data)).catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return(
        <> {data
            ? <>
                <div className="w3-row w3-padding-64" id="about1">
                    <div className="w3-col m6 w3-padding-large w3-hide-small">
                        <img src={require('../../imgs/Bitcoin.png')} className="w3-round w3-image w3-opacity-min" alt="Bloco Gênesis Bitcoin" width="800" height="800"/>
                    </div>
                    <div className="w3-col m6 w3-padding-large">
                        <h3 className="w3-center">{data.message}</h3> 
                        <p className="w3-large">
                            O Moeda Digital é uma plataforma online para a introdução e o aprendizado do público Brasileiro sobre o conceito e o uso de Criptomoedas
                        </p>

                        <hr/>

                        <h3 className="w3-center">Mas afinal, o que é uma Criptomoeda?</h3>
                        <p className="w3-large">
                            Uma criptomoeda ou cibermoeda é um meio de troca, geralmente descentralizado, 
                            que se utiliza da tecnologia de blockchain e da criptografia para assegurar a validade das transações e a criação de novas unidades da moeda.
                        </p>
                    </div>
                </div>

                <hr/>

                <div className="w3-row w3-padding-64" id="about2">
                    <div className="w3-col l6 w3-padding-large">
                        <h3 className="w3-center">Vestibulum vulputate nulla laoreet risus varius ornare. ?</h3> 
                        <p className="w3-large">
                            Vivamus eleifend nec elit eu blandit. Ut in sem elementum, faucibus felis quis, gravida erat. 
                            Sed fermentum egestas lectus, id congue leo tincidunt in. Suspendisse vel justo finibus, aliquet augue ut, bibendum enim. 
                            Duis interdum libero vitae tortor auctor eleifend. Fusce eu mattis nisi. Vestibulum sagittis ullamcorper lacus, sit amet ornare tortor maximus non. 
                            Cras tempus faucibus enim, quis egestas purus porttitor non. Fusce vel egestas ligula, vitae consectetur ex. Nulla sollicitudin non lacus vel varius. 
                        </p>

                        <hr/>

                        <h3 className="w3-center">In a fermentum felis, vel mattis mi?</h3>
                        <p className="w3-large">
                            Praesent et laoreet nisl, a blandit eros. Donec pharetra, lectus a congue dapibus, nibh neque pretium orci, vel pellentesque felis urna vulputate orci. 
                            Morbi vehicula semper lobortis. Maecenas dignissim quis massa quis fermentum. Ut pharetra lorem feugiat, efficitur magna sit amet, volutpat nulla. 
                            Nam tristique auctor tempus. Pellentesque bibendum eros sit amet lacus vehicula sollicitudin. Nam non urna laoreet, iaculis velit id, porttitor ante. 
                            Vestibulum vestibulum egestas tortor sit amet pulvinar. Maecenas ultrices dictum leo. Donec convallis lobortis accumsan.
                        </p>
                    </div>
                    <div className="w3-col l6 w3-padding-large">
                        <img src={require('../../imgs/Bitcoin.png')} className="w3-round w3-image w3-opacity-min" alt="Bloco Gênesis Bitcoin" width="800" height="800"/>
                    </div>
                </div>
            </>
            : <h2 className="w3-center">Carregando Página...</h2>
        } </>
    );
}

export default HomePage;