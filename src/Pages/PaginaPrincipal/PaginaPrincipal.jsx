import React, { useContext } from "react";
import Header from "../../components/navbar/Header";
import CarruselPrincipal from "../../components/carrusel/CarruselPrincipal";
import Info from "../../components/info/Info";
import Menu from "../../components/menu/Menu";
import Reviews from "../../components/reseñas/Reviews";
import Galeria from "../../components/galeria/Galeria";
import { useState } from "react";

import { NavbarContext } from "../../context/NavbarContext";
import Alerta from "../../components/Alerta";

const PaginaPrincipal = () => {
const {theme} =useContext(NavbarContext)

const {toast, setToast} = useContext(NavbarContext)

  return (
    <>

      <CarruselPrincipal />
      <Info theme={theme} />
      <Menu theme={theme} />
      <Reviews theme={theme} />
      <Galeria theme={theme} />
      <Alerta toast={toast} setToast={setToast} />
    </>
  );
};

export default PaginaPrincipal;
