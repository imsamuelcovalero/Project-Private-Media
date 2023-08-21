/* eslint-disable jsx-a11y/media-has-caption */
/* File: src/components/CategoryComponent/VideoDetailed.component.jsx */
import React, { useContext, useState } from 'react';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  VideoCardS, BackButtonS,
} from './Style';

function VideoDetailedComponent() {
  const { setMediaSelected } = useContext(ReactNodeContext);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleBackClick = () => {
    setSelectedVideo(null);
    setMediaSelected(false);
  };

  return (
    <div role="main" aria-label="Video viewer">
      <VideoCardS className="selected">
        <video id="selectedVideo" src={selectedVideo.url} controls />
        <BackButtonS type="button" onClick={handleBackClick}>Voltar para a galeria</BackButtonS>
      </VideoCardS>
    </div>
  );
}

export default VideoDetailedComponent;
