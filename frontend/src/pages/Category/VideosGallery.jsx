/* File: src/pages/Category/Category.jsx */
import React from 'react';
import VideosGalleryComponent from '../../components/CategoryComponent/VideosGallery.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function VideosGallery() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <VideosGalleryComponent />
    </DivExterna>
  );
}

export default VideosGallery;
