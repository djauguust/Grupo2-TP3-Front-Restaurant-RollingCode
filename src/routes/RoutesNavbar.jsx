import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import ACercaDeNosotros from "../pages/ACercaDeNosotros";
import Contacto from "../pages/Contacto";
import Reservas from "../pages/Reservas";
import Galeria from "../components/galeria/Galeria";
import Login from "../pages/Login";


const RoutesNavbar = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acercadenosotros" element={<ACercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default RoutesNavbar;
