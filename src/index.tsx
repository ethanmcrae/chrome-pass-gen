import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement: Element = document.getElementById("root")?? document.body;
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);