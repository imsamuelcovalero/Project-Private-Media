import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeComponent from './ThemeComponent';
import { HeaderS, BtnMain } from './Style';
import api from '../../services';
import { getUserInfo, removeUserInfo } from '../../helpers/localStorage.helper';

function Header() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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
    if (userInfo && userInfo.assinaturaAtiva) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <HeaderS>
      <BtnMain
        type="button"
        id="mainBtn"
        onClick={() => navigate('/main')}
      >
        {' '}
        Main
      </BtnMain>
      <div id="main">
        <span id="name">
          Olá, Fulano(a)!
        </span>
        <span id="greetings">
          Seja bem-vindo(a)!
        </span>
      </div>
      {isUserLoggedIn ? (
        <button type="button" onClick={handleLogout}>Sair</button>
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
