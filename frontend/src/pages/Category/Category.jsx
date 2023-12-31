/* File: src/pages/Category/Category.jsx */
import React from 'react';
import CategoryComponent from '../../components/CategoryComponent/Category.component';
import Header from '../../components/Header/Header';
import CategoryHeaderComponent from '../../components/CategoryComponent/CategoryHeaderComponent/CategoryHeader.component';
import DivExterna from './Style';

function Category() {
  return (
    <DivExterna>
      <Header />
      <CategoryHeaderComponent />
      <CategoryComponent />
    </DivExterna>
  );
}

export default Category;
