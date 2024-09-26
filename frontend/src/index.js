import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { LoginContextProvider } from './contexts/LoginContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  // </React.StrictMode>
);

