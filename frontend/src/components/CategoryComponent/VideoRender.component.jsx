/* eslint-disable jsx-a11y/media-has-caption */
/* File: src/components/CategoryComponent/PhotoRender.component.jsx */
import React, { useContext, useState } from 'react';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  VideosDivS, VideoCardS, BackButtonS, PaginationButtonS, PaginationContainerS, GalleryContainerS,
} from './Style';

function VideoRenderComponent() {
  const { categoryVideos, setMediaSelected } = useContext(ReactNodeContext);

  const [selectedVideo, setSelectedVideo] = useState(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10; // ajuste conforme necessário

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setMediaSelected(true);
  };

  const handleBackClick = () => {
    setSelectedVideo(null);
    setMediaSelected(false);
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

  return (
    <div role="main" aria-label="Video viewer">
      {selectedVideo ? (
        <VideoCardS className="selected">
          <video id="selectedVideo" src={selectedVideo.url} controls />
          <BackButtonS type="button" onClick={handleBackClick}>Voltar</BackButtonS>
        </VideoCardS>
      ) : (
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
            <PaginationButtonS type="button" disabled={currentVideos.length < videosPerPage} onClick={handleNextPage}>Próxima página</PaginationButtonS>
          </PaginationContainerS>
        </GalleryContainerS>
      )}
    </div>
  );
}

export default VideoRenderComponent;
