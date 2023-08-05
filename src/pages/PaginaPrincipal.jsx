import React from 'react'
import Header from '../components/navbar/Header'
import CarruselPrincipal from '../components/carrusel/CarruselPrincipal'
import Info from '../components/info/Info'
import Menu from '../components/menu/Menu'
import Reviews from '../components/reseñas/Reviews'
import Galeria from '../components/galeria/Galeria'

const PaginaPrincipal = () => {
  return (
    <>
    <Header/>
    <CarruselPrincipal/>
    <Info/>
    <Menu/>
    <Reviews/>
    <Galeria/>
    </>
  )
}

export default PaginaPrincipal