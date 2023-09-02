/* File: src/components/CategoryComponent/CategoryHeader.component.jsx */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services';
import ReactNodeContext from '../../../context/ReactNodeContext';
import { CategoryHeaderS, BtnCategory } from './CategoryHeader.style';

function CategoryHeaderComponent() {
  const {
    categoryIds, setViewMode, setMediaSelected, setCurrentMainUrl,
    currentCategory, setCurrentCategory, logout, setIsUserLogged,
    setIsSignatureActive,
  } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (data) {
          setIsUserLogged(true);
          setIsSignatureActive(data.assinaturaAtiva.status);
        }
      } catch (error) {
        console.error(error);
        toast.warning('Usuário não logado');
        logout(false);
      }
    };

    verifyToken();
  }, []);

  /* função que lida com a mudança de categoria */
  const handleCategoryChange = (id) => {
    setViewMode(null);
    setMediaSelected(false);
    setCurrentMainUrl(`/main/${id}`);
    setCurrentCategory(id);
    navigate(`/main/${id}`);
  };

  return (
    <CategoryHeaderS>
      {categoryIds.map((id) => (
        <BtnCategory
          key={id}
          disabled={id === currentCategory}
          onClick={() => handleCategoryChange(id)}
        >
          {id}
        </BtnCategory>
      ))}
    </CategoryHeaderS>
  );
}

export default CategoryHeaderComponent;
