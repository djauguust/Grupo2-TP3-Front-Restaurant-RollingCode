import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../Pages/Home/home'
import DatosCuenta from "../pages/Cuenta/Datos-Cuenta/datos-cuenta"
import ConfigurarCuenta from "../pages/Cuenta/Configurar-Cuenta/configurar-cuenta"


const Rutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/Cuenta/:id" element={<DatosCuenta />} />
        <Route path='/Configurar-Cuenta/:id' element={<ConfigurarCuenta />} />
    </Routes>
    </>
  )
}

export default Rutes