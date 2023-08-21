/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  PhotoCardS, BackButtonS,
} from './Style';

function PhotoDetailedComponent() {
  const { setMediaSelected } = useContext(ReactNodeContext);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleBackClick = () => {
    setSelectedPhoto(null);
    setMediaSelected(false);
  };

  return (
    <div role="main" aria-label="Photo viewer">
      <PhotoCardS className="selected">
        <img id="selectedPhoto" src={selectedPhoto.url} alt="Selected" />
        <BackButtonS type="button" onClick={handleBackClick}>Voltar para fotos</BackButtonS>
      </PhotoCardS>
    </div>
  );
}

export default PhotoDetailedComponent;
