import styled from 'styled-components';

export const CategoryS = styled.div`  
  border: 2px solid green;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const PhotosDivS = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
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

export const BackButtonS = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 10px 20px;
  text-transform: uppercase;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #283593;
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
  &:focus {
    outline: none;
  }
`;
