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
  console.log('mediaSelectedDetailed', mediaSelected);

  const navigate = useNavigate();

  // const [selectedPhoto, setSelectedPhoto] = useState(null);
  if (!mediaSelected) return null;

  const renderMediaContent = () => {
    if (mediaSelected.mediaType === 'fotos') {
      console.log('mediaSelectedDetailed', mediaSelected);
      return <img className="selectedMedia" src={mediaSelected.media.url} alt="Selected" />;
    }
    if (mediaSelected.mediaType === 'videos') {
      return (
        <video className="selectedMedia" src={mediaSelected.media.url} controls />
      );
    }
    return null;
  };

  const handleBackClick = () => {
    // setSelectedPhoto(null);
    setMediaSelected(null);
    // chama o navigate e faz voltar uma página
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
