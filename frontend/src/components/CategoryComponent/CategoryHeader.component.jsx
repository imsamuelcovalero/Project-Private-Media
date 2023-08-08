/* File: src/components/CategoryComponent/CategoryHeader.component.jsx */
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryHeaderS, BtnCategory } from './CategoryHeader.style';
import ReactNodeContext from '../../context/ReactNodeContext';

function CategoryHeader() {
  const { categoryId } = useParams();
  const { categories } = useContext(ReactNodeContext);

  return (
    <CategoryHeaderS>
      {categories.map((category) => (
        <BtnCategory
          key={category.id}
          disabled={category.id === categoryId}
          onClick={() => { /* aqui você redireciona para a página da categoria */ }}
        >
          {category.name}
        </BtnCategory>
      ))}
    </CategoryHeaderS>
  );
}

export default CategoryHeader;
