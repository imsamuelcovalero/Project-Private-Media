// CategoryHeader.style.js
import styled from 'styled-components';

export const CategoryHeaderS = styled.div`
  border-bottom: 1px solid var(--buttonBorder);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  height: 60px;
  width: 100%;
  background-color: var(--main);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  position: fixed;
  top: 80px; // ajustar este valor para que não fique sobre o header principal
  left: 0;
  width: 100%;
`;

export const BtnCategory = styled.button`
  border: none;
  margin-right: 10px;
  height: 100%;
  width: 300px;
  background: var(--buttonPrimary);
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
    background-color: var(--buttonPrimaryHover);
    /* border: 1px solid var(--buttonStandardHover); */
  }
  &:hover:not(:disabled) {
    background-color: var(--buttonPrimaryHover);
    filter: brightness(0.9);
  }
  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
    background: var(--buttonBackgroundDisabled);
  }
`;
