import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Base styles first: CSS Modules must be able to override shared utilities.
import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
