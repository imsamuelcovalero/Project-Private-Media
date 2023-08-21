/* File: src/pages/Category/Category.jsx */
import React from 'react';
import PhotoRenderComponent from '../../components/CategoryComponent/PhotoRender.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function PhotoRender() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <PhotoRenderComponent />
    </DivExterna>
  );
}

export default PhotoRender;
