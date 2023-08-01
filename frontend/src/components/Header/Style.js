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
  width: 100%;
  #centerHeaderSpace{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    #name {
      grid-area: n;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
  height: 100%;
  width: 200px;
  background: var(--buttonBackground);
  border: 1px solid var(--secondary);
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
    background-color: var(--extraHover);
    border: 1px solid var(--extraHover);
  }
  &:hover:not(:disabled) {
    background-color: var(--extraHover);
    filter: brightness(0.9);
  }
  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
  }
`;

export const ThemeS = styled.button`
    border: 1px solid var(--buttonBorder);
    height: 100%;
    width: 60px;
    background: var(--tertiary);
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
      background: var(--extra);
    }
`;

export default HeaderS;
