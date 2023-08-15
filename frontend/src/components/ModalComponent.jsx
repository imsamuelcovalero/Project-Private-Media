/* File: src/components/ModalComponent.js */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalS = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
  }

  .modal-content button {
    margin: 10px;
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
`;

function ModalComponent({
  show, title, message, onConfirm, onCancel,
}) {
  if (!show) return null;

  return (
    <ModalS>
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button type="button" className="primary" onClick={onConfirm}>Confirmar</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </ModalS>
  );
}

ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalComponent;
