import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <App/>
  </React.StrictMode>  
  </BrowserRouter>
)
