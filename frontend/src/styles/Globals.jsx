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
    // Core
    --background: ${({ theme }) => theme.background};
    --main: ${({ theme }) => theme.main};
    --headline: ${({ theme }) => theme.headline};
    --textColor: ${({ theme }) => theme.paragraph};
    // Buttons
    --buttonText: ${({ theme }) => theme.buttonText};
    --buttonBorder: ${({ theme }) => theme.buttonBorder};
    --buttonStandard: ${({ theme }) => theme.buttonStandard};
    --buttonStandardHover: ${({ theme }) => theme.buttonStandardHover};
    --buttonPrimary: ${({ theme }) => theme.buttonPrimary};
    --buttonPrimaryHover: ${({ theme }) => theme.buttonPrimaryHover};
    --buttonSecondary: ${({ theme }) => theme.buttonSecondary};
    --buttonSecondaryHover: ${({ theme }) => theme.buttonSecondaryHover};
    --buttonBackgroundDisabled: ${({ theme }) => theme.buttonBackgroundDisabled};
    // Others
    --tertiary: ${({ theme }) => theme.tertiary};
    --extra: ${({ theme }) => theme.extra};
    // Additional
    --transitionSpeed: ${({ theme }) => theme.transitionSpeed};
    --boxShadow: ${({ theme }) => theme.boxShadow};
    --borderColor: ${({ theme }) => theme.borderColor};
    --backgroundAccent: ${({ theme }) => theme.backgroundAccent};
    --backgroundAccentTransparent: ${({ theme }) => theme.backgroundAccentTransparent};
    --success: ${({ theme }) => theme.success};
    --error: ${({ theme }) => theme.error};
    --warning: ${({ theme }) => theme.warning};
    --info: ${({ theme }) => theme.info};
  }
`;
