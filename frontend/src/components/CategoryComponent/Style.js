import styled from 'styled-components';

export const CategoryS = styled.div`  
  /* border: 2px solid blue; */
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* margin-top: 140px; */
  #content {
    /* border: 2px solid blue; */
    margin-top: 140px;
    min-height: calc(100vh - 140px); 
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto; 
    .content-inner { 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1; 
    }
  }
`;

export const GalleryContainerS = styled.div`
  /* border: 1px solid red; */
  margin-top: 140px;
  height: calc(100vh - 140px); 
  width: 100vw;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PaginationContainerS = styled.div`
  /* border: 1px solid green; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  max-width: 500px;
  margin-top: auto;
  margin-bottom: 30px;
`;

export const NoMediasMessageS = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #888;
`;

export const PhotosDivS = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 100%;
  gap: 16px;
  margin-top: 20px;
`;

export const PhotoCardS = styled.div`
  border: 1px solid var(--main);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  img {
    height: 180px;
    width: 198px;
  }

  @media (max-width: 890px) {
    img {
      height: 130px;
      width: 148px;
    }
  }

  @media (max-width: 525px) {
    img {
      height: 90px;
      width: 99px;
    }
  }
`;

export const VideosDivS = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 100%;
  gap: 16px;
  margin-top: 20px;
`;

export const VideoCardS = styled.div`
  border: 1px solid var(--main);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  video {
    height: 112px;
    width: 198px;
  }

  @media (max-width: 890px) {
    video {
      height: 130px;
      width: 148px;
    }
  }

  @media (max-width: 525px) {
    video {
      height: 90px;
      width: 99px;
    }
  }
`;

export const MediaCardS = styled.div`
  border: 1px solid var(--main);
  margin-top: 140px;
  height: calc(100vh - 140px); 
  width: 100vw;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Estilo para imagem e vídeo */
  img, video {
    /* Asseguramos que a mídia não ultrapasse o tamanho da janela, mas ainda seja exibida em sua dimensão original */
    max-height: 90%;
    max-width: 90%;
  }
`;

// Estilo para o <h1>
export const HeadingS = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--headline);
  text-transform: capitalize;
  margin-top: 20px;
`;

// BaseButtonS
export const BaseButtonS = styled.button`
  background-color: var(--buttonPrimary);
  color: var(--buttonText);
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: var(--buttonShadow);
  transition: background-color 0.3s, transform 0.3s;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
  
  svg {
    margin: 0 5px; // Espaçamento uniforme para ícones
  }
  
  &:hover {
    background-color: var(--buttonPrimaryHover);
    transform: translateY(-1px);
    filter: brightness(0.9);
  }
  
  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
    background-color: var(--buttonBackgroundDisabled);
  }
`;

// ViewModeButtonS - Estilo para botões de "Visualizar fotos" e "Visualizar vídeos"
export const ViewModeButtonS = styled(BaseButtonS)`
  margin: 5px 10px;
`;

// PaginationButtonS
export const PaginationButtonS = styled(BaseButtonS)`
  @media (max-width: 405px) {
    font-size: 0.75rem;
  }
`;

// BackButtonS - Mantendo a ref. a BaseButtonS
export const BackButtonS = styled(BaseButtonS)`
  margin-top: 15px;
  background-color: var(--buttonSecondary);
  /* border: 1px solid var(--buttonBorder); */
  
  &:hover, &:focus {
    background-color: var(--buttonSecondaryHover);
  }
`;

// As duas últimas classes vieram com os elementos de Visitors
export const StyledButtonS = styled(BaseButtonS)`
  text-transform: none;
`;

export const ButtonContainerS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
