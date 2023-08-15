/* File: src/Components/LoadingSpinnerComponent */
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerS = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--backgroundAccentTransparent);
  color: var(--headline);
  padding: 20px;
  border-radius: 8px;
`;

export default function LoadingSpinnerComponent() {
  return (
    <SpinnerS
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Carregando...
    </SpinnerS>
  );
}
