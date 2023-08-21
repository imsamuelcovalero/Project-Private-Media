/* File: src/components/CategoryComponent/Category.component.jsx */
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
// import CategoryHeaderComponent from './CategoryHeaderComponent/CategoryHeader.component';
// import PhotoRenderComponent from './PhotoRender.component';
// import VideoRenderComponent from './VideoRender.component';
import {
  CategoryS, HeadingS, ViewModeButtonS, StyledButton, ButtonContainer,
} from './Style';

function CategoryComponent() {
  const {
    logout, isUserLogged, currentMainUrl,
    isSignatureActive, currentCategory, setIsSignatureActive, setIsUserLogged,
  } = useContext(ReactNodeContext);

  const navigate = useNavigate();
  const { categoryId } = useParams();

  // console.log('categoryId', categoryId);

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (data) {
          setIsUserLogged(true);
          setIsSignatureActive(data.assinaturaAtiva.status);
        }
      } catch (error) {
        console.error(error);
        toast.warning('Usuário não logado');
        logout();
      }
    };

    verifyToken();
  }, []);

  // const renderContent = () => {
  //   if (viewMode === 'photos') {
  //     return <PhotoRenderComponent />;
  //   }

  //   if (viewMode === 'videos') {
  //     return <VideoRenderComponent />;
  //   }

  //   return null;
  // };

  return (
    <CategoryS>
      {/* <CategoryHeaderComponent /> */}
      <div id="content">
        <HeadingS>{categoryId || currentCategory}</HeadingS>
        {!isUserLogged && (
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
              Assine para ser membro!
            </StyledButton>
          </ButtonContainer>
        )}
        <div className="content-inner">
          <div>
            <ViewModeButtonS type="button" onClick={() => navigate(`${currentMainUrl}/photos`)}>Visualizar fotos</ViewModeButtonS>
            <ViewModeButtonS type="button" onClick={() => navigate(`${currentMainUrl}/videos`)}>Visualizar vídeos</ViewModeButtonS>
          </div>
        </div>
      </div>
    </CategoryS>
  );
}

export default CategoryComponent;
