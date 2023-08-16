import styled from 'styled-components';

export const RegisterS = styled.div`  
  /* border: 1px solid red; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 22px;
    margin-bottom: 15px;
  }
  #registerForm {
    border: 1px solid var(--buttonBorder);
    background-color: var(--main);
    height: 550px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 5px 3px rgb(145 103 172 / 12%), 0 3px 2px rgb(145 103 172 / 24%);
    #inputs {
      /* border: 1px solid red; */
      width: 250px;
      padding: 5px;
      label {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 5px; 
        margin-bottom: 10px;
        #inputTitle {
          font-size: 18px;
          text-align: left;
          width: 100%;
          margin-left: 40px;
        }  
      }
    }

    #ErrorMsg {
      color: var(--error)
    }

    #registerButton, #backBtn {
      background-color: var(--buttonStandard);
      :disabled { background-color: var(--buttonBackgroundDisabled); }
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
    }

    button {
      width: 200px;
      padding: 0.7rem 0;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s;

      &.standard {
        background-color: var(--buttonStandard);
        
        &:hover, &:focus {
            background-color: var(--buttonStandardHover);
        }
      }
      
      &.primary {
        background-color: var(--buttonPrimary);
        
        &:hover, &:focus {
          background-color: var(--buttonPrimaryHover);
        }

        &:disabled {
          cursor: not-allowed;
          filter: saturate(0);
          background-color: var(--buttonBackgroundDisabled);
        }
      }

      &.secondary {
        background-color: var(--buttonSecondary);
        
        &:hover, &:focus {
          background-color: var(--buttonSecondaryHover);
        }
      }
    }
  }
`;

export const InputS = styled.input`
  border: ${(props) => (props.hasError ? '1px solid var(--error)' : '1px solid var(--headline)')};
  height: 40px;
  width: 200px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%)!important;
  color: ${(props) => (props.hasError ? 'var(--error)' : 'inherit')}!important;
`;
