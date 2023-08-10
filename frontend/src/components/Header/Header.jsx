import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import ThemeComponent from './ThemeComponent';
import { HeaderS, BtnMain, StyledButton } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';
// import { removeUserInfo } from '../../helpers/localStorage.helper';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(ReactNodeContext);
  // console.log('user', user);

  const handleLogout = async () => {
    await logout();
  };

  const isSignatureActive = user?.assinaturaAtiva?.status;
  // console.log('isSignatureActive', isSignatureActive);

  return (
    <HeaderS>
      <BtnMain
        type="button"
        id="mainBtn"
        onClick={() => (isSignatureActive ? navigate('/main') : navigate('/visitors'))}
      >
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
            <StyledButton type="button" onClick={() => navigate('/profile')}>
              <FaUserCircle />
              {' '}
              Perfil
            </StyledButton>
          )}
          <StyledButton type="button" onClick={handleLogout}>
            <FaSignOutAlt />
            {' '}
            Sair
          </StyledButton>
        </>
      ) : (
        <StyledButton type="button" onClick={() => navigate('/login')}>Entrar</StyledButton>
      )}
      <div id="themeDiv">
        <ThemeComponent />
      </div>
    </HeaderS>
  );
}

export default Header;
