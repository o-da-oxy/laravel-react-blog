import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {ContextProvider} from "./context/ContextProvider.tsx";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
)
