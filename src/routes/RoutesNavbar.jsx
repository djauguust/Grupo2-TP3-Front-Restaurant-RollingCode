import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import ACercaDeNosotros from "../pages/ACercaDeNosotros";
import Contacto from "../pages/Contacto";

const RoutesNavbar = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acercadenosotros" element={<ACercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
};

export default RoutesNavbar;
