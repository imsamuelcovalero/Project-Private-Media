/* eslint-disable jsx-a11y/media-has-caption */
/* File: src/components/CategoryComponent/MediaDetailed.component.jsx */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  MediaCardS, BackButtonS,
} from './Style';

function MediaDetailedComponent() {
  const { setMediaSelected, mediaSelected } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  if (!mediaSelected) return null;

  /* Funções para renderizar o conteúdo da mídia de acordo com o tipo */
  const renderMediaContent = () => {
    if (mediaSelected.mediaType === 'fotos') {
      return <img className="selectedMedia" src={mediaSelected.media.url} alt="Selected" />;
    }
    if (mediaSelected.mediaType === 'videos') {
      return (
        <video className="selectedMedia" src={mediaSelected.media.url} controls />
      );
    }
    return null;
  };

  /* Função para lidar com o clique no botão de voltar */
  const handleBackClick = () => {
    setMediaSelected(null);
    navigate(-1);
  };

  return (
    <div role="main" aria-label={`${mediaSelected.mediaType} viewer`}>
      <MediaCardS>
        {renderMediaContent()}
        <BackButtonS type="button" onClick={handleBackClick}>
          Voltar para a galeria
        </BackButtonS>
      </MediaCardS>
    </div>
  );
}

export default MediaDetailedComponent;
