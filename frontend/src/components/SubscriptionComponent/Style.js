import styled from 'styled-components';

const SubscriptionS = styled.div`
  border: 2px solid blue;
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
    color: var(--buttonPrimary);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  div {
    border: 2px solid var(--borderColor);
    padding: 2rem;
    box-shadow: var(--boxShadow);
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    margin-top: 2rem;
  }

  .field {
    /* border: 1px solid red; */
    position: relative; 
    margin-bottom: 2rem; 
    width: 100%;
    padding: 15px 5px; /* Aumentando o padding para dar mais espaço */
  }

  label span {
    /* border: 1px solid green; */
    position: absolute;
    top: 60%; /* Ajustando a posição inicial */
    transform: translateY(-140%); /* Ajustando o transform */
    left: 5px; 
    transition: 0.3s;
    pointer-events: none;
    margin-left: 5px;
  }

  input:not(:focus) + span {
    /* border: 1px solid yellow; */
    top: 10%; /* Mantendo a posição inicial */
    transform: translateY(20%); /* Mantendo o transform */
    font-size: 16px; 
    color: #888;
  }

  input {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    transition: 0.3s;
    background: none;
    color: #333;
  }

  input:focus {
      border-bottom-color: #007BFF;
      outline: none;
  }

  input:focus + span, input:not(:placeholder-shown) + span {
      top: 5px; /* Modificado para posicionar acima do input */
      left: 0;
      font-size: 12px;
      color: #666;
  }
  
  .short-field {
    /* width: calc(40% - 10px); */
    display: inline-block;
    vertical-align: top; /* Alineando campos curtos ao topo */
    margin-top: 0;
    max-width: 180px;
  }

  span.errorMessage {
    display: block; 
    color: var(--error);
    font-size: 12px;
    margin-top: 5px; /* pequeno espaçamento acima da mensagem de erro */
  }

  button {
    display: block; /* Adicione esta propriedade */
    margin: 1rem auto 0; /* Ajuste o margin-top para centrar horizontalmente */
    background: var(--buttonPrimary);
    border: 1px solid var(--buttonBorder);
    border-radius: 4px;
    color: var(--buttonText);
    cursor: pointer;
    padding: 0.7rem 1rem;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color var(--transitionSpeed);

    &:hover, &:focus {
      background-color: var(--extraHover);
    }

    &:disabled {
      cursor: not-allowed;
      filter: saturate(0);
      background: var(--buttonBackgroundDisabled);
    }
  }
`;

export default SubscriptionS;
