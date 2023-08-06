import styled from 'styled-components';

export const VisitorsS = styled.div`  
  border: 2px solid red;
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
`;

export const ProductsDivS = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
`;

export const ProductsCardS = styled.div`
  border: 1px solid var(--main);
  background-color: var(--main);
  height: 300px;
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: left; 
  gap: 6px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  #productPrice {
    font-weight: bold;
    display: flex;
    align-self: flex-start;
    margin: 3px;
  }
  #productImage {
    height: 150px;
    width: 100%;
    margin-bottom: 4px;
    border-radius: 3px 3px 0 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  #productName {
    font-size: 14px;
    font-weight: bold;
  }
  #addProduct {
    display: flex;
    width: 100%;
    margin: 0 auto;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance:textfield; /* Firefox */
      background-color: var(--secundaryHover);
    }
    button {
      display: inline-block;
      width: 110%; /* Calcula a largura do botão, subtraindo a largura do input */
      height: 30px;
      border: 1px solid var(--secundary);
      background-color: var(--secundary);
      &:hover {
        background-color: var(--secundaryHover);
      }
      cursor: pointer;
      border-radius: 0 8% 8% 0;
      font-size: 10px;
      font-weight: bold;
    }
    input {
      display: inline-block;
      width: 40px;
      height: 30px;
      border: 1px solid var(--secundaryHover);
      border-radius: 14% 0 0 14%;
      background-color: white;
      text-align: center;
    }
    // tira o estilo do abbr
    abbr {
      text-decoration: none;
      cursor: default;
    }
  }
`;
