import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Get the container element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container); // Create a root for the app

// Render the app into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
