import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HeaderS, BtnMain, ButtonS } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function Header() {
  const {
    user, currentMainUrl, setViewMode, setMediaSelected,
  } = useContext(ReactNodeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToMain = () => {
    setViewMode(null);
    setMediaSelected(false);
    navigate(currentMainUrl);
  };

  return (
    <HeaderS>
      <BtnMain
        type="button"
        id="mainBtn"
        onClick={() => handleNavigateToMain()}
      >
        Main
      </BtnMain>
      <div id="centerHeaderSpace">
        <span id="name">
          {user
            ? (
              <>
                Olá,
                {' '}
                <strong>{user.nome}</strong>
                !
              </>
            )
            : 'Olá, Visitante!'}
        </span>
        <span id="greetings">
          Seja bem-vindo(a)!
        </span>
      </div>
      {user && (
        location.pathname !== '/profile' && (
        <ButtonS type="button" onClick={() => navigate('/profile')}>
          <FaUserCircle />
          {' '}
          Perfil
        </ButtonS>
        )
      )}
    </HeaderS>
  );
}

export default Header;
