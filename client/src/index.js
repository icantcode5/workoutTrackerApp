import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './components/styles/Global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <GlobalStyles/>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </>
);

