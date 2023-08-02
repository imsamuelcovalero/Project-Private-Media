import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeComponent from './ThemeComponent';
import { HeaderS, BtnMain } from './Style';
// import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
// import { removeUserInfo } from '../../helpers/localStorage.helper';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(ReactNodeContext);
  console.log('user', user);

  const handleLogout = async () => {
    await logout();
  };

  const isSignatureActive = user?.assinaturaAtiva?.status;
  console.log('isSignatureActive', isSignatureActive);

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
      <div id="centerHeaderSpace">
        <span id="name">
          {user
            ? `Olá, ${user.nome}!`
            : 'Olá, Visitante!'}
        </span>
        <span id="greetings">
          Seja bem-vindo(a)!
        </span>
      </div>
      {user ? (
        <>
          {location.pathname !== '/profile' && (
            <button type="button" onClick={() => navigate('/profile')}>Perfil</button>
          )}
          <button type="button" onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <button type="button" onClick={() => navigate('/login')}>Entrar</button>
      )}
      <div id="themeDiv">
        <ThemeComponent />
      </div>
    </HeaderS>
  );
}

export default Header;
