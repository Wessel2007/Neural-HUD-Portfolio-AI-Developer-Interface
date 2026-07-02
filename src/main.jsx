import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initCursor, initProgressBar, initScrollReveal } from './lib/runtime.js';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

initCursor();
initProgressBar();
window._initSR = initScrollReveal;
setTimeout(() => window._initSR(), 1200);
