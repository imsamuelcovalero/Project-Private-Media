/* File: src/pages/Category/Category.jsx */
import React from 'react';
import PhotoDetailedComponent from '../../components/CategoryComponent/MediaDetailed.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function PhotoDetailed() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <PhotoDetailedComponent />
    </DivExterna>
  );
}

export default PhotoDetailed;
