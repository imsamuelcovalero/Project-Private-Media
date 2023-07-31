/* File: src/components/Header/Header.jsx */
import React/* , {  useState, useEffect, useContext } */ from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeComponent from './ThemeComponent';
import { HeaderS, BtnMain } from './Style';
import api from '../../services';
// import getCartInfo from '../../helpers/getCartInfo';
// import formatCurrency from '../FormatCurrency';
// import CognyContext from '../../context/CognyContext';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
      <div id="themeDiv">
        <ThemeComponent />
      </div>
      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
      {' '}
      {/* botão de logout */}
    </HeaderS>
  );
}

export default Header;
