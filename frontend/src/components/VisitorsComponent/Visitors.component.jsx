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
  const navigate = useNavigate();
  const [mediaToRender, setMediaToRender] = useState(null);

  console.log('mediaToRender', mediaToRender);

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
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
  const isPhotoUrl = (url) => url.startsWith('https://firebasestorage.googleapis.com');

  /* Função auxiliar para obter o ID do vídeo do YouTube a partir da URL */
  const getYouTubeId = (url) => url.split('?v=')[1];

  return (
    <VisitorsS>
      <h1>Página de Visitantes</h1>

      {mediaToRender && (
        isPhotoUrl(mediaToRender.url) ? (
          <img src={mediaToRender.url} alt={mediaToRender.descricao || 'Foto'} />
        ) : (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeId(mediaToRender.url)}`}
            title="Vídeo do YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      )}
    </VisitorsS>
  );
}

export default VisitorsComponent;
