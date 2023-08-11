/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import { ProfileS } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileComponent() {
  const { user, logout, setIsEditFormActivated } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  /* useEffect que verifica se o usuário está logado  */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
        // console.log('data', data);
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  return (
    <ProfileS>
      <h1>Perfil</h1>
      <p>
        Status da assinatura:
        {' '}
        {user?.assinaturaAtiva.status ? 'Ativa' : 'Inativa'}
      </p>
      {!user?.assinaturaAtiva.status && <button type="button" id="paymentButton" onClick={() => navigate('/subscription')}>Assinar agora!</button>}
      <div id="itensPerfil">
        <button
          id="editProfileButton"
          type="button"
          onClick={() => {
            setIsEditFormActivated(true);
            navigate('/profile/edit');
          }}
        >
          Editar perfil
        </button>
        <div>
          <div>
            <span id="title">Nome</span>
            <p>{user.name}</p>
          </div>
          <div>
            <span id="title">Email</span>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      <button type="button" id="backButton" onClick={() => navigate(-1)}>Voltar</button>
    </ProfileS>
  );
}

export default ProfileComponent;
