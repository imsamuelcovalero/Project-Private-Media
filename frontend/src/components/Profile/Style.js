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

  h1 {
    font-size: 2.5rem;
    color: var(--headline);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center; // forçando centralização
    margin-bottom: 20px;
  }

  .subscription-status {
    font-size: 18px;
    margin-bottom: 10px;
    color: var(--textColor);
  }

  #paymentButton {
    margin-bottom: 20px;
  }

  .profile-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 18px;

    .details {
      display: flex;
      flex-direction: column;
      gap: 15px;
      color: var(--textColor);

      .label-title {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;

export const ProfileEditS = styled.div`
  /* border: 2px solid red; */
  overflow: auto;
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--background);

  h1 {
    font-size: 2.5rem;
    color: var(--headline);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center; // forçando centralização
  }

  #profileForm {
    border: 1px solid var(--buttonBorder);
    background-color: var(--main);
    padding: 2rem;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    border-radius: 5px;
    box-shadow: var(--boxShadow);
    transition: 0.3s;

    .inputTitle {
      font-size: 16px;
      color: var(--textColor);
      font-weight: 600;
    }
    
    #oldPasswordDiv {
      display: flex;
      flex-direction: column;
      width: 230px;
      gap: 1.5rem;

      label {
        position: relative;  // Adicionado para posicionar o erro relativo a este contêiner
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

      }
    }

    #newPasswordDiv {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .errorMsg {
      height: 20px;
      color: var(--error);
      font-size: 12px;
      align-self: flex-start;
      margin-left: 0.5rem;
    }
  }
`;

export const ErrorMsgS = styled.p`
  height: 20px;
  color: var(--error);
  font-size: 12px;
  align-self: flex-start;
  margin-left: 0.5rem;
`;

export const ButtonS = styled.button`
  width: 230px;
  height: 30px;
  line-height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: var(--transitionSpeed);
  color: var(--buttonText);

  &.primary {
    background-color: var(--buttonPrimary);
    /* border: 1px solid var(--buttonBorder); */
    
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
      /* border: 1px solid var(--buttonBorder); */
      color: var(--buttonText);
      box-shadow: var(--boxShadow);
      
      &:hover, &:focus {
          background-color: var(--buttonSecondaryHover);
      }
  }

  &:disabled { 
    background-color: var(--buttonBackgroundDisabled); 
    cursor: not-allowed;
    filter: saturate(0);
  }
`;

export const InputS = styled.input`
  width: 230px; // largura fixa
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  border-bottom: none;
  box-shadow: ${(props) => (props.hasError ? '0 -2px 0 var(--error) inset' : '0 -2px 0 var(--borderColor) inset')};
  transition: border-bottom-color 0.3s;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.02);

  &:focus {
    border-bottom-color: var(--buttonPrimary);
    outline: none;
  }

  border-color: ${(props) => (props.hasError ? 'var(--error)' : 'var(--headline)')};
  color: ${(props) => (props.hasError ? 'var(--error)' : 'var(--textColor)')}!important;
  
  ::placeholder {
    font-size: 13px;
  }
`;
