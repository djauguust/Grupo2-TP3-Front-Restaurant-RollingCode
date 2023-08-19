import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import ACercaDeNosotros from "../pages/ACercaDeNosotros";
import Contacto from "../pages/Contacto";
import Reservas from "../pages/Reservas";
import Galeria from "../components/galeria/Galeria";
import Login from "../pages/Login";
import Error404 from "../pages/Error404/Error404";


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
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RoutesNavbar;
