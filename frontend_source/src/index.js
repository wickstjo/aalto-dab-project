import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './components/app';
import './components/styles.css';

// ROOT CONTAINER
const container = document.getElementById('root')

// RENDER IT IN STRICT MODE
ReactDOM.createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
