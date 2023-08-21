/* File: src/pages/Category/Category.jsx */
import React from 'react';
import VideoDetailedComponent from '../../components/CategoryComponent/VideoDetailed.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function VideoDetailed() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <VideoDetailedComponent />
    </DivExterna>
  );
}

export default VideoDetailed;
