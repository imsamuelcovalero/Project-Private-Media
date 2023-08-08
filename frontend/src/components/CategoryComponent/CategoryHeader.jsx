// File: src/components/CategoryComponent/CategoryHeader.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryHeaderS, BtnCategory } from './CategoryHeader.style';

const categories = [
  { name: 'Categoria 1', path: '/category1' },
  { name: 'Categoria 2', path: '/category2' },
  // ... adiciona outras categorias aqui
];

function CategoryHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <CategoryHeaderS>
      {categories.map((category) => (
        <BtnCategory
          type="button"
          key={category.name}
          disabled={location.pathname === category.path}
          onClick={() => navigate(category.path)}
        >
          {category.name}
        </BtnCategory>
      ))}
    </CategoryHeaderS>
  );
}

export default CategoryHeader;
