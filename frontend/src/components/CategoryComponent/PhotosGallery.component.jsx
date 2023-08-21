/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  PhotosDivS, PhotoCardS, PaginationButtonS, PaginationContainerS, GalleryContainerS,
} from './Style';

function PhotosGalleryComponent() {
  const { categoryPhotos, setMediaSelected, currentMainUrl } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 10; // ajuste conforme necessário

  const handlePhotoClick = (photo) => {
    console.log('photo', photo);
    navigate(`${currentMainUrl}/fotos/${photo.id}`);
    // setSelectedPhoto(photo);
    setMediaSelected({
      mediaType: 'fotos',
      media: photo,
    });
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
  // console.log('currentPhotos', currentPhotos);

  return (
    <div role="main" aria-label="Photo viewer">
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
    </div>
  );
}

export default PhotosGalleryComponent;
