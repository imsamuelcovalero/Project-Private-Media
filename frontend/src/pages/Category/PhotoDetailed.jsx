/* File: src/pages/Category/Category.jsx */
import React from 'react';
import PhotoDetailedComponent from '../../components/CategoryComponent/MediaDetailed.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import { RenderS } from './Style';

function PhotoDetailed() {
  return (
    <RenderS>
      <Header />
      <CategoryHeaderComponent />
      <PhotoDetailedComponent />
    </RenderS>
  );
}

export default PhotoDetailed;
