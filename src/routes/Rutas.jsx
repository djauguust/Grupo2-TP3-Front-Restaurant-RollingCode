import React from 'react'
import { Route, Routes } from 'react-router'
import InicioSesion from '../pages/Login/InicioSesion'
import Registro from '../pages/Registro/Registro'

const Rutas = () => {
  return (
    <>
        <Routes>
            <Route path='/Login' element={<InicioSesion />} />
            <Route path='/Registro' element={<Registro />} />
        </Routes>
    </>
  )
}

export default Rutas