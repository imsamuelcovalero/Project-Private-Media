/* File: src/components/CategoryComponent/Category.component.jsx */
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  CategoryS, HeadingS, ViewModeButtonS, StyledButtonS, ButtonContainerS,
} from './Style';

function CategoryComponent() {
  const {
    isUserLogged, currentMainUrl,
    isSignatureActive, currentCategory,
  } = useContext(ReactNodeContext);

  const navigate = useNavigate();
  const { categoryId } = useParams();

  return (
    <CategoryS>
      <div id="content">
        <HeadingS>{categoryId || currentCategory}</HeadingS>
        {!isUserLogged && (
          <div>
            <ButtonContainerS>
              <StyledButtonS type="button" onClick={() => navigate('/login')}>
                <FaSignInAlt />
                {' '}
                LOGIN
                {' '}
                <FaUserPlus />
                {' '}
                CADASTRO
              </StyledButtonS>
            </ButtonContainerS>
          </div>
        )}
        {isUserLogged && !isSignatureActive && (
          <ButtonContainerS>
            <StyledButtonS type="button" onClick={() => navigate('/subscription')}>
              Assine para ser membro!
            </StyledButtonS>
          </ButtonContainerS>
        )}
        <div className="content-inner">
          <div>
            <ViewModeButtonS type="button" onClick={() => navigate(`${currentMainUrl}/fotos`)}>Visualizar fotos</ViewModeButtonS>
            <ViewModeButtonS type="button" onClick={() => navigate(`${currentMainUrl}/videos`)}>Visualizar vídeos</ViewModeButtonS>
          </div>
        </div>
      </div>
    </CategoryS>
  );
}

export default CategoryComponent;
