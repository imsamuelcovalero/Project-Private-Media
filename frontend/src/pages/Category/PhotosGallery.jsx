/* File: src/pages/Category/Category.jsx */
import React from 'react';
import PhotosGalleryComponent from '../../components/CategoryComponent/PhotosGallery.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function PhotosGallery() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <PhotosGalleryComponent />
    </DivExterna>
  );
}

export default PhotosGallery;
