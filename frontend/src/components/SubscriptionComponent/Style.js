import styled from 'styled-components';

const SubscriptionS = styled.div`
  /* border: 2px solid blue; */
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
  }

  p {
    font-size: 1.2rem;
    color: var(--textColor);
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  button {
    display: block;
    margin: 1rem auto 0;
    background: var(--buttonSecondary);
    border: 1px solid var(--buttonBorder);
    border-radius: 4px;
    color: var(--buttonText);
    cursor: pointer;
    padding: 0.7rem 1rem;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color var(--transitionSpeed);

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
`;

export default SubscriptionS;
