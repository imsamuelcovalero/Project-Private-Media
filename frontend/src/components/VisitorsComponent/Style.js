import styled from 'styled-components';

export const VisitorsS = styled.div`  
  /* border: 2px solid red; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  img {
    height: 300px;
    width: 450px;
  }

  h1 {
    font-size: 2.5rem;
    color: var(--buttonPrimary);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center; // forçando centralização
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

export const StyledImage = styled.img`
  max-width: 80%; // reduzindo a imagem e tornando-a mais responsiva
  height: auto;
  border-radius: 5px;
  box-shadow: var(--boxShadow);
`;

export const StyledVideo = styled.video`
  max-width: 80%;
  border-radius: 5px;
  box-shadow: var(--boxShadow);
`;
