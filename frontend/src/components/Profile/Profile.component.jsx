/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import { ProfileS, ButtonS } from './Style';
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
      <p className="subscription-status">
        Status da assinatura:
        {' '}
        {user?.assinaturaAtiva.status ? 'Ativa' : 'Inativa'}
      </p>
      {!user?.assinaturaAtiva.status && <ButtonS className="primary" type="button" id="paymentButton" onClick={() => navigate('/subscription')}>Assinar agora!</ButtonS>}
      <div className="profile-items">
        <ButtonS
          className="primary"
          type="button"
          id="editProfileButton"
          onClick={() => {
            setIsEditFormActivated(true);
            navigate('/profile/edit');
          }}
        >
          Editar perfil
        </ButtonS>
        <div className="details">
          <div>
            <span className="label-title">Nome</span>
            <p>{user.name}</p>
          </div>
          <div>
            <span className="label-title">Email</span>
            <p>{user.email}</p>
          </div>
        </div>
        <ButtonS className="secondary" type="button" id="backButton" onClick={() => navigate('/visitors')}>Voltar</ButtonS>
      </div>
    </ProfileS>
  );
}

export default ProfileComponent;