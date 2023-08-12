import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css" 
import 'sweetalert2/dist/sweetalert2.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>
)
