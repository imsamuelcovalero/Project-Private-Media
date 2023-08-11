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
    color: var(--buttonPrimary);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center; // forçando centralização
    margin-bottom: 20px;
  }

  .subscription-status {
    font-size: 18px;
    margin-bottom: 10px;
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

      .label-title {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;

export const ProfileEditS = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--background);

  h1 {
    font-size: 2.5rem;
    color: var(--buttonPrimary);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center; // forçando centralização
  }

  #profileForm {
    border: 1px solid var(--buttonBorder);
    padding: 2rem;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    border-radius: 5px;
    box-shadow: var(--boxShadow);
    transition: 0.3s;
    
    #inputs, #oldPasswordDiv {
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
      }
    }

    #ErrorMsg {
      color: var(--error);
      font-size: 12px;
      align-self: flex-start;
      margin-left: 0.5rem;
    }
  }
`;

export const ButtonS = styled.button`
  width: 200px;
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

  &.primary {
      background-color: var(--buttonPrimary);
      color: var(--buttonText);
      border: 1px solid var(--buttonBorder);
      box-shadow: var(--boxShadow);
      
      &:hover, &:focus {
          background-color: var(--buttonPrimaryHover);
      }
      
      &:disabled { 
          background-color: var(--buttonBackgroundDisabled); 
          cursor: not-allowed;
          filter: saturate(0);
      }
  }

  &.secondary {
      background-color: var(--buttonSecondary);
      color: var(--buttonText);
      border: 1px solid var(--buttonBorder);
      box-shadow: var(--boxShadow);
      
      &:hover, &:focus {
          background-color: var(--buttonSecondaryHover);
      }
      
      &:disabled { 
          background-color: var(--buttonBackgroundDisabled); 
          cursor: not-allowed;
          filter: saturate(0);
      }
  }
`;

export const InputS = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  border-bottom: 2px solid var(--borderColor);
  transition: border-bottom-color 0.3s;
  font-size: 14px;
  color: var(--paragraph);
  background-color: rgba(0, 0, 0, 0.02);

  &:focus {
    border-bottom-color: var(--buttonPrimary);
    outline: none;
  }

  border: ${(props) => (props.hasError ? '1px solid red' : '1px solid var(--headline)')};
  color: ${(props) => (props.hasError ? 'red' : 'inherit')}!important;
  
  ::placeholder {
    font-size: 13px;
  }
`;
