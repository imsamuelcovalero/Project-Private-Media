import styled from 'styled-components';

const DivExterna = styled.div`
  /* border: 3px solid green; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RenderS = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* margin-top: 140px; */
  #content {
    /* border: 2px solid blue; */
    margin-top: 140px;
    min-height: calc(100vh - 140px); 
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto; 
    .content-inner { 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1; 
    }
  }
`;

export default DivExterna;
