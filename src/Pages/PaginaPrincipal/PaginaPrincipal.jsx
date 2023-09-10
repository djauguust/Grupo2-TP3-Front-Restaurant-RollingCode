import React, { useContext } from "react";
import Header from "../../components/navbar/Header";
import CarruselPrincipal from "../../components/carrusel/CarruselPrincipal";
import Info from "../../components/info/Info";
import Menu from "../../components/menu/Menu";
import Reviews from "../../components/reseñas/Reviews";
import Galeria from "../../components/galeria/Galeria";
import { NavbarContext } from "../../context/NavbarContext";

const PaginaPrincipal = () => {
  const { theme } = useContext(NavbarContext);
  return (
    <>
      <CarruselPrincipal />
      <Info theme={theme} />
      <Menu theme={theme} />
      <Reviews theme={theme} />
      <Galeria theme={theme} />
    </>
  );
};

export default PaginaPrincipal;
