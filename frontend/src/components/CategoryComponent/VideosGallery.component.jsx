/* eslint-disable jsx-a11y/media-has-caption */
/* File: src/components/CategoryComponent/VideosGallery.component.jsx */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  VideosDivS, VideoCardS, PaginationButtonS, PaginationContainerS,
  GalleryContainerS, NoMediasMessageS,
} from './Style';

function VideosGalleryComponent() {
  const { setMediaSelected, currentMainUrl, getCategoryData } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  /* Paginação */
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const videosData = await getCategoryData('videos', currentPage);
      if (videosData.data) {
        setCategoryVideos(videosData.data);
        setHasNextPage(videosData.hasNextPage);
      } else setCategoryVideos(videosData);
    };

    fetchData();
  }, [currentPage, currentMainUrl]);

  const handleVideoClick = (video) => {
    document.getElementById(`video-${video.id}`).pause();
    navigate(`${currentMainUrl}/videos/${video.id}`);
    setMediaSelected({
      mediaType: 'videos',
      media: video,
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
    <div role="main" aria-label="Video viewer">
      <GalleryContainerS>
        <VideosDivS>
          {categoryVideos.map((video) => (
            <VideoCardS key={video.id} role="button" tabIndex="0" onClick={() => handleVideoClick(video)} onKeyDown={(e) => { if (e.key === 'Enter') handleVideoClick(video); }}>
              <video id={`video-${video.id}`} src={video.url} controls preload="none" />
            </VideoCardS>
          ))}
          {categoryVideos === null
          && <NoMediasMessageS>Não há mais vídeos disponíveis nesta categoria.</NoMediasMessageS>}
        </VideosDivS>
        <PaginationContainerS>
          <PaginationButtonS type="button" disabled={currentPage === 1} onClick={handlePreviousPage}>Página anterior</PaginationButtonS>
          <PaginationButtonS type="button" disabled={!hasNextPage} onClick={handleNextPage}>Próxima página</PaginationButtonS>
        </PaginationContainerS>
      </GalleryContainerS>
    </div>
  );
}

export default VideosGalleryComponent;
