import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../Pages/PaginaPrincipal/PaginaPrincipal";
import ACercaDeNosotros from "../pages/ACercaDeNosotros";
import Contacto from "../Pages/Contacto/Contacto"
import Reservas from "../pages/Reservas";
import Galeria from "../components/galeria/Galeria";
import InicioSesion from "../Pages/Login/InicioSesion";
import Registro from "../Pages/Registro/Registro"
import Error404 from "../pages/Error404/Error404";


const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acercadenosotros" element={<ACercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Rutas;
