import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactNodeProvider from './context/ReactNodeProvider';

const root = createRoot(
  document.getElementById('root'),
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactNodeProvider>
        <App />
      </ReactNodeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
