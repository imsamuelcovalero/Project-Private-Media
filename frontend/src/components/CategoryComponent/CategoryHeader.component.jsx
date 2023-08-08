/* File: src/components/CategoryComponent/CategoryHeader.component.jsx */
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryHeaderS, BtnCategory } from './CategoryHeader.style';
import ReactNodeContext from '../../context/ReactNodeContext';

function CategoryHeaderComponent() {
  const { categoryId } = useParams();
  const { categoryIds } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  return (
    <CategoryHeaderS>
      {categoryIds.map((id) => (
        <BtnCategory
          key={id}
          disabled={id === categoryId}
          onClick={() => navigate(`/main/${id}`)}
        >
          {id}
        </BtnCategory>
      ))}
    </CategoryHeaderS>
  );
}

export default CategoryHeaderComponent;
