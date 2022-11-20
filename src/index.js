import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthProvider } from "./Context/UserAuthContext";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </React.StrictMode>
  </Router>
);
