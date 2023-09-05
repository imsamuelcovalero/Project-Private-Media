/* File: src/components/CategoryComponent/PhotosGallery.component.jsx */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  PhotosDivS, PhotoCardS, PaginationButtonS, PaginationContainerS,
  GalleryContainerS, NoMediasMessageS,
} from './Style';

function PhotosGalleryComponent() {
  const { setMediaSelected, currentMainUrl, getCategoryData } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  /* Paginação */
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPhotos, setCategoryPhotos] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Carregar as fotos sempre que a página atual mudar
  useEffect(() => {
    const fetchData = async () => {
      const photosData = await getCategoryData('fotos', currentPage);
      if (photosData.data) {
        setCategoryPhotos(photosData.data);
        setHasNextPage(photosData.hasNextPage);
      } else setCategoryPhotos(photosData);
    };

    fetchData();
  }, [currentPage, currentMainUrl]);

  const handlePhotoClick = (photo) => {
    navigate(`${currentMainUrl}/fotos/${photo.id}`);
    setMediaSelected({
      mediaType: 'fotos',
      media: photo,
    });
  };

  /* Funções para manipular a paginação */
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div role="main" aria-label="Photo viewer">
      <GalleryContainerS>
        <PhotosDivS>
          {categoryPhotos.map((photo) => (
            <PhotoCardS key={photo.id} role="button" tabIndex="0" onClick={() => handlePhotoClick(photo)} onKeyDown={(e) => { if (e.key === 'Enter') handlePhotoClick(photo); }}>
              <img id={`photo-${photo.id}`} src={photo.url} alt="Thumbnail" />
            </PhotoCardS>
          ))}
          {categoryPhotos === null
          && <NoMediasMessageS>Não há mais fotos disponíveis nesta categoria.</NoMediasMessageS>}
        </PhotosDivS>
        <PaginationContainerS>
          <PaginationButtonS type="button" disabled={currentPage === 1} onClick={handlePreviousPage}>Página anterior</PaginationButtonS>
          <PaginationButtonS type="button" disabled={!hasNextPage} onClick={handleNextPage}>Próxima página</PaginationButtonS>
        </PaginationContainerS>
      </GalleryContainerS>
    </div>
  );
}

export default PhotosGalleryComponent;
