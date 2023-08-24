import React from 'react'
import { Route, Routes } from 'react-router'
import PaginaPrincipal from '../paginas/paginaPrincipal/paginaPrincipal'
import MisReservas from '../paginas/misReservas/misReservas'
import CrearReservas from '../paginas/crearReservasPrueba/crearReservasPrueba'

const rutas = () => {
  //Pagina de Rutas
  return (
    <>
        <Routes>
            <Route path='/' element={<PaginaPrincipal />} />
            <Route path='/Mis-Reservas' element={<MisReservas />} />
            <Route path='/Crear-Reservas' element={<CrearReservas />} />
        </Routes>
    </>
  )
}

export default rutas