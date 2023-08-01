import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeComponent from './ThemeComponent';
import { HeaderS, BtnMain } from './Style';
import api from '../../services';
import { getUserInfo, removeUserInfo } from '../../helpers/localStorage.helper';

function Header() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSignatureActive, setIsSignatureActive] = useState(false);

  const handleLogout = async () => {
    try {
      await api.logout();
      removeUserInfo();
      navigate('/visitors');
      setIsUserLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const userInfo = getUserInfo();
    console.log('userInfo', userInfo);
    if (userInfo && userInfo.assinaturaAtiva) {
      console.log('userInfo.assinaturaAtiva', userInfo.assinaturaAtiva);
      setIsUserLoggedIn(true);
      if (userInfo.assinaturaAtiva.status) {
        console.log('userInfo.assinaturaAtiva.status', userInfo.assinaturaAtiva.status);
        setIsSignatureActive(true);
      }
    }
  }, []);

  return (
    <HeaderS>
      <BtnMain
        type="button"
        id="mainBtn"
        onClick={() => (isSignatureActive ? navigate('/main') : navigate('/visitors'))}
      >
        {' '}
        Main
      </BtnMain>
      <div id="main">
        <span id="name">
          {isUserLoggedIn
            ? `Olá, ${getUserInfo().nome}!`
            : 'Olá, Visitante!'}
        </span>
        <span id="greetings">
          Seja bem-vindo(a)!
        </span>
      </div>
      {isUserLoggedIn ? (
        <>
          <button type="button" onClick={() => navigate('/profile')}>Perfil</button>
          <button type="button" onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <button type="button" onClick={() => navigate('/login')}>Logar</button>
      )}
      <div id="themeDiv">
        <ThemeComponent />
      </div>
    </HeaderS>
  );
}

export default Header;
