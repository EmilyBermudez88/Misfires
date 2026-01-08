import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import FormationProvider from './contexts/FormationContext';
import './styles/_base.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormationProvider>
       <App />
    </FormationProvider>
  </React.StrictMode>
);

