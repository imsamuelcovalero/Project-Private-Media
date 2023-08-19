/* File: src/components/CategoryComponent/CategoryHeader.component.jsx */
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryHeaderS, BtnCategory } from './CategoryHeader.style';
import ReactNodeContext from '../../../context/ReactNodeContext';

function CategoryHeaderComponent() {
  const { categoryId } = useParams();
  const {
    categoryIds, setViewMode, setMediaSelected, setCurrentMainUrl,
  } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  const handleCategoryChange = (id) => {
    // Redefinindo o estado ao mudar de categoria
    setViewMode(null);
    setMediaSelected(false);
    setCurrentMainUrl(`/main/${id}`);
    navigate(`/main/${id}`);
  };

  return (
    <CategoryHeaderS>
      {categoryIds.map((id) => (
        <BtnCategory
          key={id}
          disabled={id === categoryId}
          onClick={() => handleCategoryChange(id)}
        >
          {id}
        </BtnCategory>
      ))}
    </CategoryHeaderS>
  );
}

export default CategoryHeaderComponent;
