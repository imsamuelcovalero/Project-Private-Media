/* File: src/components/VisitorsComponent/Visitors.component.jsx */
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import api from '../../services';
// import { firebaseGetCategory } from '../../services/firebase.helper';
// import { getMediaTime, addMediaTimeToLocalStorage } from '../../helpers/localStorage.helper';
import ReactNodeContext from '../../context/ReactNodeContext';
import CategoryComponent from '../CategoryComponent/Category.component';
import { VisitorsS } from './Style';

function VisitorsComponent() {
  const {
    logout, categoryIds, setIsSignatureActive, setIsUserLogged,
  } = useContext(ReactNodeContext);

  // const [mediaToRender, setMediaToRender] = useState(null);
  // const [isSignatureActive, setIsSignatureActive] = useState(false);
  // const [isUserLogged, setIsUserLogged] = useState(false);

  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (data) {
          if (data.assinaturaAtiva.status) {
            navigate(`/main/${categoryIds[0]}`);
          }
          setIsUserLogged(true);
          setIsSignatureActive(data.assinaturaAtiva.status);
        }
      } catch (error) {
        console.error(error);
        toast.error('Sessão expirada, faça login novamente');
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  /* useEffect que busca as fotos e vídeos da categoria 'sample' */
  // useEffect(() => {
  //   const getSampleCategory = async () => {
  //     try {
  //       const sampleData = await firebaseGetCategory('sample');
  //       const allMedia = [...sampleData.fotos, ...sampleData.videos];
  //       let selectedMedia = allMedia[Math.floor(Math.random() * allMedia.length)];

  //       const mediaTime = getMediaTime();

  //       if (mediaTime) {
  //         const timeDiff = Date.now() - mediaTime.time;
  //         const twoHours = 2 * 60 * 60 * 1000;

  //         // Se a diferença de tempo for inferior a 2 horas, mantenha a mídia atual
  //         if (timeDiff < twoHours) {
  //           selectedMedia = mediaTime.data;
  //         } else {
  //           // Se a mídia selecionada for igual à última, selecione outra
  //           while (selectedMedia === mediaTime.data) {
  //             selectedMedia = allMedia[Math.floor(Math.random() * allMedia.length)];
  //           }
  //         }
  //       }

  //       // Adicione a mídia e o tempo ao localStorage
  //       addMediaTimeToLocalStorage({ data: selectedMedia, time: Date.now() });

  //       setMediaToRender(selectedMedia);
  //     } catch (error) {
  //       console.error(error);
  //       logout();
  //       navigate('/visitors');
  //     }
  //   };

  //   getSampleCategory();
  // }, []);

  /* Função auxiliar para verificar se a URL é de uma foto ou vídeo */
  // const isPhotoUrl = (url) => url.includes('.jpeg') || url.includes('.jpg');

  return (
    <VisitorsS>
      {/* {!isUserLogged && (
        <div>
          <ButtonContainer>
            <StyledButton type="button" onClick={() => navigate('/login')}>
              <FaSignInAlt />
              {' '}
              LOGIN
              {' '}
              <FaUserPlus />
              {' '}
              CADASTRO
            </StyledButton>
          </ButtonContainer>
        </div>
      )}
      {isUserLogged && !isSignatureActive && (
        <ButtonContainer>
          <StyledButton type="button" onClick={() => navigate('/subscription')}>
            Assine para ser membro
          </StyledButton>
        </ButtonContainer>
      )} */}
      <CategoryComponent />
      {/* {mediaToRender && (
        isPhotoUrl(mediaToRender.url) ? (
          <StyledImage src={mediaToRender.url} alt={mediaToRender.descricao || 'Foto'} />
        ) : (
          <StyledVideo controls>
            <source src={mediaToRender.url} type="video/mp4" />
            Desculpe, mas não foi possível carregar o vídeo.
          </StyledVideo>
        )
      )} */}
    </VisitorsS>
  );
}

export default VisitorsComponent;
