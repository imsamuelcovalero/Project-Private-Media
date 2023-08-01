import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    margin-top: 80px !important;
  }

  &.Toastify__toast {
    margin-bottom: 8px !important;
  }
`;

export default StyledToastContainer;
