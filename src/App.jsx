import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import Rutas from "./rutas/Rutas"
import NavBar from './Components/NavBar/NavBar';
import { AdministradorProvider } from './Contexto/ContextoAdmin';


function App() {


  return (
    <>
    <AdministradorProvider>
      <Rutas />
    </AdministradorProvider>
    </>
  )
}

export default App
