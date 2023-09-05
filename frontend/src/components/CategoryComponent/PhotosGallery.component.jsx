/* File: src/components/CategoryComponent/VideosGallery.component.jsx */
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
  const photosPerPage = 10; // ajuste conforme necessário

  // Carregar as fotos sempre que a página atual mudar
  useEffect(() => {
    const fetchData = async () => {
      const photosData = await getCategoryData('fotos', currentPage);
      // console.log('photosData', photosData);
      setCategoryPhotos(photosData);
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

  /* Obter as fotos para a página atual */
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = categoryPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const hasNextPage = indexOfLastPhoto < categoryPhotos.length;

  return (
    <div role="main" aria-label="Photo viewer">
      <GalleryContainerS>
        <PhotosDivS>
          {currentPhotos.map((photo) => (
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
