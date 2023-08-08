/* File: src/styles/Globals.jsx */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    font-size: 16px;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.background};
    /* transition: all 0.03s linear; */
    color: ${({ theme }) => theme.paragraph};
    h1 {
      color: ${({ theme }) => theme.headline};
    }
  }
  
  body html #root {
    height: 100%;
  }

  input:-webkit-autofill::first-line {
    font-size: 1em;
    box-shadow: none !important;
  }
  /* Aqui está o truque para substituir as cores de autofill */
  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s !important;
  }

  /* input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-appearance: none !important;
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  } */

  //define as cores do root
  :root {
    --background: ${({ theme }) => theme.background};
    --main: ${({ theme }) => theme.main};
    --headline: ${({ theme }) => theme.headline};
    --paragraph: ${({ theme }) => theme.paragraph};
    --buttonBorder: ${({ theme }) => theme.buttonBorder};
    --buttonText: ${({ theme }) => theme.buttonText};
    --buttonBackground: ${({ theme }) => theme.buttonBackground};
    --buttonBackgroundDisabled: ${({ theme }) => theme.buttonBackgroundDisabled};
    --buttonPrimary: ${({ theme }) => theme.buttonPrimary};
    --buttonPrimaryHover: ${({ theme }) => theme.buttonPrimaryHover};
    --buttonSecondary: ${({ theme }) => theme.buttonSecondary};
    --buttonSecondaryHover: ${({ theme }) => theme.buttonSecondaryHover};
    --secundary: ${({ theme }) => theme.secundary};
    --secundaryHover: ${({ theme }) => theme.secundaryHover};
    --tertiary: ${({ theme }) => theme.tertiary};
    --extra: ${({ theme }) => theme.extra};
    --extraHover: ${({ theme }) => theme.extraHover};
  }
`;
