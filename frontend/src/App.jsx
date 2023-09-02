import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import StyledToastContainer from './App.style';
import Content from './routes/Content';
import GlobalStyle from './styles/Globals';
import 'react-toastify/dist/ReactToastify.css';
import ReactNodeContext from './context/ReactNodeContext';
import initializeMercadoPago from './services/mecadopago.helper';
import { lightTheme, darkTheme } from './components/Themes';
import ErrorBoundary from './helpers/ErrorBoudary';

/* Inicializa o Mercado Pago */
initializeMercadoPago();

function App() {
  const { theme } = useContext(ReactNodeContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ErrorBoundary>
        <div>
          <StyledToastContainer />
          <GlobalStyle />
          <Content />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
