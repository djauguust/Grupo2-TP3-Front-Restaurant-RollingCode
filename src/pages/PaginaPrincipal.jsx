import React from 'react'
import Header from '../components/navbar/Header'
import CarruselPrincipal from '../components/carrusel/CarruselPrincipal'
import Info from '../components/info/Info'
import Menu from '../components/menu/Menu'
import Reviews from '../components/reseñas/Reviews'
import Galeria from '../components/galeria/Galeria'
import { useState } from 'react'
import Footer from '../components/footer/Footer'



const PaginaPrincipal = () => {

  const [theme, settheme] = useState('claro')

  const handleSwitch = (e) => {
    if(e.target.checked){
      settheme('oscuro')
    }  else {
      settheme('claro')
    }
  };

  return (
    <>
    <Header handleSwitch={handleSwitch} theme={theme}></Header>
    <CarruselPrincipal/>
    <Info theme={theme}/>
    <Menu theme={theme}/>
    <Reviews theme={theme}/>
    <Galeria theme={theme}/>
    <Footer theme={theme} />
    </>
  )
}

export default PaginaPrincipal