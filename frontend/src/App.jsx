import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import StyledToastContainer from './App.style';
import Content from './routes/Content';
import GlobalStyle from './styles/Globals';
import 'react-toastify/dist/ReactToastify.css';
import ReactNodeContext from './context/ReactNodeContext';
import { lightTheme, darkTheme } from './components/Themes';

function App() {
  const { theme } = useContext(ReactNodeContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div>
        <StyledToastContainer />
        <GlobalStyle />
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
