import styled from 'styled-components';

const SubscriptionS = styled.div`
  border: 2px solid blue;
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
  }

  div {
    border: 2px solid var(--borderColor);
    padding: 1rem 2rem;
    box-shadow: var(--boxShadow);
    border-radius: 5px;
  }

  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  label {
    position: relative;
  }

  input {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    padding: 5px 5px 5px 0;
    margin-left: 8px; /* Adicione esta linha */
  }

  input:focus + span, input:not(:placeholder-shown) + span {
    top: -20px;
    font-size: 12px;
    color: #666;
  }

  span.errorMessage {
    color: var(--error);
    font-size: 12px;
  }

  button {
    margin-top: 1rem;
    background: var(--buttonPrimary);
    border: 1px solid var(--buttonBorder);
    border-radius: 4px;
    color: var(--buttonText);
    cursor: pointer;
    padding: 0.7rem 1rem;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color var(--transitionSpeed);

    &:hover, &:focus {
      background-color: var(--extraHover);
    }

    &:disabled {
      cursor: not-allowed;
      filter: saturate(0);
      background: var(--buttonBackgroundDisabled);
    }
  }
`;

export default SubscriptionS;
