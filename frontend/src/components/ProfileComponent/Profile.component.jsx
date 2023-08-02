/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileS from './Style';
import api from '../../services';

function ProfileComponent() {
  const navigate = useNavigate();
  /* useEffect que verifica se o usuário já está logado e assinatura é ativa */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
        // if (data && data.assinaturaAtiva.status) {
        //   navigate('/main');
        // } else if (data && !data.assinaturaAtiva.status) {
        //   navigate('/visitors');
        // }
      } catch (error) {
        console.error(error);
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  return (
    <ProfileS>
      <h1>Perfil</h1>
    </ProfileS>
  );
}

export default ProfileComponent;
