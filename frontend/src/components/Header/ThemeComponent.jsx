import React, { useEffect, useContext } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ReactNodeContext from '../../context/ReactNodeContext';
import { ThemeS } from './Style';

function ThemeComponent() {
  const { theme, setTheme } = useContext(ReactNodeContext);

  const setMode = (mode) => {
    window.localStorage.setItem('themeReactNode', mode);
    setTheme(mode);
  };

  // cria função para chamar o setMode e trocar o tema
  const themeToggler = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeReactNode');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeS
      type="button"
      onClick={themeToggler}
    >
      <abbr title="Mode">
        {theme === 'light'
          ? <MdDarkMode id="modeIconDark" />
          : <MdLightMode id="modeIcon" />}
      </abbr>
    </ThemeS>
  );
}

export default ThemeComponent;
