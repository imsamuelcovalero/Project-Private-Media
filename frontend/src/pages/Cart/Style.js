import styled from 'styled-components';

export const DivExterna = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CartS = styled.div`  
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  #mainDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  #header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  #transactionDiv {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 548px;
    min-height: 250px;
    box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    h1 {
      font-size: 30px;
      margin-bottom: 15px;
      margin-top: 15px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      justify-items: center;
      gap: 10px;
      #subTitle {
        font-size: 20px;
      }
      input {
        border: 1px solid var(--headline);
        height: 30px;
        width: 300px;
      }
      button {
        background-color: var(--buttonBackground);
        color: var(--buttonText);
        border: 1px solid var(--buttonBorder);
        width: 200px;
        height: 30px;
        line-height: 2.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
        border-radius: 4px;
        cursor: pointer;
        &:disabled {
          border: 1px solid #999999;
          background-color: #cccccc;
          color: #666666;
        }
      }
    }
    @media (max-width: 968px) {
      width: 90%;
    }
  }

  #filterDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 548px;
    height: 100px;
    box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    #byDateFilter {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      justify-items: center;
      margin-bottom: 10px;
      width: 100%;
      gap: 10px;
      button {
        background-color: var(--extra);
        color: var(--buttonText);
        border: 2px solid var(--buttonBorder);
        margin-bottom: 15px;
        margin-top: 10px;
        width: 110px;
        height: 28px;
        border-radius: 3px;
        line-height: 2.5em;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-family: 'Conthrax';
        box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
        cursor: pointer;
        &:hover {
          cursor: pointer;
          background: var(--tertiary);
        }
      }
    }
    #byTransactionFilter {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      justify-items: center;
      width: 100%;
      gap: 10px;
    }
  }

  #tableSection {
    border-radius: 8px;
    padding: 8px;
    h1 {
      font-size: 30px;
      margin-bottom: 15px;
      margin-top: 15px;
    }
    table {
      width: 100%;
      padding: 8px;
      border-collapse: separate; 
      border-spacing: 0 10px; 
      margin-top: 10px;
  
      td, th {
        padding: 8px;
        align-items: center;
        text-align: center;
      }
      th {
        font-size: 15px;
      }
      td {
        border: solid 1px #000;
        padding: 0;
        height: 30px;
      }
      td:first-child {
        border-left-style: solid;
        border-top-left-radius: 10px; 
        border-bottom-left-radius: 10px;
      }
      td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 10px; 
        border-top-right-radius: 10px; 
      }
      #tableElType {
        background-color: var(--tertiary);
      }
      #tableElUsename {
        background-color: var(--main);
        width: 300px;
      }
      #tableElValue {
        background-color: var(--buttonBackground);
      }
      #tableElDate {
        background-color: var(--extra);
        width: 83px;
      }
    }
  }
`;
