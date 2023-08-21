/* File: src/pages/Category/Category.jsx */
import React from 'react';
import VideoDetailedComponent from '../../components/CategoryComponent/MediaDetailed.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import { RenderS } from './Style';

function VideoDetailed() {
  return (
    <RenderS>
      <Header />
      <CategoryHeaderComponent />
      <VideoDetailedComponent />
    </RenderS>
  );
}

export default VideoDetailed;
