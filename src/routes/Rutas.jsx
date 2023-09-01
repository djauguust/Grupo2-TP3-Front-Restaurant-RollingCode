import React from "react";
import { Route, Routes } from "react-router";
import PaginaPrincipal from "../Pages/PaginaPrincipal/PaginaPrincipal";
import ACercaDeNosotros from "../Pages/a-cerca-de-nosotros/ACercaDeNosotros"
import Contacto from "../Pages/Contacto/Contacto"
import Reservas from "../Pages/Reservas/Reservas"
import Galeria from "../components/galeria/Galeria";
import InicioSesion from "../Pages/Login/InicioSesion";
import Registro from "../Pages/Registro/Registro"
import Error404 from "../pages/Error404/Error404";
import Bandeja from "../components/bandeja/Bandeja";
import DatosCuenta from "../Pages/Cuenta/Datos-Cuenta/datos-cuenta";


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
        <Route path='/bandeja' element={<Bandeja />} />
        <Route path="/configurar-cuenta" element={<DatosCuenta />} />
      </Routes>
    </>
  );
};

export default Rutas;
