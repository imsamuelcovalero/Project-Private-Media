/* File: src/Components/LoadingSpinner.component */
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingSpinnerS = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--backgroundAccentTransparent);
  color: var(--headline);
  padding: 20px;
  border-radius: 8px;
`;

/* LoadingSpinner é um componente que exibe um spinner de carregamento customizado */
export default function LoadingSpinner() {
  return (
    <LoadingSpinnerS
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Carregando...
    </LoadingSpinnerS>
  );
}
