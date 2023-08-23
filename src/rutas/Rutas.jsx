import React from 'react'
import { Route, Routes } from 'react-router'
import Admin from '../pages/Administrador/Administrador'
import Portero from '../pages/Portero/Portero'

const Rutas = () => {
  return (
    <>
        <Routes>
            <Route path='/administracion' element={<Admin />} />
            <Route path='/portero' element={<Portero />} />
        </Routes>
    </>
  )
}

export default Rutas