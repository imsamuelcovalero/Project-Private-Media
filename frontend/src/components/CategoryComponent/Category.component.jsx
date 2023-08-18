/* File: src/components/CategoryComponent/Category.component.jsx */
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import CategoryHeaderComponent from './CategoryHeaderComponent/CategoryHeader.component';
import PhotoRenderComponent from './PhotoRender.component';
import VideoRenderComponent from './VideoRender.component';
import {
  CategoryS, HeadingS, ViewModeButtonS, BackHomeButtonS,
} from './Style';

function CategoryComponent() {
  const {
    logout, getCategoryData, mediaSelected, viewMode, setViewMode,
  } = useContext(ReactNodeContext);

  // const [mediaSelected, setMediaSelected] = useState(false);
  // const [viewMode, setViewMode] = useState(null);

  const navigate = useNavigate();
  const { categoryId } = useParams();

  // console.log('categoryId', categoryId);

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (!data.assinaturaAtiva.status) {
          navigate('/visitors');
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

  /* useEffect que busca as fotos e vídeos da categoryId referente */
  useEffect(() => {
    getCategoryData(categoryId);
  }, [categoryId]);

  const renderContent = () => {
    if (viewMode === 'photos') {
      return <PhotoRenderComponent />;
    }

    if (viewMode === 'videos') {
      return <VideoRenderComponent />;
    }

    return null;
  };

  return (
    <CategoryS>
      <CategoryHeaderComponent />
      <div id="content">
        <HeadingS>{categoryId}</HeadingS>
        <div className="content-inner">
          {(viewMode === null) ? (
            <div>
              <ViewModeButtonS type="button" onClick={() => setViewMode('photos')}>Visualizar fotos</ViewModeButtonS>
              <ViewModeButtonS type="button" onClick={() => setViewMode('videos')}>Visualizar vídeos</ViewModeButtonS>
            </div>
          ) : (
            <div>
              {renderContent()}
              {(!mediaSelected && viewMode !== null) && (
              <BackHomeButtonS type="button" variant="back" onClick={() => setViewMode(null)}>Voltar</BackHomeButtonS>
              )}
            </div>
          )}
        </div>
      </div>
    </CategoryS>
  );
}

export default CategoryComponent;
