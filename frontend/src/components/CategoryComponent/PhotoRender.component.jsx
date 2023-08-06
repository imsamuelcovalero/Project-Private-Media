/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
// import { toast } from 'react-toastify';
import ReactNodeContext from '../../context/ReactNodeContext';
import { PhotosDivS, PhotoCardS, BackButtonS } from './Style';

function PhotoRenderComponent() {
  const { categoryPhotos } = useContext(ReactNodeContext);

  // Estado para armazenar a foto selecionada
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleBackClick = () => {
    setSelectedPhoto(null);
  };

  return (
    <div role="main" aria-label="Photo viewer">
      {selectedPhoto ? (
        <PhotoCardS className="selected">
          <img id="selectedPhoto" src={selectedPhoto.url} alt="Selected" />
          <BackButtonS type="button" onClick={handleBackClick}>Voltar</BackButtonS>
        </PhotoCardS>
      ) : (
        <PhotosDivS>
          {categoryPhotos.map((photo) => (
            <PhotoCardS key={photo.id} role="button" tabIndex="0" onClick={() => handlePhotoClick(photo)} onKeyDown={(e) => { if (e.key === 'Enter') handlePhotoClick(photo); }}>
              <img id={`photo-${photo.id}`} src={photo.url} alt="Thumbnail" />
            </PhotoCardS>
          ))}
        </PhotosDivS>
      )}
    </div>
  );
}

export default PhotoRenderComponent;
