import styled from 'styled-components';

const MainS = styled.div`  
  /* border: 2px solid blue; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--background); 

  h1 {
    font-size: 2.5rem;
    color: var(--headline);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  div {
    border: 2px solid var(--borderColor);
    padding: 1rem 2rem;
    box-shadow: var(--boxShadow);
    border-radius: 5px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  li {
    background-color: var(--buttonPrimary);
    padding: 15px; // Manter o padding vertical.
    width: 200px;  // Definindo um width para os botões.
    border-radius: 5px;
    box-shadow: var(--boxShadow);
    transition: transform var(--transitionSpeed), box-shadow var(--transitionSpeed);
    display: flex;
    justify-content: center; // Centralizar o conteúdo horizontalmente dentro do botão.

    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.1rem;
      letter-spacing: 1px;
      width: 100%;  // Garantindo que o link ocupe todo o espaço do botão.
      text-align: center; // Centralizando o texto do link.
    }

    a:hover, a:focus {
      color: var(--backgroundAccent);
    }

    &:hover, &:focus-within {
      transform: translateY(-3px);
      box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
    }
  }
`;

export default MainS;
