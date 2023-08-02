import styled from 'styled-components';

export const ProfileS = styled.div`  
  /* border: 2px solid red; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const InputS = styled.input`
  border: ${(props) => (props.hasError ? '1px solid red' : '1px solid var(--headline)')};
  height: 40px;
  width: 200px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%)!important;
  color: ${(props) => (props.hasError ? 'red' : 'inherit')}!important;
`;
