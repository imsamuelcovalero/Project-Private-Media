/* File: src/components/VisitorsComponent/Visitors.component.jsx */
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ProductsCard from './ProductsCard';
import api from '../../services';
import { firebaseGetSampleCategory } from '../../services/firebase.helper';
import { getMediaTime, addMediaTimeToLocalStorage } from '../../helpers/localStorage.helper';
import ReactNodeContext from '../../context/ReactNodeContext';
import { VisitorsS } from './Style';

function VisitorsComponent() {
  const { logout } = useContext(ReactNodeContext);

  const [mediaToRender, setMediaToRender] = useState(null);
  const [isSignatureActive, setIsSignatureActive] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        console.log('data', data);
        if (data) {
          if (data.assinaturaAtiva.status) {
            navigate('/main');
          }
          setIsUserLogged(true);
          setIsSignatureActive(data.assinaturaAtiva.status);
        }
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  /* useEffect que busca as fotos e vídeos da categoria 'sample' */
  useEffect(() => {
    const getSampleCategory = async () => {
      try {
        const sampleData = await firebaseGetSampleCategory();
        const allMedia = [...sampleData.fotos, ...sampleData.videos];
        let selectedMedia = allMedia[Math.floor(Math.random() * allMedia.length)];

        const mediaTime = getMediaTime();

        if (mediaTime) {
          const timeDiff = Date.now() - mediaTime.time;
          const twoHours = 2 * 60 * 60 * 1000;

          // Se a diferença de tempo for inferior a 2 horas, mantenha a mídia atual
          if (timeDiff < twoHours) {
            selectedMedia = mediaTime.data;
          } else {
            // Se a mídia selecionada for igual à última, selecione outra
            while (selectedMedia === mediaTime.data) {
              selectedMedia = allMedia[Math.floor(Math.random() * allMedia.length)];
            }
          }
        }

        // Adicione a mídia e o tempo ao localStorage
        addMediaTimeToLocalStorage({ data: selectedMedia, time: Date.now() });

        setMediaToRender(selectedMedia);
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    getSampleCategory();
  }, []);

  /* Função auxiliar para verificar se a URL é de uma foto ou vídeo */
  const isPhotoUrl = (url) => url.includes('.jpeg') || url.includes('.jpg');

  return (
    <VisitorsS>
      {!isUserLogged && (
        <div>
          <h1>Página de Visitantes</h1>
          <button type="button" onClick={() => navigate('/login')}>
            Faça login ou cadastre-se
          </button>
        </div>
      )}
      {isUserLogged && !isSignatureActive && (
        <button type="button" onClick={() => navigate('/profile/subscription')}>
          Assine para ser membro
        </button>
      )}
      {mediaToRender && (
        isPhotoUrl(mediaToRender.url) ? (
          <img src={mediaToRender.url} alt={mediaToRender.descricao || 'Foto'} />
        ) : (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video style={{ width: '560px', height: '315px' }} controls>
            <source src={mediaToRender.url} type="video/mp4" />
            Desculpe, mas não foi possível carregar o vídeo.
          </video>
        )
      )}
    </VisitorsS>
  );
}

export default VisitorsComponent;
