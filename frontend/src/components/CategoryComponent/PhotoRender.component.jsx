/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
// import { toast } from 'react-toastify';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  PhotosDivS, PhotoCardS, BackButtonS, PaginationButtonS, PaginationContainerS, GalleryContainerS,
} from './Style';

function PhotoRenderComponent() {
  const { categoryPhotos, setMediaSelected } = useContext(ReactNodeContext);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 10; // ajuste conforme necessário

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setMediaSelected(true);
  };

  const handleBackClick = () => {
    setSelectedPhoto(null);
    setMediaSelected(false);
  };

  // Funções para manipular a paginação
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Obter as fotos para a página atual
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = categoryPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  return (
    <div role="main" aria-label="Photo viewer">
      {selectedPhoto ? (
        <PhotoCardS className="selected">
          <img id="selectedPhoto" src={selectedPhoto.url} alt="Selected" />
          <BackButtonS type="button" onClick={handleBackClick}>Voltar</BackButtonS>
        </PhotoCardS>
      ) : (
        <GalleryContainerS>
          <PhotosDivS>
            {currentPhotos.map((photo) => (
              <PhotoCardS key={photo.id} role="button" tabIndex="0" onClick={() => handlePhotoClick(photo)} onKeyDown={(e) => { if (e.key === 'Enter') handlePhotoClick(photo); }}>
                <img id={`photo-${photo.id}`} src={photo.url} alt="Thumbnail" />
              </PhotoCardS>
            ))}
          </PhotosDivS>
          <PaginationContainerS>
            <PaginationButtonS type="button" disabled={currentPage === 1} onClick={handlePreviousPage}>Página anterior</PaginationButtonS>
            <PaginationButtonS type="button" disabled={currentPhotos.length < photosPerPage} onClick={handleNextPage}>Próxima página</PaginationButtonS>
          </PaginationContainerS>
        </GalleryContainerS>
      )}
    </div>
  );
}

export default PhotoRenderComponent;
