/* File: src/pages/Category/Category.jsx */
import React from 'react';
import VideoRenderComponent from '../../components/CategoryComponent/VideoRender.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function VideoRender() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <VideoRenderComponent />
    </DivExterna>
  );
}

export default VideoRender;
