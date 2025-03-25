import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { User } from './components/Classes';

import HomePage from './components/pages/Home';
import RegisterPage from './components/pages/Register';
import LoginPage from './components/pages/Login';
import ProfilePage from './components/pages/Profile';
import ContactPage from './components/pages/Contact';

/**
 * Gera e retorna um bloco de código HTML que define o topo do site
 * 
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se nenhum estiver.
 * @returns O código HTML de uma navbar + elemento <header> da página.
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function TopoHTML({currentUser}) {

  return(
    <>
      <div className="w3-top">
        <div className="w3-bar w3-orange w3-padding w3-card" style={{'letter-spacing':'4px'}}>
          <a href="/" class="w3-bar-item w3-button">Moeda Cripto</a>
          <div className="w3-right w3-hide-small">
            <a href='/' className="w3-bar-item w3-button">Home</a>
            {currentUser === User
              ? <><a href='/profile' className="w3-bar-item w3-button">Seu Perfil</a><a href='/' className="w3-bar-item w3-button">Sair do Usuário</a></>
              : <><a href='/register' className="w3-bar-item w3-button">Criar Conta</a><a href='/login' className="w3-bar-item w3-button">Fazer Login</a></>
            }
            <a href='/contact' className="w3-bar-item w3-button">Contato</a>
          </div>
        </div>
      </div>

      <header className="w3-display-container w3-content w3-wide" style={{'max-width':'700px', 'min-width':'500px'}} id="home">
        <img className="w3-image w3-round" src={require('./imgs/Bitcoin-Genesis-block.jpg')} alt="bloco genesis bitcoin" width="1600" height="800"/>
        
        <h5 className="w3-center w3-opacity">O Bloco Gênesis da Criptomoeda Bitcoin</h5>
      </header>
    </>
  );
}

/**
 * Gera e retorna um bloco de código HTML que define o conteúdo principal do site
 * 
 * @param {Object} userState - Um objeto contendo:
 * @param {User | null} userState.currentUser - O usuário atualmente logado, ou nulo se não estiver.
 * @param {Function} userState.changeCurrentUser - A função que altera o usuário logado atualmente.
 * @returns O código HTML com o conteúdo da página
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function ConteudoHTML({currentUser, changeCurrentUser}) {

  return(
    <div className="w3-content" style={{'max-width':'1100px'}}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage currentUser={currentUser} setCurrentUser={changeCurrentUser}/>}/>
        <Route path='/login' element={<LoginPage currentUser={currentUser} setCurrentUser={changeCurrentUser}/>}/>
        <Route path='/profile' element={<ProfilePage currentUser={currentUser} setCurrentUser={changeCurrentUser}/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
      </Routes>
    </div>
  );
}

/**
 * Gera e retorna um bloco de código HTML que define o Footer do site
 * 
 * @returns O código HTML do elemento <footer> da página
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function FooterHTML() {
  
  return (
    <footer class="w3-center w3-orange w3-padding-32">
      <div id="mapa">
        <h2>Localização</h2>
          <iframe title="Localizacao" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55261.302456100624!2d-51.23043050671742!3d-30.04169437567704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951978567f17f28d%3A0x2c2c5272bacf4d3a!2sSenac%20Tech!5e0!3m2!1spt-BR!2sbr!4v1724075560999!5m2!1spt-BR!2sbr"
            width="400" height="300" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
      </div>
      <div id="redes">
          <h2>Redes Sociais</h2>
          <a href={"https://www.facebook.com/senacrsoficial"} target="_blank" rel="noreferrer noopener">
            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.3107" cy="32.3107" r="32.3107" fill="#E1EED0"/>
              <path d="M39.1474 34.3816L39.9352 29.3272H35.0121V26.1181C34.9806 25.787 35.0164 25.4531 35.1174 25.1357C35.2185 24.8182 35.3829 24.5234 35.601 24.2683C35.8192 24.0133 36.0868 23.8029 36.3885 23.6495C36.6902 23.4961 37.0199 23.4025 37.3588 23.3743C37.544 23.3501 37.7315 23.3501 37.9167 23.3743H40.1813V18.9939C38.8563 18.7881 37.5185 18.6701 36.1772 18.6409C32.0747 18.6409 29.3998 21.0798 29.3998 25.4602V29.3112H24.8542V34.3816H29.3998V46.6083H34.9957V34.3816H39.1474Z"
                fill="#133700"/>
            </svg>
          </a>
          <a href={"https://www.instagram.com/senacrs/"} target="_blank" rel="noreferrer noopener">
            <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="33.1164" cy="32.3107" r="32.3107" fill="#E1EED0"/>
              <path d="M32.9687 25.2996C31.6704 25.2996 30.4013 25.676 29.3219 26.3812C28.2424 27.0865 27.401 28.0889 26.9042 29.2617C26.4075 30.4344 26.2774 31.7249 26.5308 32.9699C26.784 34.2149 27.4091 35.3586 28.3271 36.2562C29.2451 37.1538 30.4148 37.7651 31.688 38.0126C32.9613 38.2603 34.2812 38.1332 35.4806 37.6474C36.68 37.1616 37.7053 36.3391 38.4266 35.2835C39.1478 34.2281 39.5327 32.9872 39.5327 31.7178C39.5327 30.0156 38.8412 28.3831 37.6102 27.1794C36.3792 25.9758 34.7096 25.2996 32.9687 25.2996ZM32.9687 35.8896C32.1313 35.8896 31.3127 35.6469 30.6164 35.1919C29.9203 34.7371 29.3776 34.0905 29.0571 33.3341C28.7367 32.5776 28.6528 31.7452 28.8161 30.9422C28.9795 30.1393 29.3828 29.4016 29.9748 28.8226C30.567 28.2437 31.3214 27.8494 32.1426 27.6897C32.9639 27.5299 33.8153 27.6119 34.5889 27.9253C35.3625 28.2386 36.0238 28.7692 36.489 29.4499C36.9542 30.1307 37.2025 30.9311 37.2025 31.7498C37.2047 32.2942 37.0967 32.8334 36.8847 33.3365C36.6727 33.8398 36.3609 34.297 35.9673 34.6819C35.5738 35.0667 35.1061 35.3715 34.5914 35.5788C34.0768 35.7861 33.5253 35.8918 32.9687 35.8896Z"
                fill="#133700"/>
              <path d="M38.2199 44.8755H27.5039C25.367 44.8755 23.3175 44.0455 21.8065 42.5681C20.2954 41.0905 19.4465 39.0866 19.4465 36.9971V26.5193C19.4465 24.4298 20.2954 22.4259 21.8065 20.9484C23.3175 19.4709 25.367 18.6409 27.5039 18.6409H38.2199C40.3441 18.662 42.3742 19.5008 43.8702 20.9756C45.3662 22.4503 46.2075 24.4422 46.2117 26.5193V36.9971C46.2117 39.0755 45.3719 41.0698 43.875 42.5454C42.378 44.021 40.3454 44.8586 38.2199 44.8755ZM27.5039 21.1119C26.0372 21.1119 24.6305 21.6816 23.5935 22.6957C22.5563 23.7098 21.9737 25.0852 21.9737 26.5193V36.9971C21.9737 37.7072 22.1166 38.4104 22.3946 39.0664C22.6725 39.7225 23.0799 40.3186 23.5935 40.8207C24.107 41.3229 24.7166 41.7211 25.3876 41.9929C26.0585 42.2646 26.7777 42.4045 27.5039 42.4045H38.2199C38.9461 42.4045 39.6652 42.2646 40.3361 41.9929C41.0072 41.7211 41.6167 41.3229 42.1304 40.8207C42.6439 40.3186 43.0512 39.7225 43.3291 39.0664C43.6071 38.4104 43.7501 37.7072 43.7501 36.9971V26.5193C43.7501 25.0852 43.1674 23.7098 42.1304 22.6957C41.0932 21.6816 39.6866 21.1119 38.2199 21.1119H27.5039Z"
                fill="#133700"/>
            </svg>
          </a>
          <a href={"https://twitter.com/senacrs"} target="_blank" rel="noreferrer noopener">
            <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.9223" cy="32.3107" r="32.3107" fill="#E1EED0"/>
              <path d="M45.6 24.7685C44.7798 25.1079 43.9198 25.3451 43.04 25.4745C43.4501 25.4745 44.0565 24.6723 44.3026 24.3835C44.6766 23.9364 44.96 23.4247 45.1401 22.8752C45.1401 22.8752 45.1401 22.7789 45.1401 22.7468C45.1203 22.7355 45.0979 22.7296 45.0743 22.7296C45.0507 22.7296 45.0283 22.7355 45.0084 22.7468C44.0528 23.2413 43.0387 23.6186 41.9886 23.87C41.9576 23.89 41.9203 23.9007 41.883 23.9007C41.8445 23.9007 41.8072 23.89 41.7761 23.87C41.6966 23.7766 41.6083 23.6906 41.5139 23.6133C41.074 23.2506 40.5819 22.9532 40.0525 22.7307C39.3391 22.4542 38.5711 22.3338 37.8044 22.3777C37.0587 22.4291 36.333 22.6313 35.6719 22.9714C35.0108 23.3106 34.4254 23.7741 33.9482 24.3353C33.4648 24.93 33.1181 25.6196 32.9304 26.3571C32.7826 27.0557 32.7826 27.7764 32.9304 28.4751C32.9304 28.5874 32.9304 28.6034 32.8161 28.5874C28.8009 28.1874 25.0827 26.3329 22.3959 23.3886C22.2642 23.2602 22.1983 23.2602 22.1002 23.3886C21.5645 24.3632 21.3632 25.48 21.526 26.5747C21.6888 27.6694 22.2058 28.6843 23.0024 29.4699C23.2 29.6464 23.4125 29.8389 23.6424 30.0154C22.9452 29.9649 22.2642 29.7795 21.6403 29.4699C21.526 29.3897 21.4602 29.4699 21.444 29.5662C21.4278 29.7584 21.4278 29.9517 21.444 30.1438C21.567 31.0579 21.9361 31.9237 22.5127 32.6536C23.0894 33.3833 23.8524 33.9512 24.726 34.2997C24.9447 34.3807 25.1697 34.4451 25.3983 34.4922C24.7459 34.5963 24.081 34.5963 23.4286 34.4922C23.282 34.4922 23.2323 34.4922 23.282 34.6686C23.6188 35.5276 24.1743 36.2888 24.895 36.8808C25.6146 37.473 26.477 37.8767 27.4003 38.0543H27.9745C27.1717 38.7608 26.2024 39.2623 25.1523 39.5145C23.7803 39.9901 22.3201 40.176 20.8686 40.06C20.64 40.06 20.5903 40.06 20.5244 40.06C20.4585 40.06 20.5244 40.1402 20.5244 40.2045C20.8164 40.391 21.1172 40.5624 21.4266 40.7178C22.3325 41.1974 23.2907 41.5743 24.2824 41.8411C26.8324 42.5846 29.5366 42.6634 32.1277 42.0695C34.7187 41.4756 37.106 40.2298 39.0521 38.4555C40.4514 36.9672 41.5338 35.2223 42.2384 33.3218C42.9418 31.4213 43.2537 29.403 43.1543 27.384C43.1543 27.2235 43.3345 27.1433 43.45 27.0631C44.2156 26.4721 44.8953 25.781 45.4682 25.0092C45.5527 24.8976 45.5987 24.7628 45.6 24.6241C45.6 24.6241 45.6981 24.7204 45.6 24.7685Z"
                fill="#133700"/>
            </svg>
          </a>
      </div>
      {/* Link para voltar ao topo da página */}
      <div id="voltarTopo" className="w3-hover-text-green">
        <a href={"/#"}>- Voltar ao Topo -</a>
      </div>
    </footer>
  );
}

/**
 * Chama as outras funções, monta e retorna um bloco de código HTML que define o corpo do site
 * 
 * @returns O código HTML que sera renderizado no elemento <body> da página
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const changeCurrentUser = (newUser) => {
    setCurrentUser(newUser);
  };

  return (
    <Router>

      <div className='w3-black w3-padding-64'>
        <TopoHTML currentUser={currentUser}/>
      </div>
        
      <div className='w3-topbar w3-white'>
        <ConteudoHTML currentUser={currentUser} setCurrentUser={changeCurrentUser}/>
      </div>

      <div>
        <FooterHTML/>
      </div>

    </Router>
  );
}

export default App;
