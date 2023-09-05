import styled from 'styled-components';

export const HeaderS = styled.div`
  border-bottom: 1px solid var(--buttonBorder);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  height: 80px;
  width: 100%;
  background-color: var(--main);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  #centerHeaderSpace{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: auto; // ou defina uma largura fixa se necessário
    color: var(--textColor);
    #name {
      /* grid-area: n; */
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 478px) {
      #name, #greetings {
        font-size: 0.75rem;
      }
    }
  }
  #themeDiv {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BtnMain = styled.button`
  border: none;
  height: 100%;
  width: 120px;
  background: var(--buttonStandard);
  /* border: 1px solid var(--buttonBorder); */
  border-radius: 4px;
  color: var(--buttonText);
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
  &.active {
    background-color: var(--buttonStandardHover);
    /* border: 1px solid var(--buttonStandardHover); */
  }
  &:hover:not(:disabled) {
    background-color: var(--buttonStandardHover);
    filter: brightness(0.9);
  }
  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
  }

  @media (max-width: 478px) {
    height: 100%;
    width: 90px;
  }
`;

export const ButtonS = styled.button`
  border: none;
  margin-left: auto;
  right: 16px;
  background: var(--buttonStandard);
  /* border: 1px solid var(--buttonBorder); */
  border-radius: 4px;
  color: var(--buttonText);
  cursor: pointer;
  padding: 8px 16px; // Adicionado padding para um melhor espaçamento// 
  font-weight: bold;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
  &.active {
    background-color: var(--buttonStandardHover);
    /* border: 1px solid var(--buttonStandardHover); */
  }
  &:hover:not(:disabled) {
    background-color: var(--buttonStandardHover);
    filter: brightness(0.9);
  }
  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
  }
  svg { // Estilização para os ícones
    margin-right: 8px;
  }

  @media (max-width: 478px) {
    width: 90px;
    font-size: 0.65rem;
  }
`;

export const ThemeS = styled.button`
    border: 1px solid var(--buttonBorder);
    height: 100%;
    width: 60px;
    background: var(--extra);
    color: var(--buttonText);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
    #modeIcon {
      height: 25px;
      width: 25px;
    }
    #modeIconDark {
      height: 25px;
      width: 25px;
      color: #121212;
    }
    &:hover {
      cursor: pointer;
      background: var(--buttonStandardHover);
    }
`;
