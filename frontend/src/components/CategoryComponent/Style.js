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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 64vh;
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

  &.selected img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
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

  &.selected video {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;

export const MediaCardS = styled.div`
  border: 1px solid var(--main);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  img {
    height: 180px;
    width: 198px;
  }

  &.selected img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  video {
    height: 112px;
    width: 198px;
  }

  &.selected video {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;

// BaseButtonS
export const BaseButtonS = styled.button`
  background-color: var(--buttonPrimary);
  color: var(--buttonText);
  border: none;
  padding: 10px 20px;
  text-transform: uppercase;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: var(--buttonShadow);
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: var(--buttonPrimaryHover);
    transform: translateY(-1px);
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

// BackHomeButtonS - Estilo para botão "Voltar" e "Home"
export const BackHomeButtonS = styled(BaseButtonS)`
  background-color: ${(props) => (props.variant === 'home' ? 'var(--buttonStandard)' : 'var(--buttonSecondary)')};
  border: 1px solid var(--buttonBorder);
  &:hover {
    background-color: ${(props) => (props.variant === 'home' ? 'var(--buttonStandardHover)' : 'var(--buttonSecondaryHover)')};
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

// PaginationButtonS
export const PaginationButtonS = styled(BaseButtonS)`
`;

// BackButtonS
export const BackButtonS = styled(BaseButtonS)`
  margin-top: 15px;
  background-color: var(--buttonSecondary);
  border: 1px solid var(--buttonBorder);
  
  &:hover, &:focus {
    background-color: var(--buttonSecondaryHover);
  }
`;

export const StyledButton = styled.button`
  background: var(--buttonPrimary);
  border: none;
  border-radius: 4px;
  color: var(--buttonText);
  cursor: pointer;
  padding: 10px 20px;
  margin: 10px;
  font-size: 1rem;
  text-align: center;  // Manter o alinhamento centralizado do texto
  box-shadow: var(--boxShadow);
  transition: var(--transitionSpeed);

  &:hover {
    background-color: var(--buttonPrimaryHover);
    filter: brightness(0.9);
  }

  svg {
    margin: 0 5px; // Espaçamento uniforme para ícones
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
