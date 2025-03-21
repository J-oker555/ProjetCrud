import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Assure-toi que AuthProvider entoure bien App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
