import styled from 'styled-components';

const LoginS = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--background);
  
  #loginForm {
    border: 1px solid var(--buttonBorder);
    padding: 2rem;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 5px;
    box-shadow: var(--boxShadow);
    transition: 0.3s;
    
    #inputs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
        #inputTitle {
          font-size: 16px;
          color: var(--textPrimary);
        }

        input {
          width: 100%;
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          border-bottom: 2px solid var(--borderColor);
          transition: border-bottom-color 0.3s;
          font-size: 14px;
          color: var(--textSecondary);
          background-color: rgba(0, 0, 0, 0.02);
          
          &:focus {
            border-bottom-color: var(--buttonPrimary);
            outline: none;
          }
        }
      }
    }
    
    #ErrorMsg {
      color: var(--error);
      font-size: 12px;
      align-self: flex-start;
      margin-left: 0.5rem;
    }

    button {
      width: 100%;
      padding: 0.7rem 0;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s;
      
      &.primary {
        background-color: var(--buttonPrimary);
        
        &:hover, &:focus {
          background-color: var(--extraHover);
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
          background-color: var(--extraHoverSecondary);
        }
      }
    }

    button.forgot-password {
      background-color: transparent;
      color: var(--buttonBackground);
      text-decoration: underline;
      font-size: 14px;
      padding: 0;
      &:hover, &:focus {
        background-color: transparent;
        color: var(--extraHover);
      }
    }
  }
`;

export default LoginS;
