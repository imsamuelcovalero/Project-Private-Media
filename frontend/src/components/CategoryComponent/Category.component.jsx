/* File: src/components/CategoryComponent/Category.component.jsx */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import CategoryHeaderComponent from './CategoryHeader.component';
import PhotoRenderComponent from './PhotoRender.component';
import VideoRenderComponent from './VideoRender.component';
import { CategoryS } from './Style';

function CategoryComponent() {
  const { logout, getCategoryData } = useContext(ReactNodeContext);

  const [viewMode, setViewMode] = useState(null);

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
        <h1>{categoryId}</h1>
        {(viewMode === null) ? (
          <div>
            <button type="button" onClick={() => setViewMode('photos')}>Visualizar fotos</button>
            <button type="button" onClick={() => setViewMode('videos')}>Visualizar vídeos</button>
          </div>
        ) : (
          <div>
            {renderContent()}
            <button type="button" onClick={() => setViewMode(null)}>Voltar</button>
          </div>
        )}
        <button type="button" onClick={() => navigate('/main')}>Home</button>
      </div>
    </CategoryS>
  );
}

export default CategoryComponent;
