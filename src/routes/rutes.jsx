import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../Pages/Home/home'
import ConfigurarCuenta from '../pages/Configurar-Cuenta/configurar-cuenta'

const Rutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Configurar-Cuenta' element={<ConfigurarCuenta />} />
    </Routes>
    </>
  )
}

export default Rutes