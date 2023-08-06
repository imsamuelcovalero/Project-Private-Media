import React from 'react';
import CategoryComponent from '../../components/CategoryComponent/Category.component';
import Header from '../../components/Header/Header';
import DivExterna from './Style';

function Category() {
  return (
    <DivExterna>
      <div id="header">
        <Header />
      </div>
      <CategoryComponent />
    </DivExterna>
  );
}

export default Category;
