import React from 'react'
import { Route, Routes } from 'react-router'
import PaginaPrincipal from '../paginas/paginaPrincipal/paginaPrincipal'
import MisReservas from '../paginas/misReservas/misReservas'

const rutas = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<PaginaPrincipal />} />
            <Route path='/Mis-Reservas' element={<MisReservas />} />
        </Routes>
    </>
  )
}

export default rutas