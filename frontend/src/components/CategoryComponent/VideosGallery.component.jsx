/* eslint-disable jsx-a11y/media-has-caption */
/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  VideosDivS, VideoCardS, PaginationButtonS, PaginationContainerS, GalleryContainerS,
} from './Style';

function VideosGalleryComponent() {
  const { categoryVideos, setMediaSelected, currentMainUrl } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10; // ajuste conforme necessário

  const handleVideoClick = (video) => {
    navigate(`${currentMainUrl}/videos/${video.id}`);
    // setSelectedPhoto(photo);
    setMediaSelected({
      mediaType: 'videos',
      media: video,
    });
  };

  // Funções para manipular a paginação
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Obter os vídeos para a página atual
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = categoryVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const hasNextPage = indexOfLastVideo < categoryVideos.length;

  return (
    <div role="main" aria-label="Video viewer">
      <GalleryContainerS>
        <VideosDivS>
          {currentVideos.map((video) => (
            <VideoCardS key={video.id} role="button" tabIndex="0" onClick={() => handleVideoClick(video)} onKeyDown={(e) => { if (e.key === 'Enter') handleVideoClick(video); }}>
              <video id={`video-${video.id}`} src={video.url} controls />
            </VideoCardS>
          ))}
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
